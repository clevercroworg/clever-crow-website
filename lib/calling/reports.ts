// Read-only queries for the dashboard (Calls pages, lead page panel, health). Org-scoped.

import { getPool } from "@/lib/leads/db";
import { LIMITS } from "./config";
import { ensureCallingSchema } from "./schema";
import { startOfLocalDay, startOfLocalMonth } from "./schedule";
import type { JobStatus } from "./types";

const iso = (v: unknown) => (v ? new Date(v as string).toISOString() : null);
const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));

export async function getCallingOverview(orgId: number, timezone: string, now = new Date()) {
  await ensureCallingSchema();
  const pool = getPool();
  const today = startOfLocalDay(now, timezone);
  const monthStart = startOfLocalMonth(now, timezone);
  const [calls, month, jobs, lastEvent, heat] = await Promise.all([
    pool.query(
      `SELECT count(*) AS total,
              count(*) FILTER (WHERE status = 'connected') AS connected,
              count(*) FILTER (WHERE status IN ('no_answer','busy')) AS unanswered,
              count(*) FILTER (WHERE status = 'failed') AS failed,
              coalesce(avg(duration_seconds) FILTER (WHERE status = 'connected'), 0) AS avg_duration
       FROM calls WHERE org_id = $1 AND created_at >= $2`,
      [orgId, today]
    ),
    pool.query(
      `SELECT coalesce(sum(billable_minutes), 0) AS minutes, coalesce(sum(agent_cost + telephony_cost), 0) AS cost, count(*) AS calls
       FROM call_usage WHERE org_id = $1 AND usage_date >= $2`,
      [orgId, monthStart.date]
    ),
    pool.query<{ status: string; count: string }>(`SELECT status, count(*) FROM call_jobs WHERE org_id = $1 GROUP BY status`, [orgId]),
    pool.query(`SELECT received_at, error FROM call_events WHERE org_id = $1 ORDER BY received_at DESC LIMIT 1`, [orgId]),
    pool.query<{ heat: string; count: string }>(
      `SELECT heat, count(*) FROM calls WHERE org_id = $1 AND heat IS NOT NULL AND created_at >= $2 GROUP BY heat`,
      [orgId, monthStart.instant]
    ),
  ]);
  const heatCounts = Object.fromEntries(heat.rows.map((r) => [r.heat, Number(r.count)])) as Partial<Record<"hot" | "warm" | "cold", number>>;
  const c = calls.rows[0];
  const total = Number(c.total);
  const answered = Number(c.connected);
  const jobCounts = Object.fromEntries(jobs.rows.map((r) => [r.status, Number(r.count)])) as Partial<Record<JobStatus, number>>;
  return {
    today: {
      calls: total,
      connected: answered,
      unanswered: Number(c.unanswered),
      failed: Number(c.failed),
      answerRate: total ? Math.round((answered / total) * 100) : 0,
      avgDurationSeconds: Math.round(Number(c.avg_duration)),
    },
    month: { minutes: Number(month.rows[0].minutes), cost: Number(month.rows[0].cost), calls: Number(month.rows[0].calls) },
    jobs: jobCounts,
    heatThisMonth: { hot: heatCounts.hot ?? 0, warm: heatCounts.warm ?? 0, cold: heatCounts.cold ?? 0 },
    lastWebhook: lastEvent.rows[0] ? { at: iso(lastEvent.rows[0].received_at), error: lastEvent.rows[0].error as string | null } : null,
  };
}

export type CallRow = {
  id: number;
  createdAt: string;
  phone: string;
  status: string;
  outcome: string | null;
  durationSeconds: number | null;
  language: string | null;
  submissionId: number | null;
  leadName: string | null;
  followUp: boolean;
  summary: string | null;
  heat: "hot" | "warm" | "cold" | null;
  heatScore: number | null;
};

export const CALLS_PAGE_SIZE = 25;
export const HEATS = ["hot", "warm", "cold"] as const;

/** Call history, newest first. `heat` filters to one temperature (sorted hottest first within it). */
export async function listCalls(orgId: number, page: number, heat: (typeof HEATS)[number] | null = null) {
  await ensureCallingSchema();
  const pool = getPool();
  const params: unknown[] = [orgId];
  let where = "c.org_id = $1";
  if (heat) {
    params.push(heat);
    where += " AND c.heat = $2";
  }
  const total = Number((await pool.query<{ count: string }>(`SELECT count(*) FROM calls c WHERE ${where}`, params)).rows[0].count);
  const pages = Math.max(1, Math.ceil(total / CALLS_PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const res = await pool.query(
    `SELECT c.id, c.created_at, c.phone, c.status, c.outcome, c.duration_seconds, c.language, c.submission_id,
            c.follow_up_required, c.summary, c.heat, c.heat_score, s.name AS lead_name
     FROM calls c LEFT JOIN submissions s ON s.id = c.submission_id
     WHERE ${where} ORDER BY ${heat ? "c.heat_score DESC NULLS LAST, " : ""}c.created_at DESC, c.id DESC
     LIMIT ${CALLS_PAGE_SIZE} OFFSET ${(current - 1) * CALLS_PAGE_SIZE}`,
    params
  );
  const rows: CallRow[] = res.rows.map((r) => ({
    id: Number(r.id),
    createdAt: iso(r.created_at)!,
    phone: r.phone,
    status: r.status,
    outcome: r.outcome,
    durationSeconds: num(r.duration_seconds),
    language: r.language,
    submissionId: num(r.submission_id),
    leadName: r.lead_name,
    followUp: Boolean(r.follow_up_required),
    summary: r.summary,
    heat: r.heat,
    heatScore: num(r.heat_score),
  }));
  return { rows, total, page: current, pages };
}

export async function getCallDetail(orgId: number, id: number) {
  await ensureCallingSchema();
  const pool = getPool();
  const res = await pool.query(
    `SELECT c.*, s.name AS lead_name, t.segments, u.billable_minutes, u.agent_cost, u.telephony_cost, u.pricing_version
     FROM calls c
     LEFT JOIN submissions s ON s.id = c.submission_id
     LEFT JOIN call_transcripts t ON t.call_id = c.id
     LEFT JOIN call_usage u ON u.call_id = c.id
     WHERE c.org_id = $1 AND c.id = $2`,
    [orgId, id]
  );
  const r = res.rows[0];
  if (!r) return null;
  return {
    id: Number(r.id),
    createdAt: iso(r.created_at)!,
    resultAt: iso(r.result_received_at),
    phone: r.phone as string,
    provider: r.provider as string,
    providerAttemptId: r.provider_attempt_id as string,
    interactionId: r.interaction_id as string | null,
    status: r.status as string,
    outcome: r.outcome as string | null,
    summary: r.summary as string | null,
    language: r.language as string | null,
    durationSeconds: num(r.duration_seconds),
    failureReason: r.failure_reason as string | null,
    variables: (r.agent_variables as Record<string, unknown> | null) ?? null,
    followUp: Boolean(r.follow_up_required),
    submissionId: num(r.submission_id),
    leadName: r.lead_name as string | null,
    heat: (r.heat as "hot" | "warm" | "cold" | null) ?? null,
    heatScore: num(r.heat_score),
    heatReasons: (r.heat_reasons as string[] | null) ?? [],
    transcript: (r.segments as { role: string; text: string }[] | null) ?? [],
    usage: r.billable_minutes === null || r.billable_minutes === undefined
      ? null
      : { minutes: Number(r.billable_minutes), cost: Number(r.agent_cost) + Number(r.telephony_cost), pricingVersion: r.pricing_version as string },
  };
}

export type JobRow = {
  id: number;
  status: JobStatus;
  phone: string;
  scheduledAt: string;
  attempts: number;
  maxAttempts: number;
  lastError: string | null;
  submissionId: number | null;
  leadName: string | null;
  createdBy: string | null;
  updatedAt: string;
};

export async function listJobs(orgId: number, statuses: JobStatus[] | null) {
  await ensureCallingSchema();
  const params: unknown[] = [orgId];
  let where = "j.org_id = $1";
  if (statuses?.length) {
    params.push(statuses);
    where += ` AND j.status = ANY($2)`;
  }
  const res = await getPool().query(
    `SELECT j.*, s.name AS lead_name FROM call_jobs j LEFT JOIN submissions s ON s.id = j.submission_id
     WHERE ${where} ORDER BY CASE WHEN j.status IN ('needs_review','queued','dispatching','in_progress') THEN 0 ELSE 1 END, j.updated_at DESC
     LIMIT 200`,
    params
  );
  return res.rows.map(
    (r): JobRow => ({
      id: Number(r.id),
      status: r.status,
      phone: r.phone,
      scheduledAt: iso(r.scheduled_at)!,
      attempts: Number(r.attempts),
      maxAttempts: Number(r.max_attempts),
      lastError: r.last_error,
      submissionId: num(r.submission_id),
      leadName: r.lead_name,
      createdBy: r.created_by,
      updatedAt: iso(r.updated_at)!,
    })
  );
}

/** Everything about AI calling for one lead: consent, open job and past calls. */
export async function getLeadCalling(orgId: number, submissionId: number, phone: string | null) {
  await ensureCallingSchema();
  const pool = getPool();
  const [consent, jobs, calls, dnc] = await Promise.all([
    phone
      ? pool.query(
          `SELECT status, consent_version, captured_at, revoked_at,
                  captured_at <= now() - make_interval(days => ${LIMITS.consentValidDays}) AS expired
           FROM call_consents
           WHERE org_id = $1 AND phone = $2 ORDER BY captured_at DESC LIMIT 1`,
          [orgId, phone]
        )
      : Promise.resolve({ rows: [] as Record<string, unknown>[] }),
    pool.query(`SELECT id, status, scheduled_at, attempts, max_attempts, last_error FROM call_jobs WHERE org_id = $1 AND submission_id = $2 ORDER BY id DESC LIMIT 5`, [orgId, submissionId]),
    pool.query(`SELECT id, created_at, status, outcome, duration_seconds, summary, heat FROM calls WHERE org_id = $1 AND submission_id = $2 ORDER BY created_at DESC LIMIT 10`, [orgId, submissionId]),
    phone ? pool.query(`SELECT 1 FROM call_suppressions WHERE org_id = $1 AND phone = $2`, [orgId, phone]) : Promise.resolve({ rowCount: 0 }),
  ]);
  const c = consent.rows[0];
  return {
    consent: c
      ? {
          status: String(c.status),
          version: String(c.consent_version),
          capturedAt: iso(c.captured_at)!,
          revokedAt: iso(c.revoked_at),
          // Granted, but too long ago to rely on (LIMITS.consentValidDays): the person has to ask again.
          expired: c.status === "granted" && Boolean(c.expired),
        }
      : null,
    doNotCall: ((dnc as { rowCount: number | null }).rowCount || 0) > 0,
    jobs: jobs.rows.map((r) => ({
      id: Number(r.id),
      status: r.status as JobStatus,
      scheduledAt: iso(r.scheduled_at)!,
      attempts: Number(r.attempts),
      maxAttempts: Number(r.max_attempts),
      lastError: r.last_error as string | null,
    })),
    calls: calls.rows.map((r) => ({
      id: Number(r.id),
      createdAt: iso(r.created_at)!,
      status: r.status as string,
      outcome: r.outcome as string | null,
      durationSeconds: num(r.duration_seconds),
      summary: r.summary as string | null,
      heat: (r.heat as "hot" | "warm" | "cold" | null) ?? null,
    })),
  };
}
