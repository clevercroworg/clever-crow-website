import { NextResponse } from "next/server";
import { DEFAULT_ORG_ID, callingEnv } from "@/lib/calling/config";
import { runDispatcher } from "@/lib/calling/dispatcher";
import { verifyBearer } from "@/lib/calling/security";

// Per-minute dispatcher, called by Vercel Cron (vercel.json, Pro plan) with "Authorization: Bearer <CRON_SECRET>".
// Safe to call repeatedly or concurrently; see lib/calling/dispatcher.ts.
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(req: Request) {
  const env = callingEnv();
  if (!verifyBearer(req.headers.get("authorization"), env.cronSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const summary = await runDispatcher(DEFAULT_ORG_ID, { env });
    return NextResponse.json({ ok: true, summary }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("CALLING: dispatcher run failed", error);
    return NextResponse.json({ ok: false, error: "Dispatcher failed" }, { status: 500 });
  }
}
