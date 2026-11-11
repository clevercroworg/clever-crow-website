"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Trash2 } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "spam", label: "Spam" },
];

export default function LeadActions({
  id,
  status: initialStatus,
  notes: initialNotes,
  backHref,
}: {
  id: number;
  status: string;
  notes: string;
  backHref: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [savedNotes, setSavedNotes] = useState(initialNotes);
  const [saving, setSaving] = useState<"" | "status" | "notes">("");
  const [flash, setFlash] = useState("");
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function save(changes: { status?: string; notes?: string }, which: "status" | "notes") {
    setSaving(which);
    setError("");
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return false;
      }
      if (!res.ok) throw new Error();
      setFlash(which === "status" ? "Status updated" : "Notes saved");
      setTimeout(() => setFlash(""), 2000);
      router.refresh();
      return true;
    } catch {
      setError("Couldn't save. Please try again.");
      return false;
    } finally {
      setSaving("");
    }
  }

  async function onDelete() {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.push(backHref);
      router.refresh();
    } catch {
      setError("Couldn't delete. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">Status</p>
        <div className="grid grid-cols-3 gap-1.5">
          {STATUS_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              disabled={saving === "status"}
              onClick={async () => {
                if (o.value === status) return;
                const prev = status;
                setStatus(o.value);
                if (!(await save({ status: o.value }, "status"))) setStatus(prev);
              }}
              className={`rounded-lg border px-2 py-1.5 text-sm font-medium transition ${
                status === o.value
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-500">
          Internal notes
        </label>
        <textarea
          id="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Called on Monday, sending a quote…"
          className="block w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"
        />
        <div className="mt-2 flex items-center justify-between gap-2">
          <span className="text-xs text-slate-500">{notes !== savedNotes ? "Unsaved changes" : ""}</span>
          <button
            type="button"
            disabled={saving === "notes" || notes === savedNotes}
            onClick={async () => {
              if (await save({ notes }, "notes")) setSavedNotes(notes);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40"
          >
            {saving === "notes" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Save notes
          </button>
        </div>
      </div>

      {flash && (
        <p className="flex items-center gap-1.5 text-sm text-emerald-700">
          <Check className="h-4 w-4" /> {flash}
        </p>
      )}
      {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}

      <div className="border-t border-slate-100 pt-4">
        {confirmDelete ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
            <p className="text-sm text-rose-800">Delete this submission permanently? This can&apos;t be undone.</p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
              >
                {deleting && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Delete
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-rose-600"
          >
            <Trash2 className="h-4 w-4" /> Delete submission
          </button>
        )}
      </div>
    </div>
  );
}
