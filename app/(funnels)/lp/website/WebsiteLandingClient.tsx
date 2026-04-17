"use client";

import React, { useState, useEffect } from "react";
import "../lp.css";

// Components
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LogoMarquee from "../components/LogoMarquee";
import PerformanceExperts from "../components/PerformanceExperts";
import SuccessStories from "../components/SuccessStories";
import PricingSection from "../components/PricingSection";
import FaqSection from "../components/FaqSection";
import ClientReviews from "../components/ClientReviews";
import Footer from "@/components/Footer";
import CallbackModal from "../components/CallbackModal";
import WhatsAppButton from "../components/WhatsAppButton";

import type { WebsiteLandingData } from "./website-data";

type WebsiteLandingClientProps = {
  data: WebsiteLandingData;
};

export default function WebsiteLandingClient({ data }: WebsiteLandingClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Small timeout to ensure all components have rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hasMounted]);

  if (!hasMounted) return null;

  return (
    <main className="landing-page-container">
      <div className="site-shell">
        <Header />
        <main id="top">
          <HeroSection data={data.hero} />
          <LogoMarquee />
          <PricingSection data={data.pricing} />
          <PerformanceExperts />
          <SuccessStories 
            data={data.caseStudies} 
            title="Our Website Portfolio"
            subtitle="Live projects across real estate, education, healthcare, industrial, e-commerce, hospitality, IT, corporate, and wellness segments."
          />
          <FaqSection data={data.faqs} />
          <ClientReviews />
        </main>
        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton message="Hi Clever Crow Team, I'm interested in Website development services." />
    </main>
  );
}
