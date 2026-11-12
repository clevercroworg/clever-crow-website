import { NextResponse } from "next/server";
import { clearFailedLogins, clientIp, isRateLimited, recordFailedLogin, setSessionCookie } from "@/lib/admin/auth";
import { isSameOrigin, noStore } from "@/lib/admin/http";
import { verifyDummyPassword, verifyPassword } from "@/lib/admin/password";
import { getUserForLogin, normalizeUsername, recordLogin } from "@/lib/admin/users";
import { isDatabaseConfigured } from "@/lib/leads/db";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "The leads database isn't connected, so logins aren't available yet." },
      { status: 503, headers: noStore }
    );
  }

  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many failed attempts. Try again in 15 minutes." },
      { status: 429, headers: noStore }
    );
  }

  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = normalizeUsername(body?.username).slice(0, 200);
    password = String(body?.password || "").slice(0, 200);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }

  try {
    const found = username ? await getUserForLogin(username) : null;
    const ok = found ? await verifyPassword(password, found.passwordHash) : await verifyDummyPassword(password);

    if (!found || !ok) {
      recordFailedLogin(ip);
      await new Promise((r) => setTimeout(r, 600)); // slow down guessing
      return NextResponse.json({ error: "Wrong username or password." }, { status: 401, headers: noStore });
    }
    if (!found.user.active) {
      return NextResponse.json(
        { error: "This login has been turned off. Ask an admin to turn it back on." },
        { status: 403, headers: noStore }
      );
    }

    clearFailedLogins(ip);
    await recordLogin(found.user.id);
    const res = NextResponse.json({ ok: true }, { headers: noStore });
    await setSessionCookie(res, found.user);
    return res;
  } catch (error) {
    console.error("ADMIN: login failed", error);
    return NextResponse.json({ error: "Can't reach the database right now. Try again." }, { status: 500, headers: noStore });
  }
}
