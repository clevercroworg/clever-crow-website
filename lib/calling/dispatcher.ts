// The dispatcher: claims due jobs, re-checks eligibility, starts calls. Safe to run any number of times, even at the
// same moment: jobs are claimed under a per-organisation lock, inside the daily and at-once limits. Triggered by
// Vercel Cron during calling hours, right after a callback request, and right after each call result.
// See docs/calling/ARCHITECTURE.md → "Dispatcher".

import { logActivity } from "@/lib/admin/activity";
import { AI_ACTOR, callingEnv, LIMITS, type CallingEnv } from "./config";
import { checkEligibility } from "./eligibility";
import { buildAgentVariables } from "./guardrails";
import { maskPhone } from "./phone";
import { getVoiceProvider, type VoiceProvider } from "./providers";
import * as repo from "./repository";
import { isWithinCallingHours, retryDelayMinutes, startOfLocalDay, startOfLocalMonth } from "./schedule";
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
  expired: number;
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
  expired: 0,
});

export function webhookUrl(env: CallingEnv) {
  return `${env.publicBaseUrl}/api/calling/webhooks/sarvam/${webhookPathToken(env.webhookSecret)}`;
}

export function providerReady(provider: VoiceProvider, settings: CallingSettings, env: CallingEnv) {
  return provider.configProblems(settings).length === 0 && env.webhookSecret.length >= 32;
}

const g = globalThis as unknown as { ccCallingLastPurge?: number };

/** Old raw webhook payloads are deleted about once a day per server instance; never worth failing a run over. */
async function purgeOldEventsOccasionally(now: Date) {
  if (g.ccCallingLastPurge && now.getTime() - g.ccCallingLastPurge < 24 * 3_600_000) return;
  g.ccCallingLastPurge = now.getTime();
  await repo.purgeOldEvents(LIMITS.eventRetentionDays).catch((error) => console.error("CALLING: event purge failed", error));
}

export async function runDispatcher(orgId: number, opts: { env?: CallingEnv; provider?: VoiceProvider; now?: Date } = {}): Promise<DispatchSummary> {
  const env = opts.env ?? callingEnv();
  const provider = opts.provider ?? getVoiceProvider(env);
  const now = opts.now ?? new Date();
  const summary = empty();

  // Most scheduled runs find nothing waiting: one query, then stop.
  const workload = await repo.getWorkload(orgId);
  await purgeOldEventsOccasionally(now);
  if (workload.queued === 0 && workload.active === 0) return { ...summary, reason: "Nothing waiting" };

  // Housekeeping runs even when calling is switched off, so nothing is left stuck or dialled days late.
  if (workload.active > 0) summary.staleReleased = (await repo.releaseStaleDispatching(orgId)) + (await repo.releaseStaleInProgress(orgId));
  if (workload.queued > 0) summary.expired = await repo.expireStaleJobs(orgId);
  if (workload.due === 0) return { ...summary, reason: "Nothing due yet" };

  if (!env.enabled) return { ...summary, reason: env.mockBlocked ? "Test provider is not allowed on the live site" : "Master switch off (CALLING_ENABLED)" };
  const settings = await repo.getSettings(orgId);
  if (!settings.automationEnabled) return { ...summary, reason: "Automation off" };
  if (!providerReady(provider, settings, env)) return { ...summary, reason: "Provider not configured" };
  if (!isWithinCallingHours(now, settings)) return { ...summary, reason: "Outside calling hours" };
  if (settings.monthlyBudget > 0) {
    const spent = await repo.costSince(orgId, startOfLocalMonth(now, settings.timezone).date);
    if (spent >= settings.monthlyBudget) return { ...summary, reason: "Monthly budget reached" };
  }

  const claim = await repo.claimDueJobsWithinLimits(orgId, {
    maxConcurrent: settings.maxConcurrentCalls,
    maxDaily: settings.maxDailyCalls,
    dayStart: startOfLocalDay(now, settings.timezone),
  });
  if (claim.atLimit) return { ...summary, reason: "At daily or concurrency limit" };
  summary.ran = true;
  summary.claimed = claim.jobs.length;

  let { startedToday, active } = claim;
  for (const job of claim.jobs) {
    const outcome = await dispatchOne(job, settings, env, provider, now, startedToday, active);
    summary[outcome]++;
    if (outcome === "started") {
      startedToday++;
      active++;
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
  // Once the provider has been asked to dial, every path below must count the attempt.
  let dialled = false;
  try {
    const [lead, facts] = await Promise.all([repo.getLeadBasics(job.submissionId), repo.getDialFacts(job.orgId, job.phone)]);
    // Re-check everything immediately before dialling: consent may have been revoked since the job was queued.
    const verdict = checkEligibility({
      now,
      settings,
      masterSwitchOn: env.enabled,
      providerConfigured: providerReady(provider, settings, env),
      phone: job.phone,
      hasActiveConsent: facts.hasActiveConsent,
      isSuppressed: facts.isSuppressed,
      leadStatus: lead?.status ?? null,
      callsStartedToday: startedToday,
      callsInProgress: inProgress, // counted before claiming; the claim already reserved room for this job
      callsToPhoneThisWeek: facts.callsThisWeek,
      attempts: job.attempts,
      maxAttempts: job.maxAttempts,
    });
    // Every update below applies only while the job is still "dispatching": if a person cancelled it meanwhile,
    // or the call's result already arrived, that newer decision stands.
    if (!verdict.ok) {
      if (verdict.kind === "later") {
        await repo.updateJob(job.orgId, job.id, { status: "queued", scheduledAt: verdict.retryAt, lastError: verdict.message }, undefined, "dispatching");
        return "rescheduled";
      }
      await repo.updateJob(job.orgId, job.id, { status: "cancelled", lastError: `${verdict.code}: ${verdict.message}` }, undefined, "dispatching");
      return "cancelled";
    }

    // Requested language if allowed, else the org default; the agent still switches if the person prefers another.
    const language = job.language && settings.enabledLanguages.includes(job.language) ? job.language : settings.defaultLanguage;
    dialled = true;
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
      await repo.updateJob(job.orgId, job.id, { status: "in_progress", attempts: job.attempts + 1, lastError: null }, undefined, "dispatching");
      await logActivity({ id: 0, name: AI_ACTOR }, "call.started", { submissionId: job.submissionId, summary: `AI call started to ${maskPhone(job.phone)}` });
      return "started";
    }
    if (result.ambiguous) {
      // The provider may have accepted it. Never retry automatically; a person checks Sarvam first.
      await repo.updateJob(job.orgId, job.id, { status: "needs_review", attempts: job.attempts + 1, lastError: result.error }, undefined, "dispatching");
      return "needsReview";
    }
    if (result.retryable) {
      const delay = retryDelayMinutes(Math.max(1, job.attempts), Math.min(settings.retryDelayMinutes, 15));
      await repo.updateJob(
        job.orgId,
        job.id,
        { status: "queued", scheduledAt: new Date(now.getTime() + delay * 60_000), lastError: result.error },
        undefined,
        "dispatching"
      );
      return "rescheduled";
    }
    await repo.updateJob(job.orgId, job.id, { status: "failed", lastError: result.error }, undefined, "dispatching");
    return "failed";
  } catch (error) {
    // Unknown state (e.g. DB error after the provider accepted): park it for review rather than risk a double call.
    console.error("CALLING: dispatch failed", { jobId: job.id, error });
    await repo
      .updateJob(
        job.orgId,
        job.id,
        {
          status: "needs_review",
          ...(dialled ? { attempts: job.attempts + 1 } : {}),
          lastError: `Internal error while starting call: ${String(error).slice(0, 200)}`,
        },
        undefined,
        "dispatching"
      )
      .catch(() => null);
    return "needsReview";
  }
}
