import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "./DigitalMarketingServiceClient";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

// Copy of /lp/digital-marketing that is being redesigned separately; the original page is untouched.
export const metadata: Metadata = {
  title: "Digital Marketing Services | Clever Crow",
  description:
    "Website development, SEO, Google Ads, Meta Ads, AI automation and social media management for businesses that need consistent leads.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DigitalMarketingServicePage() {
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient />
    </div>
  );
}
