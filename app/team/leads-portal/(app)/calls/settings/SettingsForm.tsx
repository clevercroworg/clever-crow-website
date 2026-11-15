"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import type { CallingSettings } from "@/lib/calling/types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SettingsForm({ initial, languages }: { initial: CallingSettings; languages: string[] }) {
  const router = useRouter();
  const [s, setS] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const set = <K extends keyof CallingSettings>(k: K, v: CallingSettings[K]) => setS((p) => ({ ...p, [k]: v }));
  const toggle = (list: (string | number)[], v: string | number) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const field = "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15";
  const label = "mb-1 block text-xs font-medium text-slate-600";
  const section = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (s.automationEnabled && !initial.automationEnabled && !confirm("Turn on AI calling? The AI will start calling people who asked for a callback, within calling hours.")) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/leads-portal/calling/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          automationEnabled: s.automationEnabled,
          callingStart: s.callingStart,
          callingEnd: s.callingEnd,
          allowedDays: s.allowedDays,
          maxDailyCalls: s.maxDailyCalls,
          maxConcurrentCalls: s.maxConcurrentCalls,
          maxAttempts: s.maxAttempts,
          retryDelayMinutes: s.retryDelayMinutes,
          enabledLanguages: s.enabledLanguages,
          defaultLanguage: s.defaultLanguage,
          sarvamOrgId: s.sarvamOrgId,
          sarvamWorkspaceId: s.sarvamWorkspaceId,
          sarvamAppId: s.sarvamAppId,
          sarvamAppVersion: s.sarvamAppVersion,
          sarvamConnectionId: s.sarvamConnectionId,
          sarvamAgentPhone: s.sarvamAgentPhone,
          rateAgentPerMinute: s.rateAgentPerMinute,
          rateTelephonyPer30s: s.rateTelephonyPer30s,
          pricingVersion: s.pricingVersion,
        }),
      });
      if (res.status === 401) {
        window.location.href = "/team/leads-portal/login";
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setMsg({ ok: true, text: "Saved." });
      router.refresh();
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-5">
      <section className={section}>
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={s.automationEnabled} onChange={(e) => set("automationEnabled", e.target.checked)} className="mt-0.5 h-5 w-5 accent-slate-900" />
          <span>
            <span className="block font-semibold text-slate-900">AI calling on</span>
            <span className="block text-sm text-slate-600">When on, people who tick &quot;call me back&quot; are called by the AI within the hours below. Turning it off stops new calls straight away.</span>
          </span>
        </label>
      </section>

      <section className={section}>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">When to call</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <label>
            <span className={label}>From ({s.timezone})</span>
            <input type="time" value={s.callingStart} onChange={(e) => set("callingStart", e.target.value)} className={field} />
          </label>
          <label>
            <span className={label}>Until</span>
            <input type="time" value={s.callingEnd} onChange={(e) => set("callingEnd", e.target.value)} className={field} />
          </label>
        </div>
        <p className={`${label} mt-3`}>Days</p>
        <div className="flex flex-wrap gap-1.5">
          {DAYS.map((d, i) => (
            <button
              key={d}
              type="button"
              aria-pressed={s.allowedDays.includes(i)}
              onClick={() => set("allowedDays", toggle(s.allowedDays, i) as number[])}
              className={`min-h-9 rounded-full border px-3 text-sm font-medium ${s.allowedDays.includes(i) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      <section className={section}>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Limits and retries</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["maxDailyCalls", "Calls per day (max)", 1, 1000],
              ["maxConcurrentCalls", "Calls at the same time", 1, 20],
              ["maxAttempts", "Attempts per person", 1, 5],
              ["retryDelayMinutes", "First retry after (minutes, doubles each time)", 15, 1440],
            ] as const
          ).map(([k, l, min, max]) => (
            <label key={k}>
              <span className={label}>{l}</span>
              <input type="number" min={min} max={max} value={s[k]} onChange={(e) => set(k, Number(e.target.value))} className={field} />
            </label>
          ))}
        </div>
      </section>

      <section className={section}>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Languages</h2>
        <div className="flex flex-wrap gap-1.5">
          {languages.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={s.enabledLanguages.includes(l)}
              onClick={() => set("enabledLanguages", toggle(s.enabledLanguages, l) as string[])}
              className={`min-h-9 rounded-full border px-3 text-sm font-medium ${s.enabledLanguages.includes(l) ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <label className="mt-3 block max-w-xs">
          <span className={label}>Default language</span>
          <select value={s.defaultLanguage} onChange={(e) => set("defaultLanguage", e.target.value)} className={field}>
            {s.enabledLanguages.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>
      </section>

      <section className={section}>
        <h2 className="text-sm font-semibold text-slate-900">Sarvam connection</h2>
        <p className="mb-3 text-xs text-slate-500">IDs from the Sarvam dashboard (docs/calling/SETUP.md). The API key is a server secret and is never shown here.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["sarvamOrgId", "Org ID"],
              ["sarvamWorkspaceId", "Workspace ID"],
              ["sarvamAppId", "Agent (app) ID"],
              ["sarvamConnectionId", "Telephony connection ID"],
              ["sarvamAgentPhone", "Agent phone number (calls come from)"],
            ] as const
          ).map(([k, l]) => (
            <label key={k}>
              <span className={label}>{l}</span>
              <input value={s[k]} onChange={(e) => set(k, e.target.value)} className={`${field} font-mono`} autoComplete="off" />
            </label>
          ))}
          <label>
            <span className={label}>Agent version</span>
            <input
              type="number"
              min={1}
              value={s.sarvamAppVersion ?? ""}
              onChange={(e) => set("sarvamAppVersion", e.target.value ? Number(e.target.value) : null)}
              className={field}
            />
          </label>
        </div>
      </section>

      <section className={section}>
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Cost rates (₹, excl. GST)</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <label>
            <span className={label}>AI per minute</span>
            <input type="number" step="0.01" min={0} value={s.rateAgentPerMinute} onChange={(e) => set("rateAgentPerMinute", Number(e.target.value))} className={field} />
          </label>
          <label>
            <span className={label}>Telephony per 30s</span>
            <input type="number" step="0.01" min={0} value={s.rateTelephonyPer30s} onChange={(e) => set("rateTelephonyPer30s", Number(e.target.value))} className={field} />
          </label>
          <label>
            <span className={label}>Pricing label</span>
            <input value={s.pricingVersion} onChange={(e) => set("pricingVersion", e.target.value)} className={field} />
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save settings
        </button>
        {msg && (
          <span className={`inline-flex items-center gap-1.5 text-sm ${msg.ok ? "text-emerald-700" : "text-rose-600"}`}>
            {msg.ok && <Check className="h-4 w-4" />} {msg.text}
          </span>
        )}
      </div>
    </form>
  );
}
