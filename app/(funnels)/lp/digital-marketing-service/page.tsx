import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "./DigitalMarketingServiceClient";
import { SERVICE_CONTENT } from "./page-content";
import { applyKeyword } from "./keywords";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// Copy of /lp/digital-marketing that is being redesigned separately; the original page is untouched.
// Supports dynamic keyword insertion: ?keyword=<slug> (see keywords.ts) swaps the headline and title.
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { metaTitle } = applyKeyword(SERVICE_CONTENT, await searchParams);
  return {
    title: metaTitle ?? "Digital Marketing Services | Clever Crow",
    description:
      "Website development, SEO, Google Ads, Meta Ads, AI automation and social media management for businesses that need consistent leads.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DigitalMarketingServicePage({ searchParams }: Props) {
  const { content } = applyKeyword(SERVICE_CONTENT, await searchParams);
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={content} />
    </div>
  );
}
