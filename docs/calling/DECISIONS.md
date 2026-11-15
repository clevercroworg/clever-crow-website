# Decisions

## D1. Vercel + existing Neon Postgres, not Cloudflare Workers + MongoDB

The original spec asked for a separate Cloudflare Workers backend with MongoDB Atlas. We build inside the existing
Next.js project on Vercel, using the existing Neon Postgres database instead.

Why:
- The lead system already exists here (capture, dashboard, logins, roles, activity log). A second backend would
  duplicate it and need syncing.
- Cloudflare's free plan allows 10 ms of CPU per request, which is tight for a database driver and auth work, so a
  paid plan would likely be needed anyway (about $5/month).
- Deploys don't interrupt calls: the call runs on Sarvam; our code only starts it (under a second) and records the
  result. Jobs are stored in the database, not in memory.
- One dashboard, one database, one deploy pipeline, one rollback button.

Cost of this choice: **Vercel Pro ($20/month)** is required for the per-minute cron. The free plan only allows daily
cron jobs and is limited to non-commercial use.

Revisit if: this becomes a separately sold product with its own scale and team.

## D2. Neon free tier: dispatcher runs only during calling hours

Neon's free plan includes about 100 compute-hours a month and sleeps after 5 minutes idle. A cron every minute, 24/7,
would keep it awake ~720 hours and get the database suspended. The cron schedule therefore covers calling hours only
(see SETUP.md), about 270 hours a month.

## D3. Instant outbound API, not Sarvam Campaigns

Sarvam has two outbound options: Campaigns (dashboard CSV lists, scheduled) and the instant outbound API (one call per
request). We use the **instant API**: each callback is one person who asked for it, our own dispatcher enforces
calling hours, limits and retries, and every attempt is linked to a lead.

## D4. Never auto-retry an ambiguous call start

If the start request times out or Sarvam returns a 5xx, the call may have been placed. Retrying could ring the person
twice. Such jobs go to **Needs review**; a person checks Sarvam's call logs and retries or cancels.

## D5. Webhook authentication without a provider signature

Sarvam documents no webhook signature. We use a secret path token plus an HMAC signature in the per-call metadata that
Sarvam echoes back (SECURITY.md). If Sarvam later documents a signature or custom headers, add it as a third check.

## D6. Consent text lives on the server

The browser sends only a consent version (e.g. `callback-v1`). The server stores the matching wording, so a consent
record can't be altered by the client, and old records keep the exact text the person agreed to.

## D7. Org-scoped from day one

Every calling table has `org_id`, and every query filters by it. Today there is one organisation. Selling to another
business needs per-org Sarvam credentials (encrypted) and an org switcher, not a data migration.

## D8. Text only, no audio

We store transcripts (English text from Sarvam) and summaries. Audio stays with Sarvam. Recording storage would need
explicit consent and a storage plan.
