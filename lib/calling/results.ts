// Applies a provider's post-call result. Idempotent: the same webhook can arrive twice, late or out of order.
// See docs/calling/ARCHITECTURE.md → "Results".

import { logActivity } from "@/lib/admin/activity";
import { AI_ACTOR, callingEnv, type CallingEnv } from "./config";
import { maskPhone } from "./phone";
import type { NormalizedCallResult } from "./providers/types";
import * as repo from "./repository";
import { retryDelayMinutes } from "./schedule";
import { verifyJobSignature } from "./security";
import { CALL_OUTCOMES, type CallOutcome } from "./types";
import { computeUsage } from "./usage";
import { scoreHeat } from "./heat";

export type ApplyResult =
  | { ok: true; duplicate?: boolean; callId: number; jobStatus?: string }
  | { ok: false; httpStatus: 400 | 401 | 404; error: string };

const FOLLOW_UP_OUTCOMES = new Set<CallOutcome>(["interested", "wants_more_info", "wants_human_callback", "follow_up"]);
const STOP_OUTCOMES = new Set<CallOutcome>(["do_not_call", "wrong_number"]);

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
  const existingCall = await repo.findCallByAttempt(providerName, result.providerAttemptId);
  if (event.alreadyProcessed && existingCall) return { ok: true, duplicate: true, callId: existingCall.id };

  try {
    const job = await repo.getJob(orgId, jobId);
    if (!job) {
      await repo.finishEvent(event.id, "Job not found");
      return { ok: false, httpStatus: 404, error: "Job not found" };
    }

    const settings = await repo.getSettings(orgId);
    const vars = result.variables ?? {};
    const rawOutcome = text(vars.call_outcome, 40);
    const outcome = rawOutcome && (CALL_OUTCOMES as readonly string[]).includes(rawOutcome) ? (rawOutcome as CallOutcome) : null;
    const optOut = outcome === "do_not_call" || vars.opt_out === true || vars.opt_out === "true";
    const usage = computeUsage(result.durationSeconds, settings);
    const heat = scoreHeat({ status: result.status, durationSeconds: result.durationSeconds, outcome, variables: result.variables });

    const out = await repo.withTransaction(async (client) => {
      // If the start request was ambiguous ("needs review") but Sarvam did place the call, link it now.
      const callId =
        existingCall?.id ??
        (await repo.insertCall({
          orgId,
          jobId,
          submissionId: job.submissionId,
          provider: providerName,
          providerAttemptId: result.providerAttemptId,
          phone: job.phone,
          language: job.language,
        }));

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
          usageDate: now.toISOString().slice(0, 10),
        });
      }

      // Job state machine.
      let jobStatus: string;
      if (result.status === "connected") {
        jobStatus = "completed";
        await repo.updateJob(orgId, jobId, { status: "completed", lastError: null }, client);
        if (job.submissionId) await repo.markLeadContacted(client, job.submissionId, AI_ACTOR);
      } else if (job.attempts < job.maxAttempts && !optOut) {
        jobStatus = "queued";
        const delay = retryDelayMinutes(job.attempts, settings.retryDelayMinutes);
        await repo.updateJob(
          orgId,
          jobId,
          { status: "queued", scheduledAt: new Date(now.getTime() + delay * 60_000), lastError: result.failureReason ?? result.status },
          client
        );
      } else {
        jobStatus = "failed";
        await repo.updateJob(orgId, jobId, { status: "failed", lastError: result.failureReason ?? `Last attempt: ${result.status}` }, client);
      }

      // The person asked not to be called (or it was the wrong person): stop for good.
      if (optOut || (outcome && STOP_OUTCOMES.has(outcome))) {
        await repo.addSuppression(orgId, job.phone, outcome === "wrong_number" ? "Wrong number (AI call)" : "Asked not to be called (AI call)", "agent_opt_out", AI_ACTOR, client);
        await repo.revokeConsent(orgId, job.phone, outcome ?? "opt_out", client);
      }
      return { callId, jobStatus };
    });

    await repo.finishEvent(event.id, null);
    const label = result.status === "connected"
      ? `Connected · ${outcome ?? "no outcome"} · ${usage.durationSeconds}s${heat ? ` · ${heat.heat.toUpperCase()} lead` : ""}`
      : result.status;
    await logActivity({ id: 0, name: AI_ACTOR }, `call.${result.status}`, { submissionId: job.submissionId, summary: `AI call to ${maskPhone(job.phone)}: ${label}` });
    return { ok: true, callId: out.callId, jobStatus: out.jobStatus };
  } catch (error) {
    await repo.finishEvent(event.id, String(error)).catch(() => null);
    throw error;
  }
}
