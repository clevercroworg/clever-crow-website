import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "../digital-marketing-service/DigitalMarketingServiceClient";
import { SOCIAL_MEDIA_SERVICE_CONTENT } from "../digital-marketing-service/page-content";
import { applyKeyword } from "../digital-marketing-service/keywords";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// Social media management LP built on the digital-marketing service template (the older /lp/smm page is untouched).
// Supports dynamic keyword insertion: ?keyword=<slug> (see keywords.ts) swaps the headline and title.
type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { metaTitle } = applyKeyword(SOCIAL_MEDIA_SERVICE_CONTENT, await searchParams);
  return {
    title: metaTitle ?? "Social Media Management Services | Clever Crow",
    description:
      "Engaging posts, reels and consistent social media management that builds trust and encourages enquiries.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SocialMediaServicePage({ searchParams }: Props) {
  const { content } = applyKeyword(SOCIAL_MEDIA_SERVICE_CONTENT, await searchParams);
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={content} />
    </div>
  );
}
