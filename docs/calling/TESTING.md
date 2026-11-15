# Testing

Automated tests never place real calls. Real calls happen only in SETUP.md step 7, with approval.

## Unit tests (no database, no network)
```
npm test
```
`tests/calling/logic.test.ts`: agent-variable guardrails, phone validation, calling hours and time zones, next window, backoff, every eligibility
rule, webhook tokens and signatures, cron auth, usage/cost maths, consent versions, settings validation, the Sarvam
request shape (exact URL, headers, body), failure classification (429 / 5xx / 4xx / timeout / missing id) and webhook
parsing.

## End-to-end (production build + temporary database + mock provider)
1. Start a Postgres you can throw away (e.g. a local Docker Postgres or PGlite socket server).
2. `npm run build`
3. Start the app with test settings:
   ```
   DATABASE_URL=postgresql://… CALLING_ENABLED=true CALLING_PROVIDER=mock \
   CALLING_WEBHOOK_SECRET=<32+ chars> CRON_SECRET=<secret> CALLING_PUBLIC_BASE_URL=http://localhost:3100 \
   npx next start -p 3100
   ```
4. `BASE=http://localhost:3100 DB=postgresql://… WEBHOOK_SECRET=<same> CRON_SECRET=<same> node tests/calling/e2e-mock.mjs`

The script creates its own test users and leads. **Never point it at the production database.**

## Latest results (2026-11-15)
- Unit tests: **31 / 31 passed** (incl. agent-variable guardrails: injected instructions, links, digits-as-names and
  hidden characters dropped; Kannada and Hindi names kept; lead heat scoring)
- End-to-end: **48 / 48 passed**, covering:
  - settings permissions and validation
  - no job without consent; forged consent versions ignored; canonical consent text stored
  - form → job → immediate dispatch → call row with provider attempt id
  - one active job per number
  - webhook: wrong token 404, bad signature 401, bad payload 400
  - connected result: status, duration, outcome, summary, language, transcript, usage (75 s = ₹7.60), job completed,
    lead New → Contacted, duplicate ignored with no double usage
  - no answer → re-queued with backoff → cron places the retry → busy → failed after max attempts
  - opt-out → do-not-call + consent revoked → future forms from that number not queued
  - ambiguous provider error → Needs review (no auto-retry)
  - manual callback refused without consent; viewer can't cancel; admin cancel; admin do-not-call add
  - automation off → consent recorded, no job
  - all dashboard pages render; viewer redirected from settings with no data leaked
  - heat: interested + 75 s + budget → Hot (60) and flagged for follow-up; opt-out → Cold; call page explains the
    score; Hot filter lists only hot calls

## Not yet tested (needs real accounts)
Real Sarvam call, real webhook delivery, phone-number format acceptance, Kannada/Hindi call quality, Vercel Cron in
production. These are SETUP.md steps 7–8.
