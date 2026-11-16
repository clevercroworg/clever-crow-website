// Shared types for the AI callback system. See docs/calling/DATA_MODEL.md for the tables behind them.

export const JOB_STATUSES = ["queued", "dispatching", "in_progress", "completed", "failed", "cancelled", "needs_review"] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

/** Jobs counted as "active": at most one per phone number at a time. */
export const ACTIVE_JOB_STATUSES: JobStatus[] = ["queued", "dispatching", "in_progress"];

export const CALL_STATUSES = ["initiated", "connected", "no_answer", "busy", "failed"] as const;
export type CallStatus = (typeof CALL_STATUSES)[number];

/** Outcomes the agent reports in its `call_outcome` variable (docs/calling/VOICE_AGENT.md). */
export const CALL_OUTCOMES = [
  "interested",
  "not_interested",
  "wants_more_info",
  "wants_human_callback",
  "wrong_number",
  "do_not_call",
  "follow_up",
] as const;
export type CallOutcome = (typeof CALL_OUTCOMES)[number];

export const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6] as const; // 0 = Sunday

export type CallingSettings = {
  orgId: number;
  automationEnabled: boolean;
  timezone: string; // IANA, e.g. "Asia/Kolkata"
  callingStart: string; // "HH:MM" local
  callingEnd: string; // "HH:MM" local, exclusive
  allowedDays: number[]; // 0 = Sunday … 6 = Saturday
  maxDailyCalls: number;
  maxConcurrentCalls: number;
  maxAttempts: number;
  retryDelayMinutes: number;
  enabledLanguages: string[]; // Sarvam language names: "English", "Kannada", "Hindi"
  defaultLanguage: string;
  sarvamOrgId: string;
  sarvamWorkspaceId: string;
  sarvamAppId: string;
  sarvamAppVersion: number | null;
  sarvamConnectionId: string;
  sarvamAgentPhone: string;
  rateAgentPerMinute: number; // INR, excl. GST
  rateTelephonyPer30s: number; // INR, excl. GST
  pricingVersion: string;
  monthlyBudget: number; // INR, excl. GST; 0 = no cap
  updatedAt: string | null;
  updatedBy: string | null;
};

export type CallJob = {
  id: number;
  orgId: number;
  submissionId: number | null;
  phone: string; // E.164
  status: JobStatus;
  scheduledAt: string;
  attempts: number;
  maxAttempts: number;
  lastError: string | null;
  idempotencyKey: string;
  language: string | null;
  createdAt: string;
  updatedAt: string;
};
