import { requireSession } from "@/lib/admin/auth";
import Shell from "./_components/Shell";

// Sidebar layout for every signed-in dashboard page (the login page sits outside this group).
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();
  return <Shell user={{ name: session.name, role: session.role }}>{children}</Shell>;
}
