import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Page navigation used by every list. Phones: big Previous / Next with "Page x of y".
// Larger screens: numbered pages with gaps, plus an optional per-page picker.

function pageList(current: number, pages: number): (number | "…")[] {
  const set = new Set([1, pages, current - 2, current - 1, current, current + 1, current + 2].filter((p) => p >= 1 && p <= pages));
  const sorted = Array.from(set).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

type Props = {
  page: number;
  pages: number;
  total: number;
  size: number;
  href: (page: number) => string;
  sizes?: { value: number; href: string }[];
  noun?: string;
};

export default function Pager({ page, pages, total, size, href, sizes, noun = "results" }: Props) {
  const first = total === 0 ? 0 : (page - 1) * size + 1;
  const last = Math.min(total, page * size);
  const n = (v: number) => v.toLocaleString("en-IN");
  const btn = "inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-medium";
  const idle = "border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  const off = "pointer-events-none border-slate-200 bg-white text-slate-300";

  return (
    <nav className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" aria-label="Pagination">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-600 sm:justify-start">
        <span>
          {total === 0 ? (
            `No ${noun}`
          ) : (
            <>
              Showing <span className="font-medium text-slate-900">{n(first)}–{n(last)}</span> of{" "}
              <span className="font-medium text-slate-900">{n(total)}</span>
            </>
          )}
        </span>
        {sizes && total > sizes[0].value && (
          <span className="flex items-center gap-1">
            <span className="text-slate-300" aria-hidden="true">|</span> Per page
            {sizes.map((s) => (
              <Link
                key={s.value}
                href={s.href}
                aria-current={s.value === size ? "true" : undefined}
                className={`rounded-md px-2 py-1 ${s.value === size ? "bg-slate-900 font-medium text-white" : "text-slate-700 hover:bg-slate-200"}`}
              >
                {s.value}
              </Link>
            ))}
          </span>
        )}
      </div>

      {pages > 1 && (
        <>
          {/* Phones */}
          <div className="flex items-center justify-between gap-2 sm:hidden">
            <Link href={href(page - 1)} className={`${btn} flex-1 gap-1 ${page <= 1 ? off : idle}`} aria-disabled={page <= 1}>
              <ChevronLeft className="h-4 w-4" /> Previous
            </Link>
            <span className="shrink-0 px-2 text-sm text-slate-600">
              Page <span className="font-semibold text-slate-900">{page}</span> of {pages}
            </span>
            <Link href={href(page + 1)} className={`${btn} flex-1 gap-1 ${page >= pages ? off : idle}`} aria-disabled={page >= pages}>
              Next <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Larger screens */}
          <div className="hidden items-center gap-1 sm:flex">
            <Link href={href(page - 1)} className={`${btn} ${page <= 1 ? off : idle}`} aria-label="Previous page" aria-disabled={page <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
            {pageList(page, pages).map((p, i) =>
              p === "…" ? (
                <span key={`gap-${i}`} className="px-1 text-slate-500" aria-hidden="true">
                  …
                </span>
              ) : (
                <Link
                  key={p}
                  href={href(p)}
                  aria-current={p === page ? "page" : undefined}
                  aria-label={`Page ${p}`}
                  className={`${btn} ${p === page ? "border-slate-900 bg-slate-900 text-white" : idle}`}
                >
                  {p}
                </Link>
              )
            )}
            <Link href={href(page + 1)} className={`${btn} ${page >= pages ? off : idle}`} aria-label="Next page" aria-disabled={page >= pages}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
