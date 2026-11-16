import { requireSession } from "@/lib/admin/auth";
import { listUsers } from "@/lib/admin/users";
import PageHeader from "../_components/PageHeader";
import SetupNotice from "../_components/SetupNotice";
import TeamManager from "./TeamManager";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const session = await requireSession("admin");

  let users: Awaited<ReturnType<typeof listUsers>>;
  try {
    users = await listUsers();
  } catch (error) {
    console.error("ADMIN: list users failed", error);
    return (
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <SetupNotice error />
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        title="Team"
        description="Main logins can do everything: CSV export, managing logins, AI call settings, call costs and transcripts. Team logins see all leads, update status and notes, assign leads and set follow-ups, and see AI call results and summaries."
      />
      <TeamManager users={users} currentUserId={session.id} />
    </main>
  );
}
