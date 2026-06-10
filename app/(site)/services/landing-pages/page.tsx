import WebDevServiceLayout from "@/components/service/WebDevServiceLayout";
import { Laptop, Code2, ShoppingCart, Layout, RefreshCw, Wrench, Search, Smartphone } from "lucide-react";
import WebPageSchema from "@/components/seo/WebPageSchema";
import ServiceSchema from "@/components/seo/ServiceSchema";
import FaqSchema from "@/components/seo/FaqSchema";

const landingPageFaqs = [
  {
    question: "What is a landing page?",
    answer: "A landing page is a focused, single-purpose page designed to convert visitors into leads or customers through a clear value proposition, strong CTA, and clean layout.",
  },
  {
    question: "Are landing pages different from websites?",
    answer: "Yes. Landing pages are built for specific marketing campaigns or single actions, whereas corporate websites serve broader informational purposes.",
  },
  {
    question: "Do you design landing pages for ads?",
    answer: "Absolutely. We design landing pages optimized for Google Ads, Meta Ads, and other paid traffic sources to ensure maximum conversion.",
  },
  {
    question: "Will my landing page be mobile-friendly?",
    answer: "Yes. All our landing pages are designed mobile-first and tested thoroughly across multiple device configurations.",
  },
  {
    question: "Do you optimise landing pages for conversions?",
    answer: "Yes. We follow CRO (Conversion Rate Optimization) best practices including clear layout hierarchy, value statements, page speed, and button optimization.",
  },
];

const landingServices = [
  {
    icon: Layout,
    title: "Lead Gen Landing Pages",
    description: "Focused layouts with custom query-capturing forms and Google/Meta conversion tracking.",
    href: "/services/landing-pages"
  },
  {
    icon: Laptop,
    title: "Product Launch Pages",
    description: "High-impact visual narratives designed to launch and showcase new products.",
    href: "/services/landing-pages"
  },
  {
    icon: Search,
    title: "Google & PPC Ads Pages",
    description: "Optimized quality-score layouts with direct message match for paid search ads.",
    href: "/services/landing-pages"
  },
  {
    icon: Smartphone,
    title: "Meta & Social Traffic Pages",
    description: "Sleek, responsive scroll-stopping interfaces built for social media users.",
    href: "/services/landing-pages"
  },
  {
    icon: Code2,
    title: "Headless Promo Microsites",
    description: "Dedicated campaign microsites built with static site speed and security.",
    href: "/services/landing-pages"
  },
  {
    icon: RefreshCw,
    title: "CRO Redesign & Audit",
    description: "Improving copy hierarchy, button placements, and load times of existing campaign pages.",
    href: "/services/landing-pages"
  }
];

export const metadata = {
  title: "Landing Page Design Services in India | Clever Crow",
  description:
    "High-converting landing page design services in India. Campaign-focused, fast, and conversion-optimised landing pages.",
};

export default function LandingPagesPage() {
  return (
    <main>
      <WebDevServiceLayout
        eyebrow="Landing Page Development"
        heroTitle="Landing Pages Designed to Convert Traffic into Leads"
        heroSubtitle="We design high-performing landing pages optimized for Google Ads, Meta Ads, and social traffic to turn clicks into active sales leads."
        serviceName="Landing Page Design"
        services={landingServices}
        whyChoose={[
          "Goal-focused, clutter-free layout design that guides user focus toward the conversion CTA.",
          "Mobile-optimized responsive setups that load in milliseconds on mobile connection speeds.",
          "Integrated conversion tracking tags (Google Tag Manager, Meta Pixels, Google Analytics).",
          "Seamless form submissions connected directly to your CRM, WhatsApp, or email notifications.",
          "High visual impact with modern graphics, animations, and clean typography.",
          "Optimized for high ad quality scores to lower your overall Google Ads cost-per-click."
        ]}
        faqs={landingPageFaqs}
        pageUrl="https://clevercrow.in/services/landing-pages"
      />

      <WebPageSchema
        title="Landing Page Design Services in India"
        description="Landing page design services focused on conversions, performance, and campaign success."
        url="https://clevercrow.in/services/landing-pages"
      />
      <ServiceSchema
        serviceName="Landing Page Design Services"
        serviceDescription="High-converting landing page design services for campaigns and lead generation."
        pageUrl="https://clevercrow.in/services/landing-pages"
      />
      <FaqSchema faqs={landingPageFaqs} />
    </main>
  );
}
