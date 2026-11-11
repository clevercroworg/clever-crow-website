"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
        window.location.href = "/admin/login";
      }}
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-60"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Sign out</span>
    </button>
  );
}
