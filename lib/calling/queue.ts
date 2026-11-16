// Turning a callback request into a durable job. Called from the public form route and from the dashboard.

import { AI_ACTOR, LIMITS } from "./config";
import { consentTextFor } from "./consent-text";
import { normalizeIndianMobile } from "./phone";
import * as repo from "./repository";
import { nextCallingWindowStart } from "./schedule";
import { ACTIVE_JOB_STATUSES } from "./types";

export type QueueOutcome =
  | { queued: true; jobId: number; created: boolean }
  | {
      queued: false;
      reason:
        | "INVALID_PHONE"
        | "INVALID_CONSENT_VERSION"
        | "RATE_LIMITED"
        | "DO_NOT_CALL"
        | "ALREADY_ACTIVE"
        | "RECENTLY_CALLED"
        | "AUTOMATION_OFF"
        | "NO_CONSENT"
        | "LEAD_NOT_FOUND";
    };

/**
 * A website visitor ticked the callback box. Records the consent (the audit record) and, if AI calling is on,
 * queues one job for this submission. The dispatcher re-checks everything before dialling.
 *
 * Anyone can type anyone's number into a public form, so three limits stop it being used to pester people
 * (docs/calling/SECURITY.md → "Abuse limits"): requests per IP address, one job per number at a time, and a
 * cooldown after the AI has called a number.
 */
export async function captureCallbackRequest(input: {
  orgId: number;
  submissionId: number | null;
  rawPhone: unknown;
  consentVersion: unknown;
  source: string;
  pageUrl: string | null;
  ipHash: string | null;
}): Promise<QueueOutcome> {
  const phone = normalizeIndianMobile(typeof input.rawPhone === "string" ? input.rawPhone : null);
  if (!phone) return { queued: false, reason: "INVALID_PHONE" };
  const consentText = consentTextFor(input.consentVersion);
  if (!consentText) return { queued: false, reason: "INVALID_CONSENT_VERSION" };

  // Over the limit: nothing is recorded, so a flood from one address can't grant "consent" for other people's numbers.
  const consentId = await repo.recordConsent(
    {
      orgId: input.orgId,
      submissionId: input.submissionId,
      phone,
      consentText,
      consentVersion: String(input.consentVersion),
      source: input.source.slice(0, 200),
      pageUrl: input.pageUrl?.slice(0, 1000) ?? null,
      ipHash: input.ipHash,
    },
    LIMITS.requestsPerIpPerDay
  );
  if (consentId === null) return { queued: false, reason: "RATE_LIMITED" };

  const settings = await repo.getSettings(input.orgId);
  if (!settings.automationEnabled) return { queued: false, reason: "AUTOMATION_OFF" };
  if (await repo.isSuppressed(input.orgId, phone)) return { queued: false, reason: "DO_NOT_CALL" };
  if (await repo.hasRecentCallActivity(input.orgId, phone, LIMITS.formCooldownHours)) return { queued: false, reason: "RECENTLY_CALLED" };

  const now = new Date();
  const { job, created } = await repo.createJob({
    orgId: input.orgId,
    submissionId: input.submissionId,
    phone,
    maxAttempts: settings.maxAttempts,
    language: null,
    idempotencyKey: input.submissionId ? `form:${input.submissionId}` : `form-phone:${phone}:${now.toISOString().slice(0, 13)}`,
    createdBy: AI_ACTOR,
    // Outside calling hours the job waits for the next window instead of being picked up and put back every run.
    scheduledAt: nextCallingWindowStart(now, settings),
  });
  if (!job) return { queued: false, reason: "ALREADY_ACTIVE" };
  return { queued: true, jobId: job.id, created };
}

/**
 * A team member pressed "Request AI callback" on a lead. Only works if that number has active callback consent.
 * No cooldown here (a person decided), but the weekly cap per number still applies when the call is dialled.
 */
export async function requestManualCallback(orgId: number, submissionId: number, requestedBy: string, language: string | null): Promise<QueueOutcome> {
  const lead = await repo.getLeadBasics(submissionId);
  if (!lead) return { queued: false, reason: "LEAD_NOT_FOUND" };
  const phone = normalizeIndianMobile(lead.phone);
  if (!phone) return { queued: false, reason: "INVALID_PHONE" };
  if (!(await repo.hasActiveConsent(orgId, phone))) return { queued: false, reason: "NO_CONSENT" };
  if (await repo.isSuppressed(orgId, phone)) return { queued: false, reason: "DO_NOT_CALL" };

  const settings = await repo.getSettings(orgId);
  const now = new Date();
  const request = { orgId, submissionId, phone, maxAttempts: settings.maxAttempts, language, createdBy: requestedBy };
  // One manual request per lead per minute, so a double click can't queue two calls.
  let { job, created } = await repo.createJob({ ...request, idempotencyKey: `manual:${submissionId}:${now.toISOString().slice(0, 16)}` });
  // That minute's request has already ended (cancelled, failed…): this is a new request, not a double click.
  if (job && !created && !ACTIVE_JOB_STATUSES.includes(job.status)) {
    ({ job, created } = await repo.createJob({ ...request, idempotencyKey: `manual:${submissionId}:${now.toISOString()}` }));
  }
  if (!job) return { queued: false, reason: "ALREADY_ACTIVE" };
  return { queued: true, jobId: job.id, created };
}
