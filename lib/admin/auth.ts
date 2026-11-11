import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// One shared admin login, configured with Vercel environment variables:
//   ADMIN_USERNAME, ADMIN_PASSWORD, and optionally ADMIN_SESSION_SECRET.
// Sessions are a signed, httpOnly cookie. Changing the password signs everyone out.

export const SESSION_COOKIE = "cc_admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD);
}

function secret() {
  const base = process.env.ADMIN_SESSION_SECRET || "";
  // Tie sessions to the current password, so changing it invalidates old sessions.
  return createHash("sha256")
    .update(`${base}|${process.env.ADMIN_USERNAME || ""}|${process.env.ADMIN_PASSWORD || ""}|clever-crow-admin`)
    .digest();
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string) {
  // Hash both sides first so the comparison takes the same time whatever the lengths.
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function checkCredentials(username: string, password: string) {
  if (!isAdminConfigured()) return false;
  const userOk = safeEqual(username.trim().toLowerCase(), (process.env.ADMIN_USERNAME || "").trim().toLowerCase());
  const passOk = safeEqual(password, process.env.ADMIN_PASSWORD || "");
  return userOk && passOk;
}

export function createSessionToken() {
  const payload = Buffer.from(
    JSON.stringify({ u: process.env.ADMIN_USERNAME, exp: Date.now() + SESSION_MAX_AGE * 1000 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null) {
  if (!token || !isAdminConfigured()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString()) as { exp?: number };
    return typeof data.exp === "number" && data.exp > Date.now();
  } catch {
    return false;
  }
}

export async function isAdmin() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/** For admin pages: sends anyone not signed in to the login page. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
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
