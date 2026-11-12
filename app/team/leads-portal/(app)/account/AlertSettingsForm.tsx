"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function AlertSettingsForm({ email: initialEmail, notify: initialNotify }: { email: string; notify: boolean }) {
  const [email, setEmail] = useState(initialEmail);
  const [notify, setNotify] = useState(initialNotify);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        setDone(false);
        try {
          const res = await fetch("/api/leads-portal/account/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, notify_new_leads: notify }),
          });
          if (res.status === 401) {
            window.location.href = "/team/leads-portal/login";
            return;
          }
          const data = await res.json().catch(() => ({}));
          if (!res.ok) throw new Error(data.error || "Could not save.");
          setDone(true);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Your email</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (!e.target.value) setNotify(false);
          }}
          placeholder="name@clevercrow.in"
          className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"
        />
      </label>
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={notify}
          disabled={!email}
          onChange={(e) => setNotify(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-slate-900"
        />
        <span className="text-sm text-slate-700">
          Email me when a new lead comes in
          {!email && <span className="block text-xs text-slate-500">Add your email first.</span>}
        </span>
      </label>
      {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      {done && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-700">
          <Check className="h-4 w-4" /> Saved.
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-70"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} Save
      </button>
    </form>
  );
}
