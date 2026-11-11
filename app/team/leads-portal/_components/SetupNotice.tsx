import { Database } from "lucide-react";

export default function SetupNotice({ error }: { error?: boolean }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
      <div className="flex items-start gap-3">
        <Database className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">
            {error ? "Can't reach the leads database right now." : "Connect the leads database to start saving submissions."}
          </p>
          {error ? (
            <p className="mt-1 text-amber-800">
              Check the database connection in Vercel (Storage tab) and that <code>DATABASE_URL</code> is set. Form
              emails keep working in the meantime.
            </p>
          ) : (
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-amber-800">
              <li>In Vercel, open the project → <b>Storage</b> → <b>Create Database</b> → <b>Neon</b> (free plan).</li>
              <li>Connect it to this project for Production and Preview. That adds <code>DATABASE_URL</code> automatically.</li>
              <li>Redeploy. Every form submission from then on appears here. Emails keep working either way.</li>
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
