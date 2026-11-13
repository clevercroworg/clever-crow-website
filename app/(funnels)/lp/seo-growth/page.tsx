import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import SeoGrowthClient from "./SeoGrowthClient";

// SEO landing page built from SEO_Landing_Page_Content_Spec.md, using the look and assets of /lp/seo-service.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SEO Services from ₹14,999/month | Free SEO Audit | Clever Crow",
  description:
    "Help the right customers find you on Google and AI search. SEO, AEO and GEO packages with clear monthly deliverables. Get a free SEO audit.",
  robots: { index: false, follow: false },
};

export default function SeoGrowthPage() {
  return (
    <div className={jakarta.variable}>
      <SeoGrowthClient />
    </div>
  );
}
