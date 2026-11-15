# Setup: from zero to live

Do the steps in order. Nothing here places a call until step 7.

## 1. Vercel Pro (iammanojdigital account)
Vercel → the team → Settings → Billing → upgrade to **Pro** ($20/month). Needed for the per-minute cron (the free plan
allows daily cron jobs only, and is for non-commercial use).

## 2. Sarvam account and API key
1. Sign up at https://indus.sarvam.ai/samvaad (choose a plan; pay-as-you-go is ₹3.50/min).
2. Settings → API Key → create a key. Copy it once; it goes into Vercel only (step 5).
3. Copy the **org ID** and **workspace ID** (dashboard URL or Settings).

## 3. Build the agent
Build → new agent. Use the prompt and variables in [VOICE_AGENT.md](./VOICE_AGENT.md). Enable English, Kannada and
Hindi. Test it in Sarvam's test agent. Publish a version. Copy the **agent (app) ID** (··· → Copy agent ID) and the
**version number**.

## 4. Telephony
Either:
- **Rent from Sarvam:** Deploy → Phone Numbers → rent a number (₹59 per 30 days, calls ₹0.20 per 30 s), or
- **Bring your own:** connect Exotel or Vobiz (Deploy → Telephony → provider guide).

Copy the **connection ID** and the **agent phone number**. Confirm the number is approved for this kind of call with the
telecom provider (COMPLIANCE.md).

## 5. Environment variables (Vercel → clever-crow-website → Settings → Environment Variables, Production)
| Name | Value | Secret? |
|---|---|---|
| `SARVAM_API_KEY` | From step 2 | Yes (Sensitive) |
| `CALLING_WEBHOOK_SECRET` | A random string, at least 32 characters (e.g. `openssl rand -base64 48`) | Yes (Sensitive) |
| `CRON_SECRET` | Another random string | Yes (Sensitive) |
| `CALLING_ENABLED` | `false` for now (master switch) | No |
| `CALLING_PROVIDER` | `sarvam` (only use `mock` for tests) | No |
| `CALLING_PUBLIC_BASE_URL` | `https://www.clevercrow.in` | No |

Never put these in code, Git, chat or the browser. Rotating `CALLING_WEBHOOK_SECRET` changes the webhook URL
automatically for new calls; results for calls already in progress will then be rejected, so rotate outside calling hours.

## 6. Sarvam IDs in the dashboard
Leads dashboard → AI calls → Settings → "Sarvam connection": org ID, workspace ID, agent ID, version, connection ID,
agent phone number. Set calling hours, days, a daily limit of about 20, and 2 calls at once. Leave "AI calling on" OFF.
The System health panel should then show everything green except the master switch.

## 7. First real test call (approved, one call only)
1. Add the callback box to one form (IMPLEMENTATION_PLAN.md phase 4), or use a test lead.
2. Set `CALLING_ENABLED=true` in Vercel and redeploy.
3. Settings → turn "AI calling on" ON.
4. A team member submits the form with their own mobile and ticks the box.
5. Check: the phone rings, the AI introduces itself, the result appears under AI calls with a transcript and summary.
6. Turn "AI calling on" OFF again and review before continuing.

## 8. Cron (after the test call works)
Add to `vercel.json` and deploy (Pro required, otherwise the deploy fails):
```json
"crons": [{ "path": "/api/calling/dispatch", "schedule": "* 4-13 * * 1-6" }]
```
That's every minute, 04:00–13:59 UTC = 09:30–19:29 IST, Monday–Saturday. It keeps the free database within its monthly
hours (DECISIONS.md D2). Adjust if calling hours change. Vercel adds the `CRON_SECRET` header automatically.

## 9. Go live
Turn AI calling on. Watch the AI calls page daily for a week (OPERATIONS.md), then raise the daily limit.
