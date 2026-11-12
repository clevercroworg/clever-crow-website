"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function ChangePasswordForm() {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const input =
    "mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15";

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError("");
        setDone(false);
        if (form.next !== form.confirm) {
          setError("The two new passwords don't match.");
          return;
        }
        setBusy(true);
        try {
          const res = await fetch("/api/leads-portal/account/password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ current: form.current, next: form.next }),
          });
          if (res.status === 401) {
            window.location.href = "/team/leads-portal/login";
            return;
          }
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.error || "Could not save.");
          setForm({ current: "", next: "", confirm: "" });
          setDone(true);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Current password</span>
        <input className={input} type="password" autoComplete="current-password" required value={form.current} onChange={set("current")} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">New password</span>
        <input className={input} type="password" autoComplete="new-password" required minLength={8} value={form.next} onChange={set("next")} />
        <span className="mt-1 block text-xs text-slate-500">At least 8 characters.</span>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Confirm new password</span>
        <input className={input} type="password" autoComplete="new-password" required value={form.confirm} onChange={set("confirm")} />
      </label>

      {error && <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      {done && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-700">
          <Check className="h-4 w-4" /> Password changed.
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-[15px] font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        Change password
      </button>
    </form>
  );
}
