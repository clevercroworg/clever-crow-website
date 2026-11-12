import { NextResponse } from "next/server";
import { getSession, type Session } from "./auth";
import type { Role } from "./users";

/** Blocks cross-site requests to admin APIs (on top of the SameSite session cookie). */
export function isSameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin GETs and some browsers omit it
  try {
    return new URL(origin).host === (req.headers.get("x-forwarded-host") || req.headers.get("host"));
  } catch {
    return false;
  }
}

export const noStore = { "Cache-Control": "no-store" };

/**
 * For dashboard APIs: returns the signed-in user, or an error response if the request is
 * cross-site, not signed in, or (with role "admin") from a viewer.
 */
export async function authorizeApi(
  req: Request,
  role?: Role
): Promise<{ session: Session; denied?: never } | { session?: never; denied: NextResponse }> {
  if (!isSameOrigin(req)) return { denied: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  const session = await getSession();
  if (!session) return { denied: NextResponse.json({ error: "Not signed in" }, { status: 401, headers: noStore }) };
  if (role === "admin" && session.role !== "admin") {
    return { denied: NextResponse.json({ error: "Only admins can do this." }, { status: 403, headers: noStore }) };
  }
  return { session };
}
