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
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased [font-family:Inter,system-ui,sans-serif]">
      {children}
    </div>
  );
}
