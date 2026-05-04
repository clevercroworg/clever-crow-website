import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Clever Crow - Get Your Free Digital Marketing Consultation",
  description:
    "Ready to grow your business? Contact Clever Crow for web development, digital marketing, and branding services. Call +91 99863 89444 today.",
  keywords: "contact digital marketing agency, get marketing consultation, website development contact, hire digital marketing company, marketing agency contact, request digital services",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
