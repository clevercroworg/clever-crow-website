export const metadata = {
  robots: "noindex, nofollow",
};

// GA4 tag is loaded in the parent (funnels) layout, covering /lp and /ppc.
export default function LPLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
