import { NextResponse } from "next/server";
import { logActivity } from "@/lib/admin/activity";
import { authorizeApi } from "@/lib/admin/http";
import { parseFilters } from "@/lib/admin/filters";
import { exportSubmissions } from "@/lib/leads/queries";

const COLUMNS: [string, string][] = [
  ["id", "ID"],
  ["created_at", "Submitted (IST)"],
  ["form_type", "Type"],
  ["form_name", "Form"],
  ["status", "Status"],
  ["name", "Name"],
  ["phone", "Phone"],
  ["email", "Email"],
  ["company", "Company / Website"],
  ["service", "Service / Role"],
  ["budget", "Budget"],
  ["timeline", "Timeline"],
  ["message", "Message"],
  ["channel", "Source channel"],
  ["utm_source", "UTM source"],
  ["utm_medium", "UTM medium"],
  ["utm_campaign", "UTM campaign"],
  ["utm_term", "UTM term / keyword"],
  ["utm_content", "UTM content"],
  ["referrer", "Referrer"],
  ["page_url", "Submitted on page"],
  ["landing_url", "Landing page"],
  ["city", "City"],
  ["region", "Region"],
  ["country", "Country"],
  ["device", "Device"],
  ["browser", "Browser"],
  ["os", "OS"],
  ["notes", "Notes"],
  ["assigned_name", "Assigned to"],
  ["follow_up_at", "Follow-up (IST)"],
  ["updated_by", "Last updated by"],
];

function cell(value: unknown) {
  let s = value === null || value === undefined ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`; // stop spreadsheet formula injection
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function ist(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour12: false });
}

export async function GET(req: Request) {
  const { session, denied } = await authorizeApi(req, "admin");
  if (denied) return denied;
  const { filters } = parseFilters(new URL(req.url).searchParams);
  try {
    const rows = await exportSubmissions(filters);
    const extraKeys = Array.from(new Set(rows.flatMap((r) => Object.keys(r.extra || {})))).sort();
    const header = [...COLUMNS.map(([, label]) => label), ...extraKeys].map(cell).join(",");
    const lines = rows.map((r) =>
      [
        ...COLUMNS.map(([key]) => {
          const v = (r as unknown as Record<string, unknown>)[key];
          return cell((key === "created_at" || key === "follow_up_at") && v ? ist(String(v)) : v);
        }),
        ...extraKeys.map((k) => cell(r.extra?.[k])),
      ].join(",")
    );
    await logActivity(session, "leads.export", { summary: `${rows.length} rows` });
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse("﻿" + [header, ...lines].join("\r\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="clever-crow-leads-${date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("ADMIN: export failed", error);
    return NextResponse.json({ error: "Export failed." }, { status: 500 });
  }
}
