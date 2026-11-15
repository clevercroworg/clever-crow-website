# Compliance (India)

This is an engineering checklist, not legal advice. Confirm the points marked **Verify** with your telecom provider and,
if needed, a lawyer before going live.

## What the system already does
- Calls only people who **ticked a separate callback consent box**. A phone number on a form, a click on a phone link or a
  WhatsApp message alone is never treated as consent.
- Stores the exact wording, version, page, time and source of each consent. Consents are never deleted; withdrawals are
  timestamped.
- Callback consent is separate from marketing consent. The system makes **service callbacks only**, no promotional
  campaigns, no bulk imports.
- The agent says it's an AI assistant in its first sentence and never pretends to be human.
- Opt-out on a call ("don't call me") immediately adds the number to the do-not-call list and revokes consent.
  Staff can add numbers manually.
- Calls only within configured hours and days, with daily limits and a maximum number of attempts.
- No audio is stored by us; no payment details or OTPs are collected.

## Consent wording (version callback-v1)
> Yes, call me back about this enquiry. I understand the first call may be from Clever Crow's AI assistant, and I can ask
> it to stop calling at any time.

The box must be **unticked by default** and optional. To change the wording, add a new version in
`lib/calling/consent-text.ts`; never edit an existing one.

## Verify before going live
- [ ] TRAI rules for this call type (service/transactional callback requested by the customer) and the required
      number series / header for business calls. **Verify** with the telecom provider.
- [ ] Telecom provider KYC and number registration completed for the calling number.
- [ ] Whether a recording notice is needed (Sarvam records by default; if recordings are kept, say so in the opening line
      and the privacy policy).
- [ ] Privacy policy mentions AI callbacks, the provider (Sarvam) and how to opt out.
- [ ] DND (NCPR) handling: callbacks are requested by the customer, but confirm with the provider whether DND scrubbing
      still applies to your number type.
- [ ] Calling hours stay within what's considered reasonable (defaults: 10:00–19:00, Mon–Sat).
