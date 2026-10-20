import type { Metadata } from "next";
import CareersClient from "./CareersClient";
import { OPEN_ROLES } from "./careers-data";

export const metadata: Metadata = {
  title: "Careers | Clever Crow",
  description:
    "Join Clever Crow. We're hiring a Social Media Manager (full-time, remote) and freelance UGC Content Creators for our ad campaigns.",
  alternates: { canonical: "https://clevercrow.in/careers" },
};

// Google for Jobs structured data, generated from the same role data the page shows.
const jobPostings = OPEN_ROLES.map((role) => ({
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: role.title,
  description: `<p>${role.summary}</p><ul>${role.responsibilities
    .map((r) => `<li>${r.title}: ${r.detail}</li>`)
    .join("")}</ul><p>Requirements:</p><ul>${role.requirements.map((r) => `<li>${r}</li>`).join("")}</ul>`,
  datePosted: role.datePosted,
  employmentType: role.employmentType === "Freelance" ? "CONTRACTOR" : "FULL_TIME",
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: { "@type": "Country", name: "India" },
  hiringOrganization: {
    "@type": "Organization",
    name: "Clever Crow Strategies LLP",
    sameAs: "https://clevercrow.in",
    logo: "https://clevercrow.in/logo.png",
  },
  directApply: true,
  url: `https://clevercrow.in/careers#${role.id}`,
}));

export default function CareersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostings) }} />
      <CareersClient />
    </>
  );
}
