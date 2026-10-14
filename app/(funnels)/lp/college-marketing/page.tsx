import { Metadata } from "next";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import CollegeLandingClient from "./CollegeLandingClient";
import { CASE_STUDIES } from "./case-studies";

export const metadata: Metadata = {
  title: "Digital Marketing for Colleges | Clever Crow",
  description:
    "Grow your college’s visibility and student enquiries with Google & Meta Ads, websites, SEO and WhatsApp automation. Get a tailored plan from Clever Crow.",
  alternates: {
    canonical: "https://clevercrow.in/lp/college-marketing",
  },
  openGraph: {
    title: "Digital Marketing for Colleges | Clever Crow",
    description:
      "Google & Meta Ads, college websites, SEO and WhatsApp automation for colleges and educational institutions.",
    url: "https://clevercrow.in/lp/college-marketing",
    siteName: "Clever Crow Strategies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        // Absolute: the site sets no metadataBase, so relative paths resolve to localhost.
        url: "https://clevercrow.in/images/college/share-og.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Marketing for Colleges | Clever Crow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing for Colleges | Clever Crow",
    description:
      "Google & Meta Ads, college websites, SEO and WhatsApp automation for colleges and educational institutions.",
    images: ["https://clevercrow.in/images/college/share-og.jpg"],
  },
  // Staging: stays out of search until approvals are complete and the page moves to its final URL.
  robots: {
    index: false,
    follow: false,
  },
};

export default function CollegeMarketingPage() {
  // Unverified results are visible in `next dev` for review only; production shows approved entries.
  const showDrafts = process.env.NODE_ENV !== "production";
  const caseStudies = CASE_STUDIES.filter((study) => study.approved || showDrafts);

  return (
    <>
      <OrganizationSchema />
      <CollegeLandingClient caseStudies={caseStudies} />
    </>
  );
}
