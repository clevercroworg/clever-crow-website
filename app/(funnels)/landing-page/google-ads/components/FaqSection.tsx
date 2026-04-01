"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: "faq-1",
    question: "How much budget do I need for Google Ads?",
    answer: "We recommend starting with at least ₹500–₹1,500 per day depending on your industry and competition."
  },
  {
    id: "faq-2",
    question: "When will I start getting leads?",
    answer: "Most campaigns start generating leads within 3–7 days after going live, depending on demand and budget."
  },
  {
    id: "faq-3",
    question: "Is ₹7,999 the ad spend or your service fee?",
    answer: "₹7,999 is our management fee. Ad spend is separate and paid directly to Google."
  },
  {
    id: "faq-4",
    question: "Will I get guaranteed leads or results?",
    answer: "We focus on bringing high-quality traffic and improving conversions, but results depend on budget, competition, and offer."
  },
  {
    id: "faq-5",
    question: "Do I need a website or landing page?",
    answer: "Yes, a website or landing page is required. If needed, we can guide you or build one for better conversions."
  },
  {
    id: "faq-6",
    question: "What type of businesses can run Google Ads?",
    answer: "Almost any business can run ads — services, local businesses, e-commerce, education, real estate, and more."
  },
  {
    id: "faq-7",
    question: "Do you handle everything or do I need to manage ads?",
    answer: "We handle setup, optimisation, and tracking. You just need to focus on handling the leads."
  },
  {
    id: "faq-8",
    question: "Can I upgrade or scale later?",
    answer: "Yes, you can upgrade anytime as your business grows and you want more leads."
  }
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 relative z-10 bg-[#0B1120]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/70">
            Everything you need to know about our Google Ads services.
          </p>
        </div>
        <div className="mt-12 flex flex-col gap-4">
          {faqData.map((faq, index) => {
            const isOpen = openFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className={`faq-item glass-panel transition-all duration-300 ${isOpen ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span className="text-white/90">{faq.question}</span>
                  <span className="accordion-plus shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {isOpen ? (
                        <path d="M5 12h14"></path>
                      ) : (
                        <>
                          <path d="M12 5v14"></path>
                          <path d="M5 12h14"></path>
                        </>
                      )}
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm text-white/60 leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
