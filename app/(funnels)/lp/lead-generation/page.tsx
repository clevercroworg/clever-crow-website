import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "../digital-marketing-service/DigitalMarketingServiceClient";
import { LEAD_GENERATION_CONTENT } from "../digital-marketing-service/page-content";
import { applyKeyword } from "../digital-marketing-service/keywords";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// Lead-generation LP built on the digital-marketing service template: same sections, with its own
// Supports dynamic keyword insertion: ?keyword=<slug> (see keywords.ts) swaps the headline and title.
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { metaTitle } = applyKeyword(LEAD_GENERATION_CONTENT, await searchParams);
  return {
    title: metaTitle ?? "Lead Generation Campaigns | Clever Crow",
    description:
      "Reach the right customers with targeted campaigns, effective landing pages and timely follow-ups, all built around your business and budget.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function LeadGenerationPage({ searchParams }: Props) {
  const { content } = applyKeyword(LEAD_GENERATION_CONTENT, await searchParams);
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={content} />
    </div>
  );
}
