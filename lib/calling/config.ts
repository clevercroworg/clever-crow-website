// Server-side configuration for the AI callback system. Secrets come only from environment variables
// (Vercel → Settings → Environment Variables); see docs/calling/SETUP.md. Never import this from client code.

/** The first and, for now, only organisation: Clever Crow Strategies. Every calling table is scoped by org. */
export const DEFAULT_ORG_ID = 1;

/** Name used in the dashboard and activity log for changes made by the AI system. */
export const AI_ACTOR = "AI assistant";

/**
 * Safety limits that are deliberately NOT dashboard settings, so a wrong click can't remove them
 * (docs/calling/SECURITY.md → "Abuse limits").
 */
export const LIMITS = {
  /** A website form can't trigger another AI call to a number the AI already called within this many hours. */
  formCooldownHours: 24,
  /** Callback requests accepted from one IP address in 24 hours. */
  requestsPerIpPerDay: 5,
  /** AI call attempts to one number in any 7 days, whoever asked for them. */
  callsPerPhonePerWeek: 5,
  /** A job still waiting this long after it was requested is dropped: the request has gone stale. */
  jobMaxAgeHours: 72,
  /** Callback consent counts for this many days, then the person has to ask again. */
  consentValidDays: 30,
  /** Raw webhook payloads (they contain transcripts and phone numbers) are deleted after this many days. */
  eventRetentionDays: 30,
  /** Calling hours can never be set outside this window (local time). */
  earliestStart: "09:00",
  latestEnd: "21:00",
} as const;

export type ProviderName = "sarvam" | "mock";

export type CallingEnv = {
  /** Master kill switch. Calls are only placed when this is "true" AND automation is on in the dashboard. */
  enabled: boolean;
  provider: ProviderName;
  /** CALLING_PROVIDER=mock on the live site: refused, and calling stays off until it is removed. */
  mockBlocked: boolean;
  sarvamApiKey: string;
  /** Random secret: authenticates webhook URLs and signs job metadata (see lib/calling/security.ts). */
  webhookSecret: string;
  /** Vercel sends "Authorization: Bearer <CRON_SECRET>" to cron routes. */
  cronSecret: string;
  /** Public site address Sarvam posts results back to. */
  publicBaseUrl: string;
};

export function callingEnv(): CallingEnv {
  const wantsMock = process.env.CALLING_PROVIDER === "mock";
  // The mock provider invents call results. On the live site that would be fake call records, so it is refused
  // there; and because the setting shows someone meant to test, no real calls are placed either.
  const mockBlocked = wantsMock && process.env.VERCEL_ENV === "production";
  return {
    enabled: process.env.CALLING_ENABLED === "true" && !mockBlocked,
    provider: wantsMock && !mockBlocked ? "mock" : "sarvam",
    mockBlocked,
    sarvamApiKey: process.env.SARVAM_API_KEY || "",
    webhookSecret: process.env.CALLING_WEBHOOK_SECRET || "",
    cronSecret: process.env.CRON_SECRET || "",
    publicBaseUrl: (process.env.CALLING_PUBLIC_BASE_URL || "https://www.clevercrow.in").replace(/\/+$/, ""),
  };
}

/** Problems that stop calls from being placed at all, for the health panel. */
export function envProblems(env: CallingEnv = callingEnv()): string[] {
  const problems: string[] = [];
  if (env.mockBlocked) problems.push("CALLING_PROVIDER=mock is not allowed on the live site; remove it to place real calls");
  else if (!env.enabled) problems.push("CALLING_ENABLED is not \"true\" (master switch off)");
  if (env.provider === "sarvam" && !env.sarvamApiKey) problems.push("SARVAM_API_KEY is not set");
  if (env.webhookSecret.length < 32) problems.push("CALLING_WEBHOOK_SECRET is missing or shorter than 32 characters");
  if (!env.cronSecret) problems.push("CRON_SECRET is not set (needed for the scheduled dispatcher)");
  return problems;
}
