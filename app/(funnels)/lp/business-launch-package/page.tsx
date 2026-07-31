import { Metadata } from "next";
import LaunchPackageClient from "./LaunchPackageClient";

export const metadata: Metadata = {
  title: "Complete Business Launch Package | ₹19,999 + GST | Clever Crow",
  description: "Everything your business needs to start getting customers online: Website, Google Business Profile, Facebook, Instagram, WhatsApp Lead Setup, Ads Setup & Analytics. 100% Account Ownership.",
  openGraph: {
    title: "Complete Business Launch Package | ₹19,999 + GST | Clever Crow",
    description: "Everything your business needs to start getting customers online: Website, Google Business Profile, Facebook, Instagram, WhatsApp Lead Setup, Ads Setup & Analytics. 100% Account Ownership.",
    url: "https://clevercrow.in/lp/business-launch-package",
    siteName: "Clever Crow Digital Marketing",
    locale: "en_IN",
    type: "website",
  },
};

export default function BusinessLaunchPage() {
  return <LaunchPackageClient />;
}
