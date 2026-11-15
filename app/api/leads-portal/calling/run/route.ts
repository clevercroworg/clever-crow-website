import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import { runDispatcher } from "@/lib/calling/dispatcher";

// "Run now" button on the settings page: one dispatcher pass, same rules as the cron. Admins only.
export const maxDuration = 60;

export async function POST(req: Request) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  const summary = await runDispatcher(DEFAULT_ORG_ID);
  await logActivity(session, "calling.run", { summary: summary.reason ?? `Started ${summary.started} call(s)` });
  return NextResponse.json({ ok: true, summary }, { headers: noStore });
}
