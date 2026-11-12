import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { hashPassword, passwordProblem } from "@/lib/admin/password";
import { countActiveAdmins, deleteUser, getUserById, isRole, normalizeEmail, updateUser, type Role } from "@/lib/admin/users";

type Ctx = { params: Promise<{ id: string }> };

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status, headers: noStore });
}

// Admins change a user's name, role, on/off state or password.
// Admins can't change their own role or turn themselves off, and the last active admin is protected.
export async function PATCH(req: Request, { params }: Ctx) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return bad("Invalid id");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Invalid request.");
  }

  const changes: {
    name?: string;
    role?: Role;
    active?: boolean;
    passwordHash?: string;
    email?: string | null;
    notifyNewLeads?: boolean;
  } = {};
  if (body.name !== undefined) {
    const name = String(body.name || "").trim().slice(0, 80);
    if (!name) return bad("Enter a name.");
    changes.name = name;
  }
  if (body.role !== undefined) {
    if (!isRole(body.role)) return bad("Invalid role.");
    changes.role = body.role;
  }
  if (body.active !== undefined) changes.active = Boolean(body.active);
  if (body.email !== undefined) {
    const email = normalizeEmail(body.email);
    if (email === undefined) return bad("That email address doesn't look right.");
    changes.email = email;
    if (!email) changes.notifyNewLeads = false;
  }
  if (body.notify_new_leads !== undefined && changes.notifyNewLeads === undefined) {
    changes.notifyNewLeads = Boolean(body.notify_new_leads);
  }
  if (body.password !== undefined) {
    const problem = passwordProblem(String(body.password));
    if (problem) return bad(problem);
    changes.passwordHash = await hashPassword(String(body.password));
  }

  try {
    const target = await getUserById(id);
    if (!target) return bad("User not found.", 404);

    const isSelf = target.id === session.id;
    if (isSelf && changes.role !== undefined && changes.role !== target.role) return bad("You can't change your own role.");
    if (isSelf && changes.active === false) return bad("You can't turn off your own login.");

    const losesAdmin =
      target.role === "admin" && target.active && (changes.role === "viewer" || changes.active === false);
    if (losesAdmin && (await countActiveAdmins()) <= 1) return bad("There must always be at least one active admin.");

    if (changes.notifyNewLeads && !(changes.email !== undefined ? changes.email : target.email)) return bad("Add an email address to turn on alerts.");
    const user = await updateUser(id, changes);
    if (!user) return bad("Nothing to change.");
    const what = [
      changes.name !== undefined && changes.name !== target.name ? `name → ${changes.name}` : "",
      changes.role !== undefined && changes.role !== target.role ? `role → ${changes.role}` : "",
      changes.active !== undefined && changes.active !== target.active ? (changes.active ? "turned on" : "turned off") : "",
      changes.passwordHash !== undefined ? "password reset" : "",
      changes.email !== undefined && changes.email !== target.email ? `email → ${changes.email || "none"}` : "",
      changes.notifyNewLeads !== undefined && changes.notifyNewLeads !== target.notify_new_leads
        ? `alerts ${changes.notifyNewLeads ? "on" : "off"}`
        : "",
    ].filter(Boolean);
    if (what.length) await logActivity(session, "user.update", { summary: `${user.name}: ${what.join(", ")}` });
    return NextResponse.json({ ok: true, user }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: update user failed", error);
    return bad("Could not save.", 500);
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  const id = parseId((await params).id);
  if (!id) return bad("Invalid id");
  if (id === session.id) return bad("You can't delete your own login.");

  try {
    const target = await getUserById(id);
    if (!target) return bad("User not found.", 404);
    if (target.role === "admin" && target.active && (await countActiveAdmins()) <= 1) {
      return bad("There must always be at least one active admin.");
    }
    await deleteUser(id);
    await logActivity(session, "user.delete", { summary: `${target.name} (@${target.username})` });
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: delete user failed", error);
    return bad("Could not delete.", 500);
  }
}
