import Link from "next/link";

// Ranked horizontal bars with the value and share printed on each row (one colour; labels carry identity).
// Rows past `limit` fold into "Other".

export default function BarList({
  rows,
  limit = 7,
  href,
  empty = "No leads in this period.",
}: {
  rows: { label: string; count: number }[];
  limit?: number;
  href?: (label: string) => string;
  empty?: string;
}) {
  const total = rows.reduce((s, r) => s + r.count, 0);
  if (!total) return <p className="py-6 text-center text-sm text-slate-500">{empty}</p>;
  const shown = rows.slice(0, limit);
  const rest = rows.slice(limit).reduce((s, r) => s + r.count, 0);
  const list = rest ? [...shown, { label: "Other", count: rest }] : shown;
  const max = Math.max(...list.map((r) => r.count));

  return (
    <ul className="space-y-1">
      {list.map((r) => {
        const inner = (
          <>
            <span
              className="absolute inset-y-0 left-0 rounded-[4px] bg-[#2a78d6]/15"
              style={{ width: `${(r.count / max) * 100}%` }}
              aria-hidden="true"
            />
            <span className="relative min-w-0 flex-1 truncate text-slate-800" title={r.label}>
              {r.label}
            </span>
            <span className="relative shrink-0 tabular-nums font-semibold text-slate-900">{r.count.toLocaleString("en-IN")}</span>
            <span className="relative w-10 shrink-0 text-right text-xs tabular-nums text-slate-500">{Math.round((r.count / total) * 100)}%</span>
          </>
        );
        const cls = "relative flex items-center gap-3 overflow-hidden rounded-[4px] px-2.5 py-1.5 text-sm";
        return (
          <li key={r.label}>
            {href && r.label !== "Other" ? (
              <Link href={href(r.label)} className={`${cls} hover:bg-slate-50`}>
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
