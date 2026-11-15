# AI Callback System

An AI voice assistant (Sarvam Voice Agents) calls back website visitors who **asked for a callback**, in English, Kannada
or Hindi, and records the result on the lead in the leads dashboard.

**Status:** built and tested with a mock provider. No real calls yet. Waiting on accounts and settings in
[IMPLEMENTATION_PLAN.md → What we still need](./IMPLEMENTATION_PLAN.md#what-we-still-need-from-you).

## Read in this order

| Doc | What it answers |
|---|---|
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Goal, scope, phases, what's done, what's pending, the rules |
| [DECISIONS.md](./DECISIONS.md) | Why Vercel + the existing Postgres database, not Cloudflare + MongoDB |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Components, data flow, job states, how deploys and failures are handled |
| [DATA_MODEL.md](./DATA_MODEL.md) | Every table and column |
| [API.md](./API.md) | Every endpoint, who can call it, request and response |
| [SARVAM_INTEGRATION.md](./SARVAM_INTEGRATION.md) | The verified Sarvam API contract, and the open questions |
| [VOICE_AGENT.md](./VOICE_AGENT.md) | The agent prompt and the variables it must return |
| [HEAT.md](./HEAT.md) | How each call's lead heat (Hot / Warm / Cold) is scored |
| [SETUP.md](./SETUP.md) | Step-by-step: Vercel Pro, Sarvam, telephony, environment variables, going live |
| [SECURITY.md](./SECURITY.md) | Threats and the controls against each |
| [COMPLIANCE.md](./COMPLIANCE.md) | Consent, opt-out, India telecom (TRAI) checklist |
| [OPERATIONS.md](./OPERATIONS.md) | Day-to-day running: switching off, "Needs review", costs, rollback |
| [TESTING.md](./TESTING.md) | How to run the tests, and the latest results |
| [WHATSAPP.md](./WHATSAPP.md) | Planned: reading WhatsApp messages and calling people who ask |

## Where the code lives

```
lib/calling/                 all backend logic (no UI)
  config.ts                  env vars, org id, kill switch
  types.ts                   statuses, outcomes, settings type
  consent-text.ts            canonical consent wording (versioned)
  phone.ts                   Indian mobile validation + masking
  schedule.ts                calling hours, time zones, backoff
  eligibility.ts             the single "may we call now?" rulebook
  security.ts                webhook token, job signatures, cron auth
  guardrails.ts              cleans form text before it reaches the AI agent
  heat.ts                    lead heat score from duration + outcome + agent feedback
  usage.ts                   cost from duration
  schema.ts                  tables (created on first use)
  repository.ts              ALL SQL for calling
  queue.ts                   callback request → job
  dispatcher.ts              due jobs → calls
  results.ts                 webhook → call result, retries, opt-out
  reports.ts                 read-only queries for the dashboard
  settings-validation.ts     input checks for the settings page
  providers/                 voice provider adapters
    types.ts                 provider-neutral interface
    sarvam.ts                Sarvam (verified API)
    mock.ts                  test double, never calls anyone
app/api/calling/             public endpoints: cron dispatcher, Sarvam webhook
app/api/leads-portal/calling/  dashboard APIs (login required)
app/team/leads-portal/(app)/calls/  dashboard pages
tests/calling/               unit tests (npm test) + end-to-end script
```

Nothing outside these folders depends on calling except two small hooks: the lead form route
(`app/api/leads/route.ts`, records consent when the box is ticked) and the lead page (shows the AI callback panel).
