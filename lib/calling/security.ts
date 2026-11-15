// Webhook authentication. Sarvam documents no webhook signature (docs/calling/SARVAM_INTEGRATION.md), so two
// independent checks protect /api/calling/webhooks/sarvam/[token]:
//   1. The URL contains a token derived from CALLING_WEBHOOK_SECRET. Only Sarvam (who receives it per call) and we know it.
//   2. Every call carries metadata { job_id, org_id, sig } where sig = HMAC(secret, "job:<org>:<job>"). Sarvam echoes the
//      metadata back, so a webhook can only update the job it was created for.
// A forged request would need both secrets-derived values. Results are also only accepted for attempt IDs we started.

import { createHmac, timingSafeEqual } from "node:crypto";

function hmac(secret: string, message: string) {
  return createHmac("sha256", secret).update(message).digest("base64url");
}

export function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

/** Path token for the webhook URL. Changes if the secret is rotated. */
export function webhookPathToken(secret: string) {
  return hmac(secret, "sarvam-webhook-v1");
}

export function verifyWebhookPathToken(secret: string, token: string) {
  return secret.length >= 32 && safeEqual(webhookPathToken(secret), token);
}

export function signJob(secret: string, orgId: number, jobId: number) {
  return hmac(secret, `job:${orgId}:${jobId}`);
}

export function verifyJobSignature(secret: string, orgId: number, jobId: number, sig: unknown) {
  return typeof sig === "string" && secret.length >= 32 && safeEqual(signJob(secret, orgId, jobId), sig);
}

/** Bearer check for the cron route ("Authorization: Bearer <CRON_SECRET>"). */
export function verifyBearer(header: string | null, secret: string) {
  if (!secret || !header?.startsWith("Bearer ")) return false;
  return safeEqual(header.slice(7), secret);
}
