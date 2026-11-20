"use client";

import "../lp.css";

import Header from "../components/Header";
import LogoMarquee from "../components/LogoMarquee";
import SuccessStories from "../components/SuccessStories";
import FaqSection from "../components/FaqSection";
import ClientReviews from "../components/ClientReviews";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "@/components/Footer";
import EcommerceHero from "./EcommerceHero";
import EcommercePricing from "./EcommercePricing";
import EcommerceQuoteModal from "./EcommerceQuoteModal";
import { EcommerceComparison, EcommerceFeatures, EcommerceFinalCta, EcommerceProcess, MobileActionBar } from "./EcommerceSections";
import type { EcommerceLandingData } from "./ecommerce-data";

const WHATSAPP_MESSAGE = "Hi Clever Crow Team, I'm interested in an e-commerce website for my business.";

// Most visitors arrive from Meta ads on a phone: compact hero, prices straight after, a quote pop-up behind every
// quote button, and a bottom bar with call / WhatsApp / quote on small screens.
export default function EcommerceLandingClient({ data }: { data: EcommerceLandingData }) {
  return (
    <main className="landing-page-container pb-20 sm:pb-0">
      <div className="site-shell">
        <Header />
        <main id="top">
          <EcommerceHero data={data.hero} />
          <LogoMarquee />
          <EcommercePricing data={data.pricing} />
          <EcommerceComparison data={data.comparison} />
          <EcommerceFeatures data={data.features} sell={data.sell} />
          <EcommerceProcess data={data.process} />
          <SuccessStories
            data={data.caseStudies}
            title="Online Stores We've Built"
            subtitle="Food, beauty, fashion and home brands selling online. Tap any store to see it."
            hideMetrics
            filterStyle="tabs"
            openSiteOnMobile
          />
          <FaqSection data={data.faqs} />
          <ClientReviews />
          <EcommerceFinalCta data={data.finalCta} whatsappMessage={WHATSAPP_MESSAGE} />
        </main>
        <Footer />
      </div>

      <EcommerceQuoteModal />
      <MobileActionBar whatsappMessage={WHATSAPP_MESSAGE} />
      <div className="hidden sm:block">
        <WhatsAppButton message={WHATSAPP_MESSAGE} />
      </div>
    </main>
  );
}
