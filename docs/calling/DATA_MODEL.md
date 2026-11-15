# Data model

Postgres (existing Neon database). Created automatically on first use by `lib/calling/schema.ts`; only `CREATE ... IF NOT
EXISTS`, so it never alters or drops existing data. The leads tables (`submissions`, `admin_users`, `activity_log`)
are unchanged.

## organizations
| Column | Notes |
|---|---|
| id | 1 = Clever Crow Strategies |
| name, slug, status, created_at | |

## calling_settings (one row per org)
| Column | Default | Notes |
|---|---|---|
| automation_enabled | false | The dashboard switch. Calls also need `CALLING_ENABLED=true` on the server. |
| timezone | Asia/Kolkata | |
| calling_start / calling_end | 10:00 / 19:00 | Local time; end is exclusive |
| allowed_days | {1..6} | 0 = Sunday |
| max_daily_calls | 20 | Start low, raise after the first week |
| max_concurrent_calls | 2 | |
| max_attempts | 3 | Per job |
| retry_delay_minutes | 120 | Doubles each retry, max 24 h |
| enabled_languages / default_language | {English,Kannada,Hindi} / English | Sarvam language names |
| sarvam_org_id, sarvam_workspace_id, sarvam_app_id, sarvam_app_version, sarvam_connection_id, sarvam_agent_phone | empty | From the Sarvam dashboard. Not secret. |
| rate_agent_per_minute / rate_telephony_per_30s | 3.50 / 0.20 | INR excl. GST; edit when your plan changes |
| pricing_version | sarvam-payg-2026-11 | Stored on each usage row |
| updated_at, updated_by | | |

## call_consents (never deleted)
| Column | Notes |
|---|---|
| org_id, submission_id, phone (E.164) | |
| purpose | `callback` (separate from marketing) |
| status | `granted` / `revoked` |
| consent_text, consent_version | Exact wording agreed to (server copy) |
| source, page_url | Which form and page |
| captured_at, revoked_at, revoked_reason | |

## call_suppressions (do-not-call)
`org_id, phone` unique · `reason`, `source` (`manual` / `agent_opt_out`), `created_at`, `created_by`.
Adding a number cancels its queued jobs and revokes its consent. Removing it does **not** restore consent.

## call_jobs (the queue, source of truth)
| Column | Notes |
|---|---|
| status | queued, dispatching, in_progress, completed, failed, cancelled, needs_review |
| scheduled_at | When it may next be tried |
| attempts / max_attempts | Calls actually placed |
| language | Optional override for this call |
| last_error | Human-readable reason for the current state |
| idempotency_key | Unique per org; prevents duplicate jobs |
| locked_at | Set while dispatching (stale detection) |
| created_by | "AI assistant" (form) or the team member |

## calls (one row per attempt placed)
`provider`, `provider_attempt_id` (unique together), `interaction_id` (for Sarvam analytics), `phone`, `status`
(initiated, connected, no_answer, busy, failed), `outcome`, `summary`, `language`, `duration_seconds`,
`failure_reason`, `agent_variables` (JSON, everything the agent collected), `follow_up_required`, `initiated_at`,
`result_received_at`.

## call_transcripts
`call_id` (PK) · `segments` JSON array of `{ role: "agent" | "user", text }` (English text from Sarvam).

## call_events (webhook log)
`event_key` unique (`provider:attempt_id:status`) · full `payload` · `received_at`, `processed_at`, `error`.

## call_usage
`call_id` unique · `duration_seconds`, `billable_minutes` (started 60 s), `telephony_pulses` (started 30 s),
`agent_cost`, `telephony_cost`, `currency`, `pricing_version`, `usage_date`.

## Indexes
`call_jobs (org_id, status, scheduled_at)` for the dispatcher; `(org_id, phone, status)` for duplicate checks;
`call_consents (org_id, phone, status)`; `calls (org_id, created_at)`; `call_usage (org_id, usage_date)`;
`call_events (received_at)`; foreign-key columns.
