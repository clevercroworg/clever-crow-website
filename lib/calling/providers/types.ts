// Provider-neutral contract. Core code (dispatcher, results) only knows this interface; Sarvam specifics stay in sarvam.ts.

import type { CallStatus } from "../types";

export type AgentConfig = {
  sarvamOrgId: string;
  sarvamWorkspaceId: string;
  sarvamAppId: string;
  sarvamAppVersion: number | null;
  sarvamConnectionId: string;
  sarvamAgentPhone: string;
};

export type OutboundCallRequest = {
  phone: string; // E.164
  agent: AgentConfig;
  language: string | null; // e.g. "Kannada"; null = agent default
  variables: Record<string, string>; // agent variables, e.g. lead_name
  webhookUrl: string;
  webhookMetadata: Record<string, string | number>;
};

/**
 * ok: the provider accepted the call.
 * retryable: definitely NOT accepted (e.g. 429) – safe to try again later.
 * ambiguous: the provider may have accepted it (timeout, 5xx, network drop) – never auto-retry; needs review.
 * Otherwise: rejected for a reason that won't fix itself (bad config/number) – fail the job.
 */
export type OutboundCallResult =
  | { ok: true; providerAttemptId: string }
  | { ok: false; retryable: boolean; ambiguous: boolean; error: string; httpStatus?: number };

export type TranscriptTurn = { role: "agent" | "user"; text: string };

export type NormalizedCallResult = {
  providerAttemptId: string;
  status: Exclude<CallStatus, "initiated">;
  durationSeconds: number | null;
  interactionId: string | null;
  failureReason: string | null;
  variables: Record<string, unknown> | null;
  transcript: TranscriptTurn[] | null;
  metadata: Record<string, unknown> | null;
  providerChannel: string | null;
};

export interface VoiceProvider {
  readonly name: "sarvam" | "mock";
  /** Missing settings that block calls (shown on the health panel). */
  configProblems(agent: AgentConfig): string[];
  startOutboundCall(req: OutboundCallRequest): Promise<OutboundCallResult>;
  /** Validates and normalises a webhook body. Returns null for anything that isn't a valid result. */
  parseResultWebhook(body: unknown): NormalizedCallResult | null;
}
