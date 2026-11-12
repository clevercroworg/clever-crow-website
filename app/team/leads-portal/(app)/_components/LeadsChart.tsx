"use client";

import { useMemo, useState } from "react";

// Leads per day (or per week for long ranges) as columns, with a hover / tap tooltip.
// One series in one colour, so the card title names it and no legend is needed.

type Point = { day: string; count: number };

function fmt(day: string, opts: Intl.DateTimeFormatOptions) {
  return new Date(`${day}T00:00:00Z`).toLocaleDateString("en-IN", { timeZone: "UTC", ...opts });
}

export default function LeadsChart({ data }: { data: Point[] }) {
  const weekly = data.length > 92;
  const points = useMemo(() => {
    if (!weekly) return data.map((d) => ({ ...d, label: fmt(d.day, { weekday: "short", day: "numeric", month: "short" }) }));
    const out: (Point & { label: string })[] = [];
    for (let i = 0; i < data.length; i += 7) {
      const chunk = data.slice(i, i + 7);
      out.push({
        day: chunk[0].day,
        count: chunk.reduce((s, d) => s + d.count, 0),
        label: `${fmt(chunk[0].day, { day: "numeric", month: "short" })} – ${fmt(chunk[chunk.length - 1].day, { day: "numeric", month: "short" })}`,
      });
    }
    return out;
  }, [data, weekly]);

  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...points.map((p) => p.count));
  const step = max <= 4 ? 1 : Math.ceil(max / 4);
  const top = step * Math.ceil(max / step);
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
  const labelEvery = Math.ceil(points.length / 8);
  const active = hover === null ? null : points[hover];

  return (
    <div className="min-w-0">
      <div className="relative h-56 overflow-hidden">
        {/* Gridlines + y labels */}
        <div className="absolute inset-0 left-8">
          {ticks.map((t) => (
            <div key={t} className="absolute inset-x-0 border-t border-slate-100" style={{ bottom: `${(t / top) * 100}%` }}>
              <span className="absolute -left-8 -translate-y-1/2 text-xs tabular-nums text-slate-500">{t}</span>
            </div>
          ))}
        </div>
        {/* Columns */}
        <div className="absolute inset-0 left-8 flex min-w-0 items-end gap-[2px]" onMouseLeave={() => setHover(null)}>
          {points.map((p, i) => (
            <button
              key={p.day}
              type="button"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onClick={() => setHover(i)}
              aria-label={`${p.label}: ${p.count} lead${p.count === 1 ? "" : "s"}`}
              className="group relative flex h-full min-w-0 flex-1 items-end"
            >
              <span
                className={`block w-full rounded-t-[4px] transition-colors ${hover === i ? "bg-[#1c5cab]" : "bg-[#2a78d6]"}`}
                style={{ height: p.count ? `${Math.max(2, (p.count / top) * 100)}%` : 0 }}
              />
              {p.count === 0 && <span className="absolute inset-x-0 bottom-0 h-px bg-slate-200" />}
            </button>
          ))}
        </div>
        {/* Tooltip */}
        {active && hover !== null && (
          <div
            className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow-lg"
            style={{ left: `calc(2rem + (100% - 2rem) * ${(hover + 0.5) / points.length})` }}
          >
            <p className="whitespace-nowrap text-slate-300">{active.label}</p>
            <p className="font-semibold tabular-nums">
              {active.count} lead{active.count === 1 ? "" : "s"}
            </p>
          </div>
        )}
      </div>
      {/* X labels */}
      <div className="relative ml-8 mt-2 h-4">
        {points.map((p, i) =>
          i % labelEvery === 0 ? (
            <span
              key={p.day}
              className={`absolute -translate-x-1/2 whitespace-nowrap text-xs text-slate-500 ${(i / labelEvery) % 2 ? "hidden sm:block" : ""}`}
              style={{ left: `${((i + 0.5) / points.length) * 100}%` }}
            >
              {fmt(p.day, { day: "numeric", month: "short" })}
            </span>
          ) : null
        )}
      </div>
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-xs font-medium text-slate-500 hover:text-slate-800">Show as table</summary>
        <div className="mt-2 max-h-60 overflow-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2 font-medium">{weekly ? "Week" : "Day"}</th>
                <th className="px-3 py-2 text-right font-medium">Leads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...points].reverse().map((p) => (
                <tr key={p.day}>
                  <td className="px-3 py-1.5 text-slate-700">{p.label}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums text-slate-900">{p.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
