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

import type { MobileAppLandingData } from "./mobile-data";

type MobileAppLandingClientProps = {
  data: MobileAppLandingData;
};

export default function MobileAppLandingClient({ data }: MobileAppLandingClientProps) {
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
          <div id="pricing">
            <PricingSection data={data.pricing} />
          </div>
          <PerformanceExperts />
          <SuccessStories 
            data={data.caseStudies} 
            title="Our Mobile App Portfolio"
            subtitle="Explore our range of high-performance mobile applications developed across Real Estate, E-commerce, Food Delivery, Travel & Hospitality, and Educational Technology."
            hideMetrics={true}
            isAppPortfolio={true}
          />
          <FaqSection data={data.faqs} />
          <ClientReviews />
        </main>
        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton message="Hi Clever Crow Team, I'm interested in Mobile App Development services." />
    </main>
  );
}
