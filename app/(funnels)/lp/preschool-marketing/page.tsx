import { Metadata } from "next";
import PreschoolLandingClient from "./PreschoolLandingClient";

export const metadata: Metadata = {
  title: "Turn Parent Enquiries Into Preschool Enrolments | Free Admission Growth Audit",
  description:
    "We help preschools and daycare centres reach nearby parents, generate qualified admission enquiries and improve follow-ups—so more families book visits and complete admissions.",
  keywords: [
    "preschool marketing",
    "preschool admission growth",
    "daycare enrollment marketing",
    "preschool parent enquiries",
    "preschool admission audit",
    "daycare marketing agency",
    "preschool leads",
    "kindergarten admissions"
  ],
  openGraph: {
    title: "Preschool Admission Growth Audit | Clever Crow Strategies",
    description:
      "Turn parent enquiries into preschool enrolments. Hyperlocal marketing and WhatsApp follow-up systems for preschools and daycare centers.",
    url: "https://clevercrow.in/lp/preschool-marketing",
    siteName: "Clever Crow Strategies",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/preschool-director-parents.jpg",
        width: 1200,
        height: 630,
        alt: "Preschool Admission Growth Consultation",
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreschoolMarketingPage() {
  return <PreschoolLandingClient />;
}
