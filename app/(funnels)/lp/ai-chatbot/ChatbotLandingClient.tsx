"use client";

import { useEffect } from "react";
import "../lp.css";

import Header from "../components/Header";
import LogoMarquee from "../components/LogoMarquee";
import FaqSection from "../components/FaqSection";
import ClientReviews from "../components/ClientReviews";
import QuoteModal, { openQuote } from "../components/QuoteModal";
import Footer from "@/components/Footer";
import ChatbotHero from "./ChatbotHero";
import ChatbotPricing from "./ChatbotPricing";
import { Channels, DemoBand, Features, FinalCta, MobileActionBar, MobileChatDemo, NightShift, Process, UseCases } from "./ChatbotSections";
import { FAQS, PRICING } from "./chatbot-data";

const WHATSAPP_MESSAGE = "Hi Clever Crow Team, I'm interested in an AI chatbot for my business.";
const quote = () => openQuote();

// Animations used across the page's sections (all wrapped in motion-safe classes where they're applied).
const KEYFRAMES = `
  @keyframes cbDrift { 0%,100% { transform: translate(0,0) rotate(-4deg); } 50% { transform: translate(8px,-14px) rotate(4deg); } }
  @keyframes cbTwinkle { 0%,100% { opacity: .2; transform: scale(.7); } 50% { opacity: 1; transform: scale(1); } }
  @keyframes cbDash { to { stroke-dashoffset: -28; } }
  @keyframes cbBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes cbFeed { 0%,100% { transform: translateX(0); opacity: 1; } 50% { transform: translateX(6px); opacity: .75; } }
`;

/** Shareable section links (#package, #faq): land just below the fixed header, again once images have loaded. */
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
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - Math.max(0, headerBottom - padding + 12), behavior: "auto" });
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

// AI chatbot landing page. Lighter and more playful than the other LPs: the robot mascot, a chat window that plays
// conversations, and the site's real AI assistant as a live demo ("Try Live Demo"). Images are optional: each slot
// shows a drawn version until its file exists in public/lp/chatbot (see page.tsx).
export default function ChatbotLandingClient({ images }: { images: { night?: string; whatsapp?: string } }) {
  useSectionLink();
  return (
    <main className="landing-page-container pb-20 sm:pb-0">
      <style>{KEYFRAMES}</style>
      <div className="site-shell">
        <Header />
        <main id="top">
          <ChatbotHero onQuote={quote} />
          <MobileChatDemo />
          <LogoMarquee />
          <NightShift image={images.night} />
          <Channels image={images.whatsapp} />
          <Features />
          <UseCases />
          <ChatbotPricing />
          <DemoBand />
          <Process />
          <FaqSection data={FAQS} />
          <ClientReviews />
          <FinalCta onQuote={quote} whatsappMessage={WHATSAPP_MESSAGE} />
        </main>
        <Footer />
      </div>

      <QuoteModal
        packages={PRICING.packages.map((p) => p.name)}
        service="AI chatbot"
        formName="AI Chatbot Quote Form"
        title="Get a free chatbot quote"
        subtitle="Share your number. Our team will call you within working hours, understand your business and suggest the right chatbot."
      />
      <MobileActionBar onQuote={quote} />
    </main>
  );
}
