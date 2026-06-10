import HomePageClient from "./HomePageClient";

export const metadata = {
  title: "Clever Crow | Websites, Apps, AI Automation & Digital Marketing",
  description:
    "Clever Crow helps businesses grow with high-performance websites, custom apps, AI automation, Google Ads, Meta Ads, SEO and lead generation systems.",
  keywords: "website development app development ai automation digital marketing agency, web development company, AI marketing agency, digital growth agency, performance marketing company",
};

/* ================= SERVICES DATA ================= */
const services = [
  {
    title: "Business Website",
    text: "High-performance, custom-built websites designed to establish your brand authority and generate leads.",
    icon: "layout",
    href: "/business-website-development",
  },
  {
    title: "E-commerce Website",
    text: "Powerful online stores built for scale, speed, and seamless customer shopping experiences across all devices.",
    icon: "shopping",
    href: "/ecommerce-website-development",
  },
  {
    title: "Social Media Ads",
    text: "Targeted advertising on Facebook, Instagram, and LinkedIn to reach your ideal audience and grow your brand.",
    icon: "megaphone",
    href: "/meta-ads-management-services",
  },
  {
    title: "Google Ads",
    text: "Capture high-intent traffic and dominate search results with precision-targeted Google Ads campaigns.",
    icon: "chart",
    href: "/google-ads-management-services",
  },
  {
    title: "SEO",
    text: "Long-term organic growth and sustainable traffic through data-driven search engine optimization.",
    icon: "search",
    href: "/seo-services",
  },
  {
    title: "Branding & Strategy",
    text: "Data-driven brand strategies and marketing roadmaps to scale your business predictably and memorably.",
    icon: "brand",
    href: "/services/strategy-planning",
  },
];

export default function HomePage() {
  return <HomePageClient services={services} />;
}
