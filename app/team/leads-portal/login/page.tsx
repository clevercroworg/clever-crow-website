import { redirect } from "next/navigation";
import { isAdmin, isAdminConfigured } from "@/lib/admin/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/team/leads-portal");
  const configured = isAdminConfigured();

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CSS.svg" alt="Clever Crow" className="h-10 w-auto object-contain" />
          <p className="mt-5 text-xl font-semibold tracking-tight">Leads dashboard</p>
          <p className="mt-1 text-sm text-slate-500">Sign in to see your website enquiries.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {configured ? (
            <LoginForm />
          ) : (
            <div className="text-sm text-slate-600">
              <p className="font-medium text-slate-900">Admin login isn&apos;t set up yet.</p>
              <p className="mt-2">
                Add <code className="rounded bg-slate-100 px-1">ADMIN_USERNAME</code> and{" "}
                <code className="rounded bg-slate-100 px-1">ADMIN_PASSWORD</code> in Vercel → Project → Settings →
                Environment Variables, then redeploy.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
