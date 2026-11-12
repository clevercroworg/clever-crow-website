"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Download, Search, SlidersHorizontal, X } from "lucide-react";

type Option = { value: string; label: string };

type Props = {
  values: Record<string, string | undefined>;
  size: number;
  types: Option[];
  channels: Option[];
  statuses: Option[];
  forms: Option[];
  pages: Option[];
  exportHref?: string; // CSV export, admins only
};

const select =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15";

export default function FilterBar({ values, size, types, channels, statuses, forms, pages, exportHref }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const activeCount = ["type", "channel", "status", "form", "page_path", "from", "to"].filter((k) => values[k]).length;
  const [open, setOpen] = useState(activeCount > 0);
  const hasAny = activeCount > 0 || Boolean(values.q);

  const submit = () => formRef.current?.requestSubmit();

  // Navigate with only the filled-in fields, so URLs stay short and shareable.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    new FormData(e.currentTarget).forEach((value, key) => {
      const v = String(value).trim();
      if (v && !(key === "size" && v === "25")) sp.set(key, v);
    });
    const qs = sp.toString();
    router.push(qs ? `/team/leads-portal?${qs}` : "/team/leads-portal");
  };

  const sel = (name: string, label: string, options: Option[], allLabel: string) => (
    <label className="block min-w-0">
      <span className="mb-1 block text-xs font-medium text-slate-500">{label}</span>
      <select name={name} defaultValue={values[name] || ""} onChange={submit} className={select}>
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );

  return (
    <form ref={formRef} method="get" action="/team/leads-portal" onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <input type="hidden" name="size" value={size} />
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            name="q"
            defaultValue={values.q || ""}
            placeholder="Search name, phone, email, company, message…"
            className="block w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 sm:flex-none"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium ${
              open || activeCount ? "border-amber-400 bg-amber-50 text-amber-900" : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
            aria-expanded={open}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters{activeCount ? ` (${activeCount})` : ""}
          </button>
          {exportHref && (
            <a
              href={exportHref}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              title="Download these results as a CSV file (opens in Excel / Google Sheets)"
            >
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Export</span>
            </a>
          )}
        </div>
      </div>

      <div className={open ? "mt-3 border-t border-slate-100 pt-3" : "hidden"}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {sel("type", "Type", types, "All types")}
          {sel("channel", "Source", channels, "All sources")}
          {sel("status", "Status", statuses, "All statuses")}
          {sel("form", "Form", forms, "All forms")}
          {sel("page_path", "Page", pages, "All pages")}
          <label className="block min-w-0">
            <span className="mb-1 block text-xs font-medium text-slate-500">From</span>
            <input type="date" name="from" defaultValue={values.from || ""} onChange={submit} className={select} />
          </label>
          <label className="block min-w-0">
            <span className="mb-1 block text-xs font-medium text-slate-500">To</span>
            <input type="date" name="to" defaultValue={values.to || ""} onChange={submit} className={select} />
          </label>
        </div>
      </div>

      {hasAny && (
        <div className="mt-3 flex justify-end">
          <Link href="/team/leads-portal" className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900">
            <X className="h-4 w-4" /> Clear all filters
          </Link>
        </div>
      )}
    </form>
  );
}
