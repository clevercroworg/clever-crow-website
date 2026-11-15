import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import * as repo from "@/lib/calling/repository";

// Admin actions on a queued / failed / needs-review job.
//   retry:  back to the queue now (allows one more attempt if the limit was reached)
//   cancel: stop it
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400, headers: noStore });
  let action: unknown;
  try {
    action = (await req.json())?.action;
  } catch {
    action = null;
  }
  const job = await repo.getJob(DEFAULT_ORG_ID, id);
  if (!job) return NextResponse.json({ error: "Not found" }, { status: 404, headers: noStore });

  if (action === "cancel") {
    if (!["queued", "needs_review", "failed"].includes(job.status)) {
      return NextResponse.json({ error: "Only waiting or stopped jobs can be cancelled." }, { status: 409, headers: noStore });
    }
    await repo.updateJob(DEFAULT_ORG_ID, id, { status: "cancelled", lastError: `Cancelled by ${session.name}` });
    await logActivity(session, "calling.cancel", { submissionId: job.submissionId, summary: `Cancelled call job #${id}` });
    return NextResponse.json({ ok: true }, { headers: noStore });
  }
  if (action === "retry") {
    if (!["needs_review", "failed", "cancelled"].includes(job.status)) {
      return NextResponse.json({ error: "Only failed, cancelled or needs-review jobs can be retried." }, { status: 409, headers: noStore });
    }
    if (await repo.hasActiveJobForPhone(DEFAULT_ORG_ID, job.phone)) {
      return NextResponse.json({ error: "Another call for this number is already active." }, { status: 409, headers: noStore });
    }
    await repo.updateJob(DEFAULT_ORG_ID, id, {
      status: "queued",
      scheduledAt: new Date(),
      maxAttempts: Math.max(job.maxAttempts, job.attempts + 1),
      lastError: `Retried by ${session.name}`,
    });
    await logActivity(session, "calling.retry", { submissionId: job.submissionId, summary: `Retried call job #${id}` });
    return NextResponse.json({ ok: true }, { headers: noStore });
  }
  return NextResponse.json({ error: "Unknown action" }, { status: 400, headers: noStore });
}
