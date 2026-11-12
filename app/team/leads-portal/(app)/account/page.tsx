import { requireSession } from "@/lib/admin/auth";
import { getUserById } from "@/lib/admin/users";
import PageHeader from "../_components/PageHeader";
import AlertSettingsForm from "./AlertSettingsForm";
import ChangePasswordForm from "./ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await requireSession();
  const me = await getUserById(session.id);
  return (
    <main className="mx-auto max-w-3xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        title="Account"
        description={
          <>
            Signed in as <span className="font-medium text-slate-700">{session.name}</span> (@{session.username}) ·{" "}
            <span className="capitalize">{session.role}</span>
          </>
        }
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Email alerts</h2>
        <p className="mb-4 mt-1 text-sm text-slate-500">Get an email with the details the moment a new lead comes in.</p>
        <AlertSettingsForm email={me?.email || ""} notify={Boolean(me?.notify_new_leads)} />
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Change password</h2>
        <p className="mb-4 mt-1 text-sm text-slate-500">Your other devices will be signed out.</p>
        <ChangePasswordForm />
      </section>
    </main>
  );
}
