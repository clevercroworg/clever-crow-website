"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Columns3, KeyRound, LayoutDashboard, List, LogOut, Menu, Users, X } from "lucide-react";

type Props = { user: { name: string; role: "admin" | "viewer" }; children: React.ReactNode };

const BASE = "/team/leads-portal";

const NAV = [
  { href: BASE, label: "Overview", icon: LayoutDashboard, exact: true },
  { href: `${BASE}/leads`, label: "Leads", icon: List },
  { href: `${BASE}/pipeline`, label: "Pipeline", icon: Columns3 },
  { href: `${BASE}/team`, label: "Team", icon: Users, admin: true },
  { href: `${BASE}/activity`, label: "Activity", icon: Activity, admin: true },
];

function initials(name: string) {
  return name
    .split(/[^A-Za-z]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export default function Shell({ user, children }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));

  async function signOut() {
    setSigningOut(true);
    await fetch("/api/leads-portal/logout", { method: "POST" }).catch(() => null);
    window.location.href = `${BASE}/login`;
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1" aria-label="Dashboard">
      {NAV.filter((n) => !n.admin || user.role === "admin").map(({ href, label, icon: Icon, exact }) => {
        const active = isActive(href, exact);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition lg:py-2 lg:text-sm ${
              active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Icon className={`h-[18px] w-[18px] shrink-0 ${active ? "text-amber-400" : ""}`} />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  const userBox = (
    <div className="border-t border-white/10 pt-4">
      <div className="flex items-center gap-3 px-1">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-slate-900">
          {initials(user.name) || "?"}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate text-sm font-medium text-white">{user.name}</span>
          <span className="block text-xs capitalize text-slate-300">{user.role}</span>
        </span>
      </div>
      <div className="mt-3 grid gap-1">
        <Link
          href={`${BASE}/account`}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
            isActive(`${BASE}/account`) ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
          }`}
        >
          <KeyRound className="h-[18px] w-[18px]" /> Account
        </Link>
        <button
          type="button"
          onClick={signOut}
          disabled={signingOut}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white disabled:opacity-60"
        >
          <LogOut className="h-[18px] w-[18px]" /> Sign out
        </button>
      </div>
    </div>
  );

  const brand = (
    <Link href={BASE} className="flex items-center gap-2.5 px-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/CSS-on-dark.svg" alt="Clever Crow" className="h-6 w-auto" />
      <span className="rounded bg-white/10 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-300">Leads</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col gap-6 bg-slate-950 px-3 py-5 lg:flex">
        {brand}
        {nav}
        {userBox}
      </aside>

      {/* Mobile top bar + drawer */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:hidden">
        <button type="button" onClick={() => setOpen(true)} className="-ml-2 rounded-lg p-2 text-slate-700 hover:bg-slate-100" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <Link href={BASE} className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CSS.svg" alt="Clever Crow" className="h-6 w-auto" />
        </Link>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-slate-900">{initials(user.name)}</span>
      </header>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-slate-950/50" onClick={() => setOpen(false)} aria-label="Close menu" />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col gap-6 bg-slate-950 px-3 py-5 shadow-xl">
            <div className="flex items-center justify-between">
              {brand}
              <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-300 hover:text-white" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            {nav}
            {userBox}
          </div>
        </div>
      )}

      <div className="min-w-0 lg:pl-60">{children}</div>
    </div>
  );
}
