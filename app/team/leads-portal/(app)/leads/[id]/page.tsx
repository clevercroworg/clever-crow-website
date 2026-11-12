import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";
import { requireSession } from "@/lib/admin/auth";
import { isDatabaseConfigured } from "@/lib/leads/db";
import { getSubmission } from "@/lib/leads/queries";
import { listLeadActivity, ACTIVITY_LABELS } from "@/lib/admin/activity";
import { listAssignableUsers } from "@/lib/admin/users";
import SetupNotice from "../../_components/SetupNotice";
import { ChannelBadge, StatusBadge } from "../../_components/Badges";
import { TYPE_LABELS, formatDateTime, timeAgo, whatsappNumber } from "../../_components/format";
import { History } from "lucide-react";
import LeadActions from "./LeadActions";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  if (children === null || children === undefined || children === "" || children === false) return null;
  return (
    <div className="grid grid-cols-1 gap-0.5 py-2.5 sm:grid-cols-[170px_1fr] sm:gap-4">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="min-w-0 break-words text-sm text-slate-900">{children}</dd>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="mb-1 text-sm font-semibold text-slate-900">{title}</p>
      <dl className="divide-y divide-slate-100">{children}</dl>
    </section>
  );
}

function UrlValue({ url }: { url: string | null }) {
  if (!url) return null;
  const safe = /^https?:\/\//i.test(url);
  return safe ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-1 break-all text-amber-700 hover:underline">
      {url} <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
    </a>
  ) : (
    <span className="break-all">{url}</span>
  );
}

export default async function LeadDetailPage({ params, searchParams }: PageProps) {
  const session = await requireSession();
  const { id: rawId } = await params;
  const sp = await searchParams;
  const backRaw = typeof sp.back === "string" ? sp.back : "";
  const backHref = backRaw.startsWith("?") ? `/team/leads-portal/leads${backRaw}` : "/team/leads-portal/leads";

  if (!isDatabaseConfigured()) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice />
      </main>
    );
  }

  const id = Number(rawId);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();
  const [lead, history, users] = await Promise.all([getSubmission(id), listLeadActivity(id), listAssignableUsers()]);
  if (!lead) notFound();

  const wa = whatsappNumber(lead.phone);
  const extras = Object.entries(lead.extra || {});

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <Link href={backHref} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" /> All submissions
        </Link>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-2xl font-semibold tracking-tight">{lead.name || "Unnamed"}</p>
              <StatusBadge status={lead.status} />
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {TYPE_LABELS[lead.form_type] || lead.form_type} · {formatDateTime(lead.created_at)} ({timeAgo(lead.created_at)})
            </p>
          </div>
          <div className="flex gap-2">
            {lead.phone && (
              <a href={`tel:${lead.phone}`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:flex-none">
                <Phone className="h-4 w-4" /> Call
              </a>
            )}
            {wa && (
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 sm:flex-none">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            )}
            {lead.email && (
              <a href={`mailto:${lead.email}`} className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:flex-none">
                <Mail className="h-4 w-4" /> Email
              </a>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-4">
            <Card title="Contact">
              <Row label="Name">{lead.name}</Row>
              <Row label="Phone">{lead.phone && <a href={`tel:${lead.phone}`} className="text-amber-700 hover:underline">{lead.phone}</a>}</Row>
              <Row label="Email">{lead.email && <a href={`mailto:${lead.email}`} className="break-all text-amber-700 hover:underline">{lead.email}</a>}</Row>
              <Row label="Company / website">{lead.company}</Row>
            </Card>

            <Card title="Enquiry">
              <Row label="Form">{lead.form_name}</Row>
              <Row label={lead.form_type === "lead" ? "Service" : "Role"}>{lead.service}</Row>
              <Row label="Budget">{lead.budget}</Row>
              <Row label="Timeline">{lead.timeline}</Row>
              <Row label="Message">{lead.message && <span className="whitespace-pre-wrap">{lead.message}</span>}</Row>
              {extras.map(([k, v]) => (
                <Row key={k} label={k}>{v}</Row>
              ))}
              {!lead.form_name && !lead.service && !lead.message && extras.length === 0 && (
                <p className="py-2.5 text-sm text-slate-500">No extra details were filled in.</p>
              )}
            </Card>

            <Card title="Where they came from">
              <Row label="Source"><ChannelBadge channel={lead.channel} /></Row>
              <Row label="Submitted on page">{lead.page_url && <UrlValue url={lead.page_url} />}</Row>
              <Row label="First landed on">{lead.landing_url && <UrlValue url={lead.landing_url} />}</Row>
              <Row label="Came from (referrer)">{lead.referrer && <UrlValue url={lead.referrer} />}</Row>
              <Row label="UTM source">{lead.utm_source}</Row>
              <Row label="UTM medium">{lead.utm_medium}</Row>
              <Row label="UTM campaign">{lead.utm_campaign}</Row>
              <Row label="UTM term / keyword">{lead.utm_term}</Row>
              <Row label="UTM content / ad">{lead.utm_content}</Row>
              <Row label="Google Ads click ID">{lead.gclid && <code className="break-all text-xs">{lead.gclid}</code>}</Row>
              <Row label="Meta click ID">{lead.fbclid && <code className="break-all text-xs">{lead.fbclid}</code>}</Row>
            </Card>

            <Card title="Device & location">
              <Row label="Location">{[lead.city, lead.region, lead.country].filter(Boolean).join(", ")}</Row>
              <Row label="Device">{[lead.device, lead.os, lead.browser].filter(Boolean).join(" · ")}</Row>
              <Row label="Submission ID">#{lead.id}</Row>
            </Card>
          </div>

          <aside className="order-first lg:order-none lg:sticky lg:top-6 lg:self-start">
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <LeadActions
                id={lead.id}
                status={lead.status}
                notes={lead.notes || ""}
                assignedTo={lead.assigned_to}
                followUpAt={lead.follow_up_at}
                users={users}
                meId={session.id}
                backHref={backHref}
                canDelete={session.role === "admin"}
              />
              {lead.updated_by && lead.updated_at && (
                <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                  Last updated by <span className="font-medium text-slate-700">{lead.updated_by}</span> ·{" "}
                  {timeAgo(lead.updated_at)}
                </p>
              )}
            </section>

            <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                <History className="h-4 w-4 text-slate-500" /> History
              </p>
              <ol className="relative space-y-3 border-l border-slate-200 pl-4">
                <li className="relative">
                  <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-4 ring-white" />
                  <p className="text-sm text-slate-900">Submitted the {lead.form_name || "form"}</p>
                  <p className="text-xs text-slate-500">{formatDateTime(lead.created_at)}</p>
                </li>
                {history.map((h) => (
                  <li key={h.id} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                    <p className="text-sm text-slate-900">
                      <span className="font-medium">{h.user_name || "Someone"}</span> · {ACTIVITY_LABELS[h.action] || h.action}
                    </p>
                    {h.summary && <p className="break-words text-xs text-slate-600">{h.summary}</p>}
                    <p className="text-xs text-slate-500">{formatDateTime(h.created_at)}</p>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
}
