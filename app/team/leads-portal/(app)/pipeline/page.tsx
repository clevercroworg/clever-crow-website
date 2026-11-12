import Link from "next/link";
import { requireSession } from "@/lib/admin/auth";
import { PIPELINE_COLUMN_LIMIT, getPipeline } from "@/lib/leads/analytics";
import { isDatabaseConfigured } from "@/lib/leads/db";
import PageHeader from "../_components/PageHeader";
import SetupNotice from "../_components/SetupNotice";
import PipelineBoard from "./PipelineBoard";

export const dynamic = "force-dynamic";

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function PipelinePage({ searchParams }: PageProps) {
  const session = await requireSession();
  const sp = await searchParams;
  const raw = (Array.isArray(sp.assigned) ? sp.assigned[0] : sp.assigned) || "";
  const view = raw === "me" || raw === "none" ? raw : "all";

  if (!isDatabaseConfigured()) {
    return (
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice />
      </main>
    );
  }

  const assigned = view === "me" ? String(session.id) : view === "none" ? "none" : undefined;
  let columns: Awaited<ReturnType<typeof getPipeline>>;
  try {
    columns = await getPipeline({ assigned });
  } catch (error) {
    console.error("ADMIN: pipeline query failed", error);
    return (
      <main className="px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice error />
      </main>
    );
  }

  const tabs = [
    { key: "all", label: "Everyone" },
    { key: "me", label: "Mine" },
    { key: "none", label: "Unassigned" },
  ];

  return (
    <main className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        title="Pipeline"
        description={`Drag a lead to another column to change its status (on a phone, use the menu on each card). Leads only, newest first; ${PIPELINE_COLUMN_LIMIT} per column at a time.`}
        actions={
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5 text-sm">
            {tabs.map((t) => (
              <Link
                key={t.key}
                href={t.key === "all" ? "/team/leads-portal/pipeline" : `/team/leads-portal/pipeline?assigned=${t.key}`}
                className={`rounded-md px-3 py-1 font-medium ${view === t.key ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {t.label}
              </Link>
            ))}
          </div>
        }
      />
      <PipelineBoard key={view} columns={columns} meId={session.id} assigned={assigned} />
    </main>
  );
}
