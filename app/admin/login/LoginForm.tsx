"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not sign in.");
        setBusy(false);
        return;
      }
      window.location.href = "/admin";
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
        <span className="text-sm font-medium text-slate-700">Username</span>
        <input
          className={input}
          autoComplete="username"
          autoCapitalize="none"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <div className="relative">
          <input
            className={`${input} pr-11`}
            type={show ? "text" : "password"}
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute inset-y-0 right-0 mt-1.5 flex w-11 items-center justify-center text-slate-400 hover:text-slate-600"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
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
        Sign in
      </button>
    </form>
  );
}
