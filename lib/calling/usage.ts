// Usage and cost from the provider-reported duration. Rates live in calling_settings (never hard-coded here),
// and each usage record stores the pricing version used. Sarvam bills the agent per started 60s and its telephony
// per started 30s (https://docs.sarvam.ai/voice-agents/pricing).

export type Rates = { rateAgentPerMinute: number; rateTelephonyPer30s: number; pricingVersion: string };

export function computeUsage(durationSeconds: number | null | undefined, rates: Rates) {
  const seconds = Math.max(0, Math.round(Number(durationSeconds) || 0));
  const billableMinutes = seconds > 0 ? Math.ceil(seconds / 60) : 0;
  const telephonyPulses = seconds > 0 ? Math.ceil(seconds / 30) : 0;
  const round2 = (n: number) => Math.round(n * 100) / 100;
  const agentCost = round2(billableMinutes * rates.rateAgentPerMinute);
  const telephonyCost = round2(telephonyPulses * rates.rateTelephonyPer30s);
  return {
    durationSeconds: seconds,
    billableMinutes,
    telephonyPulses,
    agentCost,
    telephonyCost,
    totalCost: round2(agentCost + telephonyCost),
    currency: "INR",
    pricingVersion: rates.pricingVersion,
  };
}
