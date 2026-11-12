import { after } from "next/server";
import { notifyNewLead, siteOrigin } from "@/lib/admin/notify";
import { ensureSchema, getPool, isDatabaseConfigured } from "./db";
import { classifyChannel, parseUserAgent } from "./attribution";

export type FormType = "lead" | "career" | "internship";

export type SubmissionInput = {
  form_type: FormType;
  form_name?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  timeline?: unknown;
  message?: unknown;
  page_url?: unknown;
  landing_url?: unknown;
  referrer?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_term?: unknown;
  utm_content?: unknown;
  gclid?: unknown;
  fbclid?: unknown;
  extra?: Record<string, unknown>;
};

const EMPTY = new Set(["", "not provided", "none", "not selected", "null", "undefined", "n/a", "direct / none"]);

/** Trims, caps length, and turns placeholder values like "Not provided" into null. */
function clean(value: unknown, max = 500): string | null {
  if (value === null || value === undefined) return null;
  const s = String(value).trim();
  if (EMPTY.has(s.toLowerCase())) return null;
  return s.slice(0, max);
}

function pathOf(url: string | null) {
  if (!url) return null;
  try {
    return new URL(url).pathname || "/";
  } catch {
    return url.startsWith("/") ? url.split("?")[0] : null;
  }
}

function header(req: Request, name: string) {
  const v = req.headers.get(name);
  if (!v) return null;
  try {
    return decodeURIComponent(v).slice(0, 120);
  } catch {
    return v.slice(0, 120);
  }
}

function cleanExtra(extra?: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(extra || {})) {
    const v = clean(value, 2000);
    if (v) out[key.slice(0, 60)] = v;
  }
  return out;
}

/**
 * Saves a form submission. Never throws: a database problem must not stop the form
 * from working or the email from being sent. Returns the new id, or null if skipped.
 */
export async function saveSubmission(req: Request, input: SubmissionInput): Promise<number | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const referer = req.headers.get("referer");
    const pageUrl = clean(input.page_url, 1000) || clean(referer, 1000);
    const referrer = clean(input.referrer, 1000);
    const utm = {
      utm_source: clean(input.utm_source, 200),
      utm_medium: clean(input.utm_medium, 200),
      utm_campaign: clean(input.utm_campaign, 300),
      utm_term: clean(input.utm_term, 300),
      utm_content: clean(input.utm_content, 300),
    };
    const gclid = clean(input.gclid, 300);
    const fbclid = clean(input.fbclid, 300);
    const ua = (req.headers.get("user-agent") || "").slice(0, 400);
    const { device, browser, os } = parseUserAgent(ua);
    const channel = classifyChannel({ ...utm, gclid, fbclid, referrer });

    await ensureSchema();
    const result = await getPool().query<{ id: string }>(
      `INSERT INTO submissions (
        form_type, form_name, name, email, phone, company, service, budget, timeline, message,
        page_url, page_path, landing_url, referrer,
        utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid, channel,
        country, region, city, device, browser, os, user_agent, extra
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
        $11,$12,$13,$14,
        $15,$16,$17,$18,$19,$20,$21,$22,
        $23,$24,$25,$26,$27,$28,$29,$30
      ) RETURNING id`,
      [
        input.form_type,
        clean(input.form_name, 200),
        clean(input.name, 200),
        clean(input.email, 200),
        clean(input.phone, 60),
        clean(input.company, 300),
        clean(input.service, 300),
        clean(input.budget, 200),
        clean(input.timeline, 200),
        clean(input.message, 5000),
        pageUrl,
        pathOf(pageUrl),
        clean(input.landing_url, 1000),
        referrer,
        utm.utm_source,
        utm.utm_medium,
        utm.utm_campaign,
        utm.utm_term,
        utm.utm_content,
        gclid,
        fbclid,
        channel,
        header(req, "x-vercel-ip-country"),
        header(req, "x-vercel-ip-country-region"),
        header(req, "x-vercel-ip-city"),
        device || null,
        browser || null,
        os || null,
        ua || null,
        JSON.stringify(cleanExtra(input.extra)),
      ]
    );
    const id = Number(result.rows[0]?.id) || null;
    // Email alerts to team members who asked for them, after the form has responded.
    if (id) {
      const origin = siteOrigin(req);
      after(() => notifyNewLead(id, origin));
    }
    return id;
  } catch (error) {
    console.error("LEADS DB: could not save submission", error);
    return null;
  }
}
