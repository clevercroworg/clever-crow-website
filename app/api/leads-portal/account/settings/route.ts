import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { normalizeEmail, updateUser } from "@/lib/admin/users";

// Any signed-in user sets their own email address and new-lead email alerts.
export async function POST(req: Request) {
  const { session, denied } = await authorizeApi(req);
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }
  const email = normalizeEmail(body.email);
  if (email === undefined) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400, headers: noStore });
  }
  const notify = Boolean(body.notify_new_leads);
  if (notify && !email) {
    return NextResponse.json({ error: "Add your email address to turn on alerts." }, { status: 400, headers: noStore });
  }

  try {
    const user = await updateUser(session.id, { email, notifyNewLeads: notify });
    if (!user) return NextResponse.json({ error: "Could not save." }, { status: 500, headers: noStore });
    await logActivity(session, "account.update", { summary: `${email || "no email"}, alerts ${notify ? "on" : "off"}` });
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: account settings failed", error);
    return NextResponse.json({ error: "Could not save." }, { status: 500, headers: noStore });
  }
}
