# Testing

Automated tests never place real calls. Real calls happen only in SETUP.md step 7, with approval.

## Unit tests (no database, no network)
```
npm test
```
`tests/calling/logic.test.ts`: agent-variable guardrails, phone validation, calling hours and time zones, next window, backoff, every eligibility
rule, webhook tokens and signatures, visitor-address hashing, cron auth, usage/cost maths, consent versions, settings
validation (hours bound, monthly budget), month and date in the org time zone, the test provider being refused on the
live site, the Sarvam request shape (exact URL, headers, body), failure classification (429 / 408 / 5xx / 4xx / timeout /
missing id) and webhook parsing.

## End-to-end (production build + temporary database + mock provider)
1. Start an empty Postgres you can throw away (a local Docker Postgres, or the `embedded-postgres` npm package). Use a
   fresh database and a freshly started app for every run.
2. `npm run build`
3. Start the app with test settings:
   ```
   DATABASE_URL=postgresql://… CALLING_ENABLED=true CALLING_PROVIDER=mock \
   CALLING_WEBHOOK_SECRET=<32+ chars> CRON_SECRET=<secret> CALLING_PUBLIC_BASE_URL=http://localhost:3100 \
   npx next start -p 3100
   ```
4. `BASE=http://localhost:3100 DB=postgresql://… WEBHOOK_SECRET=<same> CRON_SECRET=<same> node tests/calling/e2e-mock.mjs`

The script creates its own test users and leads. **Never point it at the production database.**

## Latest results (2026-11-16, after the loophole audit)
- Unit tests: **38 / 38 passed** (incl. agent-variable guardrails: injected instructions, links, digits-as-names and
  hidden characters dropped; Kannada and Hindi names kept; lead heat scoring)
- Simultaneous requests, checked once by hand on a real Postgres: 12 forms at the same instant from one address → 5
  recorded; 8 forms at the same instant for one number → 1 job, 1 call; 6 dispatcher runs at once with a limit of 2
  calls at a time → 2 calls.
- End-to-end: **77 / 77 passed**, covering:
  - abuse limits: 5 requests a day per visitor address, 24-hour cooldown after a call, 5 calls per number per week,
    consent older than 30 days refused, calling hours outside 09:00–21:00 rejected
  - late result for a cancelled job (stays cancelled), result naming another job's call (401), a second different
    result for a finished call (ignored), result for an unconfirmed start (attempt counted once, re-queued)
  - monthly budget: used up → nothing dialled and the dashboard says paused; lifted → the waiting job is dialled
  - a job not reached within 72 hours is dropped; stored webhook deliveries older than 30 days are deleted
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
