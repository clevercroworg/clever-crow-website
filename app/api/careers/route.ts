import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { CV_MAX_BYTES, OPEN_ROLES, isAllowedCvName } from "@/app/(site)/careers/careers-data";

// Submissions faster than this are almost certainly automated.
const MIN_FILL_TIME_MS = 3000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function text(form: FormData, key: string, max: number) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isValidUrl(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Spam protection: hidden honeypot field and minimum fill time. Bots get a silent success.
  const fillMs = Number(text(form, "form_ms", 20));
  if (text(form, "company_site", 200) || !Number.isFinite(fillMs) || fillMs < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const role = OPEN_ROLES.find((r) => r.id === text(form, "role_id", 80));
  const name = text(form, "name", 80);
  const email = text(form, "email", 120);
  const phone = text(form, "phone", 30);
  const city = text(form, "city", 80);
  const portfolio = text(form, "portfolio", 300);
  const note = text(form, "note", 1000);
  const cv = form.get("cv");

  const errors: Record<string, string> = {};
  if (!role) errors.role_id = "This role is no longer open.";
  if (name.length < 2) errors.name = "Enter your full name.";
  if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";
  if (!/^\+?\d{10,15}$/.test(phone.replace(/[\s\-().]/g, ""))) errors.phone = "Enter a valid phone number.";
  // CV roles need a CV; creator roles need a portfolio / sample-video link and the CV is optional.
  const cvFile = cv instanceof File && cv.size > 0 ? cv : null;
  if (role?.applyWith === "samples" && !portfolio) errors.portfolio = "Add a link to your portfolio or sample videos.";
  else if (portfolio && !isValidUrl(portfolio)) errors.portfolio = "Enter a valid link.";
  if (role?.applyWith === "cv" && !cvFile) errors.cv = "Attach your CV.";
  else if (cvFile && !isAllowedCvName(cvFile.name)) errors.cv = "Upload your CV as a PDF, DOC or DOCX file.";
  else if (cvFile && cvFile.size > CV_MAX_BYTES) errors.cv = "Your CV must be 4 MB or smaller.";

  if (Object.keys(errors).length > 0 || !role) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error("CAREERS: SMTP credentials are not configured.");
    return NextResponse.json({ ok: false, error: "Applications are temporarily unavailable." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Role", role.title],
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["City", city],
    ["Portfolio / profile", portfolio],
    ["Why they're a fit", note],
    ["CV", cvFile ? cvFile.name : "Not attached"],
  ];

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    // Same inbox as internship applications (/api/internship).
    await transporter.sendMail({
      from: `"Clever Crow Careers" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL || "manojvg900@gmail.com",
      replyTo: email,
      subject: `Careers Application: ${name.replace(/[\r\n]/g, " ")} (${role.title})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:auto;border:1px solid #eee;border-radius:12px;padding:24px;font-size:14px;line-height:1.6;color:#334155;">
          <h2 style="color:#ca8a04;margin-top:0;border-bottom:2px solid #fef9c3;padding-bottom:12px;">New Job Application</h2>
          ${rows
            .filter(([, value]) => value)
            .map(([label, value]) => `<p style="margin:6px 0;"><strong style="color:#0f172a;">${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`)
            .join("")}
          <p style="margin:16px 0 0;font-size:12px;color:#94a3b8;">${cvFile ? "The CV is attached. " : ""}Reply to this email to contact the applicant.</p>
        </div>
      `,
      attachments: cvFile ? [{ filename: cvFile.name, content: Buffer.from(await cvFile.arrayBuffer()) }] : [],
    });
  } catch (error) {
    console.error("CAREERS: email delivery failed", error);
    return NextResponse.json({ ok: false, error: "Could not send application." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
