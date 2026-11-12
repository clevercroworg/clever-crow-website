import Link from "next/link";
import { requireSession } from "@/lib/admin/auth";
import { ACTIVITY_LABELS, ACTIVITY_PAGE_SIZE, listActivity } from "@/lib/admin/activity";
import { listUsers } from "@/lib/admin/users";
import PageHeader from "../_components/PageHeader";
import Pager from "../_components/Pager";
import SetupNotice from "../_components/SetupNotice";
import { formatDateTime, timeAgo } from "../_components/format";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || "";
// "Exported CSV" -> "exported CSV" (only the first letter, so acronyms stay readable)
const verb = (label: string) => label.charAt(0).toLowerCase() + label.slice(1);

export default async function ActivityPage({ searchParams }: PageProps) {
  await requireSession("admin");
  const sp = await searchParams;
  const user = Number(one(sp.user)) || undefined;
  const action = ACTIVITY_LABELS[one(sp.action)] ? one(sp.action) : undefined;
  const page = Math.max(1, Number(one(sp.page)) || 1);

  let data: Awaited<ReturnType<typeof listActivity>>;
  let users: Awaited<ReturnType<typeof listUsers>>;
  try {
    [data, users] = await Promise.all([listActivity({ user, action }, page), listUsers()]);
  } catch (error) {
    console.error("ADMIN: activity query failed", error);
    return (
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice error />
      </main>
    );
  }

  const href = (p: number) => {
    const q = new URLSearchParams();
    if (user) q.set("user", String(user));
    if (action) q.set("action", action);
    if (p > 1) q.set("page", String(p));
    const s = q.toString();
    return `/team/leads-portal/activity${s ? `?${s}` : ""}`;
  };
  const select = "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900";

  return (
    <main className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader title="Activity" description="Everything people did in the dashboard: sign-ins, lead changes, exports and login changes." />

      <form method="get" className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
        <label className="text-xs font-medium text-slate-500">
          <span className="mb-1 block">Person</span>
          <select name="user" defaultValue={user ? String(user) : ""} className={select}>
            <option value="">Everyone</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium text-slate-500">
          <span className="mb-1 block">Action</span>
          <select name="action" defaultValue={action || ""} className={select}>
            <option value="">Everything</option>
            {Object.entries(ACTIVITY_LABELS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          Apply
        </button>
        {(user || action) && (
          <Link href="/team/leads-portal/activity" className="px-2 py-2 text-sm font-medium text-slate-500 hover:text-slate-900">
            Clear
          </Link>
        )}
      </form>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {data.rows.length ? (
          <ul className="divide-y divide-slate-100">
            {data.rows.map((a) => (
              <li key={a.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-slate-900">
                    <span className="font-medium">{a.user_name || "Someone"}</span>{" "}
                    <span className="text-slate-600">{verb(ACTIVITY_LABELS[a.action] || a.action)}</span>
                    {a.submission_id && (
                      <>
                        {" · "}
                        {a.lead_name !== undefined && a.action !== "lead.delete" ? (
                          <Link href={`/team/leads-portal/leads/${a.submission_id}`} className="font-medium text-amber-700 hover:underline">
                            {a.lead_name || `Lead #${a.submission_id}`}
                          </Link>
                        ) : (
                          <span className="text-slate-500">Lead #{a.submission_id}</span>
                        )}
                      </>
                    )}
                  </p>
                  {a.summary && <p className="break-words text-xs text-slate-500">{a.summary}</p>}
                </div>
                <p className="shrink-0 text-xs text-slate-500" title={formatDateTime(a.created_at)}>
                  {timeAgo(a.created_at)}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-4 py-12 text-center text-sm text-slate-500">No activity yet.</p>
        )}
      </section>

      <Pager page={data.page} pages={data.pages} total={data.total} size={ACTIVITY_PAGE_SIZE} href={href} noun="entries" />
    </main>
  );
}
