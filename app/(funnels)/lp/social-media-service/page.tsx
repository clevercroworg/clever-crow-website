import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "../digital-marketing/service/DigitalMarketingServiceClient";
import { SOCIAL_MEDIA_SERVICE_CONTENT } from "../digital-marketing/service/page-content";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// Social media management LP built on the digital-marketing service template (the older /lp/smm page is untouched).
export const metadata: Metadata = {
  title: "Social Media Management Services | Clever Crow",
  description:
    "Engaging posts, reels and consistent social media management that builds trust and encourages enquiries.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SocialMediaServicePage() {
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={SOCIAL_MEDIA_SERVICE_CONTENT} />
    </div>
  );
}
