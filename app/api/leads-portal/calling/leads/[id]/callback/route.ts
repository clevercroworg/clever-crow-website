import { after, NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import { runDispatcher } from "@/lib/calling/dispatcher";
import { requestManualCallback } from "@/lib/calling/queue";

const REASONS: Record<string, string> = {
  INVALID_PHONE: "This lead has no valid Indian mobile number.",
  NO_CONSENT: "This lead hasn't agreed to a callback, so the AI can't call them.",
  DO_NOT_CALL: "This number is on the do-not-call list.",
  ALREADY_ACTIVE: "A call for this number is already queued or in progress.",
  LEAD_NOT_FOUND: "Lead not found.",
};

// "Request AI callback" from the lead page. Any signed-in user; consent and do-not-call are enforced.
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, denied } = await authorizeApi(req);
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400, headers: noStore });
  let language: string | null = null;
  try {
    const body = await req.json();
    language = typeof body?.language === "string" ? body.language.slice(0, 30) : null;
  } catch {
    language = null;
  }
  const result = await requestManualCallback(DEFAULT_ORG_ID, id, session.name, language);
  if (!result.queued) return NextResponse.json({ error: REASONS[result.reason] ?? result.reason }, { status: 409, headers: noStore });
  await logActivity(session, "calling.request", { submissionId: id, summary: "Requested an AI callback" });
  after(() => runDispatcher(DEFAULT_ORG_ID).catch((e) => console.error("CALLING: dispatch after manual request failed", e)));
  return NextResponse.json({ ok: true, jobId: result.jobId }, { headers: noStore });
}
