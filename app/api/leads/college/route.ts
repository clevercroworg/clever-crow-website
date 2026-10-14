import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  EMPTY_COLLEGE_ENQUIRY,
  normalisePhone,
  validateCollegeEnquiry,
  type CollegeEnquiry,
} from "@/lib/college-enquiry";

// Submissions faster than this are almost certainly automated.
const MIN_FILL_TIME_MS = 2500;

const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "referrer",
  "landed_url",
] as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function asText(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam protection: hidden honeypot field and minimum fill time. Bots get a silent success.
  const formMs = Number(body.form_ms);
  if (asText(body.hp_field) || !Number.isFinite(formMs) || formMs < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const enquiry: CollegeEnquiry = {
    ...EMPTY_COLLEGE_ENQUIRY,
    institution: asText(body.institution),
    city: asText(body.city),
    name: asText(body.name),
    role: asText(body.role),
    phone: asText(body.phone, 30),
    email: asText(body.email),
    website: asText(body.website),
    courses: asText(body.courses),
    intake: asText(body.intake),
    budget: asText(body.budget),
    consent: body.consent === true,
  };

  const errors = validateCollegeEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("COLLEGE LEAD: SMTP credentials are not configured.");
    return NextResponse.json({ ok: false, error: "Enquiry service unavailable." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["College / Institution", enquiry.institution],
    ["City", enquiry.city],
    ["Name", enquiry.name],
    ["Role", enquiry.role],
    ["Phone / WhatsApp", normalisePhone(enquiry.phone)],
    ["Work Email", enquiry.email],
    ["College Website", enquiry.website],
    ["Courses to Promote", enquiry.courses],
    ["Next Admission Intake", enquiry.intake],
    ["Monthly Ad Budget", enquiry.budget],
    ["Consent to Contact", "Yes"],
  ];
  const attribution = ATTRIBUTION_FIELDS.map(
    (field) => [field, asText(body[field], 1000)] as [string, string]
  ).filter(([, value]) => value);

  const renderRows = (items: [string, string][]) =>
    items
      .filter(([, value]) => value)
      .map(
        ([label, value]) =>
          `<p style="margin:6px 0;"><strong style="color:#0f172a;">${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`
      )
      .join("");

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // Same destination as the other landing-page lead forms (/api/leads).
    const recipients = [process.env.TO_EMAIL || "manojvg900@gmail.com", "krishna@clevercrow.in"].join(",");

    await transporter.sendMail({
      from: `"clever crow" <${process.env.SMTP_USER}>`,
      to: recipients,
      subject: `New College Marketing Enquiry: ${enquiry.institution.replace(/[\r\n]/g, " ")}`,
      html: `
        <div style="font-family:sans-serif;padding:24px;border:1px solid #e2e8f0;border-radius:16px;max-width:600px;background:#f8fafc;color:#334155;font-size:14px;line-height:1.6;">
          <h2 style="color:#d97706;margin-top:0;font-size:20px;border-bottom:2px solid #f59e0b;padding-bottom:10px;">New College Marketing Enquiry</h2>
          ${renderRows(rows)}
          <p style="margin:16px 0 6px;padding-top:10px;border-top:1px solid #e2e8f0;"><strong style="color:#0f172a;">Campaign attribution</strong></p>
          ${attribution.length ? renderRows(attribution) : "<p style=\"margin:6px 0;\">Direct / none recorded</p>"}
          <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;text-transform:uppercase;">Lead source: College Marketing Landing Page</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("COLLEGE LEAD: email delivery failed", error);
    return NextResponse.json({ ok: false, error: "Could not deliver enquiry." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
