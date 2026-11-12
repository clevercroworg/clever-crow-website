import type { Filters } from "@/lib/leads/queries";
import { PAGE_SIZES } from "@/lib/leads/queries";
import { dashboardHref } from "@/lib/admin/filters";
import Pager from "./Pager";

// Pagination for the Leads list: keeps the current filters and page size in every link.
type Props = { filters: Filters; page: number; pages: number; size: number; total: number };

export default function Pagination({ filters, page, pages, size, total }: Props) {
  const sizeParam = size === PAGE_SIZES[0] ? undefined : size;
  return (
    <Pager
      page={page}
      pages={pages}
      total={total}
      size={size}
      noun="leads"
      href={(p) => dashboardHref(filters, { size: sizeParam, page: p })}
      sizes={PAGE_SIZES.map((s) => ({ value: s, href: dashboardHref(filters, { size: s === PAGE_SIZES[0] ? undefined : s }) }))}
    />
  );
}
