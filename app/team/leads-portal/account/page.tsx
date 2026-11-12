import { requireSession } from "@/lib/admin/auth";
import TopBar from "../_components/TopBar";
import ChangePasswordForm from "./ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await requireSession();
  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-md space-y-5 px-4 py-5 sm:px-6 sm:py-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Change password</h1>
          <p className="mt-1 text-sm text-slate-500">
            Signed in as <span className="font-medium text-slate-700">{session.name}</span> (@{session.username}). Your
            other devices will be signed out.
          </p>
        </div>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <ChangePasswordForm />
        </section>
      </main>
    </>
  );
}
