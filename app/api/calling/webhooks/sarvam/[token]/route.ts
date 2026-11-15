import { NextResponse } from "next/server";
import { callingEnv } from "@/lib/calling/config";
import { getVoiceProvider } from "@/lib/calling/providers";
import { applyCallResult } from "@/lib/calling/results";
import { verifyWebhookPathToken } from "@/lib/calling/security";

// Sarvam posts the result of every call attempt here (webhook_config.url set per call by the dispatcher).
// Authenticated by the secret path token + the signed job metadata (lib/calling/security.ts).
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 1_000_000;
const noStore = { "Cache-Control": "no-store" };

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const env = callingEnv();
  const { token } = await params;
  // Unknown token: answer like a missing page, revealing nothing.
  if (!verifyWebhookPathToken(env.webhookSecret, token)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const length = Number(req.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: "Payload too large" }, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const provider = getVoiceProvider(env);
  const parsed = provider.parseResultWebhook(body);
  if (!parsed) return NextResponse.json({ error: "Unrecognised payload" }, { status: 400 });

  try {
    const result = await applyCallResult(provider.name, parsed, body, { env });
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.httpStatus, headers: noStore });
    return NextResponse.json({ ok: true, duplicate: Boolean(result.duplicate) }, { headers: noStore });
  } catch (error) {
    console.error("CALLING: webhook processing failed", error);
    // 500 lets the provider's own retry (or a manual re-send from Sarvam) deliver it again later.
    return NextResponse.json({ error: "Processing failed" }, { status: 500, headers: noStore });
  }
}
