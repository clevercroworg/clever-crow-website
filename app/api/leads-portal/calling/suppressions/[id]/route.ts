import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import * as repo from "@/lib/calling/repository";

// Removing a number from do-not-call does NOT restore consent: the person must ask for a callback again.
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) return NextResponse.json({ error: "Invalid id" }, { status: 400, headers: noStore });
  const ok = await repo.removeSuppression(DEFAULT_ORG_ID, id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404, headers: noStore });
  await logActivity(session, "calling.dnc_remove", { summary: `Removed do-not-call entry #${id}` });
  return NextResponse.json({ ok: true }, { headers: noStore });
}
