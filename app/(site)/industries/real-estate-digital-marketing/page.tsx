import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "How do you verify the quality of real estate leads?", answer: "We use double-opt-in forms, targeted filter questions (e.g. budget, project interest), and WhatsApp verification to filter out invalid contacts." },
  { question: "What ad channels work best for real estate projects?", answer: "Meta Ads (Facebook & Instagram) work best for visual reach and lead volume, while Google Search Ads capture high-intent buyers looking for active properties." },
  { question: "Can you integrate leads into our existing CRM?", answer: "Yes. We can sync lead submissions directly to Zoho, Salesforce, HubSpot, Google Sheets, or custom CRM dashboards in real-time." },
  { question: "Do you design project landing pages?", answer: "Yes. We build custom, mobile-optimized real estate landing pages featuring brochure downloads, floor plans, and simple inquiry forms." }
];

const services = [
  { icon: "layout", title: "Project Landing Pages", description: "High-converting landing pages featuring floor plans, price charts, and lead forms.", href: "/landing-page-development" },
  { icon: "megaphone", title: "Meta Ads Campaigns", description: "Facebook & Instagram campaigns targeting home buyers and property investors.", href: "/meta-ads-management-services" },
  { icon: "search", title: "Google Search Ads", description: "Targeting high-intent buyers looking for properties and flats in specific localities.", href: "/google-ads-management-services" },
  { icon: "target", title: "Local SEO for Builders", description: "Ranking your project website for local property search queries.", href: "/seo-services" },
  { icon: "rocket", title: "WhatsApp Automation", description: "Instantly delivering project brochures, price sheets, and location links via WhatsApp.", href: "/whatsapp-automation-services" },
  { icon: "monitor", title: "Lead Tracking & CRM", description: "Setting up tracking and syncing leads immediately into your CRM for quick sales follow-ups.", href: "/lead-management-automation" }
];

export const metadata = {
  title: "Real Estate Digital Marketing Agency | Clever Crow",
  description: "Generate quality enquiries for plots, apartments, villas and commercial projects with landing pages, Google Ads, Meta Ads and tracking.",
  keywords: "real estate digital marketing agency, real estate lead generation, flat promotion ads, real estate ads, property landing pages",
};

export default function RealEstateDigitalMarketingPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Real Estate Marketing"
        heroTitle="Real Estate Digital Marketing for Project Enquiries"
        heroSubtitle="Generate quality enquiries for plots, apartments, villas and commercial projects with landing pages, Google Ads, Meta Ads and tracking."
        serviceName="Real Estate Digital Marketing"
        services={services}
        whyChoose={[
          "Proven track record generating verified real estate leads for layouts, flats, and villas.",
          "Expertise setting up CRM integrations, email alerts, and automated WhatsApp replies.",
          "High-converting visual ad creatives showing layout plans and project locations.",
          "Smart demographic targeting focusing on high-intent property buyers and investors.",
          "Dedicated campaign tracking measuring cost-per-lead and sales pipeline metrics."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/industries/real-estate-digital-marketing"
      />
      <WebPageSchema title="Real Estate Digital Marketing Agency | Clever Crow" description="Generate quality enquiries for plots, apartments, villas and commercial projects with landing pages, Google Ads, Meta Ads and tracking." url="https://clevercrow.in/industries/real-estate-digital-marketing" />
      <ServiceSchema serviceName="Real Estate Digital Marketing Services" serviceDescription="Generate quality enquiries for plots, apartments, villas and commercial projects with landing pages, Google Ads, Meta Ads and tracking." pageUrl="https://clevercrow.in/industries/real-estate-digital-marketing" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
