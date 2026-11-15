// Server-side configuration for the AI callback system. Secrets come only from environment variables
// (Vercel → Settings → Environment Variables); see docs/calling/SETUP.md. Never import this from client code.

/** The first and, for now, only organisation: Clever Crow Strategies. Every calling table is scoped by org. */
export const DEFAULT_ORG_ID = 1;

/** Name used in the dashboard and activity log for changes made by the AI system. */
export const AI_ACTOR = "AI assistant";

export type ProviderName = "sarvam" | "mock";

export type CallingEnv = {
  /** Master kill switch. Calls are only placed when this is "true" AND automation is on in the dashboard. */
  enabled: boolean;
  provider: ProviderName;
  sarvamApiKey: string;
  /** Random secret: authenticates webhook URLs and signs job metadata (see lib/calling/security.ts). */
  webhookSecret: string;
  /** Vercel sends "Authorization: Bearer <CRON_SECRET>" to cron routes. */
  cronSecret: string;
  /** Public site address Sarvam posts results back to. */
  publicBaseUrl: string;
};

export function callingEnv(): CallingEnv {
  const provider = process.env.CALLING_PROVIDER === "mock" ? "mock" : "sarvam";
  return {
    enabled: process.env.CALLING_ENABLED === "true",
    provider,
    sarvamApiKey: process.env.SARVAM_API_KEY || "",
    webhookSecret: process.env.CALLING_WEBHOOK_SECRET || "",
    cronSecret: process.env.CRON_SECRET || "",
    publicBaseUrl: (process.env.CALLING_PUBLIC_BASE_URL || "https://www.clevercrow.in").replace(/\/+$/, ""),
  };
}

/** Problems that stop calls from being placed at all, for the health panel. */
export function envProblems(env: CallingEnv = callingEnv()): string[] {
  const problems: string[] = [];
  if (!env.enabled) problems.push("CALLING_ENABLED is not \"true\" (master switch off)");
  if (env.provider === "sarvam" && !env.sarvamApiKey) problems.push("SARVAM_API_KEY is not set");
  if (env.webhookSecret.length < 32) problems.push("CALLING_WEBHOOK_SECRET is missing or shorter than 32 characters");
  if (!env.cronSecret) problems.push("CRON_SECRET is not set (needed for the per-minute dispatcher)");
  return problems;
}
