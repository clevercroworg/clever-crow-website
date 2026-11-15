import Link from "next/link";
import { AlertTriangle, CheckCircle2, PhoneOff, Settings } from "lucide-react";
import { requireSession } from "@/lib/admin/auth";
import { DEFAULT_ORG_ID, callingEnv } from "@/lib/calling/config";
import { providerReady } from "@/lib/calling/dispatcher";
import { maskPhone } from "@/lib/calling/phone";
import { getVoiceProvider } from "@/lib/calling/providers";
import { getCallingOverview, listCalls, listJobs } from "@/lib/calling/reports";
import { getSettings, listSuppressions } from "@/lib/calling/repository";
import { isDatabaseConfigured } from "@/lib/leads/db";
import PageHeader from "../_components/PageHeader";
import Pager from "../_components/Pager";
import SetupNotice from "../_components/SetupNotice";
import { formatDateTime, timeAgo } from "../_components/format";
import { DncForm, DncRemove, JobActions } from "./CallingActions";
import { CALL_STATUS_LABEL, CALL_STATUS_STYLE, JOB_STATUS_LABEL, JOB_STATUS_STYLE, OUTCOME_LABEL, Pill, duration } from "./labels";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";

export default async function CallsPage({ searchParams }: PageProps) {
  const session = await requireSession();
  const isAdmin = session.role === "admin";
  const sp = await searchParams;
  const tab = ["queue", "dnc"].includes(one(sp.tab)) && (isAdmin || one(sp.tab) === "queue") ? one(sp.tab) : "calls";
  const page = Math.max(1, Number(one(sp.page)) || 1);

  if (!isDatabaseConfigured()) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice />
      </main>
    );
  }

  const env = callingEnv();
  const settings = await getSettings(DEFAULT_ORG_ID);
  const provider = getVoiceProvider(env);
  const ready = providerReady(provider, settings, env);
  const live = env.enabled && settings.automationEnabled && ready;
  const [overview, calls, jobs, dnc] = await Promise.all([
    getCallingOverview(DEFAULT_ORG_ID, settings.timezone),
    tab === "calls" ? listCalls(DEFAULT_ORG_ID, page) : null,
    tab === "queue" ? listJobs(DEFAULT_ORG_ID, null) : null,
    tab === "dnc" && isAdmin ? listSuppressions(DEFAULT_ORG_ID) : null,
  ]);

  const tiles = [
    { label: "Calls today", value: overview.today.calls, foot: `${overview.today.connected} connected` },
    { label: "Answer rate", value: `${overview.today.answerRate}%`, foot: `Avg ${duration(overview.today.avgDurationSeconds)} talk` },
    { label: "Waiting", value: overview.jobs.queued ?? 0, foot: `${overview.jobs.needs_review ?? 0} need review`, warn: (overview.jobs.needs_review ?? 0) > 0 },
    { label: "This month", value: `₹${overview.month.cost.toLocaleString("en-IN")}`, foot: `${overview.month.minutes} billed min · excl. GST` },
  ];
  const tabs = [
    { key: "calls", label: "Call history" },
    { key: "queue", label: "Queue" },
    ...(isAdmin ? [{ key: "dnc", label: "Do-not-call" }] : []),
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        title="AI calls"
        description="Callbacks made by the AI voice assistant to people who asked for one."
        actions={
          isAdmin ? (
            <Link href="/team/leads-portal/calls/settings" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          ) : undefined
        }
      />

      <div className={`flex items-start gap-3 rounded-2xl border p-4 ${live ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
        {live ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" /> : <PhoneOff className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />}
        <div className="text-sm">
          <p className="font-semibold text-slate-900">{live ? "AI calling is on" : "AI calling is off"}</p>
          <p className="text-slate-700">
            {live
              ? `Calls ${settings.callingStart}–${settings.callingEnd}, up to ${settings.maxDailyCalls} a day.`
              : !env.enabled
                ? "The master switch (CALLING_ENABLED) is off on the server."
                : !ready
                  ? "Sarvam isn't fully set up yet. An admin can see what's missing in Settings."
                  : "Automation is turned off in Settings."}
          </p>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((t) => (
          <div key={t.label} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
              {t.warn && <AlertTriangle className="h-3.5 w-3.5 text-amber-600" aria-label="Needs attention" />}
              {t.label}
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-slate-900 sm:text-3xl">{t.value}</p>
            <p className="mt-auto pt-1 text-xs text-slate-500">{t.foot}</p>
          </div>
        ))}
      </section>

      <nav className="flex flex-wrap gap-1.5" aria-label="Calls sections">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={t.key === "calls" ? "/team/leads-portal/calls" : `/team/leads-portal/calls?tab=${t.key}`}
            aria-current={tab === t.key ? "page" : undefined}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${tab === t.key ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`}
          >
            {t.label}
          </Link>
        ))}
      </nav>

      {calls && (
        <>
          {calls.rows.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-sm text-slate-500">No AI calls yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {calls.rows.map((c) => (
                <li key={c.id}>
                  <Link href={`/team/leads-portal/calls/${c.id}`} className="flex flex-col gap-1.5 px-4 py-3 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-4">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-slate-900">{c.leadName || maskPhone(c.phone)}</span>
                      <span className="block truncate text-xs text-slate-500">
                        {formatDateTime(c.createdAt)} · {c.summary || (c.outcome ? OUTCOME_LABEL[c.outcome] : "No summary")}
                      </span>
                    </span>
                    <span className="flex shrink-0 flex-wrap items-center gap-2 text-xs text-slate-600">
                      {c.outcome && <span>{OUTCOME_LABEL[c.outcome] ?? c.outcome}</span>}
                      <span className="tabular-nums">{duration(c.durationSeconds)}</span>
                      {c.language && <span>{c.language}</span>}
                      <Pill label={CALL_STATUS_LABEL[c.status] ?? c.status} style={CALL_STATUS_STYLE[c.status] ?? CALL_STATUS_STYLE.initiated} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Pager page={calls.page} pages={calls.pages} total={calls.total} size={25} noun="calls" href={(p) => (p > 1 ? `/team/leads-portal/calls?page=${p}` : "/team/leads-portal/calls")} />
        </>
      )}

      {jobs && (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {jobs.length === 0 && <li className="px-6 py-14 text-center text-sm text-slate-500">Nothing in the queue.</li>}
          {jobs.map((j) => (
            <li key={j.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2">
                  {j.submissionId ? (
                    <Link href={`/team/leads-portal/leads/${j.submissionId}`} className="truncate font-medium text-slate-900 hover:text-amber-700">
                      {j.leadName || maskPhone(j.phone)}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-900">{maskPhone(j.phone)}</span>
                  )}
                  <Pill label={JOB_STATUS_LABEL[j.status] ?? j.status} style={JOB_STATUS_STYLE[j.status] ?? JOB_STATUS_STYLE.queued} />
                </p>
                <p className="text-xs text-slate-500">
                  Attempt {j.attempts}/{j.maxAttempts} · {j.status === "queued" ? `next ${formatDateTime(j.scheduledAt)}` : `updated ${timeAgo(j.updatedAt)}`}
                  {j.createdBy ? ` · by ${j.createdBy}` : ""}
                </p>
                {j.lastError && <p className="mt-0.5 break-words text-xs text-slate-600">{j.lastError}</p>}
              </div>
              {isAdmin && <JobActions id={j.id} status={j.status} />}
            </li>
          ))}
        </ul>
      )}

      {dnc && (
        <section className="space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm text-slate-600">Numbers here are never called by the AI. People who say &quot;don&apos;t call me&quot; on a call are added automatically.</p>
            <DncForm />
          </div>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {dnc.length === 0 && <li className="px-6 py-10 text-center text-sm text-slate-500">No numbers on the do-not-call list.</li>}
            {dnc.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="min-w-0">
                  <span className="block font-medium tabular-nums text-slate-900">{maskPhone(d.phone)}</span>
                  <span className="block truncate text-xs text-slate-500">
                    {d.reason} · {d.source === "agent_opt_out" ? "from an AI call" : `added by ${d.created_by ?? "admin"}`} · {timeAgo(d.created_at)}
                  </span>
                </span>
                <DncRemove id={d.id} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
