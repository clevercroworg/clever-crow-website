import { NextResponse } from "next/server";
import { authorizeApi, noStore } from "@/lib/admin/http";
import { PIPELINE_STATUSES, getPipelineColumn } from "@/lib/leads/analytics";

// "Load more" for one Pipeline column.
export async function GET(req: Request) {
  const { denied } = await authorizeApi(req);
  if (denied) return denied;
  const sp = new URL(req.url).searchParams;
  const status = sp.get("status") || "";
  if (!(PIPELINE_STATUSES as readonly string[]).includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400, headers: noStore });
  }
  const offset = Math.max(0, Math.min(100000, Number.parseInt(sp.get("offset") || "0", 10) || 0));
  const assigned = sp.get("assigned") || undefined;
  try {
    const cards = await getPipelineColumn(status, { assigned }, offset);
    return NextResponse.json({ cards }, { headers: noStore });
  } catch (error) {
    console.error("ADMIN: pipeline page failed", error);
    return NextResponse.json({ error: "Could not load." }, { status: 500, headers: noStore });
  }
}
