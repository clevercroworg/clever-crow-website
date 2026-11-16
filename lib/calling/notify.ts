// Email to the team when an AI call needs a person quickly: a hot lead, or someone who asked for a human.
// Goes to the same people who get "new lead" alerts. Runs after the webhook has answered, and never throws.

import nodemailer from "nodemailer";
import { listAlertRecipients } from "@/lib/admin/users";
import { callingEnv } from "./config";
import { getCallDetail } from "./reports";

const OUTCOME_LABELS: Record<string, string> = {
  interested: "Interested",
  wants_more_info: "Wants more information",
  wants_human_callback: "Asked for a call from a person",
  follow_up: "Follow up later",
};

function esc(value: unknown) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ").slice(0, 120);

export async function notifyCallAlert(orgId: number, callId: number) {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;
    const recipients = await listAlertRecipients();
    if (!recipients.length) return;
    const call = await getCallDetail(orgId, callId);
    if (!call) return;

    const base = callingEnv().publicBaseUrl;
    const link = call.submissionId ? `${base}/team/leads-portal/leads/${call.submissionId}` : `${base}/team/leads-portal/calls/${call.id}`;
    const title = call.heat === "hot" ? "Hot lead from an AI call" : "AI call: person asked for a callback";
    const vars = call.variables ?? {};
    const rows: [string, unknown][] = [
      ["Phone", call.phone],
      ["Result", call.outcome ? OUTCOME_LABELS[call.outcome] || call.outcome : null],
      ["Call length", call.durationSeconds ? `${Math.floor(call.durationSeconds / 60)}m ${call.durationSeconds % 60}s` : null],
      ["Best time to call", typeof vars.best_time_to_call === "string" ? vars.best_time_to_call.slice(0, 200) : null],
      ["Language", call.language],
    ];
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;color:#0f172a">
        <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#b45309;font-weight:700">${esc(title)}</p>
        <h2 style="margin:0 0 16px;font-size:20px">${esc(call.leadName || "Unnamed lead")}</h2>
        <table style="border-collapse:collapse;font-size:14px;width:100%">
          ${rows
            .filter(([, v]) => v)
            .map(
              ([k, v]) =>
                `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:6px 0">${esc(v)}</td></tr>`
            )
            .join("")}
        </table>
        ${call.summary ? `<p style="margin:16px 0 0;padding:12px;background:#f8fafc;border-left:3px solid #f59e0b;font-size:14px;white-space:pre-wrap">${esc(call.summary)}</p>` : ""}
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
      subject: oneLine(`${title}: ${call.leadName || "Unnamed lead"}`),
      html,
    });
  } catch (error) {
    console.error("CALLING: call alert email failed", error);
  }
}
