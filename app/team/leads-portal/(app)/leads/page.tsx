import Link from "next/link";
import { CalendarClock, ChevronRight, Inbox, Mail, Phone, UserRound } from "lucide-react";
import { requireSession } from "@/lib/admin/auth";
import { dashboardHref, parseFilters } from "@/lib/admin/filters";
import { listAssignableUsers } from "@/lib/admin/users";
import { CHANNELS } from "@/lib/leads/attribution";
import { isDatabaseConfigured } from "@/lib/leads/db";
import { FORM_TYPES, STATUSES, getStats, listSubmissions } from "@/lib/leads/queries";
import ClickableRow from "../_components/ClickableRow";
import FilterBar from "../_components/FilterBar";
import PageHeader from "../_components/PageHeader";
import Pagination from "../_components/Pagination";
import SetupNotice from "../_components/SetupNotice";
import { ChannelBadge, StatusBadge } from "../_components/Badges";
import { STATUS_LABELS, TYPE_LABELS, formatDate, formatDateTime, formatTime, isPast, shortUrl, timeAgo } from "../_components/format";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

function FollowUp({ iso, status }: { iso: string | null; status: string }) {
  if (!iso) return null;
  const overdue = isPast(iso) && !["won", "lost", "spam"].includes(status);
  return (
    <span className={`inline-flex items-center gap-1 text-xs ${overdue ? "font-semibold text-rose-600" : "text-slate-500"}`}>
      <CalendarClock className="h-3.5 w-3.5" />
      {overdue ? "Overdue · " : ""}
      {formatDateTime(iso)}
    </span>
  );
}

export default async function LeadsPage({ searchParams }: PageProps) {
  const session = await requireSession();
  const sp = await searchParams;
  if (sp.assigned === "me") sp.assigned = String(session.id);
  const { filters, page, size } = parseFilters(sp);

  if (!isDatabaseConfigured()) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice />
      </main>
    );
  }

  let stats: Awaited<ReturnType<typeof getStats>>;
  let result: Awaited<ReturnType<typeof listSubmissions>>;
  let users: Awaited<ReturnType<typeof listAssignableUsers>>;
  try {
    [stats, result, users] = await Promise.all([getStats(), listSubmissions(filters, page, size), listAssignableUsers()]);
  } catch (error) {
    console.error("ADMIN: leads query failed", error);
    return (
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice error />
      </main>
    );
  }

  const currentQuery = dashboardHref(filters, { page: result.page, size: size === 25 ? undefined : size }, "");
  const detailHref = (id: number) => `/team/leads-portal/leads/${id}${currentQuery ? `?back=${encodeURIComponent(currentQuery)}` : ""}`;
  const exportHref = session.role === "admin" ? dashboardHref(filters, {}, "/api/leads-portal/export") : undefined;
  const assignees = [
    { value: String(session.id), label: "Me" },
    { value: "none", label: "Unassigned" },
    ...users.filter((u) => u.id !== session.id).map((u) => ({ value: String(u.id), label: u.name })),
  ];

  const quick = [
    { label: "All", href: "/team/leads-portal/leads", on: !filters.status && !filters.assigned && !filters.followup },
    { label: "New", href: dashboardHref({}, { status: "new" }), on: filters.status === "new" && !filters.assigned },
    { label: "Mine", href: dashboardHref({}, { assigned: String(session.id) }), on: filters.assigned === String(session.id) && !filters.status },
    { label: "Unassigned", href: dashboardHref({}, { assigned: "none" }), on: filters.assigned === "none" && !filters.status },
    { label: "Overdue", href: dashboardHref({}, { followup: "overdue" }), on: filters.followup === "overdue" },
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader title="Leads" description={`${stats.total.toLocaleString("en-IN")} submissions in total · ${stats.newCount.toLocaleString("en-IN")} not handled yet`} />

      <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {quick.map((q) => (
          <Link
            key={q.label}
            href={q.href}
            className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              q.on ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            }`}
          >
            {q.label}
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <FilterBar
        values={{ ...filters }}
        size={size}
        exportHref={exportHref}
        assignees={assignees}
        types={FORM_TYPES.map((t) => ({ value: t.value, label: t.label }))}
        channels={CHANNELS.map((c) => ({ value: c, label: c }))}
        statuses={STATUSES.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
        forms={stats.formNames.map((f) => ({ value: f, label: f }))}
        pages={stats.pagePaths.map((p) => ({ value: p, label: p }))}
      />
      </div>

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
                  <th className="w-[12%] px-4 py-3">Received</th>
                  <th className="w-[19%] px-4 py-3">Name</th>
                  <th className="w-[19%] px-4 py-3">Contact</th>
                  <th className="w-[18%] px-4 py-3">Form &amp; page</th>
                  <th className="w-[13%] px-4 py-3">Source</th>
                  <th className="w-[11%] px-4 py-3">Owner</th>
                  <th className="w-[8%] px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {result.rows.map((r) => (
                  <ClickableRow key={r.id} href={detailHref(r.id)}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{formatDate(r.created_at)}</p>
                      <p className="text-xs text-slate-500">{formatTime(r.created_at)}</p>
                      <p className="text-xs text-slate-500">{timeAgo(r.created_at)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Link href={detailHref(r.id)} className="block truncate font-medium text-slate-900 hover:text-amber-700">
                        {r.name || "—"}
                      </Link>
                      <p className="truncate text-xs text-slate-500">
                        {r.form_type !== "lead" ? TYPE_LABELS[r.form_type] : r.company || r.service || ""}
                      </p>
                      <FollowUp iso={r.follow_up_at} status={r.status} />
                    </td>
                    <td className="px-4 py-3">
                      {r.phone && (
                        <a href={`tel:${r.phone}`} className="flex items-center gap-1.5 truncate text-slate-700 hover:text-amber-700">
                          <Phone className="h-3.5 w-3.5 shrink-0 text-slate-500" /> {r.phone}
                        </a>
                      )}
                      {r.email && (
                        <a href={`mailto:${r.email}`} className="flex items-center gap-1.5 truncate text-slate-700 hover:text-amber-700">
                          <Mail className="h-3.5 w-3.5 shrink-0 text-slate-500" /> <span className="truncate">{r.email}</span>
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
                      {r.assigned_name ? (
                        <span className="block truncate text-slate-700">{r.assigned_to === session.id ? "Me" : r.assigned_name}</span>
                      ) : (
                        <span className="text-xs text-slate-500">Unassigned</span>
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
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <UserRound className="h-3.5 w-3.5" />
                    {r.assigned_name ? (r.assigned_to === session.id ? "Me" : r.assigned_name) : "Unassigned"}
                  </span>
                  <FollowUp iso={r.follow_up_at} status={r.status} />
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
  );
}
