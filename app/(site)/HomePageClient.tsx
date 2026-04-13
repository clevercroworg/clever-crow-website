"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import PremiumHero from "@/components/PremiumHero";
import TechStack from "@/components/TechStack";
import SectionHeader from "@/components/SectionHeader";
import CallbackModal from "@/components/CallbackModal";

// Lazy load below-the-fold components
const ServiceGrid = dynamic(() => import("@/components/ServiceGrid"), { ssr: true });
const Differentiators = dynamic(() => import("@/components/Differentiators"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });

interface Service {
  title: string;
  text: string;
  icon: string;
  href: string;
}

interface HomePageClientProps {
  services: Service[];
}

export default function HomePageClient({ services }: HomePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      {/* ================= HERO ================= */}
      <PremiumHero onCallbackClick={() => setIsModalOpen(true)} />
      <TechStack />

      {/* ================= WHAT WE BUILD ================= */}
      <section id="portfolio" className="relative bg-gray-50 pt-16 sm:pt-32 pb-20 sm:pb-44 overflow-hidden">
        <div id="about" className="absolute top-[-100px]" />
        <div id="services" className="absolute top-[-100px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <SectionHeader 
            badge="Precision Engineering"
            title="What We"
            titleAccent="Build"
            description="From high-converting ad campaigns to full-stack web and mobile applications we engineer digital growth systems that scale with your ambition."
          />
          <ServiceGrid services={services} />
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <Differentiators />
      <div id="faq">
        <Testimonials />
      </div>

      <CallbackModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
