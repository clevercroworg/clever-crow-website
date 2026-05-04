import HomePageClient from "./HomePageClient";

export const metadata = {
  title: "Digital Marketing & Web Development | Clever Crow",
  description:
    "High-performance websites, AI-driven digital marketing & Google Ads management. 120+ campaigns delivered with 12.4× ROAS. Get your free consultation today.",
  keywords: "digital marketing company, web development company, AI marketing agency, website and marketing services, digital growth agency, performance marketing company",
};

/* ================= SERVICES DATA ================= */
const services = [
  {
    title: "Business Website",
    text: "High-performance, custom-built websites designed to establish your brand authority and generate leads.",
    icon: "layout",
    href: "/services/business-websites",
  },
  {
    title: "E-commerce Website",
    text: "Powerful online stores built for scale, speed, and seamless customer shopping experiences across all devices.",
    icon: "shopping",
    href: "/services/ecommerce",
  },
  {
    title: "Social Media Ads",
    text: "Targeted advertising on Facebook, Instagram, and LinkedIn to reach your ideal audience and grow your brand.",
    icon: "megaphone",
    href: "/services/meta-ads",
  },
  {
    title: "Google Ads",
    text: "Capture high-intent traffic and dominate search results with precision-targeted Google Ads campaigns.",
    icon: "chart",
    href: "/services/google-ads",
  },
  {
    title: "SEO",
    text: "Long-term organic growth and sustainable traffic through data-driven search engine optimization.",
    icon: "search",
    href: "/services/seo",
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
