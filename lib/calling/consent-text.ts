// Canonical consent wording. Safe to import in client components (no server code here).
// The browser only sends the version; the server stores the matching text, so the record can't be altered.
// Changing wording = add a NEW version and keep the old ones (past consents refer to them).

export const CALLBACK_CONSENT_TEXTS = {
  "callback-v1":
    "Yes, call me back about this enquiry. I understand the first call may be from Clever Crow's AI assistant, and I can ask it to stop calling at any time.",
  // v2 adds the recording line: we store a transcript and summary of each call, so the person is told up front.
  "callback-v2":
    "Yes, call me back about this enquiry. I understand the first call may be from Clever Crow's AI assistant, that the call may be recorded and transcribed to handle my enquiry, and that I can ask it to stop calling at any time.",
} as const;

export type CallbackConsentVersion = keyof typeof CALLBACK_CONSENT_TEXTS;

export const CURRENT_CALLBACK_CONSENT_VERSION: CallbackConsentVersion = "callback-v2";

export function consentTextFor(version: unknown): string | null {
  return typeof version === "string" && version in CALLBACK_CONSENT_TEXTS
    ? CALLBACK_CONSENT_TEXTS[version as CallbackConsentVersion]
    : null;
}
