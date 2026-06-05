"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import "../lp.css";

// Components
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LogoMarquee from "../components/LogoMarquee";
import PerformanceExperts from "../components/PerformanceExperts";
import SuccessStories from "../components/SuccessStories";
import { googleAdsData } from "./google-ads-data";
import PricingSection from "../components/PricingSection";
import FaqSection from "../components/FaqSection";
import ClientReviews from "../components/ClientReviews";
import Footer from "@/components/Footer";
import CallbackModal from "../components/CallbackModal";
import WhatsAppButton from "../components/WhatsAppButton";

export default function GoogleAdsLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="landing-page-container">
      {/* Google tag (gtag.js) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-17335403082"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'AW-17335403082');

          // Phone conversion tracking configuration
          gtag('config', 'AW-17335403082/uHSsCKf5i_QaEMqElcpA', {
            'phone_conversion_number': '09986389444'
          });
        `}
      </Script>

      <div className="site-shell">
        <Header />
        <main id="top">
          <HeroSection data={googleAdsData.hero} />
          <LogoMarquee />
          <PricingSection data={googleAdsData.pricing} />
          <PerformanceExperts />
          <SuccessStories 
            data={googleAdsData.caseStudies} 
            title="Success Stories by Platform"
            subtitle="Proven performance across search, social, and organic channels."
            filterBy="platform"
          />
          <FaqSection data={googleAdsData.faqs} />
          <ClientReviews />
        </main>
        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton message="Hi Clever Crow Team, I'm interested in Google Ads management services." />
    </main>
  );
}
