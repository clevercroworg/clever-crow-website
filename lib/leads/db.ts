import { Pool } from "pg";

// Postgres (Neon) storage for every form submission on the site.
// Connection string comes from DATABASE_URL (set automatically by the Vercel + Neon
// integration) or POSTGRES_URL. If neither is set, saving is skipped silently so the
// forms and their emails keep working exactly as before.

export function getDatabaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

export function isDatabaseConfigured() {
  return Boolean(getDatabaseUrl());
}

const globalForPg = globalThis as unknown as { ccLeadsPool?: Pool; ccLeadsSchema?: Promise<void> };

export function getPool() {
  if (!globalForPg.ccLeadsPool) {
    globalForPg.ccLeadsPool = new Pool({
      connectionString: getDatabaseUrl(),
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
    });
    globalForPg.ccLeadsPool.on("error", (err) => console.error("LEADS DB pool error:", err));
  }
  return globalForPg.ccLeadsPool;
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS submissions (
  id            BIGSERIAL PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  form_type     TEXT NOT NULL DEFAULT 'lead',
  form_name     TEXT,
  name          TEXT,
  email         TEXT,
  phone         TEXT,
  company       TEXT,
  service       TEXT,
  budget        TEXT,
  timeline      TEXT,
  message       TEXT,
  page_url      TEXT,
  page_path     TEXT,
  landing_url   TEXT,
  referrer      TEXT,
  utm_source    TEXT,
  utm_medium    TEXT,
  utm_campaign  TEXT,
  utm_term      TEXT,
  utm_content   TEXT,
  gclid         TEXT,
  fbclid        TEXT,
  channel       TEXT,
  country       TEXT,
  region        TEXT,
  city          TEXT,
  device        TEXT,
  browser       TEXT,
  os            TEXT,
  user_agent    TEXT,
  status        TEXT NOT NULL DEFAULT 'new',
  notes         TEXT,
  extra         JSONB NOT NULL DEFAULT '{}'::jsonb
);
CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS submissions_form_type_idx ON submissions (form_type);
CREATE INDEX IF NOT EXISTS submissions_channel_idx ON submissions (channel);
CREATE INDEX IF NOT EXISTS submissions_status_idx ON submissions (status);
`;

/** Creates the table on first use, so no manual migration step is needed. */
export function ensureSchema() {
  if (!globalForPg.ccLeadsSchema) {
    globalForPg.ccLeadsSchema = getPool()
      .query(SCHEMA_SQL)
      .then(() => undefined)
      .catch((err) => {
        globalForPg.ccLeadsSchema = undefined; // retry next time
        throw err;
      });
  }
  return globalForPg.ccLeadsSchema;
}
