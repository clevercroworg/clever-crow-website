import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Filters } from "@/lib/leads/queries";
import { PAGE_SIZES } from "@/lib/leads/queries";
import { dashboardHref } from "@/lib/admin/filters";

function pageList(current: number, pages: number): (number | "…")[] {
  const set = new Set([1, pages, current - 1, current, current + 1].filter((p) => p >= 1 && p <= pages));
  const sorted = Array.from(set).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

type Props = { filters: Filters; page: number; pages: number; size: number; total: number };

export default function Pagination({ filters, page, pages, size, total }: Props) {
  const withSize = { ...filters, size: size === PAGE_SIZES[0] ? undefined : size };
  const href = (p: number) => dashboardHref(filters, { size: withSize.size, page: p });
  const first = total === 0 ? 0 : (page - 1) * size + 1;
  const last = Math.min(total, page * size);

  const btn = "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-medium";
  const idle = "border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  const off = "pointer-events-none border-slate-200 bg-white text-slate-300";

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <span>
          {total === 0 ? "No results" : (
            <>
              <span className="font-medium text-slate-900">{first.toLocaleString("en-IN")}–{last.toLocaleString("en-IN")}</span> of{" "}
              <span className="font-medium text-slate-900">{total.toLocaleString("en-IN")}</span>
            </>
          )}
        </span>
        <span className="hidden text-slate-300 sm:inline">|</span>
        <span className="hidden items-center gap-1 sm:flex">
          Per page:
          {PAGE_SIZES.map((s) => (
            <Link
              key={s}
              href={dashboardHref(filters, { size: s === PAGE_SIZES[0] ? undefined : s })}
              className={`rounded px-1.5 py-0.5 ${s === size ? "bg-slate-900 font-medium text-white" : "hover:bg-slate-200"}`}
            >
              {s}
            </Link>
          ))}
        </span>
      </div>

      {pages > 1 && (
        <nav className="flex items-center gap-1" aria-label="Pagination">
          <Link href={href(page - 1)} className={`${btn} ${page <= 1 ? off : idle}`} aria-label="Previous page">
            <ChevronLeft className="h-4 w-4" />
          </Link>
          {pageList(page, pages).map((p, i) =>
            p === "…" ? (
              <span key={`gap-${i}`} className="px-1 text-slate-400">…</span>
            ) : (
              <Link
                key={p}
                href={href(p)}
                aria-current={p === page ? "page" : undefined}
                className={`${btn} ${p === page ? "border-slate-900 bg-slate-900 text-white" : idle}`}
              >
                {p}
              </Link>
            )
          )}
          <Link href={href(page + 1)} className={`${btn} ${page >= pages ? off : idle}`} aria-label="Next page">
            <ChevronRight className="h-4 w-4" />
          </Link>
        </nav>
      )}
    </div>
  );
}
