import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "../digital-marketing/service/DigitalMarketingServiceClient";
import { LEAD_GENERATION_CONTENT } from "../digital-marketing/service/page-content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// Lead-generation LP built on the digital-marketing service template: same sections, with its own
// hero copy and a "What's Included" section in place of the service plans.
export const metadata: Metadata = {
  title: "Lead Generation Campaigns | Clever Crow",
  description:
    "Reach the right customers with targeted campaigns, effective landing pages and timely follow-ups, all built around your business and budget.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LeadGenerationPage() {
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={LEAD_GENERATION_CONTENT} />
    </div>
  );
}
