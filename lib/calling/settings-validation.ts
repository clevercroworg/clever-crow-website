// Validates settings sent from the dashboard. Only known fields, within safe bounds, are accepted.

import type { CallingSettings } from "./types";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const LANGUAGES = ["English", "Kannada", "Hindi", "Tamil", "Telugu", "Malayalam", "Marathi", "Bengali", "Gujarati", "Punjabi", "Odia"];
// Sarvam IDs are opaque; allow the characters IDs and phone numbers use.
const ID = /^[A-Za-z0-9_\-:.]{0,120}$/;
const AGENT_PHONE = /^\+?\d{8,15}$/;

export type SettingsInput = Partial<Omit<CallingSettings, "orgId" | "updatedAt" | "updatedBy">>;

function int(v: unknown, min: number, max: number) {
  const n = Number(v);
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
}

export function validateSettings(body: Record<string, unknown>): { ok: true; value: SettingsInput } | { ok: false; error: string } {
  const out: SettingsInput = {};
  const bad = (error: string) => ({ ok: false as const, error });

  if ("automationEnabled" in body) out.automationEnabled = body.automationEnabled === true;
  if ("timezone" in body) {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: String(body.timezone) });
      out.timezone = String(body.timezone);
    } catch {
      return bad("Unknown time zone");
    }
  }
  for (const key of ["callingStart", "callingEnd"] as const) {
    if (key in body) {
      if (!TIME.test(String(body[key]))) return bad("Times must be HH:MM (24-hour)");
      out[key] = String(body[key]);
    }
  }
  if (out.callingStart && out.callingEnd && out.callingStart >= out.callingEnd) return bad("Calling hours must end after they start");
  if ("allowedDays" in body) {
    const days = Array.isArray(body.allowedDays) ? [...new Set(body.allowedDays.map(Number))] : [];
    if (!days.length || days.some((d) => !Number.isInteger(d) || d < 0 || d > 6)) return bad("Pick at least one calling day");
    out.allowedDays = days.sort();
  }
  const ints: [keyof SettingsInput, number, number, string][] = [
    ["maxDailyCalls", 1, 1000, "Daily limit must be 1–1000"],
    ["maxConcurrentCalls", 1, 20, "Calls at once must be 1–20"],
    ["maxAttempts", 1, 5, "Attempts must be 1–5"],
    ["retryDelayMinutes", 15, 1440, "Retry delay must be 15–1440 minutes"],
  ];
  for (const [key, min, max, msg] of ints) {
    if (key in body) {
      const n = int(body[key], min, max);
      if (n === null) return bad(msg);
      (out as Record<string, unknown>)[key] = n;
    }
  }
  if ("enabledLanguages" in body) {
    const langs = Array.isArray(body.enabledLanguages) ? [...new Set(body.enabledLanguages.map(String))] : [];
    if (!langs.length || langs.some((l) => !LANGUAGES.includes(l))) return bad("Pick supported languages");
    out.enabledLanguages = langs;
  }
  if ("defaultLanguage" in body) {
    if (!LANGUAGES.includes(String(body.defaultLanguage))) return bad("Unsupported default language");
    out.defaultLanguage = String(body.defaultLanguage);
  }
  for (const key of ["sarvamOrgId", "sarvamWorkspaceId", "sarvamAppId", "sarvamConnectionId"] as const) {
    if (key in body) {
      const v = String(body[key] ?? "").trim();
      if (!ID.test(v)) return bad(`${key} contains invalid characters`);
      out[key] = v;
    }
  }
  if ("sarvamAppVersion" in body) {
    if (body.sarvamAppVersion === null || body.sarvamAppVersion === "") out.sarvamAppVersion = null;
    else {
      const n = int(body.sarvamAppVersion, 1, 100000);
      if (n === null) return bad("Agent version must be a whole number");
      out.sarvamAppVersion = n;
    }
  }
  if ("sarvamAgentPhone" in body) {
    const v = String(body.sarvamAgentPhone ?? "").replace(/[\s-]/g, "");
    if (v && !AGENT_PHONE.test(v)) return bad("Agent phone number looks wrong");
    out.sarvamAgentPhone = v;
  }
  for (const key of ["rateAgentPerMinute", "rateTelephonyPer30s"] as const) {
    if (key in body) {
      const n = Number(body[key]);
      if (!Number.isFinite(n) || n < 0 || n > 1000) return bad("Rates must be between 0 and 1000");
      out[key] = Math.round(n * 100) / 100;
    }
  }
  if ("pricingVersion" in body) {
    const v = String(body.pricingVersion ?? "").trim();
    if (!/^[\w.\-]{1,60}$/.test(v)) return bad("Pricing version must be a short label");
    out.pricingVersion = v;
  }
  return { ok: true, value: out };
}

export const SUPPORTED_LANGUAGES = LANGUAGES;
