import Link from "next/link";
import { AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, CalendarClock, Minus } from "lucide-react";
import { requireSession } from "@/lib/admin/auth";
import { dashboardHref } from "@/lib/admin/filters";
import { RANGES, getOverview, parseRange } from "@/lib/leads/analytics";
import { isDatabaseConfigured } from "@/lib/leads/db";
import BarList from "./_components/BarList";
import LeadsChart from "./_components/LeadsChart";
import PageHeader from "./_components/PageHeader";
import SetupNotice from "./_components/SetupNotice";
import { ChannelBadge, StatusBadge } from "./_components/Badges";
import { STATUS_LABELS, formatDateTime, isPast, timeAgo } from "./_components/format";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const FUNNEL = ["new", "contacted", "qualified", "won", "lost", "spam"];

function Card({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Change({ now, before }: { now: number; before: number }) {
  if (!before && !now) return <span className="text-xs text-slate-500">Same as before</span>;
  if (!before) return <span className="text-xs text-slate-500">No leads before</span>;
  const pct = Math.round(((now - before) / before) * 100);
  const Icon = pct > 0 ? ArrowUpRight : pct < 0 ? ArrowDownRight : Minus;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${pct > 0 ? "text-emerald-700" : pct < 0 ? "text-rose-600" : "text-slate-500"}`}>
      <Icon className="h-3.5 w-3.5" />
      {pct > 0 ? "+" : ""}
      {pct}% vs before
    </span>
  );
}

export default async function OverviewPage({ searchParams }: PageProps) {
  const session = await requireSession();
  const sp = await searchParams;
  const range = parseRange(sp);

  if (!isDatabaseConfigured()) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice />
      </main>
    );
  }

  let o: Awaited<ReturnType<typeof getOverview>>;
  try {
    o = await getOverview(range, session.id);
  } catch (error) {
    console.error("ADMIN: overview query failed", error);
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice error />
      </main>
    );
  }

  const inRange = { from: range.from, to: range.to, type: "lead" };
  const leadsLink = (extra: Record<string, string>) => dashboardHref({}, { ...inRange, ...extra });
  const closed = o.won + o.lost;
  const firstName = session.name.split(/[\s@]/)[0];

  const tiles = [
    { label: "Leads", value: o.leads, foot: <Change now={o.leads} before={o.prevLeads} />, href: leadsLink({}) },
    {
      label: "Not handled yet",
      value: o.openNew,
      foot: <span className="text-xs text-slate-500">Status “New”</span>,
      href: dashboardHref({}, { status: "new" }),
      warn: o.openNew > 0,
    },
    {
      label: "Won",
      value: o.won,
      foot: <span className="text-xs text-slate-500">{closed ? `${Math.round((o.won / closed) * 100)}% win rate` : "None closed yet"}</span>,
      href: leadsLink({ status: "won" }),
    },
    {
      label: "Overdue",
      value: o.overdue,
      foot: <span className="text-xs text-slate-500">Follow-ups past due</span>,
      href: dashboardHref({}, { followup: "overdue" }),
      warn: o.overdue > 0,
    },
  ];

  const statusRows = FUNNEL.map((s) => ({ status: s, count: o.statuses.find((x) => x.label === s)?.count || 0 }));
  const statusMax = Math.max(1, ...statusRows.map((s) => s.count));

  return (
    <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        title={`Hi ${firstName}`}
        description={`${range.label} · leads from website forms${o.applications ? ` (plus ${o.applications} job / internship application${o.applications === 1 ? "" : "s"})` : ""}`}
        actions={
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
            <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-sm">
              {RANGES.map((r) => (
                <Link
                  key={r.value}
                  href={r.value === "30d" ? "/team/leads-portal" : `/team/leads-portal?range=${r.value}`}
                  className={`flex-1 rounded-md px-3 py-1.5 text-center font-medium sm:flex-none ${range.key === r.value ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  {r.value === "365d" ? "12m" : r.value}
                </Link>
              ))}
            </div>
            <form method="get" action="/team/leads-portal" className="grid grid-cols-2 gap-2 text-sm sm:flex sm:items-center sm:gap-1">
              <input type="date" name="from" defaultValue={range.from} required className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700" aria-label="From date" />
              <input type="date" name="to" defaultValue={range.to} required className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700" aria-label="To date" />
              <button type="submit" className="col-span-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">
                Apply dates
              </button>
            </form>
          </div>
        }
      />

      {/* KPI tiles */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.label} href={t.href} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300">
            <p className="flex items-center gap-1.5 text-[13px] font-medium text-slate-600">
              {t.warn && <AlertTriangle className="h-3.5 w-3.5 text-amber-600" aria-label="Needs attention" />}
              {t.label}
            </p>
            <p className="mt-1 text-3xl font-semibold tabular-nums tracking-tight text-slate-900">{t.value.toLocaleString("en-IN")}</p>
            <div className="mt-auto pt-1">{t.foot}</div>
          </Link>
        ))}
      </section>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="min-w-0 space-y-5 xl:col-span-2">
          <Card title="Leads per day" subtitle={range.days > 92 ? "Grouped by week" : "Hover or tap a column for the exact number"}>
            <LeadsChart data={o.perDay} />
          </Card>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Card title="Where leads came from" subtitle="By source channel · click to see them">
              <BarList rows={o.channels} href={(c) => leadsLink({ channel: c })} />
            </Card>
            <Card title="Status of these leads" subtitle="Pipeline stage today">
              {o.leads ? (
                <ul className="space-y-2">
                  {statusRows.map((s) => (
                    <li key={s.status}>
                      <Link href={leadsLink({ status: s.status })} className="flex items-center gap-3 rounded-md px-1 py-0.5 text-sm hover:bg-slate-50">
                        <span className="w-24 shrink-0">
                          <StatusBadge status={s.status} />
                        </span>
                        <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <span className="absolute inset-y-0 left-0 rounded-full bg-[#2a78d6]" style={{ width: `${(s.count / statusMax) * 100}%` }} />
                        </span>
                        <span className="w-8 shrink-0 text-right font-semibold tabular-nums text-slate-900">{s.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-6 text-center text-sm text-slate-500">No leads in this period.</p>
              )}
            </Card>
            <Card title="Top landing pages" subtitle="Page the form was submitted on">
              <BarList rows={o.pages} href={(p) => leadsLink({ page_path: p })} />
            </Card>
            <Card title="Top forms">
              <BarList rows={o.forms} href={(f) => leadsLink({ form: f })} />
            </Card>
          </div>
        </div>

        <div className="min-w-0 space-y-5">
          <Card
            title="Follow-ups due"
            subtitle="Overdue and due today · yours first"
            action={
              <Link href={dashboardHref({}, { followup: "any" })} className="text-xs font-medium text-slate-500 hover:text-slate-900">
                All
              </Link>
            }
          >
            {o.followUps.length ? (
              <ul className="divide-y divide-slate-100">
                {o.followUps.map((f) => {
                  const overdue = isPast(f.follow_up_at);
                  return (
                    <li key={f.id}>
                      <Link href={`/team/leads-portal/leads/${f.id}`} className="flex items-start justify-between gap-3 py-2.5 hover:bg-slate-50">
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium text-slate-900">{f.name || "Unnamed"}</span>
                          <span className={`flex items-center gap-1 text-xs ${overdue ? "font-semibold text-rose-600" : "text-slate-500"}`}>
                            <CalendarClock className="h-3.5 w-3.5" />
                            {overdue ? "Overdue · " : "Today · "}
                            {formatDateTime(f.follow_up_at)}
                          </span>
                        </span>
                        <span className="shrink-0 text-xs text-slate-500">
                          {f.assigned_to === session.id ? "Me" : f.assigned_name || "Unassigned"}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-6 text-center text-sm text-slate-500">Nothing due. Set follow-up dates on leads to see them here.</p>
            )}
          </Card>

          <Card
            title="Latest leads"
            action={
              <Link href="/team/leads-portal/leads" className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-900">
                All leads <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          >
            {o.recent.length ? (
              <ul className="divide-y divide-slate-100">
                {o.recent.map((r) => (
                  <li key={r.id}>
                    <Link href={`/team/leads-portal/leads/${r.id}`} className="flex items-center justify-between gap-3 py-2.5 hover:bg-slate-50">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-900">{r.name || "Unnamed"}</span>
                        <span className="block truncate text-xs text-slate-500">
                          {timeAgo(r.created_at)} · {r.form_name || "Form"}
                        </span>
                      </span>
                      <span className="flex shrink-0 flex-col items-end gap-1">
                        <StatusBadge status={r.status} />
                        <ChannelBadge channel={r.channel} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-6 text-center text-sm text-slate-500">No leads yet. They appear here as soon as someone fills a form.</p>
            )}
          </Card>

          <Card title="Statuses explained">
            <dl className="space-y-1.5 text-xs text-slate-600">
              {FUNNEL.map((s) => (
                <div key={s} className="flex gap-2">
                  <dt className="w-20 shrink-0 font-medium text-slate-800">{STATUS_LABELS[s]}</dt>
                  <dd>
                    {
                      {
                        new: "Just came in, nobody has acted yet.",
                        contacted: "We called, messaged or emailed them.",
                        qualified: "Real need and budget; worth pursuing.",
                        won: "Became a client.",
                        lost: "Not going ahead.",
                        spam: "Junk or test submission.",
                      }[s]
                    }
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </main>
  );
}
