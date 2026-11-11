import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  clearFailedLogins,
  clientIp,
  createSessionToken,
  isAdminConfigured,
  isRateLimited,
  recordFailedLogin,
} from "@/lib/admin/auth";
import { isSameOrigin, noStore } from "@/lib/admin/http";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin login isn't set up yet. Add ADMIN_USERNAME and ADMIN_PASSWORD in Vercel." },
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
    username = String(body?.username || "").slice(0, 200);
    password = String(body?.password || "").slice(0, 200);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }

  if (!checkCredentials(username, password)) {
    recordFailedLogin(ip);
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401, headers: noStore });
  }

  clearFailedLogins(ip);
  const res = NextResponse.json({ ok: true }, { headers: noStore });
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
