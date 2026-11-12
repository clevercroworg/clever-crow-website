import { requireSession } from "@/lib/admin/auth";
import { listUsers } from "@/lib/admin/users";
import TopBar from "../_components/TopBar";
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
      <>
        <TopBar />
        <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
          <SetupNotice error />
        </main>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-4xl space-y-5 px-4 py-5 sm:px-6 sm:py-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team logins</h1>
          <p className="mt-1 text-sm text-slate-500">
            Admins can do everything, including delete, CSV export and managing logins. Viewers can see leads and update
            status and notes.
          </p>
        </div>
        <TeamManager users={users} currentUserId={session.id} />
      </main>
    </>
  );
}
