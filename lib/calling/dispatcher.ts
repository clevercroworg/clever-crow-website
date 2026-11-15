// The dispatcher: claims due jobs, re-checks eligibility, starts calls. Safe to run any number of times, even at the
// same moment (jobs are claimed with FOR UPDATE SKIP LOCKED). Triggered by Vercel Cron every minute during calling
// hours and right after a callback request. See docs/calling/ARCHITECTURE.md → "Dispatcher".

import { logActivity } from "@/lib/admin/activity";
import { AI_ACTOR, callingEnv, type CallingEnv } from "./config";
import { checkEligibility } from "./eligibility";
import { buildAgentVariables } from "./guardrails";
import { maskPhone } from "./phone";
import { getVoiceProvider, type VoiceProvider } from "./providers";
import * as repo from "./repository";
import { isWithinCallingHours, retryDelayMinutes, startOfLocalDay } from "./schedule";
import { signJob, webhookPathToken } from "./security";
import type { CallJob, CallingSettings } from "./types";

export type DispatchSummary = {
  ran: boolean;
  reason?: string;
  claimed: number;
  started: number;
  rescheduled: number;
  cancelled: number;
  needsReview: number;
  failed: number;
  staleReleased: number;
};

const empty = (reason?: string): DispatchSummary => ({
  ran: false,
  reason,
  claimed: 0,
  started: 0,
  rescheduled: 0,
  cancelled: 0,
  needsReview: 0,
  failed: 0,
  staleReleased: 0,
});

export function webhookUrl(env: CallingEnv) {
  return `${env.publicBaseUrl}/api/calling/webhooks/sarvam/${webhookPathToken(env.webhookSecret)}`;
}

export function providerReady(provider: VoiceProvider, settings: CallingSettings, env: CallingEnv) {
  return provider.configProblems(settings).length === 0 && env.webhookSecret.length >= 32;
}

export async function runDispatcher(orgId: number, opts: { env?: CallingEnv; provider?: VoiceProvider; now?: Date } = {}): Promise<DispatchSummary> {
  const env = opts.env ?? callingEnv();
  const provider = opts.provider ?? getVoiceProvider(env);
  const now = opts.now ?? new Date();

  const summary = empty();
  summary.staleReleased = (await repo.releaseStaleDispatching(orgId)) + (await repo.releaseStaleInProgress(orgId));

  if (!env.enabled) return { ...summary, reason: "Master switch off (CALLING_ENABLED)" };
  const settings = await repo.getSettings(orgId);
  if (!settings.automationEnabled) return { ...summary, reason: "Automation off" };
  if (!providerReady(provider, settings, env)) return { ...summary, reason: "Provider not configured" };
  if (!isWithinCallingHours(now, settings)) return { ...summary, reason: "Outside calling hours" };

  let startedToday = await repo.countCallsSince(orgId, startOfLocalDay(now, settings.timezone));
  let inProgress = await repo.countCallsInProgress(orgId);
  const capacity = Math.min(settings.maxConcurrentCalls - inProgress, settings.maxDailyCalls - startedToday);
  if (capacity <= 0) return { ...summary, reason: "At daily or concurrency limit" };

  const jobs = await repo.claimDueJobs(orgId, capacity);
  summary.ran = true;
  summary.claimed = jobs.length;

  for (const job of jobs) {
    const outcome = await dispatchOne(job, settings, env, provider, now, startedToday, inProgress);
    summary[outcome]++;
    if (outcome === "started") {
      startedToday++;
      inProgress++;
    }
  }
  return summary;
}

type Outcome = "started" | "rescheduled" | "cancelled" | "needsReview" | "failed";

async function dispatchOne(
  job: CallJob,
  settings: CallingSettings,
  env: CallingEnv,
  provider: VoiceProvider,
  now: Date,
  startedToday: number,
  inProgress: number
): Promise<Outcome> {
  try {
    const lead = await repo.getLeadBasics(job.submissionId);
    // Re-check everything immediately before dialling: consent may have been revoked since the job was queued.
    const verdict = checkEligibility({
      now,
      settings,
      masterSwitchOn: env.enabled,
      providerConfigured: providerReady(provider, settings, env),
      phone: job.phone,
      hasActiveConsent: await repo.hasActiveConsent(job.orgId, job.phone),
      isSuppressed: await repo.isSuppressed(job.orgId, job.phone),
      leadStatus: lead?.status ?? null,
      callsStartedToday: startedToday,
      callsInProgress: inProgress, // counted before claiming; capacity already reserved room for this job
      attempts: job.attempts,
      maxAttempts: job.maxAttempts,
    });
    if (!verdict.ok) {
      if (verdict.kind === "later") {
        await repo.updateJob(job.orgId, job.id, { status: "queued", scheduledAt: verdict.retryAt, lastError: verdict.message });
        return "rescheduled";
      }
      await repo.updateJob(job.orgId, job.id, { status: "cancelled", lastError: `${verdict.code}: ${verdict.message}` });
      return "cancelled";
    }

    // Requested language if allowed, else the org default; the agent still switches if the person prefers another.
    const language = job.language && settings.enabledLanguages.includes(job.language) ? job.language : settings.defaultLanguage;
    const result = await provider.startOutboundCall({
      phone: job.phone,
      agent: settings,
      language,
      variables: buildAgentVariables(lead), // cleaned: form text must never act as instructions
      webhookUrl: webhookUrl(env),
      webhookMetadata: { job_id: job.id, org_id: job.orgId, sig: signJob(env.webhookSecret, job.orgId, job.id) },
    });

    if (result.ok) {
      await repo.insertCall({
        orgId: job.orgId,
        jobId: job.id,
        submissionId: job.submissionId,
        provider: provider.name,
        providerAttemptId: result.providerAttemptId,
        phone: job.phone,
        language,
      });
      await repo.updateJob(job.orgId, job.id, { status: "in_progress", attempts: job.attempts + 1, lastError: null });
      await logActivity({ id: 0, name: AI_ACTOR }, "call.started", { submissionId: job.submissionId, summary: `AI call started to ${maskPhone(job.phone)}` });
      return "started";
    }
    if (result.ambiguous) {
      // The provider may have accepted it. Never retry automatically; a person checks Sarvam first.
      await repo.updateJob(job.orgId, job.id, { status: "needs_review", attempts: job.attempts + 1, lastError: result.error });
      return "needsReview";
    }
    if (result.retryable) {
      const delay = retryDelayMinutes(Math.max(1, job.attempts), Math.min(settings.retryDelayMinutes, 15));
      await repo.updateJob(job.orgId, job.id, { status: "queued", scheduledAt: new Date(now.getTime() + delay * 60_000), lastError: result.error });
      return "rescheduled";
    }
    await repo.updateJob(job.orgId, job.id, { status: "failed", lastError: result.error });
    return "failed";
  } catch (error) {
    // Unknown state (e.g. DB error after the provider accepted): park it for review rather than risk a double call.
    console.error("CALLING: dispatch failed", { jobId: job.id, error });
    await repo
      .updateJob(job.orgId, job.id, { status: "needs_review", lastError: `Internal error while starting call: ${String(error).slice(0, 200)}` })
      .catch(() => null);
    return "needsReview";
  }
}
