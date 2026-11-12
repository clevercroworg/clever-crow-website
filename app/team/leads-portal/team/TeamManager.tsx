"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus, X } from "lucide-react";
import type { AdminUser, Role } from "@/lib/admin/users";
import { timeAgo } from "../_components/format";

const input =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15";
const btn = "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition disabled:opacity-50";

async function call(url: string, method: string, body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    window.location.href = "/team/leads-portal/login";
    throw new Error("Signed out");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong.");
  return data;
}

function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        role === "admin" ? "bg-amber-50 text-amber-800 ring-amber-200" : "bg-slate-50 text-slate-700 ring-slate-200"
      }`}
    >
      {role === "admin" ? "Admin" : "Viewer"}
    </span>
  );
}

function AddUser({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", username: "", password: "", role: "viewer" as Role });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className={`${btn} bg-slate-900 px-3.5 py-2 text-white hover:bg-slate-800`}>
        <Plus className="h-4 w-4" /> Add login
      </button>
    );
  }

  return (
    <form
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        try {
          await call("/api/leads-portal/users", "POST", form);
          setForm({ name: "", username: "", password: "", role: "viewer" });
          setOpen(false);
          onDone();
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold">Add a login</p>
        <button type="button" onClick={() => setOpen(false)} className="rounded p-1 text-slate-400 hover:text-slate-700" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Name</span>
          <input className={input} required maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Username</span>
          <input className={input} required autoCapitalize="none" autoComplete="off" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Password</span>
          <input className={input} required minLength={8} autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <span className="mt-1 block text-xs text-slate-500">At least 8 characters. Share it with them privately.</span>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Role</span>
          <select className={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
            <option value="viewer">Viewer: see leads, update status and notes</option>
            <option value="admin">Admin: everything, including delete, export and logins</option>
          </select>
        </label>
      </div>
      {error && <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
      <div className="mt-4 flex justify-end">
        <button type="submit" disabled={busy} className={`${btn} bg-slate-900 px-3.5 py-2 text-white hover:bg-slate-800`}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Add login
        </button>
      </div>
    </form>
  );
}

function UserRow({ user, isSelf, onDone }: { user: AdminUser; isSelf: boolean; onDone: () => void }) {
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [resetting, setResetting] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [flash, setFlash] = useState("");

  async function run(which: string, fn: () => Promise<unknown>, done?: string) {
    setBusy(which);
    setError("");
    try {
      await fn();
      if (done) {
        setFlash(done);
        setTimeout(() => setFlash(""), 2500);
      }
      onDone();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy("");
    }
  }

  const url = `/api/leads-portal/users/${user.id}`;

  return (
    <li className={`p-4 sm:p-5 ${user.active ? "" : "bg-slate-50"}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className={`font-semibold ${user.active ? "text-slate-900" : "text-slate-500"}`}>{user.name}</p>
            <RoleBadge role={user.role} />
            {!user.active && (
              <span className="inline-flex rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">Turned off</span>
            )}
            {isSelf && <span className="text-xs text-slate-400">(you)</span>}
          </div>
          <p className="mt-0.5 text-sm text-slate-500">
            @{user.username} · {user.last_login_at ? `last signed in ${timeAgo(user.last_login_at)}` : "never signed in"}
            {user.created_by ? ` · added by ${user.created_by}` : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {!isSelf && (
            <select
              aria-label={`Role for ${user.name}`}
              disabled={!!busy}
              value={user.role}
              onChange={(e) => run("role", () => call(url, "PATCH", { role: e.target.value }), "Role updated")}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          )}
          {!isSelf && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => setResetting((r) => !r)}
              className={`${btn} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
            >
              Reset password
            </button>
          )}
          {!isSelf && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => run("active", () => call(url, "PATCH", { active: !user.active }), user.active ? "Turned off" : "Turned on")}
              className={`${btn} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
            >
              {busy === "active" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {user.active ? "Turn off" : "Turn on"}
            </button>
          )}
          {!isSelf && (
            <button
              type="button"
              disabled={!!busy}
              onClick={() => setConfirmDelete(true)}
              className={`${btn} text-slate-500 hover:bg-rose-50 hover:text-rose-600`}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      {resetting && (
        <form
          className="mt-3 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            run(
              "password",
              async () => {
                await call(url, "PATCH", { password: newPassword });
                setNewPassword("");
                setResetting(false);
              },
              "Password reset. They've been signed out everywhere."
            );
          }}
        >
          <input
            className={`${input} sm:max-w-xs`}
            placeholder="New password (8+ characters)"
            minLength={8}
            required
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit" disabled={!!busy} className={`${btn} bg-slate-900 text-white hover:bg-slate-800`}>
            {busy === "password" && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save new password
          </button>
        </form>
      )}

      {confirmDelete && (
        <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 p-3">
          <p className="text-sm text-rose-800">Delete {user.name}&apos;s login permanently? They&apos;ll be signed out straight away.</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              disabled={!!busy}
              onClick={() => run("delete", () => call(url, "DELETE"))}
              className={`${btn} bg-rose-600 text-white hover:bg-rose-700`}
            >
              {busy === "delete" && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Delete
            </button>
            <button type="button" onClick={() => setConfirmDelete(false)} className={`${btn} text-slate-600 hover:bg-white`}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {flash && <p className="mt-2 text-sm text-emerald-700">{flash}</p>}
      {error && <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</p>}
    </li>
  );
}

export default function TeamManager({ users, currentUserId }: { users: AdminUser[]; currentUserId: number }) {
  const router = useRouter();
  const refresh = () => router.refresh();

  return (
    <div className="space-y-4">
      <AddUser onDone={refresh} />
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {users.map((u) => (
          <UserRow key={u.id} user={u} isSelf={u.id === currentUserId} onDone={refresh} />
        ))}
      </ul>
    </div>
  );
}
