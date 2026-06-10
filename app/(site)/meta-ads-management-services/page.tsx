import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const faqs = [
  { question: "What are Meta Ads?", answer: "Meta Ads are paid advertisements on Facebook and Instagram. They help businesses reach targeted audiences based on demographics, interests, and behaviors." },
  { question: "How much budget do I need for Meta Ads?", answer: "The budget depends on your goals and industry. We work with budgets of all sizes and focus on maximizing lead quality within your budget." },
  { question: "Do you create the ad creatives?", answer: "Yes. We handle ad creative design, copywriting, and video production as part of our Meta Ads management service." },
  { question: "How do you track leads from Meta Ads?", answer: "We set up Meta Pixel, conversion API, and lead tracking to measure form submissions, calls, and other conversion events accurately." },
];

const services = [
  { icon: "megaphone", title: "Facebook Ads", description: "Targeted Facebook ad campaigns for lead generation, brand awareness, and conversions.", href: "/meta-ads-management-services" },
  { icon: "pencil", title: "Instagram Ads", description: "Visually engaging Instagram ads with stories, reels, and feed placements.", href: "/meta-ads-management-services" },
  { icon: "target", title: "Lead Generation Ads", description: "Meta lead form ads and landing page campaigns optimized for quality enquiries.", href: "/lead-generation-campaigns" },
  { icon: "layout", title: "Creative Design", description: "Scroll-stopping ad creatives, carousels, videos, and copy designed for performance.", href: "/meta-ads-management-services" },
  { icon: "monitor", title: "Pixel & Tracking Setup", description: "Meta Pixel, Conversion API, and event tracking for accurate campaign measurement.", href: "/analytics-tracking-setup" },
  { icon: "rocket", title: "Campaign Optimization", description: "A/B testing, audience refinement, and bid optimization for better cost per lead.", href: "/meta-ads-management-services" },
];

export const metadata = {
  title: "Meta Ads Management Services | Clever Crow",
  description: "Generate leads and enquiries through Facebook and Instagram ads with strong creatives, targeting, testing and campaign optimization.",
  keywords: "Meta Ads management services, Facebook Ads agency, Instagram Ads management, social media advertising, Meta lead generation",
};

export default function MetaAdsManagementServicesPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Meta Ads Management"
        heroTitle="Meta Ads Management Services for Lead Generation"
        heroSubtitle="Generate leads and enquiries through Facebook and Instagram ads with strong creatives, targeting, testing and campaign optimization."
        serviceName="Meta Ads Management"
        services={services}
        whyChoose={[
          "Performance-focused campaigns designed to generate quality leads from Facebook and Instagram.",
          "Professional ad creatives and copy that stop the scroll and drive action.",
          "Advanced audience targeting based on demographics, interests, and behavior data.",
          "Complete Meta Pixel and Conversion API setup for accurate lead tracking.",
          "Continuous A/B testing and optimization for improving cost per lead over time.",
        ]}
        faqs={faqs}
        pageUrl="https://clevercrow.in/meta-ads-management-services"
      />
      <WebPageSchema title="Meta Ads Management Services | Clever Crow" description="Generate leads and enquiries through Facebook and Instagram ads with strong creatives, targeting, testing and campaign optimization." url="https://clevercrow.in/meta-ads-management-services" />
      <ServiceSchema serviceName="Meta Ads Management Services" serviceDescription="Facebook and Instagram ad management for lead generation with creative design, targeting, and optimization." pageUrl="https://clevercrow.in/meta-ads-management-services" />
      <FaqSchema faqs={faqs} />
    </main>
  );
}
