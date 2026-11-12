import { NextResponse } from "next/server";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { hashPassword, passwordProblem } from "@/lib/admin/password";
import { USERNAME_RE, createUser, isRole, normalizeUsername } from "@/lib/admin/users";

// Admins add dashboard logins.
export async function POST(req: Request) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }
  const name = String(body.name || "").trim().slice(0, 80);
  const username = normalizeUsername(body.username);
  const password = String(body.password || "");
  const role = body.role;

  if (!name) return NextResponse.json({ error: "Enter a name." }, { status: 400, headers: noStore });
  if (!USERNAME_RE.test(username)) {
    return NextResponse.json(
      { error: "Username: 3–40 characters, letters, numbers, dot, dash or underscore." },
      { status: 400, headers: noStore }
    );
  }
  if (!isRole(role)) return NextResponse.json({ error: "Pick a role." }, { status: 400, headers: noStore });
  const problem = passwordProblem(password);
  if (problem) return NextResponse.json({ error: problem }, { status: 400, headers: noStore });

  try {
    const user = await createUser({
      username,
      name,
      passwordHash: await hashPassword(password),
      role,
      createdBy: session.name,
    });
    if (!user) return NextResponse.json({ error: "That username is already taken." }, { status: 409, headers: noStore });
    return NextResponse.json({ ok: true, user }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: create user failed", error);
    return NextResponse.json({ error: "Could not add the user." }, { status: 500, headers: noStore });
  }
}
