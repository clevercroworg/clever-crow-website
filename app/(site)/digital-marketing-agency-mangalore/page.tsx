import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Do you work with businesses in Mangalore?", answer: "Yes, Clever Crow works with local businesses across Mangalore, coastal Karnataka, and globally for complete digital marketing services." },
  { question: "What marketing channels do you recommend for Mangalore businesses?", answer: "Depending on your industry, we recommend a mix of Google Ads for high-intent queries, Meta Ads for local visual reach, and Local SEO for sustainable organic growth." },
  { question: "Can you handle local SEO for my Mangalore store?", answer: "Yes. We specialize in optimizing Google Business Profiles and local keywords to rank your store/business for Mangalore searches." },
  { question: "Do you offer offline/in-person meetings in Mangalore?", answer: "Yes. Since we are based in the coastal region (Udupi), we can easily schedule in-person consultations and strategy alignment sessions for clients in Mangalore." }
];

const services = [
  { icon: "search", title: "Google Ads Management", description: "Search campaigns targeting customers looking for your services in Mangalore and nearby areas.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Meta Ads Management", description: "Facebook and Instagram ads targeting Mangalore audiences for leads and brand awareness.", href: "/meta-ads-management-services" },
  { icon: "target", title: "SEO Services", description: "Local SEO to help your Mangalore business rank higher in search results.", href: "/seo-services" },
  { icon: "pencil", title: "Social Media Management", description: "Consistent social media presence for Mangalore businesses with local content.", href: "/social-media-management-services" },
  { icon: "rocket", title: "Lead Generation", description: "Multi-channel lead campaigns tailored for Mangalore companies.", href: "/lead-generation-campaigns" },
  { icon: "monitor", title: "Analytics & Tracking", description: "Complete tracking setup to measure marketing ROI for your campaigns.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Digital Marketing Agency in Mangalore | Clever Crow",
  description: "Get Google Ads, Meta Ads, SEO, social media and lead generation support for your Mangalore business from Clever Crow.",
  keywords: "digital marketing agency in Mangalore, marketing company Mangalore, SEO services Mangalore, Facebook Ads Mangalore, Google Ads Mangalore",
};

export default function DigitalMarketingAgencyMangalorePage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Digital Marketing in Mangalore"
        heroTitle="Digital Marketing Agency in Mangalore"
        heroSubtitle="Get Google Ads, Meta Ads, SEO, social media and lead generation support for your Mangalore business from Clever Crow."
        serviceName="Digital Marketing (Mangalore)"
        services={services}
        whyChoose={[
          "Coastal Karnataka experience with deep understanding of local business landscape.",
          "Complete digital marketing suite from PPC ads to organic SEO and social media.",
          "Proven track record of driving high-intent business leads and sales.",
          "Local SEO optimization targeting Mangalore and surrounding hubs.",
          "Clear, data-driven monthly reports and dedicated campaign managers."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/digital-marketing-agency-mangalore"
      />
      <WebPageSchema title="Digital Marketing Agency in Mangalore | Clever Crow" description="Get Google Ads, Meta Ads, SEO, social media and lead generation support for your Mangalore business from Clever Crow." url="https://clevercrow.in/digital-marketing-agency-mangalore" />
      <ServiceSchema serviceName="Digital Marketing Agency in Mangalore" serviceDescription="Get Google Ads, Meta Ads, SEO, social media and lead generation support for your Mangalore business from Clever Crow." pageUrl="https://clevercrow.in/digital-marketing-agency-mangalore" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
