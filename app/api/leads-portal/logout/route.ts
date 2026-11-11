import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/admin/auth";
import { isSameOrigin, noStore } from "@/lib/admin/http";

export async function POST(req: Request) {
  if (!isSameOrigin(req)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const res = NextResponse.json({ ok: true }, { headers: noStore });
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
