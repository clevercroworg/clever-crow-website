# Architecture

## Components

| Component | Where | Job |
|---|---|---|
| Lead form route | `app/api/leads/route.ts` | Saves the lead (unchanged). If `callback_consent: true`, calls `queue.captureCallbackRequest`. |
| Queue | `lib/calling/queue.ts` | Records consent, checks do-not-call and duplicates, creates one job (idempotent). |
| Dispatcher | `lib/calling/dispatcher.ts` | Claims due jobs, re-checks eligibility, starts calls through the provider. |
| Provider adapters | `lib/calling/providers/` | Sarvam (real) and mock (tests). Core code only sees the interface. |
| Webhook | `app/api/calling/webhooks/sarvam/[token]` | Receives each attempt's result; `results.ts` applies it. |
| Cron | `app/api/calling/dispatch` | Vercel Cron calls it every minute in calling hours (Pro plan). |
| Dashboard | `app/team/leads-portal/(app)/calls`, lead page panel | History, queue, do-not-call, settings, health. |
| Database | Neon Postgres (existing) | Tables in DATA_MODEL.md. |

## Flow

```
1. Visitor ticks "call me back" → POST /api/leads { …, callback_consent: true, callback_consent_version }
2. Lead saved → abuse limits (SECURITY.md) → consent recorded (server text) → job created (status queued,
   scheduled for the next calling window)                                              [queue.ts]
3. after() runs the dispatcher immediately; so does every call result; cron covers retries [dispatcher.ts]
4. Dispatcher: one query to see if anything is waiting → expire stale jobs → switches, hours, monthly budget
   → claim due jobs inside the limits (per-org lock + FOR UPDATE SKIP LOCKED) → checkEligibility again
   → POST Sarvam /outbounds with webhook URL + signed metadata → calls row (initiated), job in_progress
5. Sarvam calls the person (voice, AI, telephony all on Sarvam's side)
6. Sarvam POSTs the result → token + signature checked → de-duplicated
   → call updated, transcript + usage saved, job completed / re-queued / failed,
     opt-out → do-not-call, lead New → Contacted, activity logged                        [results.ts]
7. Dashboard shows it; a person follows up
```

## Eligibility (`lib/calling/eligibility.ts`)

One pure function decides "may we call now?". It runs when a job is created and again **immediately before dialling**.

Hard stops (job cancelled): invalid number, no active consent (granted in the last 30 days), on do-not-call, lead marked
spam/won/lost, attempts used up, 5 AI calls to the number in the last 7 days.
Soft stops (job waits until `retryAt`): master switch off, automation off, provider not configured, outside calling
hours (waits for the next window), daily limit reached (waits for the next day), concurrency limit (1 minute).

Hard stops are checked first, so a job never waits for something that can't change.

## Job states

```
queued ──claim──▶ dispatching ──provider ok──▶ in_progress ──connected──▶ completed
   ▲                  │  │                          │
   │                  │  └─ambiguous (timeout/5xx)─▶ needs_review ──admin──▶ queued / cancelled
   │                  ├─soft stop / 429──▶ queued (later)
   │                  ├─hard stop──▶ cancelled
   │                  └─rejected (4xx config)──▶ failed
   └──── no_answer/busy/failed, attempts left ◀──┘
                     no attempts left ──▶ failed
```

Safety nets (run at the start of every dispatcher pass):
- `dispatching` for more than 5 minutes (a run crashed mid-start) → `needs_review`
- `in_progress` with no result for 45 minutes → `needs_review`
- `queued` for more than 72 hours → `cancelled` ("Expired")

Results (`results.ts`) lock the job row and follow three rules: a connected call always completes the job; any other
result only moves a job that is still waiting for one (`dispatching`, `in_progress`, `needs_review`) and only if it is
the job's newest call; a job a person cancelled or that already finished is never reopened.

## Retries

- No answer / busy / failed: re-queued after `retry_delay_minutes × 2^(attempt-1)`, capped at 24 h, then pushed into the next
  calling window if needed. Stops at `max_attempts`.
- Provider rate limit (429): re-queued in up to 15 minutes; the attempt is not counted (no call was placed).
- Ambiguous start: never retried automatically (DECISIONS.md D4).

## Concurrency and duplicates

- Jobs are claimed with `FOR UPDATE SKIP LOCKED`, so two dispatcher runs at once (a duplicated cron call, the form
  trigger and the cron together) never claim the same job.
- Capacity per run = min(concurrent limit − in progress, daily limit − started today). Counting and claiming happen
  under one per-organisation advisory lock, so overlapping runs can't add up to more than the limits.
- One active job per phone number, checked and inserted under a per-number lock. The same form submitted twice can't
  create two jobs (idempotency key `form:<submission id>`); a manual request uses `manual:<id>:<minute>`, so double
  clicks don't either.
- The dispatcher's own updates apply only while the job is still `dispatching`, so a cancel or a fast result wins.
- Webhooks are de-duplicated on `provider:attempt_id:status`.

## Deploys

- The call runs on Sarvam. A deploy during a call doesn't affect it.
- Vercel switches to a new deployment instantly; requests already running finish on the old one.
- All state is in the database, so a new deployment continues where the old one stopped.
- A webhook arriving during a deploy is handled by whichever version receives it (same code, same database). If it
  fails with 500, Sarvam's delivery log can re-send it (SARVAM_INTEGRATION.md).
- Rollback: Vercel → Deployments → Instant Rollback. No data migration to undo; tables are only ever added.

## Multi-organisation

Every calling table has `org_id`; every repository function takes it. Today all routes use `DEFAULT_ORG_ID = 1`.
To serve another business: add an `organizations` row, its `calling_settings` row, per-org Sarvam API keys stored
encrypted (instead of the single `SARVAM_API_KEY`), and map dashboard users to orgs.
