// Turning a callback request into a durable job. Called from the public form route and from the dashboard.

import { AI_ACTOR } from "./config";
import { consentTextFor } from "./consent-text";
import { normalizeIndianMobile } from "./phone";
import * as repo from "./repository";

export type QueueOutcome =
  | { queued: true; jobId: number; created: boolean }
  | { queued: false; reason: "INVALID_PHONE" | "INVALID_CONSENT_VERSION" | "DO_NOT_CALL" | "ALREADY_ACTIVE" | "AUTOMATION_OFF" | "NO_CONSENT" | "LEAD_NOT_FOUND" };

/**
 * A website visitor ticked the callback box. Records the consent (always, as the audit record) and, if AI calling
 * is on, queues one job for this submission. The dispatcher re-checks everything before dialling.
 */
export async function captureCallbackRequest(input: {
  orgId: number;
  submissionId: number | null;
  rawPhone: unknown;
  consentVersion: unknown;
  source: string;
  pageUrl: string | null;
}): Promise<QueueOutcome> {
  const phone = normalizeIndianMobile(typeof input.rawPhone === "string" ? input.rawPhone : null);
  if (!phone) return { queued: false, reason: "INVALID_PHONE" };
  const consentText = consentTextFor(input.consentVersion);
  if (!consentText) return { queued: false, reason: "INVALID_CONSENT_VERSION" };

  await repo.recordConsent({
    orgId: input.orgId,
    submissionId: input.submissionId,
    phone,
    consentText,
    consentVersion: String(input.consentVersion),
    source: input.source.slice(0, 200),
    pageUrl: input.pageUrl?.slice(0, 1000) ?? null,
  });

  const settings = await repo.getSettings(input.orgId);
  if (!settings.automationEnabled) return { queued: false, reason: "AUTOMATION_OFF" };
  if (await repo.isSuppressed(input.orgId, phone)) return { queued: false, reason: "DO_NOT_CALL" };
  if (await repo.hasActiveJobForPhone(input.orgId, phone)) return { queued: false, reason: "ALREADY_ACTIVE" };

  const { job, created } = await repo.createJob({
    orgId: input.orgId,
    submissionId: input.submissionId,
    phone,
    maxAttempts: settings.maxAttempts,
    language: null,
    idempotencyKey: input.submissionId ? `form:${input.submissionId}` : `form-phone:${phone}:${new Date().toISOString().slice(0, 13)}`,
    createdBy: AI_ACTOR,
  });
  return { queued: true, jobId: job.id, created };
}

/** A team member pressed "Request AI callback" on a lead. Only works if that number has active callback consent. */
export async function requestManualCallback(orgId: number, submissionId: number, requestedBy: string, language: string | null): Promise<QueueOutcome> {
  const lead = await repo.getLeadBasics(submissionId);
  if (!lead) return { queued: false, reason: "LEAD_NOT_FOUND" };
  const phone = normalizeIndianMobile(lead.phone);
  if (!phone) return { queued: false, reason: "INVALID_PHONE" };
  if (!(await repo.hasActiveConsent(orgId, phone))) return { queued: false, reason: "NO_CONSENT" };
  if (await repo.isSuppressed(orgId, phone)) return { queued: false, reason: "DO_NOT_CALL" };
  if (await repo.hasActiveJobForPhone(orgId, phone)) return { queued: false, reason: "ALREADY_ACTIVE" };

  const settings = await repo.getSettings(orgId);
  const { job, created } = await repo.createJob({
    orgId,
    submissionId,
    phone,
    maxAttempts: settings.maxAttempts,
    language,
    // One manual request per lead per minute, so a double click can't queue two calls.
    idempotencyKey: `manual:${submissionId}:${new Date().toISOString().slice(0, 16)}`,
    createdBy: requestedBy,
  });
  return { queued: true, jobId: job.id, created };
}
