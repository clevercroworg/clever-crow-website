// The single rulebook for "may we call this person now?". Pure: the caller gathers the facts, this decides.
// Used when a callback is queued AND again right before dialling (docs/calling/ARCHITECTURE.md → "Eligibility").

import { LIMITS } from "./config";
import { isWithinCallingHours, nextCallingWindowStart } from "./schedule";
import type { CallingSettings } from "./types";

export type EligibilityFacts = {
  now: Date;
  settings: Pick<CallingSettings, "automationEnabled" | "timezone" | "callingStart" | "callingEnd" | "allowedDays" | "maxDailyCalls" | "maxConcurrentCalls">;
  masterSwitchOn: boolean; // CALLING_ENABLED
  providerConfigured: boolean;
  phone: string | null; // normalised E.164, null if invalid
  hasActiveConsent: boolean;
  isSuppressed: boolean; // on the do-not-call list
  leadStatus: string | null; // submissions.status
  callsStartedToday: number;
  callsInProgress: number;
  callsToPhoneThisWeek: number; // AI call attempts to this number in the last 7 days
  attempts: number;
  maxAttempts: number;
};

/** Hard stops: the job must be cancelled. Soft stops: try again later (`retryAt`). */
export type Eligibility =
  | { ok: true }
  | { ok: false; kind: "stop"; code: string; message: string }
  | { ok: false; kind: "later"; code: string; message: string; retryAt: Date };

const CLOSED_LEAD_STATUSES = new Set(["spam", "won", "lost"]);

export function checkEligibility(f: EligibilityFacts): Eligibility {
  const stop = (code: string, message: string): Eligibility => ({ ok: false, kind: "stop", code, message });
  const later = (code: string, message: string, retryAt: Date): Eligibility => ({ ok: false, kind: "later", code, message, retryAt });

  // Permanent reasons first, so a job never waits around for something that can't change.
  if (!f.phone) return stop("INVALID_PHONE", "Not a valid Indian mobile number");
  if (!f.hasActiveConsent) return stop("NO_CONSENT", "No active callback consent for this number");
  if (f.isSuppressed) return stop("DO_NOT_CALL", "Number is on the do-not-call list");
  if (f.leadStatus && CLOSED_LEAD_STATUSES.has(f.leadStatus)) return stop("LEAD_CLOSED", `Lead is marked ${f.leadStatus}`);
  if (f.attempts >= f.maxAttempts) return stop("MAX_ATTEMPTS", `Already tried ${f.attempts} time(s)`);
  if (f.callsToPhoneThisWeek >= LIMITS.callsPerPhonePerWeek) {
    return stop("PHONE_WEEKLY_LIMIT", `Already called this number ${f.callsToPhoneThisWeek} times in the last 7 days`);
  }

  // Temporary reasons: the job waits.
  const retrySoon = new Date(f.now.getTime() + 5 * 60_000);
  if (!f.masterSwitchOn) return later("MASTER_SWITCH_OFF", "Calling is switched off (CALLING_ENABLED)", retrySoon);
  if (!f.settings.automationEnabled) return later("AUTOMATION_OFF", "Automation is turned off in settings", retrySoon);
  if (!f.providerConfigured) return later("PROVIDER_NOT_CONFIGURED", "Voice provider is not fully configured", retrySoon);
  if (!isWithinCallingHours(f.now, f.settings)) {
    return later("OUTSIDE_HOURS", "Outside calling hours", nextCallingWindowStart(f.now, f.settings));
  }
  if (f.callsStartedToday >= f.settings.maxDailyCalls) {
    // Next window after today: look from the end of today's window.
    const tomorrow = new Date(f.now.getTime() + 12 * 3_600_000);
    return later("DAILY_LIMIT", `Daily limit of ${f.settings.maxDailyCalls} calls reached`, nextCallingWindowStart(tomorrow, f.settings));
  }
  if (f.callsInProgress >= f.settings.maxConcurrentCalls) {
    return later("CONCURRENCY_LIMIT", "Too many calls in progress", new Date(f.now.getTime() + 60_000));
  }
  return { ok: true };
}
