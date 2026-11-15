# AI Callback System: Implementation Plan

Status: **Phases 1 and 2 built and tested in code. No real calls are possible yet.** Automation is off by default and needs the
credentials and decisions listed under "What we still need".

This plan replaces the earlier "Cloudflare Workers + MongoDB" spec. The decision and its reasons are recorded in
[DECISIONS.md](./DECISIONS.md).

## Goal

When a website visitor **asks for a callback and ticks a clear consent box**, an AI voice agent (Sarvam) calls them back
in English, Kannada or Hindi, within calling hours. It understands what they need and records the result (status, summary,
transcript and extracted details) on the lead in the existing dashboard. A human follows up from there.

The same code must later serve other businesses (each one an "organisation") without a rewrite.

## Scope

In scope:
- Callback consent capture (separate from general contact consent), opt-out and do-not-call list
- Durable call jobs: queue, calling hours, daily and concurrency limits, retries with backoff, cancel, manual retry
- Sarvam instant outbound calls and the post-call webhook
- Call history, transcripts, outcomes, usage and cost in the dashboard
- Automation settings and system health in the dashboard
- Organisation-scoped data model for future multi-business use

Out of scope (for now):
- Bulk or promotional campaigns (calls only go to people who asked for a callback)
- Storing call audio (Sarvam keeps recordings; we store text only)
- Inbound calls
- Billing other businesses (usage is recorded, invoicing is not built)

## Architecture in one picture

```
 Visitor form (tick "call me back")
        │  POST /api/leads   (existing route, now also records callback consent)
        ▼
 ┌──────────────────────── Vercel (same Next.js project, region sin1) ────────────────────────┐
 │  lib/calling/queue.ts        create call job (idempotent, checks consent + do-not-call)    │
 │  lib/calling/dispatcher.ts   claim due jobs → re-check eligibility → start call            │
 │        ▲ runs: right after the form (if within hours) + every minute via Vercel Cron (Pro) │
 │  lib/calling/providers/      Sarvam adapter (verified API) + mock adapter for tests        │
 │  /api/calling/webhooks/sarvam/[token]   post-call result → call, transcript, usage, lead   │
 │  /team/leads-portal/calls    dashboard: calls, queue, do-not-call, settings, health        │
 └───────────────┬───────────────────────────────────────────────┬────────────────────────────┘
                 ▼                                               ▼
        Neon Postgres (existing DB)                    Sarvam Voice Agents → telephony → phone
```

Full details: [ARCHITECTURE.md](./ARCHITECTURE.md).

## Phases

| Phase | What | Status |
|---|---|---|
| 1 | Verify Sarvam API from official docs; architecture, data model, security and compliance design | Done |
| 2 | Backend foundation: schema, consent, do-not-call, eligibility, jobs, dispatcher, Sarvam + mock adapters, webhook, usage, admin APIs, dashboard pages, unit + end-to-end tests with the mock provider | Done: 31/31 unit, 48/48 end-to-end ([TESTING.md](./TESTING.md)) |
| 3 | Accounts: Vercel Pro, Sarvam workspace + API key, agent built in Sarvam, telephony connection + number, env vars | Waiting on you (see [SETUP.md](./SETUP.md)) |
| 4 | Add the callback consent tick box to the chosen website forms | Waiting on your choice of forms |
| 5 | One approved real test call to a team member's phone; confirm phone-number format, webhook delivery and transcript | After phase 3 |
| 6 | Enable the per-minute cron (`vercel.json`), turn automation on with low limits (e.g. 20/day), watch for a week | After phase 5 |
| 7 | Raise limits to 100–150/day; telecom compliance sign-off ([COMPLIANCE.md](./COMPLIANCE.md)) | After phase 6 |
| 8 | WhatsApp: read incoming WhatsApp messages, ask for consent, queue a callback ([WHATSAPP.md](./WHATSAPP.md)) | Needs a Meta WhatsApp Business Platform account |
| Later | Second organisation: per-org Sarvam credentials (encrypted), org switcher, usage invoices | When you sell it |

## What we still need from you

| Item | Where it comes from |
|---|---|
| Vercel **Pro** on the iammanojdigital account | Vercel → Settings → Billing |
| Sarvam account, **org ID**, **workspace ID**, **API key** | indus.sarvam.ai/samvaad → Settings |
| Agent built in Sarvam (prompt in [VOICE_AGENT.md](./VOICE_AGENT.md)): **app ID** and **app version** | Sarvam → Build |
| Telephony: rent a number from Sarvam (₹59/30 days) or connect Exotel/Vobiz: **connection ID** and **agent phone number** | Sarvam → Deploy → Phone Numbers |
| Which forms get the "call me back" box | Your decision |
| Calling hours, days and daily limit | Defaults: Mon–Sat, 10:00–19:00 IST, 20/day to start |
| Telecom compliance confirmation (KYC, number type, consent wording) | Your telecom provider |

## Rules every change must follow

1. No call is ever placed without a recorded, unrevoked **callback consent** for that phone number.
2. Every call goes through `lib/calling/eligibility.ts`, both when it is queued and again right before dialling.
3. Jobs live in the database. Nothing depends on memory, timers or a single request finishing.
4. A call-start request that might have reached Sarvam is **never retried automatically**; it goes to "Needs review".
5. Every calling table carries `org_id`, and every query filters by it.
6. Secrets stay in Vercel environment variables, never in code or the browser.
7. Automated tests use the mock provider. Real calls happen only when explicitly approved.
