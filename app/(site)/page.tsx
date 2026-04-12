import SimpleHero from "@/components/SimpleHero";
import TechStack from "@/components/TechStack";
import SectionHeader from "@/components/SectionHeader";
import FallingTags from "@/components/FallingTags";
import Testimonials from "@/components/Testimonials";
import ServiceGrid from "@/components/ServiceGrid";
import StrategicEcosystem from "@/components/StrategicEcosystem";
import Differentiators from "@/components/Differentiators";
import DynamicCTA from "@/components/DynamicCTA";
import PrimaryCTA from "@/components/PrimaryCTA";

export const metadata = {
  title: "Clever Crow – AI Digital Marketing & Automation",
  description:
    "Clever Crow helps businesses grow with AI-powered digital marketing, SEO, automation, and high-conversion websites.",
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
  return (
    <main>
      {/* ================= HERO ================= */}
      <SimpleHero />
      <TechStack />

      {/* ================= WHAT WE BUILD ================= */}
      <section className="relative bg-gray-50 pt-16 sm:pt-32 pb-20 sm:pb-44 overflow-hidden">
        {/* Falling Tags overlay — rains over the cards, lands at section floor */}
        <FallingTags />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <SectionHeader 
            badge="Precision Engineering"
            title="What We"
            titleAccent="Build"
            description="From high-converting ad campaigns to full-stack web and mobile applications — we engineer digital growth systems that scale with your ambition."
          />
          <ServiceGrid services={services} />
        </div>
      </section>

      {/* ================= STRATEGIC ECOSYSTEM ================= */}
      <StrategicEcosystem />

      {/* ================= TESTIMONIALS ================= */}
      <Differentiators />
      <DynamicCTA />
      <Testimonials />

    </main>
  );
}
