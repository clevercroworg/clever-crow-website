"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SetupForm() {
  const [form, setForm] = useState({ code: "", name: "", username: "", password: "", confirm: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("The two passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/leads-portal/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: form.code, name: form.name, username: form.username, password: form.password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 409) {
        window.location.reload();
        return;
      }
      if (!res.ok) {
        setError(data.error || "Could not finish setup.");
        setBusy(false);
        return;
      }
      window.location.href = "/team/leads-portal";
    } catch {
      setError("Network error. Check your connection and try again.");
      setBusy(false);
    }
  }

  const input =
    "mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-[15px] text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Setup code</span>
        <input className={`${input} font-mono uppercase`} autoComplete="off" autoCapitalize="characters" spellCheck={false} required value={form.code} onChange={set("code")} placeholder="CC-XXXXX-XXXXX-XXXXX-XXXXX" />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Your name</span>
        <input className={input} autoComplete="name" required maxLength={80} value={form.name} onChange={set("name")} />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Username</span>
        <input className={input} autoComplete="username" autoCapitalize="none" required value={form.username} onChange={set("username")} />
        <span className="mt-1 block text-xs text-slate-500">Letters, numbers, dot, dash or underscore.</span>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <div className="relative">
          <input className={`${input} pr-11`} type={show ? "text" : "password"} autoComplete="new-password" required minLength={8} value={form.password} onChange={set("password")} />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 mt-1.5 flex w-11 items-center justify-center text-slate-400 hover:text-slate-600"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <span className="mt-1 block text-xs text-slate-500">At least 8 characters.</span>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Confirm password</span>
        <input className={input} type={show ? "text" : "password"} autoComplete="new-password" required value={form.confirm} onChange={set("confirm")} />
      </label>

      {error && (
        <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-[15px] font-semibold text-white transition hover:bg-slate-800 disabled:opacity-70"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        Create admin and sign in
      </button>
    </form>
  );
}
