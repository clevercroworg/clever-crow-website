"use client";

import React, { useState } from "react";
import "../lp.css";

// Components
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LogoMarquee from "../components/LogoMarquee";
import PerformanceExperts from "../components/PerformanceExperts";
import SuccessStories from "../components/SuccessStories";
import { metaAdsData } from "./meta-ads-data";
import PricingSection from "../components/PricingSection";
import FaqSection from "../components/FaqSection";
import ClientReviews from "../components/ClientReviews";
import Footer from "@/components/Footer";
import CallbackModal from "../components/CallbackModal";
// WhatsAppButton removed as per request


export default function MetaAdsLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="landing-page-container">
      <div className="site-shell">
        <Header />
        <main id="top">
          <HeroSection data={metaAdsData.hero} />
          <LogoMarquee />
          <PricingSection data={metaAdsData.pricing} />
          <PerformanceExperts />
          <SuccessStories 
            data={metaAdsData.caseStudies} 
            title="Success Stories by Platform"
            subtitle="Proven performance across Meta, Facebook, and Instagram."
            filterBy="platform"
          />
          <FaqSection data={metaAdsData.faqs} />
          <ClientReviews />
        </main>
        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* WhatsAppButton removed as per request */}
    </main>
  );
}
