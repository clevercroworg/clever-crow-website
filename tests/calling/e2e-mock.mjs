// End-to-end test of the AI callback flow against a running production build, with the MOCK provider
// (no real calls). How to run: docs/calling/TESTING.md.
//
//   BASE=http://localhost:3100 DB=postgresql://... WEBHOOK_SECRET=... CRON_SECRET=... node tests/calling/e2e-mock.mjs

import { createHmac, randomBytes, scryptSync } from "node:crypto";
import pg from "pg";

const BASE = process.env.BASE || "http://localhost:3100";
const SECRET = process.env.WEBHOOK_SECRET;
const CRON = process.env.CRON_SECRET;
const db = new pg.Client({ connectionString: process.env.DB });

let pass = 0;
let fail = 0;
const ok = (cond, msg) => {
  if (cond) pass++;
  else fail++;
  console.log(cond ? "  ok  " : "  FAIL", msg);
};
const hmac = (m) => createHmac("sha256", SECRET).update(m).digest("base64url");
const token = hmac("sarvam-webhook-v1");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function req(path, { method = "GET", body, cookie, headers = {} } = {}) {
  const res = await fetch(BASE + path, {
    method,
    redirect: "manual",
    headers: { Origin: BASE, ...(body ? { "Content-Type": "application/json" } : {}), ...(cookie ? { Cookie: cookie } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = {};
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, json, text, res };
}

async function waitFor(fn, ms = 6000) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const v = await fn();
    if (v) return v;
    await sleep(250);
  }
  return null;
}

async function submitLead(name, phone, consent = true) {
  return req("/api/leads", {
    method: "POST",
    body: { name, phone, source: "E2E test form", landed_url: `${BASE}/lp/website`, ...(consent ? { callback_consent: true, callback_consent_version: "callback-v1" } : {}) },
  });
}

const webhook = (job, attemptId, status, extra = {}) => ({
  attempt_id: attemptId,
  status,
  duration: status === "connected" ? 75 : null,
  interaction_id: status === "connected" ? "20261116/abc" : null,
  failure_reason: status === "failed" ? "exotel: invalid number" : null,
  final_agent_variables: status === "connected" ? { call_outcome: "interested", call_summary: "Wants a 5-page website", detected_language: "Kannada", budget: "20k" } : null,
  webhook_config: { url: "x", metadata: { job_id: job.id, org_id: 1, sig: hmac(`job:1:${job.id}`) } },
  interaction_transcript: status === "connected" ? [{ role: "agent", en_text: "Hello, this is Clever Crow's AI assistant." }, { role: "user", en_text: "Yes, I need a website." }] : null,
  channel_info: { channel_type: "v2v", channel_provider: "exotel" },
  ...extra,
});

(async () => {
  await db.connect();
  // The app creates its tables on first use.
  await req("/team/leads-portal/login");
  await waitFor(async () => (await db.query("SELECT to_regclass('admin_users') AS t")).rows[0].t);

  const salt = randomBytes(16);
  const hash = `scrypt$16384$8$1$${salt.toString("base64url")}$${scryptSync("testpass123", salt, 32, { N: 16384, r: 8, p: 1 }).toString("base64url")}`;
  await db.query("INSERT INTO admin_users (username, name, password_hash, role) VALUES ('admin','Admin',$1,'admin'),('viewer','Viewer',$1,'viewer') ON CONFLICT DO NOTHING", [hash]);
  const login = async (u) => ((await req("/api/leads-portal/login", { method: "POST", body: { username: u, password: "testpass123" } })).res.headers.get("set-cookie") || "").split(";")[0];
  const admin = await login("admin");
  const viewer = await login("viewer");

  console.log("Settings");
  let r = await req("/api/leads-portal/calling/settings", { cookie: viewer });
  ok(r.status === 403, "viewer can't read settings");
  r = await req("/api/leads-portal/calling/settings", { method: "PUT", cookie: admin, body: { maxDailyCalls: 0 } });
  ok(r.status === 400, "invalid settings rejected");
  r = await req("/api/leads-portal/calling/settings", {
    method: "PUT",
    cookie: admin,
    body: { automationEnabled: true, callingStart: "00:00", callingEnd: "23:59", allowedDays: [0, 1, 2, 3, 4, 5, 6], maxDailyCalls: 50, maxConcurrentCalls: 5, maxAttempts: 2, retryDelayMinutes: 15 },
  });
  ok(r.status === 200 && r.json.settings.automationEnabled === true, "admin turns automation on (all-day window for the test)");

  console.log("Consent and queueing");
  r = await submitLead("No Consent", "9845000001", false);
  const noConsentLead = (await db.query("SELECT id FROM submissions WHERE name = 'No Consent'")).rows[0];
  ok(r.status === 200 && noConsentLead, "form without the callback box still saves the lead");
  ok((await db.query("SELECT count(*) FROM call_jobs")).rows[0].count === "0", "no job without consent");
  r = await submitLead("Bad Version", "9845000002", false);
  r = await req("/api/leads", { method: "POST", body: { name: "Forged Consent", phone: "9845000003", callback_consent: true, callback_consent_version: "made-up", source: "x" } });
  ok((await db.query("SELECT count(*) FROM call_consents WHERE phone = '+919845000003'")).rows[0].count === "0", "unknown consent version is not recorded");

  r = await submitLead("Asha Kumar", "98450 12345");
  ok(r.status === 200, "lead with callback consent accepted");
  const consent = await waitFor(async () => (await db.query("SELECT * FROM call_consents WHERE phone = '+919845012345'")).rows[0]);
  ok(consent && consent.consent_text.includes("AI assistant") && consent.consent_version === "callback-v1", "consent stored with canonical server-side text");
  const started = await waitFor(async () => (await db.query("SELECT * FROM call_jobs WHERE phone = '+919845012345' AND status = 'in_progress'")).rows[0]);
  ok(started, "job created and dispatched right after the form (mock call started)");
  const call = (await db.query("SELECT * FROM calls WHERE job_id = $1", [started.id])).rows[0];
  ok(call && call.provider === "mock" && call.provider_attempt_id.startsWith("mock_") && call.status === "initiated", "call row stored with provider attempt id");

  r = await submitLead("Asha Again", "9845012345");
  await sleep(800);
  ok((await db.query("SELECT count(*) FROM call_jobs WHERE phone = '+919845012345'")).rows[0].count === "1", "second form from the same number while a call is active: no second job");

  console.log("Webhook security");
  r = await req("/api/calling/webhooks/sarvam/wrong-token", { method: "POST", body: webhook(started, call.provider_attempt_id, "connected") });
  ok(r.status === 404, "wrong webhook token: 404");
  const forged = webhook(started, call.provider_attempt_id, "connected");
  forged.webhook_config.metadata.sig = "forged";
  r = await req(`/api/calling/webhooks/sarvam/${token}`, { method: "POST", body: forged });
  ok(r.status === 401, "bad job signature: 401");
  r = await req(`/api/calling/webhooks/sarvam/${token}`, { method: "POST", body: { attempt_id: "x", status: "weird" } });
  ok(r.status === 400, "malformed payload: 400");

  console.log("Connected result");
  r = await req(`/api/calling/webhooks/sarvam/${token}`, { method: "POST", body: webhook(started, call.provider_attempt_id, "connected") });
  ok(r.status === 200 && r.json.ok && !r.json.duplicate, "valid webhook accepted");
  const done = (await db.query("SELECT * FROM calls WHERE id = $1", [call.id])).rows[0];
  ok(done.status === "connected" && done.duration_seconds === 75 && done.outcome === "interested" && done.summary === "Wants a 5-page website" && done.language === "Kannada", "call updated: status, duration, outcome, summary, language");
  ok((await db.query("SELECT jsonb_array_length(segments) AS n FROM call_transcripts WHERE call_id = $1", [call.id])).rows[0]?.n === 2, "transcript stored separately");
  ok(done.heat === "hot" && done.heat_score === 60 && done.follow_up_required === true, "heat: interested + 75s + budget = 60 → Hot, flagged for follow-up");
  const usage = (await db.query("SELECT * FROM call_usage WHERE call_id = $1", [call.id])).rows[0];
  ok(usage && usage.billable_minutes === 2 && Number(usage.agent_cost) === 7 && Number(usage.telephony_cost) === 0.6, "usage: 75s = 2 min (₹7.00) + 3 pulses (₹0.60)");
  ok((await db.query("SELECT status FROM call_jobs WHERE id = $1", [started.id])).rows[0].status === "completed", "job completed");
  ok((await db.query("SELECT status, updated_by FROM submissions WHERE name = 'Asha Kumar'")).rows[0].status === "contacted", "lead moved New → Contacted");
  r = await req(`/api/calling/webhooks/sarvam/${token}`, { method: "POST", body: webhook(started, call.provider_attempt_id, "connected") });
  ok(r.status === 200 && r.json.duplicate === true, "duplicate webhook ignored");
  ok((await db.query("SELECT count(*) FROM call_usage WHERE call_id = $1", [call.id])).rows[0].count === "1", "no double usage on duplicate");

  console.log("No answer → retry → final failure");
  await submitLead("Ravi No Answer", "9845022222");
  const job2 = await waitFor(async () => (await db.query("SELECT * FROM call_jobs WHERE phone = '+919845022222' AND status = 'in_progress'")).rows[0]);
  const call2 = (await db.query("SELECT * FROM calls WHERE job_id = $1", [job2.id])).rows[0];
  await req(`/api/calling/webhooks/sarvam/${token}`, { method: "POST", body: webhook(job2, call2.provider_attempt_id, "no_answer") });
  let j2 = (await db.query("SELECT * FROM call_jobs WHERE id = $1", [job2.id])).rows[0];
  ok(j2.status === "queued" && new Date(j2.scheduled_at) > new Date(Date.now() + 10 * 60_000), "no answer: re-queued about 15 min later");
  await db.query("UPDATE call_jobs SET scheduled_at = now() WHERE id = $1", [job2.id]);
  r = await req("/api/calling/dispatch");
  ok(r.status === 401, "cron route without secret: 401");
  r = await req("/api/calling/dispatch", { headers: { Authorization: `Bearer ${CRON}` } });
  ok(r.status === 200 && r.json.summary.started === 1, "cron run places the retry");
  const call2b = (await db.query("SELECT * FROM calls WHERE job_id = $1 ORDER BY id DESC LIMIT 1", [job2.id])).rows[0];
  await req(`/api/calling/webhooks/sarvam/${token}`, { method: "POST", body: webhook(job2, call2b.provider_attempt_id, "busy") });
  j2 = (await db.query("SELECT * FROM call_jobs WHERE id = $1", [job2.id])).rows[0];
  ok(j2.status === "failed" && j2.attempts === 2, "after max attempts (2): failed");

  console.log("Opt-out");
  await submitLead("Opt Out", "9845033333");
  const job3 = await waitFor(async () => (await db.query("SELECT * FROM call_jobs WHERE phone = '+919845033333' AND status = 'in_progress'")).rows[0]);
  const call3 = (await db.query("SELECT * FROM calls WHERE job_id = $1", [job3.id])).rows[0];
  const optOut = webhook(job3, call3.provider_attempt_id, "connected");
  optOut.final_agent_variables = { call_outcome: "do_not_call", call_summary: "Asked not to be called" };
  await req(`/api/calling/webhooks/sarvam/${token}`, { method: "POST", body: optOut });
  ok((await db.query("SELECT count(*) FROM call_suppressions WHERE phone = '+919845033333'")).rows[0].count === "1", "opt-out adds the number to do-not-call");
  ok((await db.query("SELECT heat FROM calls WHERE id = $1", [call3.id])).rows[0].heat === "cold", "opt-out call is Cold");
  ok((await db.query("SELECT count(*) FROM call_consents WHERE phone = '+919845033333' AND status = 'granted'")).rows[0].count === "0", "opt-out revokes consent");
  await submitLead("Opt Out Again", "9845033333");
  await sleep(800);
  ok((await db.query("SELECT count(*) FROM call_jobs WHERE phone = '+919845033333'")).rows[0].count === "1", "new form from an opted-out number: no new call job");

  console.log("Ambiguous provider error");
  await submitLead("Timeout Case", "9840000000");
  const job4 = await waitFor(async () => (await db.query("SELECT * FROM call_jobs WHERE phone = '+919840000000' AND status = 'needs_review'")).rows[0]);
  ok(job4 && job4.last_error.includes("timeout"), "possible double call (timeout) goes to Needs review, not auto-retry");

  console.log("Manual callback and admin actions");
  const noConsentId = noConsentLead.id;
  r = await req(`/api/leads-portal/calling/leads/${noConsentId}/callback`, { method: "POST", cookie: viewer, body: {} });
  ok(r.status === 409 && r.json.error.includes("hasn't agreed"), "manual callback refused without consent");
  r = await req(`/api/leads-portal/calling/jobs/${job4.id}`, { method: "POST", cookie: viewer, body: { action: "cancel" } });
  ok(r.status === 403, "viewer can't cancel jobs");
  r = await req(`/api/leads-portal/calling/jobs/${job4.id}`, { method: "POST", cookie: admin, body: { action: "cancel" } });
  ok(r.status === 200 && (await db.query("SELECT status FROM call_jobs WHERE id = $1", [job4.id])).rows[0].status === "cancelled", "admin cancels a needs-review job");
  r = await req("/api/leads-portal/calling/suppressions", { method: "POST", cookie: admin, body: { phone: "98450 44444", reason: "Requested by phone" } });
  ok(r.status === 200, "admin adds a number to do-not-call");
  await submitLead("DNC Person", "9845044444");
  await sleep(800);
  ok((await db.query("SELECT count(*) FROM call_jobs WHERE phone = '+919845044444'")).rows[0].count === "0", "do-not-call number is never queued");

  console.log("Limits and switches");
  await req("/api/leads-portal/calling/settings", { method: "PUT", cookie: admin, body: { automationEnabled: false } });
  await submitLead("Automation Off", "9845055555");
  await sleep(800);
  ok((await db.query("SELECT count(*) FROM call_jobs WHERE phone = '+919845055555'")).rows[0].count === "0", "automation off: consent recorded, no job");
  ok((await db.query("SELECT count(*) FROM call_consents WHERE phone = '+919845055555'")).rows[0].count === "1", "…but the consent is still recorded");

  console.log("Dashboard pages");
  for (const [path, who, expect] of [
    ["/team/leads-portal/calls", viewer, 200],
    ["/team/leads-portal/calls?tab=queue", viewer, 200],
    [`/team/leads-portal/calls/${call.id}`, viewer, 200],
    ["/team/leads-portal/calls/settings", admin, 200],
  ]) {
    r = await req(path, { cookie: who });
    ok(r.status === expect, `${path} → ${expect}`);
  }
  // Admin-only page for a viewer: redirected (as a 307, or a streamed redirect), and no settings data in the response.
  r = await req("/team/leads-portal/calls/settings", { cookie: viewer });
  ok((r.status === 307 || r.text.includes("NEXT_REDIRECT;replace;/team/leads-portal;")) && !r.text.includes("Sarvam connection"), "viewer is redirected away from settings, nothing leaked");
  r = await req(`/team/leads-portal/calls/${call.id}`, { cookie: admin });
  ok(r.text.includes("Wants a 5-page website") && r.text.includes("I need a website"), "call page shows summary and transcript");
  ok(r.text.includes("Why this lead is") && r.text.includes("+40 outcome: interested"), "call page explains the heat score");
  r = await req("/team/leads-portal/calls?heat=hot", { cookie: admin });
  ok(r.status === 200 && r.text.includes("Asha Kumar") && !r.text.includes("Opt Out<"), "Hot filter lists only hot calls");
  const ashaId = (await db.query("SELECT id FROM submissions WHERE name = 'Asha Kumar'")).rows[0].id;
  r = await req(`/team/leads-portal/leads/${ashaId}`, { cookie: admin });
  ok(r.text.includes("AI callback") && r.text.includes("Agreed to a callback"), "lead page shows the AI callback panel");

  await db.end();
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
