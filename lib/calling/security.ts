// Webhook authentication. Sarvam documents no webhook signature (docs/calling/SARVAM_INTEGRATION.md), so two
// independent checks protect /api/calling/webhooks/sarvam/[token]:
//   1. The URL contains a token derived from CALLING_WEBHOOK_SECRET. Only Sarvam (who receives it per call) and we know it.
//   2. Every call carries metadata { job_id, org_id, sig } where sig = HMAC(secret, "job:<org>:<job>"). Sarvam echoes the
//      metadata back, so a webhook can only update the job it was created for.
// A forged request would need both secret-derived values. On top of that, lib/calling/results.ts refuses a result
// whose attempt ID belongs to a different job, and never lets a late or repeated result reopen a finished job.

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

/**
 * The visitor's IP address as a keyed hash, for the "requests per IP" limit. The address itself is never stored.
 * On Vercel the first x-forwarded-for entry is set by the platform and can't be spoofed by the visitor.
 */
export function hashClientIp(secret: string, headers: Headers) {
  const ip = (headers.get("x-forwarded-for") || "").split(",")[0].trim() || (headers.get("x-real-ip") || "").trim();
  if (!ip || !secret) return null;
  return hmac(secret, `ip:${ip.slice(0, 64)}`).slice(0, 32);
}

/** Bearer check for the cron route ("Authorization: Bearer <CRON_SECRET>"). */
export function verifyBearer(header: string | null, secret: string) {
  if (!secret || !header?.startsWith("Bearer ")) return false;
  return safeEqual(header.slice(7), secret);
}
