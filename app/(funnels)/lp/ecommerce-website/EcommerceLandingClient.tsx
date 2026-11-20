"use client";

import "../lp.css";

import Header from "../components/Header";
import LogoMarquee from "../components/LogoMarquee";
import SuccessStories from "../components/SuccessStories";
import FaqSection from "../components/FaqSection";
import ClientReviews from "../components/ClientReviews";
import WhatsAppButton from "../components/WhatsAppButton";
import Footer from "@/components/Footer";
import WebsitePricing from "../website/WebsitePricing";
import EcommerceHero from "./EcommerceHero";
import EcommerceQuoteForm from "./EcommerceQuoteForm";
import { EcommerceFeatures, EcommerceProcess, MobileActionBar } from "./EcommerceSections";
import type { EcommerceLandingData } from "./ecommerce-data";

const WHATSAPP_MESSAGE = "Hi Clever Crow Team, I'm interested in an e-commerce website for my business.";

// Most visitors arrive from Meta ads on a phone: compact hero, prices straight after, a short form,
// and a bottom bar with call / WhatsApp / quote on small screens.
export default function EcommerceLandingClient({ data }: { data: EcommerceLandingData }) {
  return (
    <main className="landing-page-container pb-20 sm:pb-0">
      <div className="site-shell">
        <Header />
        <main id="top">
          <EcommerceHero data={data.hero} />
          <LogoMarquee />
          <WebsitePricing data={data.pricing} />
          <EcommerceQuoteForm />
          <EcommerceFeatures data={data.features} />
          <EcommerceProcess data={data.process} />
          <SuccessStories
            data={data.caseStudies}
            title="Online Stores We've Built"
            subtitle="D2C brands, lifestyle stores and retailers selling across India and abroad."
            hideMetrics={false}
            filterStyle="tabs"
            openSiteOnMobile
          />
          <FaqSection data={data.faqs} />
          <ClientReviews />
        </main>
        <Footer />
      </div>

      <MobileActionBar whatsappMessage={WHATSAPP_MESSAGE} />
      <div className="hidden sm:block">
        <WhatsAppButton message={WHATSAPP_MESSAGE} />
      </div>
    </main>
  );
}
