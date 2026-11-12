import { NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/admin/auth";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/admin/password";
import { getPasswordHash, updateUser } from "@/lib/admin/users";

// Any signed-in user changes their own password. Signs out their other devices, keeps this one signed in.
export async function POST(req: Request) {
  const { session, denied } = await authorizeApi(req);
  if (denied) return denied;

  let current = "";
  let next = "";
  try {
    const body = await req.json();
    current = String(body?.current || "").slice(0, 200);
    next = String(body?.next || "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }

  const problem = passwordProblem(next);
  if (problem) return NextResponse.json({ error: problem }, { status: 400, headers: noStore });

  try {
    const hash = await getPasswordHash(session.id);
    if (!hash || !(await verifyPassword(current, hash))) {
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json({ error: "Your current password isn't right." }, { status: 400, headers: noStore });
    }
    const user = await updateUser(session.id, { passwordHash: await hashPassword(next) });
    if (!user) return NextResponse.json({ error: "Could not save." }, { status: 500, headers: noStore });
    const res = NextResponse.json({ ok: true }, { headers: noStore });
    await setSessionCookie(res, user);
    return res;
  } catch (error) {
    console.error("ADMIN: change password failed", error);
    return NextResponse.json({ error: "Could not save." }, { status: 500, headers: noStore });
  }
}
