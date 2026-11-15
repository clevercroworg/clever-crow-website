import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import * as repo from "@/lib/calling/repository";
import { validateSettings } from "@/lib/calling/settings-validation";

// AI calling settings. Admins only.
export async function GET(req: Request) {
  const { denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  return NextResponse.json({ settings: await repo.getSettings(DEFAULT_ORG_ID) }, { headers: noStore });
}

export async function PUT(req: Request) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }
  const parsed = validateSettings(body);
  if (!parsed.ok) return NextResponse.json({ error: parsed.error }, { status: 400, headers: noStore });

  const current = await repo.getSettings(DEFAULT_ORG_ID);
  const start = parsed.value.callingStart ?? current.callingStart;
  const end = parsed.value.callingEnd ?? current.callingEnd;
  if (start >= end) return NextResponse.json({ error: "Calling hours must end after they start" }, { status: 400, headers: noStore });

  const settings = await repo.updateSettings(DEFAULT_ORG_ID, parsed.value, session.name);
  const changed = Object.keys(parsed.value).join(", ");
  await logActivity(session, "calling.settings", { summary: changed ? `Changed: ${changed}` : "No changes" });
  return NextResponse.json({ ok: true, settings }, { headers: noStore });
}
