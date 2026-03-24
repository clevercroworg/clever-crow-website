import HeroCinematic from "@/components/HeroCinematic";
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
    title: "Google & Meta Ads",
    text: "High-performance Google and Meta campaigns designed for efficient acquisition, measurable ROI, and continuous optimisation.",
    icon: "megaphone",
    href: "/services/paid-ads",
  },
  {
    title: "Social Media Marketing",
    text: "Content, distribution, and growth systems that build visibility, trust, and demand across social platforms.",
    icon: "chart",
    href: "/services/social-media",
  },
  {
    title: "Web Design & Development",
    text: "Fast, scalable, and conversion-focused websites engineered with modern frameworks to turn traffic into qualified leads.",
    icon: "layout",
    href: "/services/web-design",
  },
  {
    title: "Mobile App Development",
    text: "Native and cross-platform mobile applications built for performance, seamless UX, and long-term scalability.",
    icon: "bot",
    href: "/services/mobile-apps",
  },
  {
    title: "Content & Video Creatives",
    text: "Short-form content, video edits, and ad creatives built to perform across platforms and scale with campaigns.",
    icon: "video",
    href: "/services/content",
  },
  {
    title: "Analytics & Optimisation",
    text: "Tracking, reporting, and optimisation frameworks that turn data into decisions and growth into a repeatable process.",
    icon: "analytics",
    href: "/services/analytics",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <HeroCinematic />
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
