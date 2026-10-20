import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "../digital-marketing-service/DigitalMarketingServiceClient";
import { SEO_SERVICE_CONTENT } from "../digital-marketing-service/page-content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// SEO, AEO & GEO LP built on the digital-marketing service template (the older /lp/seo page is untouched).
export const metadata: Metadata = {
  title: "SEO, AEO & GEO Services | Clever Crow",
  description:
    "Grow your visibility across search engines and AI platforms with content and website improvements that help customers discover your business.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SeoServicePage() {
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={SEO_SERVICE_CONTENT} />
    </div>
  );
}
