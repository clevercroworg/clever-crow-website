import nodemailer from "nodemailer";
import { getSubmission } from "@/lib/leads/queries";
import { listAlertRecipients } from "./users";

// "New lead" email alerts for team members who turned them on (Team page or Account page).
// Runs after the form has already responded, and never throws.

const TYPE_TITLES: Record<string, string> = {
  lead: "New lead",
  career: "New job application",
  internship: "New internship application",
};

function esc(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** https://host of the request that created the lead, for the "open in dashboard" link. */
export function siteOrigin(req: Request) {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "www.clevercrow.in";
  const proto = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function notifyNewLead(id: number, origin: string) {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
    const recipients = await listAlertRecipients();
    if (!recipients.length) return;
    const lead = await getSubmission(id);
    if (!lead) return;

    const title = TYPE_TITLES[lead.form_type] || "New submission";
    const link = `${origin}/team/leads-portal/leads/${lead.id}`;
    const rows: [string, string | null][] = [
      ["Name", lead.name],
      ["Phone", lead.phone],
      ["Email", lead.email],
      ["Company / website", lead.company],
      ["Service", lead.service],
      ["Budget", lead.budget],
      ["Form", lead.form_name],
      ["Page", lead.page_path],
      ["Source", lead.channel],
      ["Campaign", lead.utm_campaign],
      ["Keyword", lead.utm_term],
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;color:#0f172a">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#b45309;font-weight:700">${esc(title)}</p>
        <h2 style="margin:0 0 16px;font-size:20px">${esc(lead.name || "Unnamed")}</h2>
        <table style="border-collapse:collapse;font-size:14px;width:100%">
          ${rows
            .filter(([, v]) => v)
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`
            )
            .join("")}
        </table>
        ${lead.message ? `<p style="margin:16px 0 0;padding:12px;background:#f8fafc;border-left:3px solid #f59e0b;font-size:14px;white-space:pre-wrap">${esc(lead.message)}</p>` : ""}
        <p style="margin:24px 0 0"><a href="${esc(link)}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600;font-size:14px">Open in the leads dashboard</a></p>
        <p style="margin:16px 0 0;font-size:12px;color:#94a3b8">You get this because email alerts are on for your dashboard login. Turn them off under Account in the dashboard.</p>
      </div>`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Clever Crow Leads" <${process.env.SMTP_USER}>`,
      bcc: recipients.join(","),
      subject: `${title}: ${lead.name || "Unnamed"}${lead.channel ? ` (${lead.channel})` : ""}`,
      html,
    });
  } catch (error) {
    console.error("ADMIN: new-lead alert failed", error);
  }
}
