import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { listAssignableUsers } from "@/lib/admin/users";
import { STATUSES, deleteSubmission, getSubmission, updateSubmission } from "@/lib/leads/queries";

type Ctx = { params: Promise<{ id: string }> };

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

const STATUS_NAMES: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  won: "Won",
  lost: "Lost",
  spam: "Spam",
};

function istLabel(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

// Admins and viewers can update status, notes, owner and follow-up date; only admins can delete.
export async function PATCH(req: Request, { params }: Ctx) {
  const { session, denied } = await authorizeApi(req);
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  let body: { status?: unknown; notes?: unknown; assigned_to?: unknown; follow_up_at?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const changes: { status?: string; notes?: string | null; assigned_to?: number | null; follow_up_at?: string | null } = {};
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
  if (body.follow_up_at !== undefined) {
    if (body.follow_up_at === null || body.follow_up_at === "") changes.follow_up_at = null;
    else {
      const t = Date.parse(String(body.follow_up_at));
      if (!Number.isFinite(t)) return NextResponse.json({ error: "Invalid follow-up date" }, { status: 400 });
      changes.follow_up_at = new Date(t).toISOString();
    }
  }

  try {
    let assigneeName: string | null = null;
    if (body.assigned_to !== undefined) {
      if (body.assigned_to === null || body.assigned_to === "") changes.assigned_to = null;
      else {
        const users = await listAssignableUsers();
        const user = users.find((u) => u.id === Number(body.assigned_to));
        if (!user) return NextResponse.json({ error: "That team member isn't active." }, { status: 400 });
        changes.assigned_to = user.id;
        assigneeName = user.name;
      }
    }

    const before = await getSubmission(id);
    if (!before) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const ok = await updateSubmission(id, changes, session.name);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (changes.status !== undefined && changes.status !== before.status) {
      await logActivity(session, "lead.status", {
        submissionId: id,
        summary: `${STATUS_NAMES[before.status] || before.status} → ${STATUS_NAMES[changes.status] || changes.status}`,
      });
    }
    if (changes.notes !== undefined && changes.notes !== before.notes) {
      await logActivity(session, "lead.notes", { submissionId: id, summary: changes.notes ? changes.notes.slice(0, 140) : "Cleared notes" });
    }
    if (changes.assigned_to !== undefined && changes.assigned_to !== before.assigned_to) {
      await logActivity(session, "lead.assign", { submissionId: id, summary: assigneeName ? `Assigned to ${assigneeName}` : "Unassigned" });
    }
    if (changes.follow_up_at !== undefined && changes.follow_up_at !== before.follow_up_at) {
      await logActivity(session, "lead.follow_up", {
        submissionId: id,
        summary: changes.follow_up_at ? `Follow up ${istLabel(changes.follow_up_at)}` : "Follow-up cleared",
      });
    }
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: update failed", error);
    return NextResponse.json({ error: "Could not save." }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  try {
    const before = await getSubmission(id);
    const ok = await deleteSubmission(id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    await logActivity(session, "lead.delete", {
      submissionId: id,
      summary: `${before?.name || "Unnamed"}${before?.phone ? ` (${before.phone})` : ""}`,
    });
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: delete failed", error);
    return NextResponse.json({ error: "Could not delete." }, { status: 500 });
  }
}
