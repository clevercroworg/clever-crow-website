// The Google tag (GA4 + Google Ads) loads once for the whole site in app/layout.tsx.
export default function FunnelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
