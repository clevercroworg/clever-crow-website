# API

All responses are JSON. Errors are `{ "error": "message" }` with a matching HTTP status.

## Public

### POST /api/leads (existing route, new optional fields)
| Field | Type | Notes |
|---|---|---|
| callback_consent | boolean | `true` only if the visitor ticked the callback box |
| callback_consent_version | string | Current: `callback-v2` (see `lib/calling/consent-text.ts`); `callback-v1` still accepted; unknown versions are ignored |

Behaviour is unchanged when these are absent. Calling errors never fail the form. A callback request can be quietly
skipped (the lead is still saved): more than 5 requests from one address in a day, a number called in the last 24 hours,
a number that already has a job, a do-not-call number, or automation off (SECURITY.md → Abuse limits).

### GET /api/calling/dispatch
Vercel Cron. Header `Authorization: Bearer <CRON_SECRET>`. Runs one dispatcher pass.
`200 { ok, summary: { ran, reason?, claimed, started, rescheduled, cancelled, needsReview, failed, staleReleased, expired } }` ·
`401` without the secret.

### POST /api/calling/webhooks/sarvam/{token}
Sarvam's post-call webhook. `{token}` is derived from `CALLING_WEBHOOK_SECRET`; the full URL is sent to Sarvam with
every call, so it never needs to be configured by hand. Body: Sarvam's instant-outbound payload
(SARVAM_INTEGRATION.md).
| Status | Meaning |
|---|---|
| 200 `{ ok, duplicate }` | Applied (or already applied, or this call already has a final result) |
| 400 | Not JSON / not a recognised payload |
| 401 | Metadata signature invalid, or the call belongs to a different job |
| 404 | Wrong token, or job not found |
| 413 | Body over 1 MB |
| 500 | Processing error; safe to re-send |

## Dashboard (signed-in session cookie, same-origin requests only)

| Method & path | Who | Body | Does |
|---|---|---|---|
| GET /api/leads-portal/calling/settings | Admin | | Current settings |
| PUT /api/leads-portal/calling/settings | Admin | Any settings fields | Validated update; logged. Hours must stay inside 09:00–21:00; `monthlyBudget` 0–10,00,000 (0 = no cap) |
| POST /api/leads-portal/calling/leads/{id}/callback | Any | `{ language? }` | Queue an AI callback (needs consent from the last 30 days; 409 with reason otherwise) |
| POST /api/leads-portal/calling/jobs/{id} | Admin | `{ action: "retry" \| "cancel" }` | Retry needs-review/failed/cancelled; cancel waiting/needs-review/failed. 409 if the job changed in the meantime |
| GET /api/leads-portal/calling/suppressions | Admin | | Do-not-call list |
| POST /api/leads-portal/calling/suppressions | Admin | `{ phone, reason? }` | Add number (cancels its jobs, revokes consent) |
| DELETE /api/leads-portal/calling/suppressions/{id} | Admin | | Remove (consent stays revoked) |
| POST /api/leads-portal/calling/run | Admin | | One dispatcher pass now |

Every change is written to the activity log.

## Dashboard pages
`/team/leads-portal/calls` (history, queue, do-not-call), `/calls/{id}` (summary, transcript, details, cost),
`/calls/settings` (admin: switch, hours, limits, languages, Sarvam IDs, rates, system health, run now), and the
"AI callback" panel on each lead page.
