# Sarvam integration

Verified from Sarvam's official docs on 2026-11-15. Implementation: `lib/calling/providers/sarvam.ts`.

Sources:
- API introduction (base URLs, auth): https://docs.sarvam.ai/voice-agents/api/introduction
- Create outbound call: https://docs.sarvam.ai/voice-agents/api/instant-outbound/create
- Outbound webhook payload: https://docs.sarvam.ai/voice-agents/api/instant-outbound/webhook-payload
- Analytics attempts (call logs): https://docs.sarvam.ai/voice-agents/api/analytics/attempts
- Telephony: https://docs.sarvam.ai/voice-agents/deploy/telephony
- Pricing: https://docs.sarvam.ai/voice-agents/pricing
- Secrets: https://docs.sarvam.ai/voice-agents/settings/secrets

## Authentication
Header `X-API-Key: <workspace API key>`, created under Settings → API Key in the Sarvam dashboard. Org and workspace
IDs come from the dashboard URL or Settings.

## Start a call
`POST https://apps.sarvam.ai/api/outbounds/v1/orgs/{org_id}/workspaces/{workspace_id}/outbounds`

```json
{
  "app_config": {
    "app_id": "<agent id>",
    "app_version": 3,
    "connection_config": { "connection_id": "<telephony connection>", "agent_phone_number": "<calling number>" },
    "agent_variables": { "lead_name": "…", "enquiry_service": "…", "lead_company": "…" },
    "app_overrides": { "initial_language_name": "Kannada" }
  },
  "user_config": { "user_phone_number": "+919845012345" },
  "webhook_config": { "url": "https://www.clevercrow.in/api/calling/webhooks/sarvam/<token>", "metadata": { "job_id": 12, "org_id": 1, "sig": "…" } }
}
```
Response `200 { "attempt_id": "…" }`. Documented error: `422` validation (`detail[]`).

How we classify failures: 429 → retry later; 5xx, timeout, network drop or 200 without `attempt_id` → **needs review**
(may have been placed); other 4xx → failed (configuration problem).

## Result webhook
Sent once per attempt, connected or not:
`attempt_id`, `status` (`connected` | `no_answer` | `busy` | `failed`), `duration` (s, null if not connected),
`interaction_id`, `failure_reason`, `final_agent_variables`, `webhook_config.metadata` (ours, echoed),
`interaction_transcript[]` (`role`, `en_text`), `channel_info`, `app_id`, `app_version`.

We read our outcome and summary from agent variables the agent fills in (VOICE_AGENT.md): `call_outcome`,
`call_summary`, `detected_language`, `opt_out`, plus any qualification fields.

## Call logs (for checking "Needs review" jobs)
`GET https://apps.sarvam.ai/api/analytics/v1/{org_id}/{workspace_id}/{app_id}/attempts?start_datetime=…&end_datetime=…`
returns attempts with `attempt_id`, `connectivity_status`, `user_contact`, `duration_in_seconds`, timestamps. Not yet
automated; used manually through the Sarvam dashboard's call logs.

## Pricing (pay as you go, excl. GST)
Agent ₹3.50/min, billed per started minute. Sarvam telephony (Vobiz) ₹0.20 per started 30 s. Rented number ₹59 per
30 days. Bring-your-own telephony: billed by your provider. A 1-minute call ≈ ₹3.90.

## Open questions (confirm on the first test call)
1. **Phone number format.** Docs don't specify; webhook shows E.164. We send `+91XXXXXXXXXX`.
2. **Webhook authentication.** No signature documented. "Settings → Secrets" mentions webhook auth headers, but not
   for instant-outbound webhooks. We use a URL token + signed metadata (SECURITY.md).
3. **Webhook retries.** Delivery retry behaviour for instant outbound isn't documented (campaign webhooks have a
   delivery log and manual re-send). Our handler is idempotent either way.
4. **Rate limits** for the outbound endpoint aren't documented; we handle 429.
5. Whether unanswered attempts are billed.
