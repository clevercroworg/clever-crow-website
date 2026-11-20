"use client";

import { useEffect } from "react";
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
/**
 * Shareable section links (e.g. /lp/ecommerce-website#portfolio, #package, #faq). The browser's own jump can land
 * short once images above load, and the fixed header can cover the title, so we place the section ourselves: on
 * arrival and again once the page has finished loading, unless the visitor has started scrolling by then.
 */
function useSectionLink() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let userScrolled = false;
    const stop = () => (userScrolled = true);
    const go = () => {
      const el = document.getElementById(id);
      if (!el || userScrolled) return;
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const padding = parseFloat(getComputedStyle(el).paddingTop) || 0;
      // Title just below the header: the section's own top padding tucks under it.
      const top = el.getBoundingClientRect().top + window.scrollY - Math.max(0, headerBottom - padding + 12);
      window.scrollTo({ top, behavior: "auto" });
    };
    const first = requestAnimationFrame(go);
    window.addEventListener("load", go, { once: true });
    const late = setTimeout(go, 1200);
    const startUser = setTimeout(() => {
      window.addEventListener("wheel", stop, { once: true, passive: true });
      window.addEventListener("touchstart", stop, { once: true, passive: true });
    }, 150);
    return () => {
      cancelAnimationFrame(first);
      clearTimeout(late);
      clearTimeout(startUser);
      window.removeEventListener("load", go);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
  }, []);
}

export default function EcommerceLandingClient({ data }: { data: EcommerceLandingData }) {
  useSectionLink();
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
            heading={{ lead: "Online Stores", accent: "We've Built", badge: "LIVE CLIENT STORES" }}
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
