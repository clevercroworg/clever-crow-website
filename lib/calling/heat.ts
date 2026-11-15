// Lead "heat" (Hot / Warm / Cold) from an AI call: how long they talked and what the call revealed.
// Pure and transparent: every point added is listed in `reasons`, shown on the call page.
// Tune the weights here; docs/calling/HEAT.md explains them.

import type { CallOutcome } from "./types";

export type Heat = "hot" | "warm" | "cold";

export type HeatInput = {
  status: string; // provider call status
  durationSeconds: number | null;
  outcome: CallOutcome | null;
  variables: Record<string, unknown> | null; // agent variables (interest_level, timeline, budget…)
};

export type HeatResult = { heat: Heat; score: number; reasons: string[] } | null;

const OUTCOME_POINTS: Record<CallOutcome, number> = {
  interested: 40,
  wants_human_callback: 30,
  wants_more_info: 25,
  follow_up: 15,
  not_interested: -40,
  wrong_number: -100,
  do_not_call: -100,
};

const filled = (v: unknown) => typeof v === "string" && v.trim().length > 1 && !/^(no|none|na|n\/a|not sure|unknown)$/i.test(v.trim());

export function scoreHeat(input: HeatInput): HeatResult {
  // Only answered calls say anything about interest.
  if (input.status !== "connected") return null;

  const reasons: string[] = [];
  let score = 0;
  const add = (points: number, why: string) => {
    score += points;
    reasons.push(`${points > 0 ? "+" : ""}${points} ${why}`);
  };

  if (input.outcome) add(OUTCOME_POINTS[input.outcome], `outcome: ${input.outcome.replaceAll("_", " ")}`);

  // The agent's own read of the conversation.
  const level = String(input.variables?.interest_level ?? "").toLowerCase();
  if (level === "hot") add(30, "agent rated interest hot");
  else if (level === "warm") add(10, "agent rated interest warm");
  else if (level === "cold") add(-20, "agent rated interest cold");

  // Talk time: real conversations take time; very short calls rarely go anywhere.
  const d = input.durationSeconds ?? 0;
  if (d >= 90) add(20, `talked ${Math.round(d)}s`);
  else if (d >= 45) add(10, `talked ${Math.round(d)}s`);
  else if (d > 0 && d < 20) add(-10, `very short call (${Math.round(d)}s)`);

  // Concrete buying signals.
  const v = input.variables ?? {};
  if (filled(v.timeline)) add(10, "shared a timeline");
  if (filled(v.budget)) add(10, "shared a budget");
  if (filled(v.service_interest)) add(5, "named a service");

  score = Math.max(-100, Math.min(100, score));
  const heat: Heat = score >= 60 ? "hot" : score >= 30 ? "warm" : "cold";
  return { heat, score, reasons };
}

export const HEAT_LABEL: Record<Heat, string> = { hot: "Hot", warm: "Warm", cold: "Cold" };
