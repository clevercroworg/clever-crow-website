# Security

| Threat | Control | Where |
|---|---|---|
| Form text used to manipulate the AI ("ignore your rules…") | Name, company and service are cleaned before reaching the agent: allowed characters only, length caps, instruction-like text and links dropped. The prompt treats them as data. Agent guardrails in VOICE_AGENT.md. | guardrails.ts |
| Someone triggers calls to arbitrary numbers | No public endpoint starts calls. Calls only come from jobs, jobs only from consented callback requests or signed-in staff (who still need consent on record). Eligibility re-checked before dialling. | queue.ts, eligibility.ts |
| Forged form consent | Consent text is chosen on the server by version; unknown versions are ignored. Indian mobile validation. | consent-text.ts, phone.ts |
| Fake webhook marks calls or changes leads | Secret path token (HMAC of `CALLING_WEBHOOK_SECRET`) + HMAC signature over `org:job` in metadata. Wrong token → 404, bad signature → 401. Constant-time comparisons. | security.ts, webhook route |
| Replayed / duplicated webhooks | De-duplication on `provider:attempt_id:status`; usage insert is unique per call. | results.ts |
| Cron endpoint abuse | `Authorization: Bearer CRON_SECRET`, constant-time. The dispatcher only processes consented jobs, so even a leaked secret can't call new numbers. | dispatch route |
| Oversized or malformed payloads | 1 MB limit, JSON parse guard, strict shape validation, field length caps. | webhook route, sarvam.ts |
| Viewer changes settings / jobs / DNC | Admin-only routes and pages via the existing session + role checks; same-origin check on all dashboard APIs. | lib/admin/http.ts |
| Double calling after an unclear error | Ambiguous starts go to Needs review; jobs claimed with row locks. | dispatcher.ts, repository.ts |
| SQL injection | Parameterised queries only; settings columns from a fixed allow-list. | repository.ts |
| Secrets leaking | Secrets only in Vercel env vars; the API key is never sent to the browser or shown in settings; Sarvam IDs aren't secret. | config.ts |
| Personal data in logs | Phone numbers masked in activity log and lists; no audio stored; transcripts only in the protected dashboard. | phone.ts |
| Cross-organisation access | Every query filtered by `org_id`; webhook signatures bind to org and job. | repository.ts |

## Audit trail
Every settings change, manual callback, retry, cancel, do-not-call change and every call start/result is written to
`activity_log` (Activity page). Consents are never deleted.

## Known limits
- Without a provider-documented signature, webhook trust rests on our two secrets. Keep `CALLING_WEBHOOK_SECRET` long and
  rotate it if it's ever exposed.
- Login rate limiting is per server instance (existing dashboard behaviour).
