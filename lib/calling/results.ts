// Applies a provider's post-call result. Idempotent: the same webhook can arrive twice, late or out of order.
// See docs/calling/ARCHITECTURE.md → "Results".

import { logActivity } from "@/lib/admin/activity";
import { AI_ACTOR, callingEnv, type CallingEnv } from "./config";
import { scoreHeat } from "./heat";
import { maskPhone } from "./phone";
import type { NormalizedCallResult } from "./providers/types";
import * as repo from "./repository";
import { localDate, retryDelayMinutes } from "./schedule";
import { verifyJobSignature } from "./security";
import { CALL_OUTCOMES, type CallOutcome, type JobStatus } from "./types";
import { computeUsage } from "./usage";

export type ApplyResult =
  | { ok: true; duplicate?: boolean; callId: number; orgId: number; jobStatus?: string; alert?: boolean }
  | { ok: false; httpStatus: 400 | 401 | 404; error: string };

const FOLLOW_UP_OUTCOMES = new Set<CallOutcome>(["interested", "wants_more_info", "wants_human_callback", "follow_up"]);
const STOP_OUTCOMES = new Set<CallOutcome>(["do_not_call", "wrong_number"]);
/** Only a job that is waiting for a result can be re-queued or failed by one. */
const AWAITING_RESULT = new Set<JobStatus>(["dispatching", "in_progress", "needs_review"]);

const text = (v: unknown, max: number) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export async function applyCallResult(
  providerName: string,
  result: NormalizedCallResult,
  rawPayload: unknown,
  opts: { env?: CallingEnv; now?: Date } = {}
): Promise<ApplyResult> {
  const env = opts.env ?? callingEnv();
  const now = opts.now ?? new Date();

  // 1. Authenticate via the signed metadata we attached when starting the call.
  const meta = result.metadata ?? {};
  const jobId = Number(meta.job_id);
  const orgId = Number(meta.org_id);
  if (!Number.isSafeInteger(jobId) || !Number.isSafeInteger(orgId) || !verifyJobSignature(env.webhookSecret, orgId, jobId, meta.sig)) {
    return { ok: false, httpStatus: 401, error: "Invalid or missing job signature" };
  }

  // 2. De-duplicate: one processing per attempt + status.
  const event = await repo.recordEvent(providerName, `${providerName}:${result.providerAttemptId}:${result.status}`, orgId, rawPayload);
  const knownCall = await repo.findCallByAttempt(providerName, result.providerAttemptId);
  if (event.alreadyProcessed && knownCall) return { ok: true, duplicate: true, callId: knownCall.id, orgId: knownCall.orgId };

  try {
    const settings = await repo.getSettings(orgId);
    const vars = result.variables ?? {};
    const rawOutcome = text(vars.call_outcome, 40);
    const outcome = rawOutcome && (CALL_OUTCOMES as readonly string[]).includes(rawOutcome) ? (rawOutcome as CallOutcome) : null;
    const optOut = outcome === "do_not_call" || vars.opt_out === true || vars.opt_out === "true";
    const stopCalling = optOut || (outcome !== null && STOP_OUTCOMES.has(outcome));
    const usage = computeUsage(result.durationSeconds, settings);
    const heat = scoreHeat({ status: result.status, durationSeconds: result.durationSeconds, outcome, variables: result.variables });

    const out = await repo.withTransaction(async (client) => {
      // The job row is held until we finish, so two results (or a result and the dispatcher) can't decide at once.
      const job = await repo.lockJob(client, orgId, jobId);
      if (!job) return { kind: "no_job" as const };

      const existing = await repo.findCallByAttempt(providerName, result.providerAttemptId, client);
      // The signature proves which job the sender may update. An attempt that was placed for another job is not it.
      if (existing && (existing.orgId !== orgId || (existing.jobId !== null && existing.jobId !== jobId))) return { kind: "mismatch" as const };
      // One attempt has one result. A second, different status for it changes nothing.
      if (existing && existing.status !== "initiated") return { kind: "settled" as const, callId: existing.id };

      // Unknown attempt: the start was unconfirmed ("needs review") or its result beat our own bookkeeping. Link it now.
      const callId =
        existing?.id ??
        (await repo.insertCall(
          {
            orgId,
            jobId,
            submissionId: job.submissionId,
            provider: providerName,
            providerAttemptId: result.providerAttemptId,
            phone: job.phone,
            language: job.language,
          },
          client
        ));

      await repo.applyCallResultRow(client, callId, {
        status: result.status,
        durationSeconds: result.durationSeconds,
        interactionId: result.interactionId,
        failureReason: result.failureReason,
        variables: result.variables,
        outcome,
        summary: text(vars.call_summary, 2000),
        language: text(vars.detected_language, 40),
        followUp: (outcome ? FOLLOW_UP_OUTCOMES.has(outcome) : false) || heat?.heat === "hot",
        heat: heat?.heat ?? null,
        heatScore: heat?.score ?? null,
        heatReasons: heat?.reasons ?? null,
      });
      if (result.transcript?.length) await repo.upsertTranscript(client, orgId, callId, result.transcript);
      if (usage.durationSeconds > 0) {
        await repo.insertUsage(client, {
          orgId,
          callId,
          provider: providerName,
          durationSeconds: usage.durationSeconds,
          billableMinutes: usage.billableMinutes,
          telephonyPulses: usage.telephonyPulses,
          agentCost: usage.agentCost,
          telephonyCost: usage.telephonyCost,
          currency: usage.currency,
          pricingVersion: usage.pricingVersion,
          usageDate: localDate(now, settings.timezone),
        });
      }

      // Job state machine. Every call placed for the job counts as an attempt, including one we only learn of here.
      const stats = await repo.callStatsForJob(client, jobId);
      const attempts = Math.max(job.attempts, stats.count);
      let jobStatus: JobStatus = job.status;
      if (result.status === "connected") {
        // We spoke to the person: the job is done whatever state it was in (even re-queued or cancelled meanwhile).
        jobStatus = "completed";
        await repo.updateJob(orgId, jobId, { status: "completed", attempts, lastError: null }, client);
        if (job.submissionId) await repo.markLeadContacted(client, job.submissionId, AI_ACTOR);
      } else if (AWAITING_RESULT.has(job.status) && stats.latestId === callId) {
        const lastError = result.failureReason ?? result.status;
        const mayRetry = attempts < job.maxAttempts && !stopCalling && !(await repo.hasActiveJobForPhone(orgId, job.phone, client, jobId));
        if (mayRetry) {
          jobStatus = "queued";
          const delay = retryDelayMinutes(attempts, settings.retryDelayMinutes);
          await repo.updateJob(orgId, jobId, { status: "queued", attempts, scheduledAt: new Date(now.getTime() + delay * 60_000), lastError, renewExpiry: true }, client);
        } else {
          jobStatus = "failed";
          await repo.updateJob(orgId, jobId, { status: "failed", attempts, lastError: result.failureReason ?? `Last attempt: ${result.status}` }, client);
        }
      }
      // Otherwise the job was cancelled, finished or re-queued by a person in the meantime: the call is recorded
      // above, and the job is left exactly as they set it.

      // The person asked not to be called (or it was the wrong person): stop for good.
      if (stopCalling) {
        await repo.addSuppression(orgId, job.phone, outcome === "wrong_number" ? "Wrong number (AI call)" : "Asked not to be called (AI call)", "agent_opt_out", AI_ACTOR, client);
        await repo.revokeConsent(orgId, job.phone, outcome ?? "opt_out", client);
      }
      return { kind: "applied" as const, callId, jobStatus, submissionId: job.submissionId, phone: job.phone };
    });

    if (out.kind === "no_job") {
      await repo.finishEvent(event.id, "Job not found");
      return { ok: false, httpStatus: 404, error: "Job not found" };
    }
    if (out.kind === "mismatch") {
      // Left unprocessed on purpose: it must not block the genuine result for this attempt.
      await repo.finishEvent(event.id, "Refused: this attempt belongs to a different job");
      return { ok: false, httpStatus: 401, error: "Attempt does not belong to this job" };
    }
    if (out.kind === "settled") {
      await repo.finishEvent(event.id, null, "Ignored: this attempt already has a final result");
      return { ok: true, duplicate: true, callId: out.callId, orgId };
    }

    await repo.finishEvent(event.id, null);
    const label = result.status === "connected"
      ? `Connected · ${outcome ?? "no outcome"} · ${usage.durationSeconds}s${heat ? ` · ${heat.heat.toUpperCase()} lead` : ""}`
      : result.status;
    await logActivity({ id: 0, name: AI_ACTOR }, `call.${result.status}`, { submissionId: out.submissionId, summary: `AI call to ${maskPhone(out.phone)}: ${label}` });
    // Worth a person's attention straight away: a hot lead, or someone who asked for a human.
    const alert = result.status === "connected" && !stopCalling && (heat?.heat === "hot" || outcome === "wants_human_callback");
    return { ok: true, callId: out.callId, orgId, jobStatus: out.jobStatus, alert };
  } catch (error) {
    await repo.finishEvent(event.id, String(error)).catch(() => null);
    throw error;
  }
}
