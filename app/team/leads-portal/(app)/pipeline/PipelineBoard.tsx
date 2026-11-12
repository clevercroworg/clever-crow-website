"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarClock, Loader2, Phone, UserRound } from "lucide-react";
import type { PipelineCard } from "@/lib/leads/analytics";
import { ChannelBadge } from "../_components/Badges";
import { STATUS_LABELS, isPast, timeAgo } from "../_components/format";

const ORDER = ["new", "contacted", "qualified", "won", "lost"] as const;
type Status = (typeof ORDER)[number];
type Columns = Record<Status, { total: number; cards: PipelineCard[] }>;

const HEAD: Record<Status, string> = {
  new: "border-t-amber-400",
  contacted: "border-t-blue-500",
  qualified: "border-t-violet-500",
  won: "border-t-emerald-500",
  lost: "border-t-slate-400",
};

export default function PipelineBoard({ columns: initial, meId, assigned }: { columns: Columns; meId: number; assigned?: string }) {
  const [columns, setColumns] = useState(initial);
  const [dragId, setDragId] = useState<number | null>(null);
  const [over, setOver] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<Status | null>(null);

  async function loadMore(status: Status) {
    setLoading(status);
    setError("");
    try {
      const q = new URLSearchParams({ status, offset: String(columns[status].cards.length) });
      if (assigned) q.set("assigned", assigned);
      const res = await fetch(`/api/leads-portal/pipeline?${q}`);
      if (res.status === 401) {
        window.location.href = "/team/leads-portal/login";
        return;
      }
      if (!res.ok) throw new Error();
      const { cards } = (await res.json()) as { cards: PipelineCard[] };
      setColumns((cols) => {
        const seen = new Set(cols[status].cards.map((c) => c.id));
        return { ...cols, [status]: { ...cols[status], cards: [...cols[status].cards, ...cards.filter((c) => !seen.has(c.id))] } };
      });
    } catch {
      setError("Couldn't load more leads. Please try again.");
    } finally {
      setLoading(null);
    }
  }


  async function move(id: number, to: Status) {
    const from = ORDER.find((s) => columns[s].cards.some((c) => c.id === id));
    if (!from || from === to) return;
    const card = columns[from].cards.find((c) => c.id === id)!;
    const prev = columns;
    setColumns({
      ...columns,
      [from]: { total: columns[from].total - 1, cards: columns[from].cards.filter((c) => c.id !== id) },
      [to]: { total: columns[to].total + 1, cards: [{ ...card, status: to }, ...columns[to].cards] },
    });
    setError("");
    try {
      const res = await fetch(`/api/leads-portal/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: to }),
      });
      if (res.status === 401) {
        window.location.href = "/team/leads-portal/login";
        return;
      }
      if (!res.ok) throw new Error();
    } catch {
      setColumns(prev);
      setError("Couldn't move that lead. Please try again.");
    }
  }

  return (
    <div>
      {error && <p className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {ORDER.map((status) => {
          const col = columns[status];
          return (
            <section
              key={status}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(status);
              }}
              onDragLeave={() => setOver((o) => (o === status ? null : o))}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                if (dragId) move(dragId, status);
                setDragId(null);
              }}
              className={`flex w-[82vw] max-w-[300px] shrink-0 snap-start flex-col rounded-2xl sm:w-[280px] border border-t-4 bg-slate-100/70 ${HEAD[status]} ${
                over === status ? "border-x-slate-400 border-b-slate-400 bg-slate-200/70" : "border-x-slate-200 border-b-slate-200"
              }`}
            >
              <header className="flex items-center justify-between px-3 py-2.5">
                <h2 className="text-sm font-semibold text-slate-900">{STATUS_LABELS[status]}</h2>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold tabular-nums text-slate-600">{col.total}</span>
              </header>
              <ul className="flex min-h-24 flex-1 flex-col gap-2 px-2 pb-2 lg:max-h-[calc(100vh-13rem)] lg:overflow-y-auto">
                {col.cards.map((c) => {
                  const overdue = c.follow_up_at && isPast(c.follow_up_at) && status !== "won" && status !== "lost";
                  return (
                    <li
                      key={c.id}
                      draggable
                      onDragStart={(e) => {
                        setDragId(c.id);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragEnd={() => {
                        setDragId(null);
                        setOver(null);
                      }}
                      className={`cursor-grab rounded-xl border border-slate-200 bg-white p-3 shadow-sm active:cursor-grabbing ${dragId === c.id ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Link href={`/team/leads-portal/leads/${c.id}`} className="min-w-0 truncate text-sm font-semibold text-slate-900 hover:text-amber-700">
                          {c.name || "Unnamed"}
                        </Link>
                        <span className="shrink-0 text-xs text-slate-500">{timeAgo(c.created_at)}</span>
                      </div>
                      {(c.company || c.service || c.form_name) && (
                        <p className="mt-0.5 truncate text-xs text-slate-500">{c.company || c.service || c.form_name}</p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <ChannelBadge channel={c.channel} />
                        {c.follow_up_at && (
                          <span className={`inline-flex items-center gap-1 text-xs ${overdue ? "font-semibold text-rose-600" : "text-slate-500"}`}>
                            <CalendarClock className="h-3 w-3" />
                            {new Date(c.follow_up_at).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                      <div className="mt-2 flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
                        <span className="flex min-w-0 flex-1 items-center gap-1 text-xs text-slate-500">
                          <UserRound className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{c.assigned_name ? (c.assigned_to === meId ? "Me" : c.assigned_name) : "Unassigned"}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1">
                          {c.phone && (
                            <a href={`tel:${c.phone}`} className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700" aria-label={`Call ${c.name || "lead"}`}>
                              <Phone className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <select
                            value={status}
                            onChange={(e) => move(c.id, e.target.value as Status)}
                            className="w-[7.5rem] rounded-md border border-slate-200 bg-white py-1 pl-2 pr-6 text-xs text-slate-700"
                            aria-label="Move to"
                          >
                            {ORDER.map((s) => (
                              <option key={s} value={s}>
                                {STATUS_LABELS[s]}
                              </option>
                            ))}
                            <option value="spam" disabled>
                              Spam: open the lead
                            </option>
                          </select>
                        </span>
                      </div>
                    </li>
                  );
                })}
                {!col.cards.length && <li className="py-6 text-center text-xs text-slate-500">Nothing here</li>}
                {col.total > col.cards.length && (
                  <li>
                    <button
                      type="button"
                      onClick={() => loadMore(status)}
                      disabled={loading === status}
                      className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-white/60 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white disabled:opacity-60"
                    >
                      {loading === status && <Loader2 className="h-4 w-4 animate-spin" />}
                      Load more ({col.total - col.cards.length} left)
                    </button>
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
