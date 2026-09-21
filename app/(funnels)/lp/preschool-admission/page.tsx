import { Metadata } from "next";
import PreschoolLandingClient from "../preschool-marketing/PreschoolLandingClient";

export const metadata: Metadata = {
  title: "Turn Parent Enquiries Into Preschool Enrolments | Free Admission Growth Audit",
  description:
    "We help preschools and daycare centres reach nearby parents, generate qualified admission enquiries and improve follow-ups—so more families book visits and complete admissions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreschoolAdmissionAliasPage() {
  return <PreschoolLandingClient />;
}
