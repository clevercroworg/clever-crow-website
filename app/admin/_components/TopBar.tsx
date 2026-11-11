import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/admin" className="flex min-w-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icon.png" alt="" className="h-7 w-7 shrink-0 object-contain" />
          <span className="truncate text-[15px] font-semibold tracking-tight">
            Clever Crow <span className="font-normal text-slate-500">· Leads</span>
          </span>
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}
