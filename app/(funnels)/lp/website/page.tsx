import type { Metadata } from "next";
import WebsiteLandingClient from "./WebsiteLandingClient";
import { getWebsiteLandingData } from "./website-data";

// Matches the Google Ads message for this page.
export const metadata: Metadata = {
  title: "Professional Websites at Affordable Prices | Clever Crow",
  description:
    "Get a custom website for your business starting at ₹7,999 + GST. Custom design, 1 year free hosting, mobile friendly and WhatsApp enquiry integration.",
};

export default function WebsiteLandingPage() {
  const data = getWebsiteLandingData();

  return <WebsiteLandingClient data={data} />;
}
