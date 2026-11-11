import Link from "next/link";
import { ChevronRight, Inbox, Mail, Phone } from "lucide-react";
import { requireAdmin } from "@/lib/admin/auth";
import { dashboardHref, parseFilters } from "@/lib/admin/filters";
import { isDatabaseConfigured } from "@/lib/leads/db";
import { CHANNELS } from "@/lib/leads/attribution";
import { FORM_TYPES, STATUSES, getStats, listSubmissions } from "@/lib/leads/queries";
import TopBar from "./_components/TopBar";
import ClickableRow from "./_components/ClickableRow";
import FilterBar from "./_components/FilterBar";
import Pagination from "./_components/Pagination";
import SetupNotice from "./_components/SetupNotice";
import { ChannelBadge, StatusBadge } from "./_components/Badges";
import { STATUS_LABELS, TYPE_LABELS, formatDate, formatTime, shortUrl, timeAgo } from "./_components/format";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function AdminDashboard({ searchParams }: PageProps) {
  await requireAdmin();
  const { filters, page, size } = parseFilters(await searchParams);

  if (!isDatabaseConfigured()) {
    return (
      <>
        <TopBar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <SetupNotice />
        </main>
      </>
    );
  }

  let stats: Awaited<ReturnType<typeof getStats>>;
  let result: Awaited<ReturnType<typeof listSubmissions>>;
  try {
    [stats, result] = await Promise.all([getStats(), listSubmissions(filters, page, size)]);
  } catch (error) {
    console.error("ADMIN: dashboard query failed", error);
    return (
      <>
        <TopBar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <SetupNotice error />
        </main>
      </>
    );
  }

  const currentQuery = dashboardHref(filters, { page: result.page, size: size === 25 ? undefined : size }, "");
  const detailHref = (id: number) => `/team/leads-portal/leads/${id}${currentQuery ? `?back=${encodeURIComponent(currentQuery)}` : ""}`;
  const exportHref = dashboardHref(filters, {}, "/api/leads-portal/export");
  const monthTotal = stats.channels.reduce((s, c) => s + c.count, 0);

  const statCards = [
    { label: "Today", value: stats.today },
    { label: "Last 7 days", value: stats.week },
    { label: "Last 30 days", value: stats.month },
    { label: "All time", value: stats.total },
    { label: "New (not handled)", value: stats.newCount, href: dashboardHref({}, { status: "new" }), accent: true },
  ];

  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-7xl space-y-5 px-4 py-5 sm:px-6 sm:py-6">
        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {statCards.map((c) => {
            const inner = (
              <>
                <p className="text-xs font-medium text-slate-500">{c.label}</p>
                <p className={`mt-0.5 text-xl sm:mt-1 sm:text-2xl font-semibold tabular-nums tracking-tight ${c.accent && c.value ? "text-amber-600" : ""}`}>
                  {c.value.toLocaleString("en-IN")}
                </p>
              </>
            );
            const cls = "rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm sm:p-4";
            return c.href ? (
              <Link key={c.label} href={c.href} className={`${cls} transition hover:border-amber-300 col-span-2 sm:col-span-1`}>
                {inner}
              </Link>
            ) : (
              <div key={c.label} className={cls}>
                {inner}
              </div>
            );
          })}
        </section>

        {/* Where leads came from, last 30 days */}
        {monthTotal > 0 && (
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="text-sm font-semibold">Where they came from</p>
              <p className="text-xs text-slate-500">Last 30 days · click to filter</p>
            </div>
            <div className="flex h-2.5 overflow-hidden rounded-full bg-slate-100">
              {stats.channels.map((c, i) => (
                <div
                  key={c.channel}
                  title={`${c.channel}: ${c.count}`}
                  style={{ width: `${(c.count / monthTotal) * 100}%` }}
                  className={["bg-blue-500", "bg-indigo-500", "bg-emerald-500", "bg-pink-500", "bg-orange-500", "bg-sky-500", "bg-violet-500", "bg-teal-500", "bg-slate-400"][i % 9]}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {stats.channels.map((c, i) => (
                <Link
                  key={c.channel}
                  href={dashboardHref({ ...filters }, { channel: c.channel, page: undefined })}
                  className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm hover:bg-slate-50 ${
                    filters.channel === c.channel ? "border-amber-400 bg-amber-50" : "border-slate-200"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${["bg-blue-500", "bg-indigo-500", "bg-emerald-500", "bg-pink-500", "bg-orange-500", "bg-sky-500", "bg-violet-500", "bg-teal-500", "bg-slate-400"][i % 9]}`}
                  />
                  <span className="text-slate-700">{c.channel}</span>
                  <span className="font-semibold tabular-nums">{c.count}</span>
                  <span className="text-xs text-slate-400">{Math.round((c.count / monthTotal) * 100)}%</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <FilterBar
          values={{ ...filters }}
          size={size}
          exportHref={exportHref}
          types={FORM_TYPES.map((t) => ({ value: t.value, label: t.label }))}
          channels={CHANNELS.map((c) => ({ value: c, label: c }))}
          statuses={STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
          forms={stats.formNames.map((f) => ({ value: f, label: f }))}
          pages={stats.pagePaths.map((p) => ({ value: p, label: p }))}
        />

        {/* Results */}
        {result.rows.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Inbox className="h-8 w-8 text-slate-300" />
            <p className="mt-3 font-medium">{stats.total === 0 ? "No submissions yet" : "Nothing matches these filters"}</p>
            <p className="mt-1 text-sm text-slate-500">
              {stats.total === 0
                ? "New form submissions from the website will show up here automatically."
                : "Try a different search or clear the filters."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <table className="w-full table-fixed text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50/80 text-xs font-medium uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="w-[13%] px-4 py-3">Received</th>
                    <th className="w-[20%] px-4 py-3">Name</th>
                    <th className="w-[22%] px-4 py-3">Contact</th>
                    <th className="w-[22%] px-4 py-3">Form &amp; page</th>
                    <th className="w-[14%] px-4 py-3">Source</th>
                    <th className="w-[9%] px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.rows.map((r) => (
                    <ClickableRow key={r.id} href={detailHref(r.id)}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-900">{formatDate(r.created_at)}</p>
                        <p className="text-xs text-slate-500">{formatTime(r.created_at)} · {timeAgo(r.created_at)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={detailHref(r.id)} className="block truncate font-medium text-slate-900 hover:text-amber-700">
                          {r.name || "—"}
                        </Link>
                        <p className="truncate text-xs text-slate-500">
                          {r.form_type !== "lead" ? TYPE_LABELS[r.form_type] : r.company || r.service || ""}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        {r.phone && (
                          <a href={`tel:${r.phone}`} className="flex items-center gap-1.5 truncate text-slate-700 hover:text-amber-700">
                            <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" /> {r.phone}
                          </a>
                        )}
                        {r.email && (
                          <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 truncate text-slate-700 hover:text-amber-700">
                            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" /> <span className="truncate">{r.email}</span>
                          </a>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="truncate text-slate-900">{r.form_name || "—"}</p>
                        <p className="truncate text-xs text-slate-500" title={r.page_url || ""}>{r.page_path || shortUrl(r.page_url) || "—"}</p>
                      </td>
                      <td className="px-4 py-3">
                        <ChannelBadge channel={r.channel} />
                        {(r.utm_campaign || r.utm_source) && (
                          <p className="mt-1 truncate text-xs text-slate-500" title={r.utm_campaign || r.utm_source || ""}>
                            {r.utm_campaign || r.utm_source}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={r.status} />
                      </td>
                    </ClickableRow>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="space-y-3 md:hidden">
              {result.rows.map((r) => (
                <li key={r.id} className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm active:bg-slate-50">
                  <Link href={detailHref(r.id)} className="absolute inset-0 rounded-2xl" aria-label={`Open ${r.name || "submission"}`} />
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">{r.name || "—"}</p>
                      <p className="truncate text-xs text-slate-500">
                        {timeAgo(r.created_at)} · {r.form_name || TYPE_LABELS[r.form_type]}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <StatusBadge status={r.status} />
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <ChannelBadge channel={r.channel} />
                    {r.page_path && <span className="truncate text-xs text-slate-500">{r.page_path}</span>}
                  </div>
                  {(r.phone || r.email) && (
                    <div className="relative z-10 mt-3 flex gap-2">
                      {r.phone && (
                        <a href={`tel:${r.phone}`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700">
                          <Phone className="h-4 w-4" /> Call
                        </a>
                      )}
                      {r.email && (
                        <a href={`mailto:${r.email}`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-700">
                          <Mail className="h-4 w-4" /> Email
                        </a>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}

        <Pagination filters={filters} page={result.page} pages={result.pages} size={size} total={result.total} />
      </main>
    </>
  );
}
