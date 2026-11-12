import { NextResponse } from "next/server";
import { clearFailedLogins, clientIp, isRateLimited, recordFailedLogin, setSessionCookie } from "@/lib/admin/auth";
import { logActivity } from "@/lib/admin/activity";
import { isSameOrigin, noStore } from "@/lib/admin/http";
import { hashPassword, passwordProblem } from "@/lib/admin/password";
import { checkSetupCode } from "@/lib/admin/setup";
import { USERNAME_RE, countUsers, createUser, normalizeUsername, recordLogin } from "@/lib/admin/users";
import { isDatabaseConfigured } from "@/lib/leads/db";

// First-time setup: creates the first admin. Works only while there are no users.
export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "The leads database isn't connected." }, { status: 503, headers: noStore });
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many failed attempts. Try again in 15 minutes." }, { status: 429, headers: noStore });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }
  const code = String(body.code || "").slice(0, 100);
  const name = String(body.name || "").trim().slice(0, 80);
  const username = normalizeUsername(body.username);
  const password = String(body.password || "");

  try {
    if ((await countUsers()) > 0) {
      return NextResponse.json({ error: "Setup is already done. Sign in instead." }, { status: 409, headers: noStore });
    }
    if (!(await checkSetupCode(code))) {
      recordFailedLogin(ip);
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json({ error: "That setup code isn't right." }, { status: 401, headers: noStore });
    }
    if (!name) return NextResponse.json({ error: "Enter your name." }, { status: 400, headers: noStore });
    if (!USERNAME_RE.test(username)) {
      return NextResponse.json(
        { error: "Username: 3–40 characters, letters, numbers, dot, dash or underscore." },
        { status: 400, headers: noStore }
      );
    }
    const problem = passwordProblem(password);
    if (problem) return NextResponse.json({ error: problem }, { status: 400, headers: noStore });

    const user = await createUser({
      username,
      name,
      passwordHash: await hashPassword(password),
      role: "admin",
      createdBy: "first-time setup",
      onlyIfNoUsers: true,
    });
    if (!user) {
      return NextResponse.json({ error: "Setup is already done. Sign in instead." }, { status: 409, headers: noStore });
    }

    clearFailedLogins(ip);
    await recordLogin(user.id);
    await logActivity(user, "setup", { summary: `First admin: ${user.name}` });
    const res = NextResponse.json({ ok: true }, { headers: noStore });
    await setSessionCookie(res, user);
    return res;
  } catch (error) {
    console.error("ADMIN: setup failed", error);
    return NextResponse.json({ error: "Can't reach the database right now. Try again." }, { status: 500, headers: noStore });
  }
}
