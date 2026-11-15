// Tables for the AI callback system, created on first use (same approach as lib/leads/db.ts).
// Documented column by column in docs/calling/DATA_MODEL.md. Every table carries org_id.

import { ensureSchema, getPool } from "@/lib/leads/db";
import { DEFAULT_ORG_ID } from "./config";

const CALLING_SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS organizations (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  status      TEXT NOT NULL DEFAULT 'active',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
INSERT INTO organizations (id, name, slug) VALUES (${DEFAULT_ORG_ID}, 'Clever Crow Strategies', 'clever-crow')
  ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('organizations', 'id'), GREATEST((SELECT max(id) FROM organizations), 1));

CREATE TABLE IF NOT EXISTS calling_settings (
  org_id                 BIGINT PRIMARY KEY REFERENCES organizations(id),
  automation_enabled     BOOLEAN NOT NULL DEFAULT false,
  timezone               TEXT NOT NULL DEFAULT 'Asia/Kolkata',
  calling_start          TEXT NOT NULL DEFAULT '10:00',
  calling_end            TEXT NOT NULL DEFAULT '19:00',
  allowed_days           INT[] NOT NULL DEFAULT '{1,2,3,4,5,6}',
  max_daily_calls        INT NOT NULL DEFAULT 20,
  max_concurrent_calls   INT NOT NULL DEFAULT 2,
  max_attempts           INT NOT NULL DEFAULT 3,
  retry_delay_minutes    INT NOT NULL DEFAULT 120,
  enabled_languages      TEXT[] NOT NULL DEFAULT '{English,Kannada,Hindi}',
  default_language       TEXT NOT NULL DEFAULT 'English',
  sarvam_org_id          TEXT NOT NULL DEFAULT '',
  sarvam_workspace_id    TEXT NOT NULL DEFAULT '',
  sarvam_app_id          TEXT NOT NULL DEFAULT '',
  sarvam_app_version     INT,
  sarvam_connection_id   TEXT NOT NULL DEFAULT '',
  sarvam_agent_phone     TEXT NOT NULL DEFAULT '',
  rate_agent_per_minute  NUMERIC(10,2) NOT NULL DEFAULT 3.50,
  rate_telephony_per_30s NUMERIC(10,2) NOT NULL DEFAULT 0.20,
  pricing_version        TEXT NOT NULL DEFAULT 'sarvam-payg-2026-11',
  updated_at             TIMESTAMPTZ,
  updated_by             TEXT
);
INSERT INTO calling_settings (org_id) VALUES (${DEFAULT_ORG_ID}) ON CONFLICT (org_id) DO NOTHING;

-- Callback consent, kept separate from general contact/marketing consent. Never deleted (audit trail).
CREATE TABLE IF NOT EXISTS call_consents (
  id               BIGSERIAL PRIMARY KEY,
  org_id           BIGINT NOT NULL REFERENCES organizations(id),
  submission_id    BIGINT REFERENCES submissions(id) ON DELETE SET NULL,
  phone            TEXT NOT NULL,
  purpose          TEXT NOT NULL DEFAULT 'callback',
  status           TEXT NOT NULL DEFAULT 'granted',
  consent_text     TEXT NOT NULL,
  consent_version  TEXT NOT NULL,
  source           TEXT NOT NULL,
  page_url         TEXT,
  captured_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  revoked_at       TIMESTAMPTZ,
  revoked_reason   TEXT
);
CREATE INDEX IF NOT EXISTS call_consents_phone_idx ON call_consents (org_id, phone, status);
CREATE INDEX IF NOT EXISTS call_consents_submission_idx ON call_consents (submission_id);

-- Do-not-call list. One row per number per org.
CREATE TABLE IF NOT EXISTS call_suppressions (
  id          BIGSERIAL PRIMARY KEY,
  org_id      BIGINT NOT NULL REFERENCES organizations(id),
  phone       TEXT NOT NULL,
  reason      TEXT,
  source      TEXT NOT NULL DEFAULT 'manual',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by  TEXT,
  UNIQUE (org_id, phone)
);

-- Durable job queue. The source of truth for what should be called and when.
CREATE TABLE IF NOT EXISTS call_jobs (
  id               BIGSERIAL PRIMARY KEY,
  org_id           BIGINT NOT NULL REFERENCES organizations(id),
  submission_id    BIGINT REFERENCES submissions(id) ON DELETE SET NULL,
  phone            TEXT NOT NULL,
  status           TEXT NOT NULL DEFAULT 'queued',
  scheduled_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  attempts         INT NOT NULL DEFAULT 0,
  max_attempts     INT NOT NULL DEFAULT 3,
  language         TEXT,
  last_error       TEXT,
  idempotency_key  TEXT NOT NULL,
  locked_at        TIMESTAMPTZ,
  created_by       TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (org_id, idempotency_key)
);
CREATE INDEX IF NOT EXISTS call_jobs_due_idx ON call_jobs (org_id, status, scheduled_at);
CREATE INDEX IF NOT EXISTS call_jobs_phone_idx ON call_jobs (org_id, phone, status);
CREATE INDEX IF NOT EXISTS call_jobs_submission_idx ON call_jobs (submission_id);

-- One row per call attempt placed with the provider.
CREATE TABLE IF NOT EXISTS calls (
  id                   BIGSERIAL PRIMARY KEY,
  org_id               BIGINT NOT NULL REFERENCES organizations(id),
  job_id               BIGINT REFERENCES call_jobs(id) ON DELETE SET NULL,
  submission_id        BIGINT REFERENCES submissions(id) ON DELETE SET NULL,
  provider             TEXT NOT NULL,
  provider_attempt_id  TEXT NOT NULL,
  interaction_id       TEXT,
  phone                TEXT NOT NULL,
  direction            TEXT NOT NULL DEFAULT 'outbound',
  status               TEXT NOT NULL DEFAULT 'initiated',
  outcome              TEXT,
  summary              TEXT,
  language             TEXT,
  duration_seconds     INT,
  failure_reason       TEXT,
  agent_variables      JSONB,
  follow_up_required   BOOLEAN NOT NULL DEFAULT false,
  initiated_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  result_received_at   TIMESTAMPTZ,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_attempt_id)
);
CREATE INDEX IF NOT EXISTS calls_org_created_idx ON calls (org_id, created_at DESC);
-- Lead heat from the call (lib/calling/heat.ts). Added after the first release, hence ALTER.
ALTER TABLE calls ADD COLUMN IF NOT EXISTS heat TEXT;
ALTER TABLE calls ADD COLUMN IF NOT EXISTS heat_score INT;
ALTER TABLE calls ADD COLUMN IF NOT EXISTS heat_reasons JSONB;
CREATE INDEX IF NOT EXISTS calls_heat_idx ON calls (org_id, heat, created_at DESC);
CREATE INDEX IF NOT EXISTS calls_submission_idx ON calls (submission_id);

-- Transcripts kept apart from calls so lists stay light.
CREATE TABLE IF NOT EXISTS call_transcripts (
  call_id     BIGINT PRIMARY KEY REFERENCES calls(id) ON DELETE CASCADE,
  org_id      BIGINT NOT NULL REFERENCES organizations(id),
  segments    JSONB NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Every webhook delivery, for de-duplication and debugging.
CREATE TABLE IF NOT EXISTS call_events (
  id            BIGSERIAL PRIMARY KEY,
  org_id        BIGINT,
  provider      TEXT NOT NULL,
  event_key     TEXT NOT NULL UNIQUE,
  payload       JSONB NOT NULL,
  received_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at  TIMESTAMPTZ,
  error         TEXT
);
CREATE INDEX IF NOT EXISTS call_events_received_idx ON call_events (received_at DESC);

-- Cost per call, with the pricing version used.
CREATE TABLE IF NOT EXISTS call_usage (
  id                BIGSERIAL PRIMARY KEY,
  org_id            BIGINT NOT NULL REFERENCES organizations(id),
  call_id           BIGINT NOT NULL UNIQUE REFERENCES calls(id) ON DELETE CASCADE,
  provider          TEXT NOT NULL,
  duration_seconds  INT NOT NULL,
  billable_minutes  INT NOT NULL,
  telephony_pulses  INT NOT NULL,
  agent_cost        NUMERIC(10,2) NOT NULL,
  telephony_cost    NUMERIC(10,2) NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'INR',
  pricing_version   TEXT NOT NULL,
  usage_date        DATE NOT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS call_usage_date_idx ON call_usage (org_id, usage_date);
`;

const g = globalThis as unknown as { ccCallingSchema?: Promise<void> };

/** Creates the leads tables (dependency) and the calling tables once per server instance. */
export function ensureCallingSchema() {
  if (!g.ccCallingSchema) {
    g.ccCallingSchema = ensureSchema()
      .then(() => getPool().query(CALLING_SCHEMA_SQL))
      .then(() => undefined)
      .catch((err) => {
        g.ccCallingSchema = undefined;
        throw err;
      });
  }
  return g.ccCallingSchema;
}
