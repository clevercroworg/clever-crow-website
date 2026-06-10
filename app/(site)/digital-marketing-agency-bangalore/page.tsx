import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "Do you work with businesses in Bangalore?", answer: "Yes, Clever Crow works with startups, agencies, and established companies across Bangalore and globally for digital marketing." },
  { question: "How do you compete in the crowded Bangalore market?", answer: "We focus heavily on performance-based advertising, high-converting landing pages, and clean analytics tracking to ensure your marketing spend yields a real ROI." },
  { question: "Can you handle high-budget Google and Meta Ads?", answer: "Yes, we design, test, and optimize ads for campaigns of all sizes, ensuring proper funnel setup and target CPA/ROAS optimization." },
  { question: "Do you offer in-person consultations in Bangalore?", answer: "Yes, we regularly visit clients in Bangalore and offer both virtual and in-person consultations for campaign planning and strategy reviews." }
];

const services = [
  { icon: "search", title: "Google Ads Management", description: "Search campaigns targeting high-intent customers in Bangalore's competitive market.", href: "/google-ads-management-services" },
  { icon: "megaphone", title: "Meta Ads Management", description: "Facebook and Instagram ads targeting specific demographic segments in Bangalore.", href: "/meta-ads-management-services" },
  { icon: "target", title: "SEO Services", description: "Advanced SEO to rank your Bangalore business for regional and national search queries.", href: "/seo-services" },
  { icon: "pencil", title: "Social Media Management", description: "Consistent social media presence for Bangalore brands with highly engaging content.", href: "/social-media-management-services" },
  { icon: "rocket", title: "Lead Generation", description: "Conversion-optimized lead acquisition pipelines designed for Bangalore companies.", href: "/lead-generation-campaigns" },
  { icon: "monitor", title: "Analytics & Tracking", description: "Comprehensive analytics setups (GA4, GTM) to measure campaign ROI precisely.", href: "/analytics-tracking-setup" },
];

export const metadata = {
  title: "Digital Marketing Agency in Bangalore | Clever Crow",
  description: "Clever Crow helps Bangalore businesses grow with performance marketing, SEO, Google Ads, Meta Ads and lead generation systems.",
  keywords: "digital marketing agency in Bangalore, marketing company Bangalore, SEO company Bangalore, Facebook Ads Bangalore, performance marketing Bangalore",
};

export default function DigitalMarketingAgencyBangalorePage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Digital Marketing in Bangalore"
        heroTitle="Digital Marketing Agency in Bangalore"
        heroSubtitle="Clever Crow helps Bangalore businesses grow with performance marketing, SEO, Google Ads, Meta Ads and lead generation systems."
        serviceName="Digital Marketing (Bangalore)"
        services={services}
        whyChoose={[
          "Expertise running digital campaigns in Bangalore's highly competitive startup and corporate landscape.",
          "Complete digital marketing capabilities covering PPC, SEO, social, and lead pipelines.",
          "Focus on high-intent leads and conversion tracking rather than just vanity metrics.",
          "Advanced local and national SEO optimization to beat competitors in organic search.",
          "Regular reporting, clean data dashboards, and active campaign optimization."
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/digital-marketing-agency-bangalore"
      />
      <WebPageSchema title="Digital Marketing Agency in Bangalore | Clever Crow" description="Clever Crow helps Bangalore businesses grow with performance marketing, SEO, Google Ads, Meta Ads and lead generation systems." url="https://clevercrow.in/digital-marketing-agency-bangalore" />
      <ServiceSchema serviceName="Digital Marketing Agency in Bangalore" serviceDescription="Clever Crow helps Bangalore businesses grow with performance marketing, SEO, Google Ads, Meta Ads and lead generation systems." pageUrl="https://clevercrow.in/digital-marketing-agency-bangalore" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
