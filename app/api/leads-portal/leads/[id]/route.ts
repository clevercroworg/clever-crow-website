import { NextResponse } from "next/server";
import { guardAdminApi, noStore } from "@/lib/admin/http";
import { STATUSES, deleteSubmission, updateSubmission } from "@/lib/leads/queries";

type Ctx = { params: Promise<{ id: string }> };

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function PATCH(req: Request, { params }: Ctx) {
  const denied = await guardAdminApi(req);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  let body: { status?: unknown; notes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const changes: { status?: string; notes?: string | null } = {};
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status as (typeof STATUSES)[number])) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    changes.status = body.status as string;
  }
  if (body.notes !== undefined) {
    const notes = String(body.notes ?? "").slice(0, 5000).trim();
    changes.notes = notes || null;
  }

  try {
    const ok = await updateSubmission(id, changes);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: update failed", error);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const denied = await guardAdminApi(req);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  try {
    const ok = await deleteSubmission(id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: delete failed", error);
    return NextResponse.json({ error: "Could not delete." }, { status: 500 });
  }
}
