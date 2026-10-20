import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "../digital-marketing-service/DigitalMarketingServiceClient";
import { SEO_SERVICE_CONTENT } from "../digital-marketing-service/page-content";
import { applyKeyword } from "../digital-marketing-service/keywords";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// SEO, AEO & GEO LP built on the digital-marketing service template (the older /lp/seo page is untouched).
// Supports dynamic keyword insertion: ?keyword=<slug> (see keywords.ts) swaps the headline and title.
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { metaTitle } = applyKeyword(SEO_SERVICE_CONTENT, await searchParams);
  return {
    title: metaTitle ?? "SEO, AEO & GEO Services | Clever Crow",
    description:
      "Grow your visibility across search engines and AI platforms with content and website improvements that help customers discover your business.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SeoServicePage({ searchParams }: Props) {
  const { content } = applyKeyword(SEO_SERVICE_CONTENT, await searchParams);
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={content} />
    </div>
  );
}
