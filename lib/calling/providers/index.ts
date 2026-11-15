import { callingEnv, type CallingEnv } from "../config";
import { MockProvider } from "./mock";
import { SarvamProvider } from "./sarvam";
import type { VoiceProvider } from "./types";

let mockSingleton: MockProvider | null = null;

/** The configured voice provider. CALLING_PROVIDER=mock is for tests and development only. */
export function getVoiceProvider(env: CallingEnv = callingEnv()): VoiceProvider {
  if (env.provider === "mock") return (mockSingleton ??= new MockProvider());
  return new SarvamProvider(env.sarvamApiKey);
}

export type { VoiceProvider } from "./types";
