"use client";

import React, { useState } from "react";

import type { FaqData } from "../website/website-data";

const googleAdsFaqs: FaqData[] = [
  {
    question: "How much budget do I need for Google Ads?",
    answer: "We recommend starting with at least ₹500–₹1,500 per day depending on your industry and competition. You can increase this as you see positive ROI."
  },
  {
    question: "When will I start getting leads?",
    answer: "Most campaigns start generating leads within 3–7 days after going live. Google’s algorithm usually takes about a week to fully optimise for your target audience."
  },
  {
    question: "Is ₹7,999 the ad spend or your service fee?",
    answer: "₹7,999 is our professional management fee for the Basic package. Your ad spend is paid directly to Google from your own account."
  },
  {
    question: "Will I get guaranteed leads or sales?",
    answer: "While we can't guarantee a specific number of sales, we focus on bringing high-intent traffic to your site and improving conversion rates through expert optimisation."
  },
  {
    question: "Do I need a website or landing page?",
    answer: "Yes, you need a functional landing page or website. If you don't have one, we can build a high-converting landing page for you at an additional cost."
  },
  {
    question: "How do you track the performance of my ads?",
    answer: "We set up comprehensive conversion tracking through Google Analytics and Google Ads, so you can see exactly where your leads and sales are coming from."
  },
  {
    question: "What industries do you specialise in?",
    answer: "We have experience across real estate, education, healthcare, e-commerce, and professional services, helping businesses scale their lead generation."
  },
  {
    question: "Can I cancel the service anytime?",
    answer: "Yes, our monthly packages are flexible. We recommend at least a 3-month commitment for the best data-driven results, but you are not locked into a long-term contract."
  }
];

type FaqSectionProps = {
  data?: FaqData[];
};

export default function FaqSection({ data }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = data ?? googleAdsFaqs;

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-600">Quick answers about delivery timelines, process, and support.</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/30 transition-all hover:bg-slate-50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
              >
                <span className="text-base sm:text-lg font-bold text-slate-900 pr-8">{faq.question}</span>
                <span className={`shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 sm:p-6 pt-0 text-slate-600 leading-relaxed text-sm sm:text-base border-t border-slate-100/50">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
