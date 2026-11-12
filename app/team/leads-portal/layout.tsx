import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Leads Dashboard | Clever Crow Admin",
  robots: { index: false, follow: false, nocache: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="leads-portal min-h-screen bg-slate-50 text-slate-900 antialiased [font-family:Inter,system-ui,sans-serif]">
      {/* Phones: 16px form fields so iOS doesn't zoom in when one is tapped. */}
      <style>{`@media (max-width: 639px) { .leads-portal input, .leads-portal select, .leads-portal textarea { font-size: 16px; } }`}</style>
      {children}
    </div>
  );
}
