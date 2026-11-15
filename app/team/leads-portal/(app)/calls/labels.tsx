// Display labels and colours for the Calls pages. Keep in sync with lib/calling/types.ts.

export const CALL_STATUS_LABEL: Record<string, string> = {
  initiated: "Calling…",
  connected: "Connected",
  no_answer: "No answer",
  busy: "Busy",
  failed: "Failed",
};

export const CALL_STATUS_STYLE: Record<string, string> = {
  initiated: "bg-blue-50 text-blue-700 ring-blue-200",
  connected: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  no_answer: "bg-amber-50 text-amber-800 ring-amber-200",
  busy: "bg-amber-50 text-amber-800 ring-amber-200",
  failed: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const OUTCOME_LABEL: Record<string, string> = {
  interested: "Interested",
  not_interested: "Not interested",
  wants_more_info: "Wants more info",
  wants_human_callback: "Wants a person to call",
  wrong_number: "Wrong number",
  do_not_call: "Asked not to be called",
  follow_up: "Follow up",
};

export const JOB_STATUS_LABEL: Record<string, string> = {
  queued: "Waiting",
  dispatching: "Starting",
  in_progress: "On a call",
  completed: "Done",
  failed: "Failed",
  cancelled: "Cancelled",
  needs_review: "Needs review",
};

export const JOB_STATUS_STYLE: Record<string, string> = {
  queued: "bg-slate-100 text-slate-700 ring-slate-200",
  dispatching: "bg-blue-50 text-blue-700 ring-blue-200",
  in_progress: "bg-blue-50 text-blue-700 ring-blue-200",
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  failed: "bg-rose-50 text-rose-700 ring-rose-200",
  cancelled: "bg-slate-100 text-slate-600 ring-slate-200",
  needs_review: "bg-amber-50 text-amber-800 ring-amber-300",
};

export function duration(seconds: number | null) {
  if (seconds === null || seconds === undefined) return "—";
  const s = Math.round(seconds);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

export function Pill({ label, style }: { label: string; style: string }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}>{label}</span>;
}
