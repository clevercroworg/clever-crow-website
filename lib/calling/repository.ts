// All SQL for the calling system lives here. Services call these functions; nothing else touches the tables.
// Every query is filtered by org_id.

import type { PoolClient } from "pg";
import { getPool } from "@/lib/leads/db";
import { LIMITS } from "./config";
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
    monthlyBudget: Number(r.monthly_budget),
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
  monthlyBudget: "monthly_budget",
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

/**
 * Stores a consent record and returns its id, or null when this visitor's address is over its daily limit (nothing
 * is stored then). The count and the insert happen under one per-address lock, so a burst of requests sent at the
 * same instant can't all slip under the limit.
 */
export async function recordConsent(
  c: {
    orgId: number;
    submissionId: number | null;
    phone: string;
    consentText: string;
    consentVersion: string;
    source: string;
    pageUrl: string | null;
    ipHash: string | null;
  },
  maxFromIpPerDay = 0
) {
  await ensureCallingSchema();
  return withTransaction(async (client) => {
    if (c.ipHash && maxFromIpPerDay > 0) {
      await client.query("SELECT pg_advisory_xact_lock(hashtext('cc-calling-ip'), hashtext($1))", [`${c.orgId}:${c.ipHash}`]);
      const seen = await client.query<{ count: string }>(
        "SELECT count(*) FROM call_consents WHERE org_id = $1 AND ip_hash = $2 AND captured_at > now() - interval '24 hours'",
        [c.orgId, c.ipHash]
      );
      if (Number(seen.rows[0].count) >= maxFromIpPerDay) return null;
    }
    const res = await client.query<{ id: string }>(
      `INSERT INTO call_consents (org_id, submission_id, phone, consent_text, consent_version, source, page_url, ip_hash)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [c.orgId, c.submissionId, c.phone, c.consentText, c.consentVersion, c.source, c.pageUrl, c.ipHash]
    );
    return Number(res.rows[0].id);
  });
}

/** Consent counts only while it is granted AND recent (LIMITS.consentValidDays). */
const ACTIVE_CONSENT_SQL = `SELECT 1 FROM call_consents WHERE org_id = $1 AND phone = $2 AND purpose = 'callback'
  AND status = 'granted' AND captured_at > now() - make_interval(days => ${LIMITS.consentValidDays})`;

export async function hasActiveConsent(orgId: number, phone: string, client?: Db) {
  await ensureCallingSchema();
  const res = await db(client).query(`${ACTIVE_CONSENT_SQL} LIMIT 1`, [orgId, phone]);
  return (res.rowCount || 0) > 0;
}

/** How many callback requests this (hashed) IP address has made in the last 24 hours. */
/** Has the AI called this number recently, or might it have (a start we couldn't confirm)? */
export async function hasRecentCallActivity(orgId: number, phone: string, hours: number) {
  const res = await getPool().query<{ recent: boolean }>(
    `SELECT (
       EXISTS (SELECT 1 FROM calls WHERE org_id = $1 AND phone = $2 AND created_at > now() - make_interval(hours => $3))
       OR EXISTS (SELECT 1 FROM call_jobs WHERE org_id = $1 AND phone = $2 AND status = 'needs_review'
                  AND updated_at > now() - make_interval(hours => $3))
     ) AS recent`,
    [orgId, phone, hours]
  );
  return Boolean(res.rows[0].recent);
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

const ACTIVE_JOB_SQL = "status IN ('queued','dispatching','in_progress')";

/**
 * Creates a job unless one with the same idempotency key exists, or (the usual case) the number already has a
 * job waiting or in progress. The per-number lock makes that check safe when several requests for the same
 * number arrive at the same instant. Returns { job, created }, or { job: null } when another job is active.
 */
export async function createJob(j: {
  orgId: number;
  submissionId: number | null;
  phone: string;
  maxAttempts: number;
  language: string | null;
  idempotencyKey: string;
  createdBy: string | null;
  scheduledAt?: Date;
}): Promise<{ job: CallJob; created: boolean } | { job: null; created: false }> {
  await ensureCallingSchema();
  return withTransaction(async (client) => {
    await client.query("SELECT pg_advisory_xact_lock(hashtext('cc-calling-phone'), hashtext($1))", [`${j.orgId}:${j.phone}`]);
    const existing = await client.query("SELECT * FROM call_jobs WHERE org_id = $1 AND idempotency_key = $2", [j.orgId, j.idempotencyKey]);
    if (existing.rows[0]) return { job: mapJob(existing.rows[0]), created: false };
    if (await hasActiveJobForPhone(j.orgId, j.phone, client)) return { job: null, created: false };
    const ins = await client.query(
      `INSERT INTO call_jobs (org_id, submission_id, phone, max_attempts, language, idempotency_key, created_by, scheduled_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, coalesce($8, now()), now() + make_interval(hours => ${LIMITS.jobMaxAgeHours}))
       RETURNING *`,
      [j.orgId, j.submissionId, j.phone, j.maxAttempts, j.language, j.idempotencyKey, j.createdBy, j.scheduledAt ?? null]
    );
    return { job: mapJob(ins.rows[0]), created: true };
  });
}

export async function getJob(orgId: number, id: number, client?: Db) {
  await ensureCallingSchema();
  const res = await db(client).query("SELECT * FROM call_jobs WHERE org_id = $1 AND id = $2", [orgId, id]);
  return res.rows[0] ? mapJob(res.rows[0]) : null;
}

/** Same as getJob but holds the row until the transaction ends, so two results can't change one job at once. */
export async function lockJob(client: Db, orgId: number, id: number) {
  const res = await client.query("SELECT * FROM call_jobs WHERE org_id = $1 AND id = $2 FOR UPDATE", [orgId, id]);
  return res.rows[0] ? mapJob(res.rows[0]) : null;
}

export async function hasActiveJobForPhone(orgId: number, phone: string, client?: Db, exceptJobId = 0) {
  const res = await db(client).query(
    `SELECT 1 FROM call_jobs WHERE org_id = $1 AND phone = $2 AND ${ACTIVE_JOB_SQL} AND id <> $3 LIMIT 1`,
    [orgId, phone, exceptJobId]
  );
  return (res.rowCount || 0) > 0;
}

/**
 * Claims due jobs (status → dispatching) without ever going over the daily or at-once limits.
 * Counting and claiming happen under one per-organisation lock, so dispatcher runs that overlap (cron, a form,
 * a webhook) can't each see "room for 2" and start 4. FOR UPDATE SKIP LOCKED also means no job is claimed twice.
 */
export async function claimDueJobsWithinLimits(orgId: number, limits: { maxConcurrent: number; maxDaily: number; dayStart: Date }) {
  await ensureCallingSchema();
  return withTransaction(async (client) => {
    await client.query("SELECT pg_advisory_xact_lock(hashtext('cc-calling-claim'), $1::int)", [orgId]);
    const counts = await client.query<{ active: string; dispatching: string; started_today: string }>(
      `SELECT
         (SELECT count(*) FROM call_jobs WHERE org_id = $1 AND status IN ('dispatching','in_progress')) AS active,
         (SELECT count(*) FROM call_jobs WHERE org_id = $1 AND status = 'dispatching') AS dispatching,
         (SELECT count(*) FROM calls WHERE org_id = $1 AND created_at >= $2) AS started_today`,
      [orgId, limits.dayStart]
    );
    const active = Number(counts.rows[0].active);
    // Jobs being dialled right now have no call row yet, so they are added to today's count.
    const startedToday = Number(counts.rows[0].started_today) + Number(counts.rows[0].dispatching);
    const capacity = Math.min(limits.maxConcurrent - active, limits.maxDaily - startedToday);
    if (capacity <= 0) return { jobs: [] as CallJob[], active, startedToday, atLimit: true };
    const res = await client.query(
      `UPDATE call_jobs SET status = 'dispatching', locked_at = now(), updated_at = now()
       WHERE id IN (
         SELECT id FROM call_jobs
         WHERE org_id = $1 AND status = 'queued' AND scheduled_at <= now()
         ORDER BY scheduled_at, id
         LIMIT $2
         FOR UPDATE SKIP LOCKED
       ) RETURNING *`,
      [orgId, capacity]
    );
    return { jobs: res.rows.map(mapJob), active, startedToday, atLimit: false };
  });
}

/**
 * Updates a job. With `onlyIfStatus` the change is applied only if the job is still in that state, and the
 * return value says whether it was: this is how a slow writer avoids overwriting a newer decision.
 */
export async function updateJob(
  orgId: number,
  id: number,
  changes: { status?: JobStatus; scheduledAt?: Date; attempts?: number; maxAttempts?: number; lastError?: string | null; renewExpiry?: boolean },
  client?: Db,
  onlyIfStatus?: JobStatus
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
  if (changes.renewExpiry) sets.push(`expires_at = now() + make_interval(hours => ${LIMITS.jobMaxAgeHours})`);
  params.push(orgId, id);
  let where = `org_id = $${params.length - 1} AND id = $${params.length}`;
  if (onlyIfStatus) {
    params.push(onlyIfStatus);
    where += ` AND status = $${params.length}`;
  }
  const res = await db(client).query(`UPDATE call_jobs SET ${sets.join(", ")} WHERE ${where}`, params);
  return (res.rowCount || 0) > 0;
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

/** Requests nobody could act on in time (calling was off, limits were full) are dropped rather than dialled late. */
export async function expireStaleJobs(orgId: number) {
  const res = await getPool().query(
    `UPDATE call_jobs SET status = 'cancelled', locked_at = NULL, updated_at = now(),
       last_error = 'Expired: not reached within ${LIMITS.jobMaxAgeHours} hours of the request'
     WHERE org_id = $1 AND status = 'queued'
       AND coalesce(expires_at, created_at + make_interval(hours => ${LIMITS.jobMaxAgeHours})) < now()`,
    [orgId]
  );
  return res.rowCount || 0;
}

// ---------------------------------------------------------------- facts for the dispatcher

/** One cheap query that tells an idle dispatcher run it can stop straight away. */
export async function getWorkload(orgId: number) {
  await ensureCallingSchema();
  const res = await getPool().query<{ due: string; queued: string; active: string }>(
    `SELECT count(*) FILTER (WHERE status = 'queued' AND scheduled_at <= now()) AS due,
            count(*) FILTER (WHERE status = 'queued') AS queued,
            count(*) FILTER (WHERE status IN ('dispatching','in_progress')) AS active
     FROM call_jobs WHERE org_id = $1 AND ${ACTIVE_JOB_SQL}`,
    [orgId]
  );
  const r = res.rows[0];
  return { due: Number(r.due), queued: Number(r.queued), active: Number(r.active) };
}

/** Everything the "may we dial this number right now?" check needs about a number, in one query. */
export async function getDialFacts(orgId: number, phone: string) {
  const res = await getPool().query<{ consent: boolean; suppressed: boolean; calls_this_week: string }>(
    `SELECT EXISTS (${ACTIVE_CONSENT_SQL}) AS consent,
            EXISTS (SELECT 1 FROM call_suppressions WHERE org_id = $1 AND phone = $2) AS suppressed,
            (SELECT count(*) FROM calls WHERE org_id = $1 AND phone = $2 AND created_at > now() - interval '7 days') AS calls_this_week`,
    [orgId, phone]
  );
  const r = res.rows[0];
  return { hasActiveConsent: Boolean(r.consent), isSuppressed: Boolean(r.suppressed), callsThisWeek: Number(r.calls_this_week) };
}

/** Estimated spend since `fromDate` ("YYYY-MM-DD"), from our own usage records. */
export async function costSince(orgId: number, fromDate: string) {
  const res = await getPool().query<{ cost: string }>(
    "SELECT coalesce(sum(agent_cost + telephony_cost), 0) AS cost FROM call_usage WHERE org_id = $1 AND usage_date >= $2",
    [orgId, fromDate]
  );
  return Number(res.rows[0].cost);
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
}, client?: Db) {
  const res = await db(client).query<{ id: string }>(
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

/**
 * Closes a webhook delivery. An `error` leaves it unprocessed so the provider's retry is handled again;
 * `ignoredNote` marks it handled but records why nothing was changed.
 */
export async function finishEvent(id: number, error: string | null, ignoredNote: string | null = null) {
  await getPool().query(
    "UPDATE call_events SET processed_at = CASE WHEN $2::text IS NULL THEN now() ELSE processed_at END, error = coalesce($2, $3) WHERE id = $1",
    [id, error?.slice(0, 500) ?? null, ignoredNote?.slice(0, 500) ?? null]
  );
}

/** Raw payloads hold transcripts and phone numbers; they are only needed for a while, for debugging. */
export async function purgeOldEvents(days: number) {
  const res = await getPool().query("DELETE FROM call_events WHERE received_at < now() - make_interval(days => $1)", [days]);
  return res.rowCount || 0;
}

/** How many calls were placed for a job, and which is the newest: only the newest one's result may move the job on. */
export async function callStatsForJob(client: Db, jobId: number) {
  const res = await client.query<{ latest: string | null; count: string }>("SELECT max(id) AS latest, count(*) AS count FROM calls WHERE job_id = $1", [jobId]);
  return { latestId: res.rows[0].latest ? Number(res.rows[0].latest) : null, count: Number(res.rows[0].count) };
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
    heat: string | null;
    heatScore: number | null;
    heatReasons: string[] | null;
  }
) {
  await client.query(
    `UPDATE calls SET status = $2, duration_seconds = $3, interaction_id = coalesce($4, interaction_id), failure_reason = $5,
       agent_variables = $6, outcome = $7, summary = $8, language = coalesce($9, language), follow_up_required = $10,
       heat = $11, heat_score = $12, heat_reasons = $13,
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
      r.heat,
      r.heatScore,
      r.heatReasons ? JSON.stringify(r.heatReasons) : null,
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
