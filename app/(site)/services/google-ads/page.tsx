import ServiceHero from "@/components/service/ServiceHero";
import WhatYouGet from "@/components/service/WhatYouGet";
import ServiceCTA from "@/components/service/ServiceCTA";
import ResultsCarousel from "@/components/ResultsCarousel";
import FaqSection from "@/components/service/FaqSection";
import DynamicCTA from "@/components/DynamicCTA";
import HowItHelps from "@/components/service/HowItHelps";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";



<WebPageSchema
  title="Google Ads Management Services in India"
  description="Professional Google Ads & PPC management services in India focused on lead generation and ROI."
  url="https://clevercrow.in/services/google-ads"
/>


/* ---------------- FAQ DATA (USED FOR UI + SCHEMA) ---------------- */

const googleAdsFaqs = [
  {
    question: "How soon can I start getting leads from Google Ads?",
    answer:
      "Most Google Ads campaigns start generating leads within 7–14 days after proper setup, keyword research, and conversion tracking.",
  },
  {
    question: "Do you manage Google Ads campaigns across all of India?",
    answer:
      "Yes. We manage PAN India Google Ads campaigns with city, state, and location-based targeting and bidding strategies.",
  },
  {
    question: "Is Google Ads suitable for small businesses?",
    answer:
      "Absolutely. Google Ads works well for small and medium-sized businesses when campaigns are structured with clear goals and budget control.",
  },
  {
    question: "Do you set up GA4 and conversion tracking?",
    answer:
      "Yes. We set up GA4, Google Tag Manager, and Google Ads conversion tracking to measure real leads, not just clicks.",
  },
  {
    question: "Do you provide landing pages for Google Ads?",
    answer:
      "Yes. We design high-converting, ad-optimised landing pages to improve quality score and reduce cost per lead.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work with service businesses, ecommerce brands, healthcare, education, real estate, and B2B companies across India.",
  },
];

/* ---------------- METADATA ---------------- */

export const metadata = {
  title: "Google Ads Management Services in India | Clever Crow",
  description:
    "Professional Google Ads & PPC management services in India focused on lead generation, conversion tracking, and ROI-driven growth.",
  keywords: [
    "google ads management services",
    "ppc management services india",
    "google ads agency india",
    "ppc agency india",
    "paid search management india",
    "performance marketing agency india",
  ],
};

/* ---------------- PAGE ---------------- */

export default function GoogleAdsPage() {
  return (
    <main>
      {/* HERO */}
      <ServiceHero
  eyebrow="Google Ads Management"
  title="Google Ads That Generate Qualified Leads"
  subtitle="Conversion-focused Google Ads management built to reduce CPL and scale profitable traffic."
  serviceName="Google Ads"
  highlights={[
    "Lead-focused ad strategy",
    "GA4 + conversion tracking",
    "Search & Performance Max",
    "Ongoing optimisation",
  ]}
  tools={[
    { src: "/logos/google-ads.svg", alt: "Google Ads" },
    { src: "/logos/ga4.png", alt: "Google Analytics 4" },
    { src: "/logos/gtm.svg", alt: "Google Tag Manager" },
    { src: "/logos/search-console.svg", alt: "Google Search Console" },
  ]}
/>


      <HowItHelps
        badge="Google Ads Growth"
        title="Google Ads Management Services"
        description="Our Google Ads services help businesses generate high-intent leads with measurable ROI."
        imageSrc="/images/google-ads-visual.jpg"
        imageAlt="Google Ads campaign growth illustration"
        pills={[
          "High-Intent Keywords",
          "Lower Cost Per Lead",
          "Search & Performance Max",
          "Conversion Tracking",
          "Pan-India Targeting",
        ]}
/>


      {/* WHAT YOU GET */}
      <WhatYouGet
        title="Deliverables & Scope of Work"
        subtitle="Our Google Ads management includes campaign setup, keyword research, ad copy creation, conversion tracking, bid optimisation, and ongoing performance monitoring. We manage Search, Display, and Performance Max campaigns while continuously refining targeting and budgets based on real conversion data.
"
        items={[
          "Business & funnel understanding",
          "Google Ads account & campaign setup",
          "Search, Display & Performance Max campaigns",
          "Comprehensive keyword research & structuring",
          "GA4 & Google Tag Manager conversion tracking",
          "Ad copy testing & optimisation",
          "Bid, budget & keyword optimisation",
          "Negative keyword & search term management",
          "Regular performance reporting & insights",
        ]}
      />

      <DynamicCTA />

       {/* RESULTS */}
{/* RESULTS */}
<ResultsCarousel
  title="Success Stories"
  items={[
    {
      client: "Baatu",
      industry: "Ecommerce",
      headline: "From Confusion to Conversion",
      image: "/images/case-studies/baatu.jpg",
      metrics: [
        { value: "₹25L", label: "Revenue" },
        { value: "120%", label: "Conversion Growth" },
        { value: "3×", label: "Customer Clarity" },
      ],
    },
    {
      client: "Wedding Planning Unzipped",
      industry: "Professional Wedding Planner",
      headline: "Clarity That Changed Everything",
      image: "/images/case-studies/wedding-planning-unzipped.jpg",
      metrics: [
        { value: "₹8.9L", label: "Revenue" },
        { value: "190%", label: "Conversion Rate" },
        { value: "2×", label: "Booking Momentum" },
      ],
    },
    {
      client: "Site Surgery Center",
      industry: "Healthcare Operations & Clinical Services",
      headline: "Efficiency Without Disruption",
      image: "/images/case-studies/site-surgery-center.jpg",
      metrics: [
        { value: "₹84L", label: "Revenue" },
        { value: "58%", label: "Conversion Rate" },
        { value: "40%", label: "Operational Efficiency" },
      ],
    },
    {
      client: "DTC Dentals",
      industry: "Healthcare & Dental Services",
      headline: "Smiles That Convert",
      image: "/images/case-studies/dtc-dentals.jpg",
      metrics: [
        { value: "₹35L", label: "Monthly Revenue" },
        { value: "15×", label: "Conversion Growth" },
        { value: "31%", label: "Lower Cost Per Appointment" },
      ],
    },
    {
      client: "BGS Global Institute of Medical",
      industry: "Education",
      headline: "Making Admissions Effortless",
      image: "/images/case-studies/bgs-global-institute.jpg",
      metrics: [
        { value: "₹2.4Cr", label: "Revenue" },
        { value: "25%", label: "Admission Increase" },
        { value: "1,800+", label: "New Enrollments" },
      ],
    },
    {
      client: "Asthitva – The Venue",
      industry: "Event Venues & Hospitality",
      headline: "From Clicks to Celebration",
      image: "/images/case-studies/asthitva-the-venue.jpg",
      metrics: [
        { value: "180%", label: "Website Conversion" },
        { value: "450+", label: "Venue Inquiries" },
        { value: "65%", label: "Inquiry-to-Booking Rate" },
      ],
    },
  ]}
/>


      {/* FAQ UI */}
      <FaqSection
        title="Google Ads – Frequently Asked Questions"
        description="Common questions businesses ask before starting Google Ads campaigns."
        faqs={googleAdsFaqs}
      />

      {/* ---------------- SCHEMA (NON-VISUAL) ---------------- */}

      <WebPageSchema
        title="Google Ads Management Services in India"
        description="Professional Google Ads & PPC management services in India focused on lead generation and ROI."
        url="https://clevercrow.in/services/google-ads"
      />

      <ServiceSchema
        serviceName="Google Ads Management Services"
        serviceDescription="Lead-focused Google Ads management services in India with conversion tracking and ROI-driven optimisation."
        pageUrl="https://clevercrow.in/services/google-ads"
      />

      <FaqSchema faqs={googleAdsFaqs} />

      {/* FINAL CTA */}
      <ServiceCTA />
    </main>
  );
}
