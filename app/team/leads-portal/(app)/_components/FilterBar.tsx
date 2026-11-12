"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Download, Search, SlidersHorizontal, X } from "lucide-react";

// Search + filters for the Leads list. Filters open as a popover on larger screens and a bottom
// sheet on phones, so the page underneath never jumps. Active filters show as removable chips.

type Option = { value: string; label: string };

type Props = {
  values: Record<string, string | undefined>;
  size: number;
  types: Option[];
  channels: Option[];
  statuses: Option[];
  forms: Option[];
  pages: Option[];
  assignees: Option[];
  exportHref?: string; // CSV export, admins only
};

const BASE = "/team/leads-portal/leads";
const FILTER_KEYS = ["assigned", "followup", "status", "channel", "type", "form", "page_path", "from", "to"] as const;
const FOLLOW_UPS: Option[] = [
  { value: "overdue", label: "Overdue" },
  { value: "today", label: "Due today" },
  { value: "upcoming", label: "Upcoming" },
  { value: "any", label: "Has a follow-up" },
];

function ist(offsetDays = 0) {
  const d = new Date(Date.now() + offsetDays * 86400000);
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(d);
}

function shortDate(v: string) {
  return new Date(`${v}T00:00:00Z`).toLocaleDateString("en-IN", { timeZone: "UTC", day: "numeric", month: "short" });
}

const field =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15";

export default function FilterBar({ values, size, types, channels, statuses, forms, pages, assignees, exportHref }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [q, setQ] = useState(values.q || "");
  const panelRef = useRef<HTMLDivElement>(null);

  const options: Record<string, Option[]> = {
    assigned: assignees,
    followup: FOLLOW_UPS,
    status: statuses,
    channel: channels,
    type: types,
    form: forms,
    page_path: pages,
  };
  const names: Record<string, string> = {
    assigned: "Owner",
    followup: "Follow-up",
    status: "Status",
    channel: "Source",
    type: "Type",
    form: "Form",
    page_path: "Page",
  };

  const active = FILTER_KEYS.filter((k) => values[k]);
  const dateCount = values.from || values.to ? 1 : 0;
  const activeCount = active.filter((k) => k !== "from" && k !== "to").length + dateCount;

  function go(next: Record<string, string | undefined>) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) if (v && !(k === "size" && v === "25")) sp.set(k, v);
    const qs = sp.toString();
    router.push(qs ? `${BASE}?${qs}` : BASE);
  }

  const current = () => ({ ...Object.fromEntries(FILTER_KEYS.map((k) => [k, values[k]])), q: values.q, size: String(size) });

  function openPanel() {
    setDraft(Object.fromEntries(FILTER_KEYS.map((k) => [k, values[k] || ""])));
    setOpen(true);
  }

  // Close on Escape or a click outside the popover.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const chipLabel = (k: string) => {
    const v = values[k]!;
    if (k === "from") return values.to ? `${shortDate(v)} – ${shortDate(values.to)}` : `From ${shortDate(v)}`;
    if (k === "to") return `Until ${shortDate(v)}`;
    const label = options[k]?.find((o) => o.value === v)?.label || v;
    return `${names[k]}: ${label}`;
  };
  const chips = active.filter((k) => !(k === "to" && values.from));

  const presets = [
    { label: "Today", from: ist(), to: ist() },
    { label: "Yesterday", from: ist(-1), to: ist(-1) },
    { label: "Last 7 days", from: ist(-6), to: ist() },
    { label: "Last 30 days", from: ist(-29), to: ist() },
    { label: "This month", from: `${ist().slice(0, 8)}01`, to: ist() },
  ];

  const sel = (k: keyof typeof names, allLabel: string) => (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs font-medium text-slate-600">{names[k]}</span>
      <select value={draft[k] || ""} onChange={(e) => setDraft({ ...draft, [k]: e.target.value })} className={field}>
        <option value="">{allLabel}</option>
        {options[k].map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <form
          className="relative flex flex-1 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            go({ ...current(), q: q.trim() || undefined, page: undefined });
          }}
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search leads…"
              aria-label="Search leads"
              className="block w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"
            />
          </div>
          <button type="submit" className="shrink-0 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800">
            Search
          </button>
        </form>

        <div className="relative flex gap-2" ref={panelRef}>
          <button
            type="button"
            onClick={() => (open ? setOpen(false) : openPanel())}
            aria-expanded={open}
            aria-haspopup="dialog"
            className={`inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border px-3.5 text-sm font-medium sm:flex-none ${
              activeCount ? "border-amber-400 bg-amber-50 text-amber-900" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeCount > 0 && (
              <span className="rounded-full bg-amber-500 px-1.5 text-xs font-semibold text-white">{activeCount}</span>
            )}
          </button>
          {exportHref && (
            <a
              href={exportHref}
              className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:flex-none"
              title="Download these results as a CSV file (opens in Excel / Google Sheets)"
            >
              <Download className="h-4 w-4" />
              Export
            </a>
          )}

          {open && (
            <>
              {/* Phone backdrop */}
              <button type="button" className="fixed inset-0 z-40 bg-slate-950/40 sm:hidden" aria-label="Close filters" onClick={() => setOpen(false)} />
              <div
                role="dialog"
                aria-label="Filters"
                className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88vh] flex-col rounded-t-2xl bg-white shadow-2xl sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-full sm:mt-2 sm:max-h-[75vh] sm:w-[640px] sm:rounded-2xl sm:border sm:border-slate-200"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <p className="text-base font-semibold text-slate-900">Filters</p>
                  <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900" aria-label="Close filters">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {sel("assigned", "Anyone")}
                    {sel("followup", "Any")}
                    {sel("status", "All statuses")}
                    {sel("channel", "All sources")}
                    {sel("type", "All types")}
                    {sel("form", "All forms")}
                  </div>
                  {sel("page_path", "All pages")}

                  <div>
                    <p className="mb-1.5 text-xs font-medium text-slate-600">Date received</p>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {presets.map((p) => {
                        const on = draft.from === p.from && draft.to === p.to;
                        return (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => setDraft({ ...draft, from: on ? "" : p.from, to: on ? "" : p.to })}
                            className={`min-h-9 rounded-full border px-3 text-sm ${
                              on ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 text-slate-700 hover:border-slate-300"
                            }`}
                          >
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="block">
                        <span className="mb-1 block text-xs text-slate-600">From</span>
                        <input type="date" value={draft.from || ""} onChange={(e) => setDraft({ ...draft, from: e.target.value })} className={field} />
                      </label>
                      <label className="block">
                        <span className="mb-1 block text-xs text-slate-600">To</span>
                        <input type="date" value={draft.to || ""} onChange={(e) => setDraft({ ...draft, to: e.target.value })} className={field} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 border-t border-slate-100 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                  <button
                    type="button"
                    onClick={() => setDraft({})}
                    className="min-h-11 flex-1 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:flex-none"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      go({ ...draft, q: values.q, size: String(size) });
                    }}
                    className="min-h-11 flex-1 rounded-lg bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800 sm:ml-auto sm:flex-none"
                  >
                    Show results
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {(chips.length > 0 || values.q) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {values.q && (
            <button
              type="button"
              onClick={() => {
                setQ("");
                go({ ...current(), q: undefined });
              }}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-slate-200 bg-white py-1 pl-3 pr-2 text-sm text-slate-700 hover:border-slate-300"
            >
              <span className="truncate">“{values.q}”</span>
              <X className="h-3.5 w-3.5 shrink-0 text-slate-500" aria-label="Remove" />
            </button>
          )}
          {chips.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => go({ ...current(), [k]: undefined, ...(k === "from" ? { to: undefined } : {}) })}
              className="inline-flex max-w-full items-center gap-1 rounded-full border border-amber-200 bg-amber-50 py-1 pl-3 pr-2 text-sm text-amber-900 hover:border-amber-300"
            >
              <span className="truncate">{chipLabel(k)}</span>
              <X className="h-3.5 w-3.5 shrink-0" aria-label="Remove" />
            </button>
          ))}
          <Link href={BASE} className="px-2 py-1 text-sm font-medium text-slate-600 hover:text-slate-900">
            Clear all
          </Link>
        </div>
      )}
    </div>
  );
}
