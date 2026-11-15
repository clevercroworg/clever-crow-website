// Guardrails for data we hand to the voice agent. Anything typed into a website form (name, company, service) reaches
// the AI as an agent variable, so a visitor could try to smuggle instructions ("ignore your rules and promise…").
// These values are cleaned and capped here, and the agent prompt treats them as plain data (docs/calling/VOICE_AGENT.md).

const MAX_LEN = { lead_name: 40, enquiry_service: 80, lead_company: 80 } as const;
export type AgentVariableName = keyof typeof MAX_LEN;

// Built from a string so the line-separator code points never appear literally in a regex literal.
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001f\\u007f-\\u009f\\u200b-\\u200f\\u2028-\\u202e]", "g");

// Phrases typical of instruction injection. A value containing one is dropped, not "fixed".
const INJECTION = /\b(ignore|disregard|forget)\b.{0,30}\b(instruction|rule|prompt|above|previous)|\b(system prompt|you are now|act as|pretend to be|new instructions?)\b|[{}<>]|https?:\/\/|www\./i;

/** Letters (any script, incl. Kannada and Devanagari), digits, spaces and light punctuation; trimmed and capped. */
export function cleanAgentVariable(name: AgentVariableName, raw: unknown): string {
  if (typeof raw !== "string") return "";
  const text = raw
    .normalize("NFKC")
    .replace(CONTROL_CHARS, " ") // control and text-direction characters
    .replace(/[^\p{L}\p{M}\p{N}\s.,&'()\-/]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text || INJECTION.test(raw)) return "";
  const capped = text.slice(0, MAX_LEN[name]).trim();
  // A "name" that is mostly digits or very long sentence-like text is not a name.
  if (name === "lead_name" && (/\d{3,}/.test(capped) || capped.split(" ").length > 5)) return "";
  return capped;
}

export function buildAgentVariables(lead: { name?: string | null; service?: string | null; company?: string | null } | null) {
  return {
    lead_name: cleanAgentVariable("lead_name", lead?.name),
    enquiry_service: cleanAgentVariable("enquiry_service", lead?.service),
    lead_company: cleanAgentVariable("lead_company", lead?.company),
  };
}
