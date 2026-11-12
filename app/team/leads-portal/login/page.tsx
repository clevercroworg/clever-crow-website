import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/auth";
import { countUsers } from "@/lib/admin/users";
import { isDatabaseConfigured } from "@/lib/leads/db";
import LoginForm from "./LoginForm";
import SetupForm from "./SetupForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/team/leads-portal");

  let state: "login" | "setup" | "no-db" | "db-error" = "login";
  if (!isDatabaseConfigured()) state = "no-db";
  else {
    try {
      if ((await countUsers()) === 0) state = "setup";
    } catch (error) {
      console.error("ADMIN: login page user count failed", error);
      state = "db-error";
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CSS.svg" alt="Clever Crow" className="h-10 w-auto object-contain" />
          <p className="mt-5 text-xl font-semibold tracking-tight">
            {state === "setup" ? "Set up the leads dashboard" : "Leads dashboard"}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {state === "setup" ? "Create the first admin login." : "Sign in to see your website enquiries."}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {state === "login" && <LoginForm />}
          {state === "setup" && <SetupForm />}
          {state === "no-db" && (
            <div className="text-sm text-slate-600">
              <p className="font-medium text-slate-900">The leads database isn&apos;t connected yet.</p>
              <p className="mt-2">
                Logins are stored in the leads database. Connect a Neon database to this project in Vercel → Storage,
                then redeploy.
              </p>
            </div>
          )}
          {state === "db-error" && (
            <div className="text-sm text-slate-600">
              <p className="font-medium text-slate-900">Can&apos;t reach the leads database right now.</p>
              <p className="mt-2">Please try again in a minute.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
