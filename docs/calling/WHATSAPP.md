# WhatsApp → AI callback (planned, not built)

Goal: when someone messages Clever Crow on WhatsApp asking for a call (or about a service), the system reads the
message, confirms they want a call, and queues an AI callback. The callback system already supports this; what's
missing is a way to **receive** WhatsApp messages.

## Why it isn't built yet
Messages in the normal WhatsApp or WhatsApp Business **app** can't be read by software. It needs the **WhatsApp Business
Platform (Cloud API)** from Meta, which sends each incoming message to our server as a webhook.

Needs:
1. Meta Business account, verified.
2. The business WhatsApp number connected to the Cloud API (directly with Meta, or through a provider such as Exotel or
   Twilio). Check whether "coexistence" lets you keep using the WhatsApp Business app on the same number; otherwise use a
   second number.
3. Webhook URL and app secret (Meta signs webhooks with `X-Hub-Signature-256`, so these can be verified properly).
4. Costs: replying to a customer within 24 hours of their message is free; business-started template messages are
   charged per message by Meta.

## Proposed flow
```
Customer: "Hi, I want a website, please call me"
  → Meta webhook → POST /api/whatsapp/webhook (signature verified)
  → lead created/updated (source: WhatsApp, phone from the sender)
  → auto-reply: "Thanks! Would you like a quick call from our AI assistant about this? Reply YES to get a call,
                 or STOP to opt out."
Customer: "YES"
  → callback consent recorded (source: whatsapp, version whatsapp-callback-v1, message id + time as evidence)
  → queue.captureCallbackRequest(...) → same dispatcher, limits, hours, opt-out and dashboard as website callbacks
```

Rules carried over:
- A message alone is **not** consent; only an explicit "YES" to the consent question is.
- "STOP" / "don't call" → do-not-call list.
- Messages are stored as part of the lead (text only).

## Effort once the Meta account is ready
About 2–3 days: webhook route with signature check, message storage, lead matching by phone, the consent reply, a
WhatsApp column on the lead page, and tests with Meta's test number.
