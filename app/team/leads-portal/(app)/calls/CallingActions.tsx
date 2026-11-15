"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

async function call(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    window.location.href = "/team/leads-portal/login";
    throw new Error("Signed out");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

const btn = "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-semibold transition disabled:opacity-60";

/** Retry / cancel buttons on a job (admins). */
export function JobActions({ id, status }: { id: number; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const run = async (action: "retry" | "cancel") => {
    if (action === "retry" && !confirm("Queue this call again? Check Sarvam first if it says 'Needs review', so the person isn't called twice.")) return;
    setBusy(action);
    setError("");
    try {
      await call(`/api/leads-portal/calling/jobs/${id}`, "POST", { action });
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy("");
    }
  };
  const canRetry = ["needs_review", "failed", "cancelled"].includes(status);
  const canCancel = ["queued", "needs_review", "failed"].includes(status);
  if (!canRetry && !canCancel) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {canRetry && (
        <button type="button" disabled={!!busy} onClick={() => run("retry")} className={`${btn} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}>
          {busy === "retry" && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Retry
        </button>
      )}
      {canCancel && (
        <button type="button" disabled={!!busy} onClick={() => run("cancel")} className={`${btn} text-slate-600 hover:bg-slate-100`}>
          {busy === "cancel" && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Cancel
        </button>
      )}
      {error && <span className="text-xs text-rose-600">{error}</span>}
    </div>
  );
}

/** "Request AI callback" on the lead page. */
export function RequestCallbackButton({ leadId, languages }: { leadId: number; languages: string[] }) {
  const router = useRouter();
  const [language, setLanguage] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Call language" className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm">
          <option value="">Agent&apos;s default language</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            setMessage(null);
            try {
              await call(`/api/leads-portal/calling/leads/${leadId}/callback`, "POST", { language: language || null });
              setMessage({ ok: true, text: "Queued. The AI will call within calling hours." });
              router.refresh();
            } catch (e) {
              setMessage({ ok: false, text: (e as Error).message });
            } finally {
              setBusy(false);
            }
          }}
          className={`${btn} shrink-0 bg-slate-900 text-white hover:bg-slate-800`}
        >
          {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Request AI callback
        </button>
      </div>
      {message && <p className={`text-xs ${message.ok ? "text-emerald-700" : "text-rose-600"}`}>{message.text}</p>}
    </div>
  );
}

/** Add / remove do-not-call numbers (admins). */
export function DncForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <form
      className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          await call("/api/leads-portal/calling/suppressions", "POST", { phone, reason });
          setPhone("");
          setReason("");
          router.refresh();
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Mobile number" inputMode="tel" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" aria-label="Mobile number" />
      <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason (optional)" className="rounded-lg border border-slate-300 px-3 py-2 text-sm" aria-label="Reason" />
      <button type="submit" disabled={busy || !phone} className={`${btn} bg-slate-900 text-white hover:bg-slate-800`}>
        {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Add to do-not-call
      </button>
      {error && <p className="text-sm text-rose-600 sm:col-span-3">{error}</p>}
    </form>
  );
}

export function DncRemove({ id }: { id: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        if (!confirm("Remove from do-not-call? They still won't be called until they ask for a callback again.")) return;
        setBusy(true);
        try {
          await call(`/api/leads-portal/calling/suppressions/${id}`, "DELETE");
          router.refresh();
        } finally {
          setBusy(false);
        }
      }}
      className={`${btn} text-slate-600 hover:bg-slate-100`}
    >
      Remove
    </button>
  );
}

/** "Run dispatcher now" on the settings page (admins). */
export function RunNowButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [text, setText] = useState("");
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setText("");
          try {
            const { summary } = await call("/api/leads-portal/calling/run", "POST");
            setText(summary.reason ? `Nothing dialled: ${summary.reason}.` : `Started ${summary.started}, rescheduled ${summary.rescheduled}, cancelled ${summary.cancelled}, needs review ${summary.needsReview}.`);
            router.refresh();
          } catch (e) {
            setText((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
        className={`${btn} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
      >
        {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Run dispatcher now
      </button>
      {text && <span className="text-sm text-slate-600">{text}</span>}
    </div>
  );
}
