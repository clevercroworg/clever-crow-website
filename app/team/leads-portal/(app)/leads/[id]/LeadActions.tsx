"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, Check, Loader2, Trash2, UserRound, X } from "lucide-react";
import { isPast } from "../../_components/format";

/** ISO -> value for <input type="datetime-local"> in the browser's own time zone. */
function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** A date n days from now at the given hour, as ISO. */
function daysFromNow(n: number, hour = 10) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

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
  assignedTo,
  followUpAt,
  users,
  meId,
  backHref,
  canDelete,
}: {
  id: number;
  status: string;
  notes: string;
  assignedTo: number | null;
  followUpAt: string | null;
  users: { id: number; name: string }[];
  meId: number;
  backHref: string;
  canDelete: boolean; // admins only
}) {
  const router = useRouter();
  const [status, setStatus] = useState(initialStatus);
  const [notes, setNotes] = useState(initialNotes);
  const [savedNotes, setSavedNotes] = useState(initialNotes);
  const [saving, setSaving] = useState<"" | "status" | "notes" | "owner" | "followup">("");
  const [owner, setOwner] = useState<number | null>(assignedTo);
  const [followUp, setFollowUp] = useState<string | null>(followUpAt);
  const [flash, setFlash] = useState("");
  const [error, setError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function save(
    changes: { status?: string; notes?: string; assigned_to?: number | null; follow_up_at?: string | null },
    which: "status" | "notes" | "owner" | "followup"
  ) {
    setSaving(which);
    setError("");
    try {
      const res = await fetch(`/api/leads-portal/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      if (res.status === 401) {
        window.location.href = "/team/leads-portal/login";
        return false;
      }
      if (!res.ok) throw new Error();
      setFlash({ status: "Status updated", notes: "Notes saved", owner: "Owner updated", followup: "Follow-up updated" }[which]);
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
      const res = await fetch(`/api/leads-portal/leads/${id}`, { method: "DELETE" });
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
              className={`min-h-10 rounded-lg border px-2 py-2 text-sm font-medium transition ${
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
        <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
          <UserRound className="h-3.5 w-3.5" /> Owner
        </p>
        <div className="flex gap-2">
          <select
            value={owner ?? ""}
            disabled={saving === "owner"}
            onChange={async (e) => {
              const next = e.target.value ? Number(e.target.value) : null;
              const prev = owner;
              setOwner(next);
              if (!(await save({ assigned_to: next }, "owner"))) setOwner(prev);
            }}
            className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"
            aria-label="Owner"
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.id === meId ? `${u.name} (me)` : u.name}
              </option>
            ))}
          </select>
          {owner !== meId && (
            <button
              type="button"
              disabled={saving === "owner"}
              onClick={async () => {
                const prev = owner;
                setOwner(meId);
                if (!(await save({ assigned_to: meId }, "owner"))) setOwner(prev);
              }}
              className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Take it
            </button>
          )}
        </div>
      </div>

      <div>
        <p className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500">
          <CalendarClock className="h-3.5 w-3.5" /> Follow-up
        </p>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={toLocalInput(followUp)}
            disabled={saving === "followup"}
            onChange={async (e) => {
              if (!e.target.value) return;
              const next = new Date(e.target.value).toISOString();
              const prev = followUp;
              setFollowUp(next);
              if (!(await save({ follow_up_at: next }, "followup"))) setFollowUp(prev);
            }}
            className={`block w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 ${
              followUp && isPast(followUp) ? "border-rose-300 text-rose-700" : "border-slate-300 text-slate-900"
            }`}
            aria-label="Follow-up date and time"
          />
          {followUp && (
            <button
              type="button"
              disabled={saving === "followup"}
              onClick={async () => {
                const prev = followUp;
                setFollowUp(null);
                if (!(await save({ follow_up_at: null }, "followup"))) setFollowUp(prev);
              }}
              className="shrink-0 rounded-lg border border-slate-300 px-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              aria-label="Clear follow-up"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            { label: "Tomorrow 10 am", days: 1 },
            { label: "In 3 days", days: 3 },
            { label: "Next week", days: 7 },
          ].map((q) => (
            <button
              key={q.label}
              type="button"
              disabled={saving === "followup"}
              onClick={async () => {
                const next = daysFromNow(q.days);
                const prev = followUp;
                setFollowUp(next);
                if (!(await save({ follow_up_at: next }, "followup"))) setFollowUp(prev);
              }}
              className="min-h-8 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            >
              {q.label}
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

      {canDelete && (
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
      )}
    </div>
  );
}
