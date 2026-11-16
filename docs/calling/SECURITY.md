# Security

| Threat | Control | Where |
|---|---|---|
| Form text used to manipulate the AI ("ignore your rules…") | Name, company and service are cleaned before reaching the agent: allowed characters only, length caps, instruction-like text and links dropped. The prompt treats them as data. Agent guardrails in VOICE_AGENT.md. | guardrails.ts |
| Someone types other people's numbers into the form to make the AI ring them | The form is public, so this can't be made impossible, only small and expensive: see **Abuse limits** below. Staff requests still need consent on record. Eligibility re-checked before dialling. | queue.ts, eligibility.ts, config.ts |
| Forged form consent | Consent text is chosen on the server by version; unknown versions are ignored. Indian mobile validation. | consent-text.ts, phone.ts |
| Fake webhook marks calls or changes leads | Secret path token (HMAC of `CALLING_WEBHOOK_SECRET`) + HMAC signature over `org:job` in metadata. Wrong token → 404, bad signature → 401. Constant-time comparisons. A result naming a call that was placed for a different job is refused (401). | security.ts, results.ts, webhook route |
| Replayed, late or conflicting webhooks | De-duplication on `provider:attempt_id:status`; usage insert is unique per call. One call has one result: a second, different status is ignored. A late result never reopens a job a person cancelled or one that already finished. | results.ts |
| Test provider left on in production | `CALLING_PROVIDER=mock` on the live site switches calling off completely and shows a warning in Settings. | config.ts |
| Runaway spend | Monthly budget (default ₹5,000, set in Settings): when this month's estimated cost reaches it, no new calls start. Plus daily, at-once and per-number limits. | dispatcher.ts |
| Form text injected into the team's emails | Every value in the lead, internship and call-alert emails is HTML-escaped; subjects are single-line and length-capped. SMTP certificates are verified. | api/leads, api/internship, notify.ts |
| Cron endpoint abuse | `Authorization: Bearer CRON_SECRET`, constant-time. The dispatcher only processes consented jobs, so even a leaked secret can't call new numbers. | dispatch route |
| Oversized or malformed payloads | 1 MB limit, JSON parse guard, strict shape validation, field length caps. | webhook route, sarvam.ts |
| Viewer changes settings / jobs / DNC | Admin-only routes and pages via the existing session + role checks; same-origin check on all dashboard APIs. | lib/admin/http.ts |
| Double calling after an unclear error | Ambiguous starts go to Needs review; jobs claimed with row locks under a per-organisation lock, so overlapping runs can't exceed the limits either. | dispatcher.ts, repository.ts |
| SQL injection | Parameterised queries only; settings columns from a fixed allow-list. | repository.ts |
| Secrets leaking | Secrets only in Vercel env vars; the API key is never sent to the browser or shown in settings; Sarvam IDs aren't secret. | config.ts |
| Personal data in logs | Phone numbers masked in activity log and lists; no audio stored; transcripts only in the protected dashboard. Raw webhook payloads are deleted after 30 days. Visitor IP addresses are never stored, only a keyed hash. | phone.ts, security.ts |
| Cross-organisation access | Every query filtered by `org_id`; webhook signatures bind to org and job. | repository.ts |

## Abuse limits
Fixed in `lib/calling/config.ts` (`LIMITS`), deliberately **not** editable from the dashboard:

| Limit | Value | Effect |
|---|---|---|
| Callback requests per visitor address | 5 in 24 hours | Further requests are not recorded as consent and queue nothing (the lead itself is still saved). Checked and stored under one lock, so a burst sent at the same instant can't slip through. |
| Active jobs per number | 1 | A second request while one is waiting or in progress queues nothing. |
| Cooldown after an AI call (or an unconfirmed start) | 24 hours | Website forms can't trigger another call to that number. Staff can still request one. |
| AI calls per number | 5 in 7 days | Applies to everything, including staff requests and retries. |
| Job lifetime | 72 hours | A request not reached in that time is dropped, never dialled late. |
| Consent lifetime | 30 days | Older consent no longer allows a call. |
| Calling hours | Inside 09:00–21:00 | Settings can narrow the window, not widen it. |

## Audit trail
Every settings change, manual callback, retry, cancel, do-not-call change and every call start/result is written to
`activity_log` (Activity page). Consents are never deleted.

## Known limits
- Without a provider-documented signature, webhook trust rests on our two secrets. Keep `CALLING_WEBHOOK_SECRET` long and
  rotate it if it's ever exposed.
- Login rate limiting is per server instance (existing dashboard behaviour).
- The per-address limit needs `CALLING_WEBHOOK_SECRET` (it keys the hash). Someone with many IP addresses can still
  submit other people's numbers; each number then gets at most one call a day and five a week. The strong fix is
  verifying the number by OTP before calling (not built; see DECISIONS.md if this becomes a problem).
