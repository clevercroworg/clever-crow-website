# Operations

## Stop all calls immediately
Fastest: dashboard → AI calls → Settings → untick **AI calling on** → Save. Takes effect on the next call start (jobs
already ringing finish). Emergency at server level: set `CALLING_ENABLED=false` in Vercel and redeploy.

## Daily check (first weeks)
AI calls page:
- **Needs review** count should be 0. For each: open Sarvam → call logs, search the number around that time.
  - If Sarvam shows the call happened, **Cancel** the job (the person was called).
  - If not, **Retry**.
- **Answer rate** and outcomes look sensible; read a few transcripts.
- **This month** cost is within budget.

Settings → System health: all green, and "Last webhook" recent on calling days.

## Common situations
| Situation | What to do |
|---|---|
| Someone asks by phone/WhatsApp not to be called | AI calls → Do-not-call → add the number |
| A lead wants a callback but didn't tick the box | They must ask through the form (with the box). Staff can call them personally. |
| Job "failed" with "Sarvam rejected the call (4xx)" | Configuration problem: check Sarvam IDs, version and number in Settings |
| Many "no answer" | Try different calling hours; check the agent number isn't being flagged as spam |
| Webhook errors in health panel | Check `CALLING_WEBHOOK_SECRET` hasn't changed mid-call; re-send from Sarvam if possible |
| Need to change calling hours | Settings, and also the cron schedule in `vercel.json` (SETUP.md step 8) |

## Costs
Settings → Cost rates must match your Sarvam plan. Estimates are excl. GST. A 1-minute call ≈ ₹3.90; 100 calls/day of
about a minute ≈ ₹12,000/month plus number rental. Check Sarvam's billing page monthly; the dashboard figure is an
estimate from durations.

## Deploys and rollback
Deploying never interrupts calls (ARCHITECTURE.md → Deploys). If a deploy breaks calling: Vercel → Deployments →
previous deployment → Instant Rollback. The database tables are only ever added, so rollback is safe.

## Changing the agent
Build and test a new version in Sarvam, then update **Agent version** in Settings. Old calls keep their history.
