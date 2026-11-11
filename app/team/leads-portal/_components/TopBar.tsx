import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/team/leads-portal" className="flex min-w-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CSS.svg" alt="Clever Crow" className="h-6 w-auto shrink-0 object-contain sm:h-7" />
          <span className="truncate border-l border-slate-200 pl-2.5 text-[15px] font-medium text-slate-500">Leads</span>
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}
