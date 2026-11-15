import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { requireSession } from "@/lib/admin/auth";
import { DEFAULT_ORG_ID, callingEnv, envProblems } from "@/lib/calling/config";
import { getVoiceProvider } from "@/lib/calling/providers";
import { getCallingOverview } from "@/lib/calling/reports";
import { getSettings } from "@/lib/calling/repository";
import { SUPPORTED_LANGUAGES } from "@/lib/calling/settings-validation";
import PageHeader from "../../_components/PageHeader";
import { timeAgo } from "../../_components/format";
import { RunNowButton } from "../CallingActions";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function CallingSettingsPage() {
  await requireSession("admin");
  const env = callingEnv();
  const settings = await getSettings(DEFAULT_ORG_ID);
  const provider = getVoiceProvider(env);
  const overview = await getCallingOverview(DEFAULT_ORG_ID, settings.timezone);

  const providerProblems = provider.configProblems(settings);
  const checks: { label: string; ok: boolean; detail?: string }[] = [
    { label: "Database connected", ok: true },
    ...envProblems(env).map((p) => ({ label: p, ok: false })),
    { label: `Provider: ${provider.name}${provider.name === "mock" ? " (test mode, no real calls)" : ""}`, ok: provider.name === "sarvam" },
    ...(providerProblems.length
      ? [{ label: "Sarvam setup incomplete", ok: false, detail: `Missing: ${providerProblems.join(", ")}` }]
      : [{ label: "Sarvam IDs and API key present", ok: true }]),
    {
      label: "Last webhook from Sarvam",
      ok: !overview.lastWebhook?.error,
      detail: overview.lastWebhook ? `${timeAgo(overview.lastWebhook.at!)}${overview.lastWebhook.error ? ` · error: ${overview.lastWebhook.error}` : ""}` : "None received yet",
    },
    {
      label: "Jobs needing review",
      ok: !(overview.jobs.needs_review ?? 0),
      detail: `${overview.jobs.needs_review ?? 0} · failed ${overview.jobs.failed ?? 0}`,
    },
  ];

  return (
    <main className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <Link href="/team/leads-portal/calls" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
        <ArrowLeft className="h-4 w-4" /> AI calls
      </Link>
      <PageHeader title="AI calling settings" description={settings.updatedBy ? `Last changed by ${settings.updatedBy}${settings.updatedAt ? `, ${timeAgo(settings.updatedAt)}` : ""}` : "Not changed yet"} />

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">System health</h2>
        <ul className="space-y-2">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start gap-2.5 text-sm">
              {c.ok ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />}
              <span className="min-w-0">
                <span className="text-slate-900">{c.label}</span>
                {c.detail && <span className="block break-words text-xs text-slate-500">{c.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <RunNowButton />
        </div>
      </section>

      <SettingsForm initial={settings} languages={SUPPORTED_LANGUAGES} />
    </main>
  );
}
