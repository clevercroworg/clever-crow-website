import { NextResponse } from "next/server";
import { isAdmin } from "./auth";

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

/** Returns an error response if the request isn't from a signed-in admin, otherwise null. */
export async function guardAdminApi(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  return null;
}

export const noStore = { "Cache-Control": "no-store" };
