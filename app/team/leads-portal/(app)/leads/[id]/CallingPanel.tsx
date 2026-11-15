import Link from "next/link";
import { PhoneCall } from "lucide-react";
import { DEFAULT_ORG_ID } from "@/lib/calling/config";
import { normalizeIndianMobile } from "@/lib/calling/phone";
import { getLeadCalling } from "@/lib/calling/reports";
import { getSettings } from "@/lib/calling/repository";
import { formatDateTime } from "../../_components/format";
import { RequestCallbackButton } from "../../calls/CallingActions";
import { CALL_STATUS_LABEL, CALL_STATUS_STYLE, JOB_STATUS_LABEL, JOB_STATUS_STYLE, OUTCOME_LABEL, Pill, duration } from "../../calls/labels";

/** AI calling on the lead page: consent status, open job, past calls and the "Request AI callback" button. */
export default async function CallingPanel({ leadId, phone }: { leadId: number; phone: string | null }) {
  const e164 = normalizeIndianMobile(phone);
  let data: Awaited<ReturnType<typeof getLeadCalling>>;
  let languages: string[];
  try {
    [data, languages] = await Promise.all([getLeadCalling(DEFAULT_ORG_ID, leadId, e164), getSettings(DEFAULT_ORG_ID).then((s) => s.enabledLanguages)]);
  } catch (error) {
    console.error("CALLING: lead panel failed", error);
    return null;
  }
  const activeJob = data.jobs.find((j) => ["queued", "dispatching", "in_progress", "needs_review"].includes(j.status));
  const consentOk = data.consent?.status === "granted";

  return (
    <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
        <PhoneCall className="h-4 w-4 text-slate-500" /> AI callback
      </p>
      <p className="text-sm text-slate-700">
        {!e164
          ? "No valid Indian mobile number, so the AI can't call this lead."
          : data.doNotCall
            ? "This number is on the do-not-call list."
            : consentOk
              ? `Agreed to a callback on ${formatDateTime(data.consent!.capturedAt)}.`
              : data.consent?.status === "revoked"
                ? "Callback consent was withdrawn."
                : "Didn't ask for a callback, so the AI won't call them."}
      </p>
      {activeJob && (
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-700">
          <Pill label={JOB_STATUS_LABEL[activeJob.status] ?? activeJob.status} style={JOB_STATUS_STYLE[activeJob.status] ?? JOB_STATUS_STYLE.queued} />
          {activeJob.status === "queued" ? `Next try ${formatDateTime(activeJob.scheduledAt)}` : activeJob.lastError ?? ""}
        </p>
      )}
      {e164 && consentOk && !data.doNotCall && !activeJob && (
        <div className="mt-3">
          <RequestCallbackButton leadId={leadId} languages={languages} />
        </div>
      )}
      {data.calls.length > 0 && (
        <ul className="mt-3 divide-y divide-slate-100 border-t border-slate-100">
          {data.calls.map((c) => (
            <li key={c.id}>
              <Link href={`/team/leads-portal/calls/${c.id}`} className="flex items-start justify-between gap-3 py-2.5 hover:bg-slate-50">
                <span className="min-w-0">
                  <span className="block text-sm text-slate-900">{c.outcome ? OUTCOME_LABEL[c.outcome] ?? c.outcome : CALL_STATUS_LABEL[c.status] ?? c.status}</span>
                  <span className="block text-xs text-slate-500">
                    {formatDateTime(c.createdAt)} · {duration(c.durationSeconds)}
                  </span>
                  {c.summary && <span className="mt-0.5 line-clamp-2 block text-xs text-slate-600">{c.summary}</span>}
                </span>
                <Pill label={CALL_STATUS_LABEL[c.status] ?? c.status} style={CALL_STATUS_STYLE[c.status] ?? CALL_STATUS_STYLE.initiated} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
