import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireSession } from "@/lib/admin/auth";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import { maskPhone } from "@/lib/calling/phone";
import { getCallDetail } from "@/lib/calling/reports";
import { formatDateTime } from "../../_components/format";
import { CALL_STATUS_LABEL, CALL_STATUS_STYLE, HeatBadge, OUTCOME_LABEL, Pill, duration } from "../labels";

export const dynamic = "force-dynamic";

// Agent variables that are internal plumbing, not worth showing.
const HIDDEN_VARS = new Set(["call_summary", "call_outcome", "interest_level", "interest_reason", "detected_language", "opt_out"]);

export default async function CallDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireSession();
  // Transcripts and costs are for main logins only. Team logins get the summary, result and heat.
  const isAdmin = session.role === "admin";
  const id = Number((await params).id);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const call = await getCallDetail(DEFAULT_ORG_ID, id);
  if (!call) notFound();

  const extracted = Object.entries(call.variables ?? {}).filter(([k, v]) => !HIDDEN_VARS.has(k) && v !== null && v !== "" && typeof v !== "object");
  const card = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

  return (
    <main className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <Link href="/team/leads-portal/calls" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> All calls
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{call.leadName || maskPhone(call.phone)}</h1>
        <Pill label={CALL_STATUS_LABEL[call.status] ?? call.status} style={CALL_STATUS_STYLE[call.status] ?? CALL_STATUS_STYLE.initiated} />
        <HeatBadge heat={call.heat} score={call.heatScore} />
        {call.outcome && <span className="text-sm font-medium text-slate-700">{OUTCOME_LABEL[call.outcome] ?? call.outcome}</span>}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-5">
          <section className={card}>
            <h2 className="text-sm font-semibold text-slate-900">Summary</h2>
            <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-700">{call.summary || "No summary was recorded for this call."}</p>
            {call.followUp && <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">Follow-up needed: a team member should contact this person.</p>}
          </section>

          {call.heat && (
            <section className={card}>
              <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                Why this lead is <HeatBadge heat={call.heat} score={call.heatScore} />
              </h2>
              {typeof call.variables?.interest_reason === "string" && call.variables.interest_reason && (
                <p className="mt-2 text-[15px] text-slate-700">&ldquo;{call.variables.interest_reason}&rdquo; <span className="text-xs text-slate-500">(AI assistant)</span></p>
              )}
              <ul className="mt-2 space-y-1 text-sm text-slate-600">
                {call.heatReasons.map((r) => (
                  <li key={r} className="tabular-nums">
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-slate-500">Score out of 100: 60+ is Hot, 30–59 Warm, below 30 Cold.</p>
            </section>
          )}

          {isAdmin && (
          <section className={card}>
            <h2 className="text-sm font-semibold text-slate-900">Transcript</h2>
            <p className="mb-3 text-xs text-slate-500">English text as provided by Sarvam (translated if the call was in another language).</p>
            {call.transcript.length ? (
              <ol className="space-y-2.5">
                {call.transcript.map((t, i) => (
                  <li key={i} className={`flex ${t.role === "agent" ? "justify-start" : "justify-end"}`}>
                    <span className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${t.role === "agent" ? "bg-slate-100 text-slate-800" : "bg-amber-100 text-slate-900"}`}>
                      <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-500">{t.role === "agent" ? "AI assistant" : "Caller"}</span>
                      {t.text}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-slate-500">{call.status === "connected" ? "No transcript received." : "The call didn't connect, so there is no transcript."}</p>
            )}
          </section>
          )}
        </div>

        <aside className="min-w-0 space-y-5">
          <section className={card}>
            <dl className="space-y-2.5 text-sm">
              {[
                ["Lead", call.submissionId ? <Link key="l" href={`/team/leads-portal/leads/${call.submissionId}`} className="font-medium text-amber-700 hover:underline">Open lead</Link> : "—"],
                ["Number", maskPhone(call.phone)],
                ["Started", formatDateTime(call.createdAt)],
                ["Result received", call.resultAt ? formatDateTime(call.resultAt) : "Waiting"],
                ["Duration", duration(call.durationSeconds)],
                ["Language", call.language ?? "—"],
                ...(isAdmin ? [["Cost", call.usage ? `₹${call.usage.cost.toFixed(2)} (${call.usage.minutes} min)` : "—"]] : []),
                ["Failure", call.failureReason ?? "—"],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex justify-between gap-3">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="min-w-0 break-words text-right text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
          {extracted.length > 0 && (
            <section className={card}>
              <h2 className="mb-2 text-sm font-semibold text-slate-900">Details collected</h2>
              <dl className="space-y-2 text-sm">
                {extracted.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-slate-500">{k.replaceAll("_", " ")}</dt>
                    <dd className="break-words text-slate-900">{String(v)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          <p className="break-all px-1 text-[11px] text-slate-400">
            {call.provider} attempt {call.providerAttemptId}
            {call.interactionId ? ` · interaction ${call.interactionId}` : ""}
          </p>
        </aside>
      </div>
    </main>
  );
}
