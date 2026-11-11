import type { Filters } from "@/lib/leads/queries";
import { PAGE_SIZES } from "@/lib/leads/queries";

type Params = Record<string, string | string[] | undefined> | URLSearchParams;

function get(params: Params, key: string) {
  const v = params instanceof URLSearchParams ? params.get(key) : params[key];
  const s = Array.isArray(v) ? v[0] : v;
  return (s || "").toString().trim().slice(0, 200) || undefined;
}

export const FILTER_KEYS = ["q", "type", "channel", "status", "form", "page_path", "from", "to"] as const;

export function parseFilters(params: Params) {
  const filters: Filters = {};
  for (const key of FILTER_KEYS) {
    const value = get(params, key);
    if (value) filters[key] = value;
  }
  const page = Math.max(1, Number.parseInt(get(params, "page") || "1", 10) || 1);
  const requested = Number.parseInt(get(params, "size") || "", 10);
  const size = (PAGE_SIZES as readonly number[]).includes(requested) ? requested : PAGE_SIZES[0];
  return { filters, page, size };
}

/** Builds a dashboard URL that keeps the current filters, with some values changed. */
export function dashboardHref(
  filters: Filters,
  changes: Record<string, string | number | undefined> = {},
  base = "/admin"
) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...filters, ...changes })) {
    if (v !== undefined && v !== "" && !(k === "page" && Number(v) === 1)) sp.set(k, String(v));
  }
  const qs = sp.toString();
  return qs ? `${base}?${qs}` : base;
}
