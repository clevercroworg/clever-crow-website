// All SQL for the calling system lives here. Services call these functions; nothing else touches the tables.
// Every query is filtered by org_id.

import type { PoolClient } from "pg";
import { getPool } from "@/lib/leads/db";
import { ensureCallingSchema } from "./schema";
import type { CallJob, CallingSettings, JobStatus } from "./types";

type Db = Pick<PoolClient, "query">;
const db = (client?: Db): Db => client ?? getPool();

const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);

// ---------------------------------------------------------------- settings

function mapSettings(r: Record<string, unknown>): CallingSettings {
  return {
    orgId: Number(r.org_id),
    automationEnabled: Boolean(r.automation_enabled),
    timezone: String(r.timezone),
    callingStart: String(r.calling_start),
    callingEnd: String(r.calling_end),
    allowedDays: (r.allowed_days as number[]).map(Number),
    maxDailyCalls: Number(r.max_daily_calls),
    maxConcurrentCalls: Number(r.max_concurrent_calls),
    maxAttempts: Number(r.max_attempts),
    retryDelayMinutes: Number(r.retry_delay_minutes),
    enabledLanguages: r.enabled_languages as string[],
    defaultLanguage: String(r.default_language),
    sarvamOrgId: String(r.sarvam_org_id),
    sarvamWorkspaceId: String(r.sarvam_workspace_id),
    sarvamAppId: String(r.sarvam_app_id),
    sarvamAppVersion: r.sarvam_app_version === null ? null : Number(r.sarvam_app_version),
    sarvamConnectionId: String(r.sarvam_connection_id),
    sarvamAgentPhone: String(r.sarvam_agent_phone),
    rateAgentPerMinute: Number(r.rate_agent_per_minute),
    rateTelephonyPer30s: Number(r.rate_telephony_per_30s),
    pricingVersion: String(r.pricing_version),
    updatedAt: iso(r.updated_at),
    updatedBy: (r.updated_by as string | null) ?? null,
  };
}

export async function getSettings(orgId: number, client?: Db) {
  await ensureCallingSchema();
  const res = await db(client).query("SELECT * FROM calling_settings WHERE org_id = $1", [orgId]);
  if (!res.rows[0]) throw new Error(`No calling settings for org ${orgId}`);
  return mapSettings(res.rows[0]);
}

const SETTINGS_COLUMNS: Record<string, string> = {
  automationEnabled: "automation_enabled",
  timezone: "timezone",
  callingStart: "calling_start",
  callingEnd: "calling_end",
  allowedDays: "allowed_days",
  maxDailyCalls: "max_daily_calls",
  maxConcurrentCalls: "max_concurrent_calls",
  maxAttempts: "max_attempts",
  retryDelayMinutes: "retry_delay_minutes",
  enabledLanguages: "enabled_languages",
  defaultLanguage: "default_language",
  sarvamOrgId: "sarvam_org_id",
  sarvamWorkspaceId: "sarvam_workspace_id",
  sarvamAppId: "sarvam_app_id",
  sarvamAppVersion: "sarvam_app_version",
  sarvamConnectionId: "sarvam_connection_id",
  sarvamAgentPhone: "sarvam_agent_phone",
  rateAgentPerMinute: "rate_agent_per_minute",
  rateTelephonyPer30s: "rate_telephony_per_30s",
  pricingVersion: "pricing_version",
};

/** `changes` must already be validated (see lib/calling/settings-validation.ts). */
export async function updateSettings(orgId: number, changes: Partial<CallingSettings>, updatedBy: string) {
  await ensureCallingSchema();
  const sets: string[] = [];
  const params: unknown[] = [];
  for (const [key, value] of Object.entries(changes)) {
    const column = SETTINGS_COLUMNS[key];
    if (!column || value === undefined) continue;
    params.push(value);
    sets.push(`${column} = $${params.length}`);
  }
  params.push(updatedBy, orgId);
  await getPool().query(
    `UPDATE calling_settings SET ${[...sets, `updated_by = $${params.length - 1}`, "updated_at = now()"].join(", ")} WHERE org_id = $${params.length}`,
    params
  );
  return getSettings(orgId);
}

// ---------------------------------------------------------------- consent and do-not-call

export async function recordConsent(c: {
  orgId: number;
  submissionId: number | null;
  phone: string;
  consentText: string;
  consentVersion: string;
  source: string;
  pageUrl: string | null;
}) {
  await ensureCallingSchema();
  const res = await getPool().query<{ id: string }>(
    `INSERT INTO call_consents (org_id, submission_id, phone, consent_text, consent_version, source, page_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
    [c.orgId, c.submissionId, c.phone, c.consentText, c.consentVersion, c.source, c.pageUrl]
  );
  return Number(res.rows[0].id);
}

export async function hasActiveConsent(orgId: number, phone: string, client?: Db) {
  const res = await db(client).query(
    `SELECT 1 FROM call_consents WHERE org_id = $1 AND phone = $2 AND purpose = 'callback' AND status = 'granted' LIMIT 1`,
    [orgId, phone]
  );
  return (res.rowCount || 0) > 0;
}

export async function revokeConsent(orgId: number, phone: string, reason: string, client?: Db) {
  await db(client).query(
    `UPDATE call_consents SET status = 'revoked', revoked_at = now(), revoked_reason = $3
     WHERE org_id = $1 AND phone = $2 AND status = 'granted'`,
    [orgId, phone, reason.slice(0, 200)]
  );
}

export async function isSuppressed(orgId: number, phone: string, client?: Db) {
  const res = await db(client).query("SELECT 1 FROM call_suppressions WHERE org_id = $1 AND phone = $2", [orgId, phone]);
  return (res.rowCount || 0) > 0;
}

export async function addSuppression(orgId: number, phone: string, reason: string, source: string, createdBy: string | null, client?: Db) {
  await db(client).query(
    `INSERT INTO call_suppressions (org_id, phone, reason, source, created_by) VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (org_id, phone) DO NOTHING`,
    [orgId, phone, reason.slice(0, 300), source, createdBy]
  );
  // Anything still waiting for this number is cancelled immediately.
  await db(client).query(
    `UPDATE call_jobs SET status = 'cancelled', last_error = 'Number added to do-not-call list', updated_at = now()
     WHERE org_id = $1 AND phone = $2 AND status = 'queued'`,
    [orgId, phone]
  );
}

export async function removeSuppression(orgId: number, id: number) {
  await ensureCallingSchema();
  const res = await getPool().query("DELETE FROM call_suppressions WHERE org_id = $1 AND id = $2", [orgId, id]);
  return (res.rowCount || 0) > 0;
}

export async function listSuppressions(orgId: number) {
  await ensureCallingSchema();
  const res = await getPool().query(
    "SELECT id, phone, reason, source, created_at, created_by FROM call_suppressions WHERE org_id = $1 ORDER BY created_at DESC LIMIT 500",
    [orgId]
  );
  return res.rows.map((r) => ({ ...r, id: Number(r.id), created_at: iso(r.created_at) })) as {
    id: number;
    phone: string;
    reason: string | null;
    source: string;
    created_at: string;
    created_by: string | null;
  }[];
}

// ---------------------------------------------------------------- jobs

function mapJob(r: Record<string, unknown>): CallJob {
  return {
    id: Number(r.id),
    orgId: Number(r.org_id),
    submissionId: r.submission_id === null ? null : Number(r.submission_id),
    phone: String(r.phone),
    status: r.status as JobStatus,
    scheduledAt: iso(r.scheduled_at)!,
    attempts: Number(r.attempts),
    maxAttempts: Number(r.max_attempts),
    lastError: (r.last_error as string | null) ?? null,
    idempotencyKey: String(r.idempotency_key),
    language: (r.language as string | null) ?? null,
    createdAt: iso(r.created_at)!,
    updatedAt: iso(r.updated_at)!,
  };
}

/** Creates a job unless one with the same idempotency key exists. Returns { job, created }. */
export async function createJob(j: {
  orgId: number;
  submissionId: number | null;
  phone: string;
  maxAttempts: number;
  language: string | null;
  idempotencyKey: string;
  createdBy: string | null;
  scheduledAt?: Date;
}) {
  await ensureCallingSchema();
  const pool = getPool();
  const ins = await pool.query(
    `INSERT INTO call_jobs (org_id, submission_id, phone, max_attempts, language, idempotency_key, created_by, scheduled_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, coalesce($8, now()))
     ON CONFLICT (org_id, idempotency_key) DO NOTHING RETURNING *`,
    [j.orgId, j.submissionId, j.phone, j.maxAttempts, j.language, j.idempotencyKey, j.createdBy, j.scheduledAt ?? null]
  );
  if (ins.rows[0]) return { job: mapJob(ins.rows[0]), created: true };
  const existing = await pool.query("SELECT * FROM call_jobs WHERE org_id = $1 AND idempotency_key = $2", [j.orgId, j.idempotencyKey]);
  return { job: mapJob(existing.rows[0]), created: false };
}

export async function getJob(orgId: number, id: number, client?: Db) {
  await ensureCallingSchema();
  const res = await db(client).query("SELECT * FROM call_jobs WHERE org_id = $1 AND id = $2", [orgId, id]);
  return res.rows[0] ? mapJob(res.rows[0]) : null;
}

export async function hasActiveJobForPhone(orgId: number, phone: string, client?: Db) {
  const res = await db(client).query(
    `SELECT 1 FROM call_jobs WHERE org_id = $1 AND phone = $2 AND status IN ('queued','dispatching','in_progress') LIMIT 1`,
    [orgId, phone]
  );
  return (res.rowCount || 0) > 0;
}

/**
 * Atomically claims up to `limit` due jobs (status → dispatching). FOR UPDATE SKIP LOCKED means two dispatcher
 * runs at the same moment (e.g. a duplicated cron call) can never claim the same job.
 */
export async function claimDueJobs(orgId: number, limit: number) {
  if (limit <= 0) return [];
  await ensureCallingSchema();
  const res = await getPool().query(
    `UPDATE call_jobs SET status = 'dispatching', locked_at = now(), updated_at = now()
     WHERE id IN (
       SELECT id FROM call_jobs
       WHERE org_id = $1 AND status = 'queued' AND scheduled_at <= now()
       ORDER BY scheduled_at, id
       LIMIT $2
       FOR UPDATE SKIP LOCKED
     ) RETURNING *`,
    [orgId, limit]
  );
  return res.rows.map(mapJob);
}

export async function updateJob(
  orgId: number,
  id: number,
  changes: { status?: JobStatus; scheduledAt?: Date; attempts?: number; maxAttempts?: number; lastError?: string | null },
  client?: Db
) {
  const sets: string[] = ["updated_at = now()"];
  const params: unknown[] = [];
  const set = (col: string, v: unknown) => {
    params.push(v);
    sets.push(`${col} = $${params.length}`);
  };
  if (changes.status !== undefined) {
    set("status", changes.status);
    if (changes.status !== "dispatching") sets.push("locked_at = NULL");
  }
  if (changes.scheduledAt !== undefined) set("scheduled_at", changes.scheduledAt);
  if (changes.attempts !== undefined) set("attempts", changes.attempts);
  if (changes.maxAttempts !== undefined) set("max_attempts", changes.maxAttempts);
  if (changes.lastError !== undefined) set("last_error", changes.lastError?.slice(0, 500) ?? null);
  params.push(orgId, id);
  await db(client).query(`UPDATE call_jobs SET ${sets.join(", ")} WHERE org_id = $${params.length - 1} AND id = $${params.length}`, params);
}

/** Jobs stuck in "dispatching" (a run crashed mid-call-start) → needs_review: the call may or may not have started. */
export async function releaseStaleDispatching(orgId: number, olderThanMinutes = 5) {
  const res = await getPool().query(
    `UPDATE call_jobs SET status = 'needs_review', locked_at = NULL, updated_at = now(),
       last_error = 'Dispatcher stopped while starting this call; check the provider before retrying'
     WHERE org_id = $1 AND status = 'dispatching' AND locked_at < now() - make_interval(mins => $2)`,
    [orgId, olderThanMinutes]
  );
  return res.rowCount || 0;
}

/** In-progress jobs whose result never arrived → needs_review. */
export async function releaseStaleInProgress(orgId: number, olderThanMinutes = 45) {
  const res = await getPool().query(
    `UPDATE call_jobs SET status = 'needs_review', updated_at = now(),
       last_error = 'No call result received from the provider'
     WHERE org_id = $1 AND status = 'in_progress' AND updated_at < now() - make_interval(mins => $2)`,
    [orgId, olderThanMinutes]
  );
  return res.rowCount || 0;
}

// ---------------------------------------------------------------- counters for limits

export async function countCallsSince(orgId: number, since: Date) {
  const res = await getPool().query<{ count: string }>("SELECT count(*) FROM calls WHERE org_id = $1 AND created_at >= $2", [orgId, since]);
  return Number(res.rows[0].count);
}

export async function countCallsInProgress(orgId: number) {
  const res = await getPool().query<{ count: string }>(
    `SELECT count(*) FROM call_jobs WHERE org_id = $1 AND status IN ('dispatching','in_progress') AND updated_at > now() - interval '45 minutes'`,
    [orgId]
  );
  return Number(res.rows[0].count);
}

export async function getLeadBasics(submissionId: number | null) {
  if (!submissionId) return null;
  const res = await getPool().query<{ name: string | null; phone: string | null; status: string; service: string | null; company: string | null }>(
    "SELECT name, phone, status, service, company FROM submissions WHERE id = $1",
    [submissionId]
  );
  return res.rows[0] ?? null;
}

// ---------------------------------------------------------------- calls

export async function insertCall(c: {
  orgId: number;
  jobId: number;
  submissionId: number | null;
  provider: string;
  providerAttemptId: string;
  phone: string;
  language: string | null;
}) {
  const res = await getPool().query<{ id: string }>(
    `INSERT INTO calls (org_id, job_id, submission_id, provider, provider_attempt_id, phone, language)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (provider, provider_attempt_id) DO UPDATE SET updated_at = now() RETURNING id`,
    [c.orgId, c.jobId, c.submissionId, c.provider, c.providerAttemptId, c.phone, c.language]
  );
  return Number(res.rows[0].id);
}

// ---------------------------------------------------------------- webhook results

/** Stores a webhook delivery once. Returns { id, alreadyProcessed }; id is null only if it was processed before. */
export async function recordEvent(provider: string, eventKey: string, orgId: number | null, payload: unknown) {
  await ensureCallingSchema();
  const pool = getPool();
  const ins = await pool.query<{ id: string }>(
    `INSERT INTO call_events (org_id, provider, event_key, payload) VALUES ($1, $2, $3, $4)
     ON CONFLICT (event_key) DO NOTHING RETURNING id`,
    [orgId, provider, eventKey, JSON.stringify(payload)]
  );
  if (ins.rows[0]) return { id: Number(ins.rows[0].id), alreadyProcessed: false };
  const existing = await pool.query<{ id: string; processed_at: string | null }>(
    "SELECT id, processed_at FROM call_events WHERE event_key = $1",
    [eventKey]
  );
  return { id: Number(existing.rows[0].id), alreadyProcessed: Boolean(existing.rows[0].processed_at) };
}

export async function finishEvent(id: number, error: string | null) {
  await getPool().query(
    "UPDATE call_events SET processed_at = CASE WHEN $2::text IS NULL THEN now() ELSE processed_at END, error = $2 WHERE id = $1",
    [id, error?.slice(0, 500) ?? null]
  );
}

export async function findCallByAttempt(provider: string, providerAttemptId: string, client?: Db) {
  const res = await db(client).query<{ id: string; org_id: string; job_id: string | null; submission_id: string | null; status: string }>(
    "SELECT id, org_id, job_id, submission_id, status FROM calls WHERE provider = $1 AND provider_attempt_id = $2",
    [provider, providerAttemptId]
  );
  const r = res.rows[0];
  return r
    ? { id: Number(r.id), orgId: Number(r.org_id), jobId: r.job_id ? Number(r.job_id) : null, submissionId: r.submission_id ? Number(r.submission_id) : null, status: r.status }
    : null;
}

export async function applyCallResultRow(
  client: Db,
  callId: number,
  r: {
    status: string;
    durationSeconds: number | null;
    interactionId: string | null;
    failureReason: string | null;
    variables: Record<string, unknown> | null;
    outcome: string | null;
    summary: string | null;
    language: string | null;
    followUp: boolean;
  }
) {
  await client.query(
    `UPDATE calls SET status = $2, duration_seconds = $3, interaction_id = coalesce($4, interaction_id), failure_reason = $5,
       agent_variables = $6, outcome = $7, summary = $8, language = coalesce($9, language), follow_up_required = $10,
       result_received_at = now(), updated_at = now()
     WHERE id = $1`,
    [
      callId,
      r.status,
      r.durationSeconds === null ? null : Math.round(r.durationSeconds),
      r.interactionId,
      r.failureReason,
      r.variables ? JSON.stringify(r.variables) : null,
      r.outcome,
      r.summary,
      r.language,
      r.followUp,
    ]
  );
}

export async function upsertTranscript(client: Db, orgId: number, callId: number, segments: unknown[]) {
  await client.query(
    `INSERT INTO call_transcripts (call_id, org_id, segments) VALUES ($1, $2, $3)
     ON CONFLICT (call_id) DO UPDATE SET segments = EXCLUDED.segments`,
    [callId, orgId, JSON.stringify(segments)]
  );
}

export async function insertUsage(
  client: Db,
  u: {
    orgId: number;
    callId: number;
    provider: string;
    durationSeconds: number;
    billableMinutes: number;
    telephonyPulses: number;
    agentCost: number;
    telephonyCost: number;
    currency: string;
    pricingVersion: string;
    usageDate: string;
  }
) {
  await client.query(
    `INSERT INTO call_usage (org_id, call_id, provider, duration_seconds, billable_minutes, telephony_pulses, agent_cost,
       telephony_cost, currency, pricing_version, usage_date)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (call_id) DO NOTHING`,
    [u.orgId, u.callId, u.provider, u.durationSeconds, u.billableMinutes, u.telephonyPulses, u.agentCost, u.telephonyCost, u.currency, u.pricingVersion, u.usageDate]
  );
}

/** First successful conversation moves a brand-new lead to "contacted". Never overrides a status a person set. */
export async function markLeadContacted(client: Db, submissionId: number, actor: string) {
  await client.query(
    `UPDATE submissions SET status = 'contacted', updated_at = now(), updated_by = $2 WHERE id = $1 AND status = 'new'`,
    [submissionId, actor]
  );
}

export async function withTransaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    const out = await fn(client);
    await client.query("COMMIT");
    return out;
  } catch (error) {
    await client.query("ROLLBACK").catch(() => null);
    throw error;
  } finally {
    client.release();
  }
}
