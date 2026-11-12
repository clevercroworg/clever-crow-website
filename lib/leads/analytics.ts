import { ensureSchema, getPool } from "./db";
import type { Submission } from "./queries";

// Numbers for the dashboard Overview and the Pipeline board. Dates are Indian time (IST).
// Overview counts cover leads only (form_type = 'lead'); internship applications
// are counted separately so they don't skew lead numbers.

const TZ = "Asia/Kolkata";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const RANGES = [
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "90d", label: "Last 90 days", days: 90 },
  { value: "365d", label: "Last 12 months", days: 365 },
] as const;

export type Range = { key: string; label: string; from: string; to: string; days: number };

/** Today's date in IST as YYYY-MM-DD. */
export function istToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(new Date());
}

function addDays(date: string, n: number) {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000) + 1;
}

/** Reads ?range=7d|30d|90d|365d or ?from=&to= (custom). Defaults to the last 30 days. */
export function parseRange(params: Record<string, string | string[] | undefined>): Range {
  const get = (k: string) => {
    const v = params[k];
    return (Array.isArray(v) ? v[0] : v) || "";
  };
  const today = istToday();
  const from = get("from");
  const to = get("to");
  if (DATE_RE.test(from) && DATE_RE.test(to) && from <= to) {
    const days = Math.min(daysBetween(from, to), 731);
    const start = days === daysBetween(from, to) ? from : addDays(to, -(days - 1));
    return { key: "custom", label: `${start} to ${to}`, from: start, to, days };
  }
  const preset = RANGES.find((r) => r.value === get("range")) || RANGES[1];
  return { key: preset.value, label: preset.label, from: addDays(today, -(preset.days - 1)), to: today, days: preset.days };
}

const start = (p: string) => `((${p})::date)::timestamp AT TIME ZONE '${TZ}'`;
const end = (p: string) => `(((${p})::date) + 1)::timestamp AT TIME ZONE '${TZ}'`;

export type Breakdown = { label: string; count: number }[];

export async function getOverview(range: Range, userId: number) {
  await ensureSchema();
  const pool = getPool();
  const prevFrom = addDays(range.from, -range.days);
  const prevTo = addDays(range.from, -1);
  const inRange = `created_at >= ${start("$1")} AND created_at < ${end("$2")}`;
  const leadsInRange = `form_type = 'lead' AND ${inRange}`;

  const [kpi, perDay, channels, pages, forms, statuses, followUps, recent] = await Promise.all([
    pool.query(
      `SELECT
         count(*) FILTER (WHERE ${leadsInRange}) AS leads,
         count(*) FILTER (WHERE form_type = 'lead' AND created_at >= ${start("$3")} AND created_at < ${end("$4")}) AS prev_leads,
         count(*) FILTER (WHERE form_type = 'internship' AND ${inRange}) AS applications,
         count(*) FILTER (WHERE form_type = 'lead' AND status = 'new') AS open_new,
         count(*) FILTER (WHERE ${leadsInRange} AND status = 'won') AS won,
         count(*) FILTER (WHERE ${leadsInRange} AND status = 'lost') AS lost,
         count(*) FILTER (WHERE form_type <> 'career' AND follow_up_at < now() AND status NOT IN ('won','lost','spam')) AS overdue,
         count(*) FILTER (WHERE form_type = 'lead' AND assigned_to IS NULL AND status NOT IN ('won','lost','spam')) AS unassigned
       FROM submissions`,
      [range.from, range.to, prevFrom, prevTo]
    ),
    pool.query<{ day: string; count: string }>(
      `SELECT to_char(d.day, 'YYYY-MM-DD') AS day, count(s.id) AS count
       FROM generate_series($1::date, $2::date, interval '1 day') AS d(day)
       LEFT JOIN submissions s ON s.form_type = 'lead'
         AND (s.created_at AT TIME ZONE '${TZ}')::date = d.day::date
       GROUP BY d.day ORDER BY d.day`,
      [range.from, range.to]
    ),
    pool.query<{ label: string; count: string }>(
      `SELECT coalesce(channel, 'Direct') AS label, count(*) AS count FROM submissions
       WHERE ${leadsInRange} GROUP BY 1 ORDER BY 2 DESC, 1`,
      [range.from, range.to]
    ),
    pool.query<{ label: string; count: string }>(
      `SELECT coalesce(page_path, '(unknown)') AS label, count(*) AS count FROM submissions
       WHERE ${leadsInRange} GROUP BY 1 ORDER BY 2 DESC, 1`,
      [range.from, range.to]
    ),
    pool.query<{ label: string; count: string }>(
      `SELECT coalesce(form_name, '(unnamed form)') AS label, count(*) AS count FROM submissions
       WHERE ${leadsInRange} GROUP BY 1 ORDER BY 2 DESC, 1`,
      [range.from, range.to]
    ),
    pool.query<{ label: string; count: string }>(
      `SELECT status AS label, count(*) AS count FROM submissions WHERE ${leadsInRange} GROUP BY 1`,
      [range.from, range.to]
    ),
    pool.query(
      `SELECT s.id, s.name, s.phone, s.status, s.follow_up_at, s.assigned_to,
              (SELECT u.name FROM admin_users u WHERE u.id = s.assigned_to) AS assigned_name
       FROM submissions s
       WHERE s.follow_up_at IS NOT NULL AND s.form_type <> 'career'
         AND s.follow_up_at < (date_trunc('day', now() AT TIME ZONE '${TZ}') AT TIME ZONE '${TZ}') + interval '1 day'
         AND s.status NOT IN ('won','lost','spam')
       ORDER BY (s.assigned_to = $1) DESC NULLS LAST, s.follow_up_at ASC
       LIMIT 8`,
      [userId]
    ),
    pool.query(
      `SELECT id, name, created_at, channel, form_name, status FROM submissions
       WHERE form_type = 'lead' ORDER BY created_at DESC, id DESC LIMIT 6`
    ),
  ]);

  const k = kpi.rows[0];
  const n = (v: unknown) => Number(v || 0);
  const rows = (r: { rows: { label: string; count: string }[] }): Breakdown =>
    r.rows.map((x) => ({ label: x.label, count: Number(x.count) }));

  return {
    leads: n(k.leads),
    prevLeads: n(k.prev_leads),
    applications: n(k.applications),
    openNew: n(k.open_new),
    won: n(k.won),
    lost: n(k.lost),
    overdue: n(k.overdue),
    unassigned: n(k.unassigned),
    perDay: perDay.rows.map((r) => ({ day: r.day, count: Number(r.count) })),
    channels: rows(channels),
    pages: rows(pages),
    forms: rows(forms),
    statuses: rows(statuses),
    followUps: followUps.rows.map((r) => ({
      id: Number(r.id),
      name: r.name as string | null,
      phone: r.phone as string | null,
      status: r.status as string,
      follow_up_at: new Date(r.follow_up_at).toISOString(),
      assigned_to: r.assigned_to === null ? null : Number(r.assigned_to),
      assigned_name: r.assigned_name as string | null,
    })),
    recent: recent.rows.map((r) => ({
      id: Number(r.id),
      name: r.name as string | null,
      created_at: new Date(r.created_at).toISOString(),
      channel: r.channel as string | null,
      form_name: r.form_name as string | null,
      status: r.status as string,
    })),
  };
}

export const PIPELINE_STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;
export const PIPELINE_COLUMN_LIMIT = 50;

export type PipelineCard = Pick<
  Submission,
  "id" | "name" | "phone" | "email" | "company" | "service" | "channel" | "status" | "created_at" | "follow_up_at" | "assigned_to" | "assigned_name" | "form_name"
>;

/** Leads per pipeline column (newest first, up to 50 each) and the full count per column. */
export async function getPipeline(filters: { assigned?: string }) {
  await ensureSchema();
  const params: unknown[] = [PIPELINE_STATUSES];
  let extra = "";
  if (filters.assigned === "none") extra = "AND s.assigned_to IS NULL";
  else if (filters.assigned && /^\d+$/.test(filters.assigned)) {
    params.push(Number(filters.assigned));
    extra = `AND s.assigned_to = $${params.length}`;
  }
  const res = await getPool().query(
    `SELECT * FROM (
       SELECT s.id, s.name, s.phone, s.email, s.company, s.service, s.channel, s.status, s.created_at,
              s.follow_up_at, s.assigned_to, s.form_name,
              (SELECT u.name FROM admin_users u WHERE u.id = s.assigned_to) AS assigned_name,
              row_number() OVER (PARTITION BY s.status ORDER BY s.created_at DESC, s.id DESC) AS rn,
              count(*) OVER (PARTITION BY s.status) AS total
       FROM submissions s
       WHERE s.form_type = 'lead' AND s.status = ANY($1) ${extra}
     ) t WHERE rn <= ${PIPELINE_COLUMN_LIMIT}
     ORDER BY created_at DESC, id DESC`,
    params
  );
  const columns = Object.fromEntries(PIPELINE_STATUSES.map((s) => [s, { total: 0, cards: [] as PipelineCard[] }]));
  for (const r of res.rows) {
    const col = columns[r.status];
    col.total = Number(r.total);
    col.cards.push({
      id: Number(r.id),
      name: r.name,
      phone: r.phone,
      email: r.email,
      company: r.company,
      service: r.service,
      channel: r.channel,
      status: r.status,
      created_at: new Date(r.created_at).toISOString(),
      follow_up_at: r.follow_up_at ? new Date(r.follow_up_at).toISOString() : null,
      assigned_to: r.assigned_to === null ? null : Number(r.assigned_to),
      assigned_name: r.assigned_name,
      form_name: r.form_name,
    });
  }
  return columns as Record<(typeof PIPELINE_STATUSES)[number], { total: number; cards: PipelineCard[] }>;
}

/** The next page of one pipeline column, for "Load more". */
export async function getPipelineColumn(status: string, filters: { assigned?: string }, offset: number) {
  await ensureSchema();
  const params: unknown[] = [status, Math.max(0, offset)];
  let extra = "";
  if (filters.assigned === "none") extra = "AND s.assigned_to IS NULL";
  else if (filters.assigned && /^\d+$/.test(filters.assigned)) {
    params.push(Number(filters.assigned));
    extra = `AND s.assigned_to = $${params.length}`;
  }
  const res = await getPool().query(
    `SELECT s.id, s.name, s.phone, s.email, s.company, s.service, s.channel, s.status, s.created_at,
            s.follow_up_at, s.assigned_to, s.form_name,
            (SELECT u.name FROM admin_users u WHERE u.id = s.assigned_to) AS assigned_name
     FROM submissions s
     WHERE s.form_type = 'lead' AND s.status = $1 ${extra}
     ORDER BY s.created_at DESC, s.id DESC
     LIMIT ${PIPELINE_COLUMN_LIMIT} OFFSET $2`,
    params
  );
  return res.rows.map(
    (r): PipelineCard => ({
      id: Number(r.id),
      name: r.name,
      phone: r.phone,
      email: r.email,
      company: r.company,
      service: r.service,
      channel: r.channel,
      status: r.status,
      created_at: new Date(r.created_at).toISOString(),
      follow_up_at: r.follow_up_at ? new Date(r.follow_up_at).toISOString() : null,
      assigned_to: r.assigned_to === null ? null : Number(r.assigned_to),
      assigned_name: r.assigned_name,
      form_name: r.form_name,
    })
  );
}
