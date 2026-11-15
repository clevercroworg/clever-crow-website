import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import { maskPhone, normalizeIndianMobile } from "@/lib/calling/phone";
import * as repo from "@/lib/calling/repository";
import { ensureCallingSchema } from "@/lib/calling/schema";

// Do-not-call list. Admins only.
export async function GET(req: Request) {
  const { denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  return NextResponse.json({ items: await repo.listSuppressions(DEFAULT_ORG_ID) }, { headers: noStore });
}

export async function POST(req: Request) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  let body: { phone?: unknown; reason?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }
  const phone = normalizeIndianMobile(typeof body.phone === "string" ? body.phone : null);
  if (!phone) return NextResponse.json({ error: "Enter a valid Indian mobile number." }, { status: 400, headers: noStore });
  const reason = typeof body.reason === "string" && body.reason.trim() ? body.reason.trim() : "Added manually";
  await ensureCallingSchema();
  await repo.addSuppression(DEFAULT_ORG_ID, phone, reason, "manual", session.name);
  await repo.revokeConsent(DEFAULT_ORG_ID, phone, "Added to do-not-call list");
  await logActivity(session, "calling.dnc_add", { summary: `${maskPhone(phone)}: ${reason}` });
  return NextResponse.json({ ok: true }, { headers: noStore });
}
