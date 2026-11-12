import { ensureSchema, getPool } from "@/lib/leads/db";
import type { Session } from "./auth";

// Activity log: who did what in the leads dashboard. Writing never throws, so a logging
// problem can't break the action itself.

export const ACTIVITY_LABELS: Record<string, string> = {
  login: "Signed in",
  setup: "Set up the dashboard",
  "lead.status": "Changed status",
  "lead.notes": "Updated notes",
  "lead.assign": "Assigned lead",
  "lead.follow_up": "Set follow-up",
  "lead.delete": "Deleted lead",
  "leads.export": "Exported CSV",
  "user.create": "Added login",
  "user.update": "Changed login",
  "user.delete": "Deleted login",
  "password.change": "Changed own password",
  "account.update": "Updated own email alerts",
};

export type ActivityEntry = {
  id: number;
  created_at: string;
  user_id: number | null;
  user_name: string | null;
  action: string;
  submission_id: number | null;
  summary: string | null;
  lead_name?: string | null;
};

export async function logActivity(
  who: Pick<Session, "id" | "name"> | null,
  action: string,
  opts: { submissionId?: number | null; summary?: string; details?: Record<string, unknown> } = {}
) {
  try {
    await ensureSchema();
    await getPool().query(
      `INSERT INTO activity_log (user_id, user_name, action, submission_id, summary, details)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        who?.id ?? null,
        who?.name ?? null,
        action,
        opts.submissionId ?? null,
        opts.summary?.slice(0, 500) ?? null,
        JSON.stringify(opts.details || {}),
      ]
    );
  } catch (error) {
    console.error("ADMIN: could not write activity log", error);
  }
}

function mapEntry(row: Record<string, unknown>): ActivityEntry {
  return {
    ...(row as unknown as ActivityEntry),
    id: Number(row.id),
    user_id: row.user_id === null ? null : Number(row.user_id),
    submission_id: row.submission_id === null ? null : Number(row.submission_id),
    created_at: new Date(row.created_at as string).toISOString(),
  };
}

/** History of one lead, oldest first. */
export async function listLeadActivity(submissionId: number) {
  await ensureSchema();
  const res = await getPool().query(
    `SELECT id, created_at, user_id, user_name, action, submission_id, summary
     FROM activity_log WHERE submission_id = $1 ORDER BY created_at ASC, id ASC LIMIT 200`,
    [submissionId]
  );
  return res.rows.map(mapEntry);
}

export const ACTIVITY_PAGE_SIZE = 50;

export async function listActivity(filters: { user?: number; action?: string }, page: number) {
  await ensureSchema();
  const where: string[] = [];
  const params: unknown[] = [];
  if (filters.user) {
    params.push(filters.user);
    where.push(`a.user_id = $${params.length}`);
  }
  if (filters.action) {
    params.push(filters.action);
    where.push(`a.action = $${params.length}`);
  }
  const sql = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const pool = getPool();
  const total = Number((await pool.query<{ count: string }>(`SELECT count(*) FROM activity_log a ${sql}`, params)).rows[0].count);
  const pages = Math.max(1, Math.ceil(total / ACTIVITY_PAGE_SIZE));
  const current = Math.min(Math.max(1, page), pages);
  const res = await pool.query(
    `SELECT a.id, a.created_at, a.user_id, a.user_name, a.action, a.submission_id, a.summary,
            (SELECT s.name FROM submissions s WHERE s.id = a.submission_id) AS lead_name
     FROM activity_log a ${sql}
     ORDER BY a.created_at DESC, a.id DESC
     LIMIT ${ACTIVITY_PAGE_SIZE} OFFSET ${(current - 1) * ACTIVITY_PAGE_SIZE}`,
    params
  );
  return { rows: res.rows.map(mapEntry), total, page: current, pages };
}
