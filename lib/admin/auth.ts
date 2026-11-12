import { createHmac, timingSafeEqual } from "crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/lib/leads/db";
import { getSigningSecret, getUserById, type AdminUser, type Role } from "./users";

// Leads dashboard logins live in the leads database (see users.ts); nothing to set in Vercel.
// Sessions are a signed, httpOnly cookie holding the user id and their session version.
// Disabling a user, changing their role or resetting their password bumps the version,
// which signs them out everywhere straight away.

export const SESSION_COOKIE = "cc_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type Session = Pick<AdminUser, "id" | "username" | "name" | "role">;

async function sign(payload: string) {
  return createHmac("sha256", await getSigningSecret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

export async function createSessionToken(user: Pick<AdminUser, "id" | "session_version">) {
  const payload = Buffer.from(
    JSON.stringify({ uid: user.id, v: user.session_version, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  ).toString("base64url");
  return `${payload}.${await sign(payload)}`;
}

export async function setSessionCookie(res: NextResponse, user: Pick<AdminUser, "id" | "session_version">) {
  res.cookies.set(SESSION_COOKIE, await createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function verifySessionToken(token?: string | null): Promise<Session | null> {
  if (!token || !isDatabaseConfigured()) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  try {
    if (!safeEqual(signature, await sign(payload))) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { uid?: number; v?: number; exp?: number };
    if (typeof data.uid !== "number" || typeof data.exp !== "number" || data.exp <= Date.now()) return null;
    const user = await getUserById(data.uid);
    if (!user || !user.active || user.session_version !== data.v) return null;
    return { id: user.id, username: user.username, name: user.name, role: user.role };
  } catch (error) {
    console.error("ADMIN: session check failed", error);
    return null;
  }
}

/** The signed-in user for this request, or null. Cached per request. */
export const getSession = cache(async () => {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
});

/** For dashboard pages: sends anyone not signed in to the login page, and viewers away from admin-only pages. */
export async function requireSession(role?: Role) {
  const session = await getSession();
  if (!session) redirect("/team/leads-portal/login");
  if (role === "admin" && session.role !== "admin") redirect("/team/leads-portal");
  return session;
}

// --- Login rate limiting (per server instance): 8 failed tries per 15 minutes per IP. ---
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 8;

export function clientIp(req: Request) {
  return (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
}

export function isRateLimited(ip: string) {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILS;
}

export function recordFailedLogin(ip: string) {
  const entry = attempts.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) attempts.set(ip, { count: 1, first: Date.now() });
  else entry.count += 1;
}

export function clearFailedLogins(ip: string) {
  attempts.delete(ip);
}
