import Link from "next/link";
import { KeyRound, Users } from "lucide-react";
import { getSession } from "@/lib/admin/auth";
import LogoutButton from "./LogoutButton";

export default async function TopBar() {
  const session = await getSession();
  const link = "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/team/leads-portal" className="flex min-w-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CSS.svg" alt="Clever Crow" className="h-6 w-auto shrink-0 object-contain sm:h-7" />
          <span className="truncate border-l border-slate-200 pl-2.5 text-[15px] font-medium text-slate-500">Leads</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          {session && (
            <span className="mr-1 hidden text-right leading-tight lg:block">
              <span className="block text-sm font-medium text-slate-900">{session.name}</span>
              <span className="block text-xs capitalize text-slate-500">{session.role}</span>
            </span>
          )}
          {session?.role === "admin" && (
            <Link href="/team/leads-portal/team" className={link} title="Manage team logins">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Team</span>
            </Link>
          )}
          {session && (
            <Link href="/team/leads-portal/account" className={link} title="Change your password">
              <KeyRound className="h-4 w-4" />
              <span className="hidden sm:inline">Password</span>
            </Link>
          )}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
