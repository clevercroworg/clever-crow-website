// Sarvam Voice Agents adapter. Every endpoint and field here is taken from Sarvam's official docs
// (links in docs/calling/SARVAM_INTEGRATION.md). Nothing is guessed; open questions are listed in that doc.
//
// Start call:  POST https://apps.sarvam.ai/api/outbounds/v1/orgs/{org_id}/workspaces/{workspace_id}/outbounds
//              header X-API-Key; body { app_config, user_config, webhook_config }; 200 → { attempt_id }
// Result:      POST to webhook_config.url after each attempt: { attempt_id, status, duration, interaction_id,
//              failure_reason, final_agent_variables, webhook_config: { url, metadata }, interaction_transcript[] }

import type { AgentConfig, NormalizedCallResult, OutboundCallRequest, OutboundCallResult, TranscriptTurn, VoiceProvider } from "./types";

const BASE_URL = "https://apps.sarvam.ai/api/outbounds";
const TIMEOUT_MS = 15_000;
const STATUSES = new Set(["connected", "no_answer", "busy", "failed"]);
const LANGUAGES = new Set([
  "Bengali", "Gujarati", "Kannada", "Malayalam", "Tamil", "Telugu", "Punjabi", "Sanskrit", "Odia", "Marathi", "Hindi", "English", "Assamese",
]);

const str = (v: unknown) => (typeof v === "string" ? v : null);
const obj = (v: unknown) => (v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null);

export class SarvamProvider implements VoiceProvider {
  readonly name = "sarvam" as const;
  constructor(private readonly apiKey: string, private readonly fetchImpl: typeof fetch = fetch) {}

  configProblems(agent: AgentConfig) {
    const missing: string[] = [];
    if (!this.apiKey) missing.push("SARVAM_API_KEY");
    if (!agent.sarvamOrgId) missing.push("Sarvam org ID");
    if (!agent.sarvamWorkspaceId) missing.push("Sarvam workspace ID");
    if (!agent.sarvamAppId) missing.push("Sarvam agent (app) ID");
    if (!agent.sarvamAppVersion) missing.push("Sarvam agent version");
    if (!agent.sarvamConnectionId) missing.push("Sarvam telephony connection ID");
    if (!agent.sarvamAgentPhone) missing.push("Agent phone number");
    return missing;
  }

  async startOutboundCall(req: OutboundCallRequest): Promise<OutboundCallResult> {
    const a = req.agent;
    const url = `${BASE_URL}/v1/orgs/${encodeURIComponent(a.sarvamOrgId)}/workspaces/${encodeURIComponent(a.sarvamWorkspaceId)}/outbounds`;
    const appOverrides = req.language && LANGUAGES.has(req.language) ? { initial_language_name: req.language } : undefined;
    const body = {
      app_config: {
        app_id: a.sarvamAppId,
        app_version: a.sarvamAppVersion,
        connection_config: { connection_id: a.sarvamConnectionId, agent_phone_number: a.sarvamAgentPhone },
        agent_variables: req.variables,
        ...(appOverrides ? { app_overrides: appOverrides } : {}),
      },
      user_config: { user_phone_number: req.phone },
      webhook_config: { url: req.webhookUrl, metadata: req.webhookMetadata },
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let res: Response;
    try {
      res = await this.fetchImpl(url, {
        method: "POST",
        headers: { "X-API-Key": this.apiKey, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
    } catch (err) {
      // Timeout or connection drop: the request may have reached Sarvam. Never auto-retry.
      const reason = err instanceof Error && err.name === "AbortError" ? "timed out" : "network error";
      return { ok: false, retryable: false, ambiguous: true, error: `Sarvam request ${reason}` };
    } finally {
      clearTimeout(timer);
    }

    const text = await res.text().catch(() => "");
    if (res.ok) {
      let attemptId: string | null = null;
      try {
        attemptId = str(JSON.parse(text)?.attempt_id);
      } catch {
        attemptId = null;
      }
      return attemptId
        ? { ok: true, providerAttemptId: attemptId }
        : { ok: false, retryable: false, ambiguous: true, error: "Sarvam accepted the request but returned no attempt_id", httpStatus: res.status };
    }
    const detail = text.slice(0, 300);
    if (res.status === 429) return { ok: false, retryable: true, ambiguous: false, error: "Sarvam rate limit (429)", httpStatus: 429 };
    if (res.status >= 500) {
      return { ok: false, retryable: false, ambiguous: true, error: `Sarvam server error ${res.status}`, httpStatus: res.status };
    }
    // 400/401/403/422: configuration or input problem; retrying won't help.
    return { ok: false, retryable: false, ambiguous: false, error: `Sarvam rejected the call (${res.status}): ${detail}`, httpStatus: res.status };
  }

  parseResultWebhook(body: unknown): NormalizedCallResult | null {
    const b = obj(body);
    if (!b) return null;
    const attemptId = str(b.attempt_id);
    const status = str(b.status);
    if (!attemptId || attemptId.length > 200 || !status || !STATUSES.has(status)) return null;

    const transcriptRaw = Array.isArray(b.interaction_transcript) ? b.interaction_transcript : null;
    const transcript: TranscriptTurn[] | null = transcriptRaw
      ? transcriptRaw
          .map((t) => obj(t))
          .filter((t): t is Record<string, unknown> => Boolean(t))
          .map((t) => ({ role: t.role === "agent" ? ("agent" as const) : ("user" as const), text: String(t.en_text ?? "").slice(0, 4000) }))
          .slice(0, 500)
      : null;
    const duration = typeof b.duration === "number" && Number.isFinite(b.duration) && b.duration >= 0 ? b.duration : null;

    return {
      providerAttemptId: attemptId,
      status: status as NormalizedCallResult["status"],
      durationSeconds: duration,
      interactionId: str(b.interaction_id),
      failureReason: str(b.failure_reason)?.slice(0, 500) ?? null,
      variables: obj(b.final_agent_variables),
      transcript,
      metadata: obj(obj(b.webhook_config)?.metadata),
      providerChannel: str(obj(b.channel_info)?.channel_provider),
    };
  }
}
