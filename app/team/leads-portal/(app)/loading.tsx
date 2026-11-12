// Shown instantly while a dashboard page loads, so a tab click never looks stuck.
export default function Loading() {
  const bar = "animate-pulse rounded-lg bg-slate-200/80";
  return (
    <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading">
      <div className="space-y-2">
        <div className={`${bar} h-7 w-48`} />
        <div className={`${bar} h-4 w-72 max-w-full`} />
      </div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className={`${bar} h-3 w-20`} />
            <div className={`${bar} h-8 w-16`} />
            <div className={`${bar} h-3 w-24`} />
          </div>
        ))}
      </div>
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${bar} h-10 w-full`} />
        ))}
      </div>
    </main>
  );
}
