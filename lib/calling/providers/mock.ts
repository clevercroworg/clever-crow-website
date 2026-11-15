// Mock provider for tests and local development (CALLING_PROVIDER=mock). It never places a real call.
// It accepts calls and parses webhooks in the same shape as Sarvam, so the whole flow can be exercised safely.

import { randomUUID } from "node:crypto";
import { SarvamProvider } from "./sarvam";
import type { OutboundCallRequest, OutboundCallResult, VoiceProvider } from "./types";

export class MockProvider implements VoiceProvider {
  readonly name = "mock" as const;
  readonly sent: OutboundCallRequest[] = [];
  private readonly parser = new SarvamProvider("mock");

  configProblems() {
    return [];
  }

  async startOutboundCall(req: OutboundCallRequest): Promise<OutboundCallResult> {
    this.sent.push(req);
    if (req.phone.endsWith("0000000")) return { ok: false, retryable: false, ambiguous: true, error: "Mock: simulated timeout" };
    if (req.phone.endsWith("1111111")) return { ok: false, retryable: true, ambiguous: false, error: "Mock: simulated 429" };
    return { ok: true, providerAttemptId: `mock_${randomUUID()}` };
  }

  parseResultWebhook(body: unknown) {
    return this.parser.parseResultWebhook(body);
  }
}
