import { ensureSchema, getPool } from "./db";

export const STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"] as const;
export type Status = (typeof STATUSES)[number];

export const FORM_TYPES = [
  { value: "lead", label: "Leads" },
  { value: "internship", label: "Internships" },
] as const;

export const PAGE_SIZES = [25, 50, 100] as const;
const TZ = "Asia/Kolkata";

export type Submission = {
  id: number;
  created_at: string;
  form_type: string;
  form_name: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  page_url: string | null;
  page_path: string | null;
  landing_url: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  gclid: string | null;
  fbclid: string | null;
  channel: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  user_agent: string | null;
  status: string;
  notes: string | null;
  updated_at: string | null;
  updated_by: string | null;
  assigned_to: number | null;
  assigned_name: string | null;
  follow_up_at: string | null;
  extra: Record<string, string>;
};

export type Filters = {
  q?: string;
  type?: string;
  channel?: string;
  status?: string;
  form?: string;
  page_path?: string;
  from?: string; // YYYY-MM-DD (IST)
  to?: string; // YYYY-MM-DD (IST)
  assigned?: string; // a user id, or "none"
  followup?: string; // "overdue" | "today" | "upcoming" | "any"
};

// Columns for lead lists: everything, plus the assignee's name.
const SELECT_ROWS = `SELECT s.*, (SELECT u.name FROM admin_users u WHERE u.id = s.assigned_to) AS assigned_name FROM submissions s`;
const IST_TODAY = `(date_trunc('day', now() AT TIME ZONE '${TZ}') AT TIME ZONE '${TZ}')`;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function buildWhere(f: Filters) {
  // Job applications (Careers page) are not shown in the dashboard.
  const where: string[] = ["form_type <> 'career'"];
  const params: unknown[] = [];
  const add = (sql: string, value: unknown) => {
    params.push(value);
    where.push(sql.replace("?", `$${params.length}`));
  };

  const q = (f.q || "").trim().slice(0, 100);
  if (q) {
    params.push(`%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`);
    const p = `$${params.length}`;
    const digits = q.replace(/\D/g, "");
    let phoneClause = "";
    if (digits.length >= 4) {
      params.push(`%${digits}%`);
      phoneClause = ` OR regexp_replace(coalesce(phone,''), '\\D', '', 'g') LIKE $${params.length}`;
    }
    where.push(
      `(name ILIKE ${p} OR email ILIKE ${p} OR phone ILIKE ${p} OR company ILIKE ${p} OR message ILIKE ${p} OR service ILIKE ${p}${phoneClause})`
    );
  }
  if (f.type) add("form_type = ?", f.type);
  if (f.channel) add("channel = ?", f.channel);
  if (f.status) add("status = ?", f.status);
  if (f.form) add("form_name = ?", f.form);
  if (f.page_path) add("page_path = ?", f.page_path);
  if (f.from && DATE_RE.test(f.from)) add(`created_at >= (?::date)::timestamp AT TIME ZONE '${TZ}'`, f.from);
  if (f.to && DATE_RE.test(f.to)) add(`created_at < ((?::date) + 1)::timestamp AT TIME ZONE '${TZ}'`, f.to);
  if (f.assigned === "none") where.push("assigned_to IS NULL");
  else if (f.assigned && /^\d+$/.test(f.assigned)) add("assigned_to = ?", Number(f.assigned));
  if (f.followup === "overdue") where.push(`follow_up_at < now() AND status NOT IN ('won','lost','spam')`);
  else if (f.followup === "today")
    where.push(`follow_up_at >= ${IST_TODAY} AND follow_up_at < ${IST_TODAY} + interval '1 day'`);
  else if (f.followup === "upcoming") where.push("follow_up_at >= now()");
  else if (f.followup === "any") where.push("follow_up_at IS NOT NULL");

  return { sql: where.length ? `WHERE ${where.join(" AND ")}` : "", params };
}

function mapRow(row: Record<string, unknown>): Submission {
  return {
    ...(row as unknown as Submission),
    id: Number(row.id),
    created_at: new Date(row.created_at as string).toISOString(),
    updated_at: row.updated_at ? new Date(row.updated_at as string).toISOString() : null,
    follow_up_at: row.follow_up_at ? new Date(row.follow_up_at as string).toISOString() : null,
    assigned_to: row.assigned_to === null || row.assigned_to === undefined ? null : Number(row.assigned_to),
    assigned_name: (row.assigned_name as string | null) ?? null,
    extra: (row.extra as Record<string, string>) || {},
  };
}

export async function listSubmissions(filters: Filters, page: number, pageSize: number) {
  await ensureSchema();
  const { sql, params } = buildWhere(filters);
  const pool = getPool();
  const countRes = await pool.query<{ count: string }>(`SELECT count(*) FROM submissions s ${sql}`, params);
  const total = Number(countRes.rows[0]?.count || 0);
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pages);
  const rowsRes = await pool.query(
    `${SELECT_ROWS} ${sql} ORDER BY created_at DESC, id DESC LIMIT ${pageSize} OFFSET ${(current - 1) * pageSize}`,
    params
  );
  return { rows: rowsRes.rows.map(mapRow), total, page: current, pages };
}

export async function exportSubmissions(filters: Filters, limit = 10000) {
  await ensureSchema();
  const { sql, params } = buildWhere(filters);
  const res = await getPool().query(
    `${SELECT_ROWS} ${sql} ORDER BY created_at DESC, id DESC LIMIT ${limit}`,
    params
  );
  return res.rows.map(mapRow);
}

export async function getSubmission(id: number) {
  await ensureSchema();
  const res = await getPool().query(`${SELECT_ROWS} WHERE s.id = $1 AND s.form_type <> 'career'`, [id]);
  return res.rows[0] ? mapRow(res.rows[0]) : null;
}

export async function updateSubmission(
  id: number,
  changes: { status?: string; notes?: string | null; assigned_to?: number | null; follow_up_at?: string | null },
  updatedBy: string
) {
  await ensureSchema();
  const sets: string[] = [];
  const params: unknown[] = [];
  if (changes.status !== undefined) {
    params.push(changes.status);
    sets.push(`status = $${params.length}`);
  }
  if (changes.notes !== undefined) {
    params.push(changes.notes);
    sets.push(`notes = $${params.length}`);
  }
  if (changes.assigned_to !== undefined) {
    params.push(changes.assigned_to);
    sets.push(`assigned_to = $${params.length}`);
  }
  if (changes.follow_up_at !== undefined) {
    params.push(changes.follow_up_at);
    sets.push(`follow_up_at = $${params.length}`);
  }
  if (!sets.length) return false;
  params.push(updatedBy);
  sets.push(`updated_by = $${params.length}`, "updated_at = now()");
  params.push(id);
  const res = await getPool().query(`UPDATE submissions SET ${sets.join(", ")} WHERE id = $${params.length}`, params);
  return (res.rowCount || 0) > 0;
}

export async function deleteSubmission(id: number) {
  await ensureSchema();
  const res = await getPool().query(`DELETE FROM submissions WHERE id = $1`, [id]);
  return (res.rowCount || 0) > 0;
}

export async function getStats() {
  await ensureSchema();
  const pool = getPool();
  const today = `date_trunc('day', now() AT TIME ZONE '${TZ}') AT TIME ZONE '${TZ}'`;
  const [totals, channels, forms, pages] = await Promise.all([
    pool.query<{ total: string; today: string; week: string; month: string; new_count: string }>(
      `SELECT count(*) AS total,
              count(*) FILTER (WHERE created_at >= ${today}) AS today,
              count(*) FILTER (WHERE created_at >= ${today} - interval '6 days') AS week,
              count(*) FILTER (WHERE created_at >= ${today} - interval '29 days') AS month,
              count(*) FILTER (WHERE status = 'new') AS new_count
       FROM submissions WHERE form_type <> 'career'`
    ),
    pool.query<{ channel: string; count: string }>(
      `SELECT coalesce(channel, 'Direct') AS channel, count(*) AS count FROM submissions
       WHERE form_type <> 'career' AND created_at >= ${today} - interval '29 days' GROUP BY 1 ORDER BY 2 DESC`
    ),
    pool.query<{ form_name: string }>(
      `SELECT DISTINCT form_name FROM submissions WHERE form_name IS NOT NULL AND form_type <> 'career' ORDER BY form_name LIMIT 300`
    ),
    pool.query<{ page_path: string; count: string }>(
      `SELECT page_path, count(*) AS count FROM submissions WHERE page_path IS NOT NULL AND form_type <> 'career'
       GROUP BY 1 ORDER BY 2 DESC LIMIT 300`
    ),
  ]);
  const t = totals.rows[0];
  return {
    total: Number(t?.total || 0),
    today: Number(t?.today || 0),
    week: Number(t?.week || 0),
    month: Number(t?.month || 0),
    newCount: Number(t?.new_count || 0),
    channels: channels.rows.map((r) => ({ channel: r.channel, count: Number(r.count) })),
    formNames: forms.rows.map((r) => r.form_name),
    pagePaths: pages.rows.map((r) => r.page_path),
  };
}
