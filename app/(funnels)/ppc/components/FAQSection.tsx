"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  items?: FAQ[];
};

export default function FAQSection({ items }: FAQSectionProps) {
  const defaultFaqs: FAQ[] = [
    {
      question: "Is digital marketing suitable for small and growing businesses?",
      answer:
        "Yes. Digital marketing is especially effective for small and growing businesses because budgets can be controlled, results are measurable, and strategies can scale as the business grows.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Paid advertising can start generating leads within days. SEO, content, and organic strategies typically take 3–6 months to show consistent results, depending on competition and execution.",
    },
    {
      question: "Do you offer customized marketing strategies?",
      answer:
        "Absolutely. Every strategy is built from scratch based on your business goals, audience, industry, budget, and growth stage. We do not use one-size-fits-all plans.",
    },
    {
      question: "Which services do you cover?",
      answer:
        "We provide end-to-end digital marketing including paid ads, SEO, social media management, content, landing pages, funnel optimization, and performance tracking.",
    },
    {
      question: "Do you work with specific industries only?",
      answer:
        "No. Our approach is framework-driven, not industry-limited. We’ve worked with startups, service businesses, ecommerce brands, and B2B companies across multiple sectors.",
    },
    {
      question: "Will I get regular performance reports?",
      answer:
        "Yes. You’ll receive clear and actionable reports covering traffic, leads, conversions, cost per lead, and overall ROI, along with insights and next steps.",
    },
    {
      question: "Who owns the ad accounts, data, and creatives?",
      answer:
        "You do. All ad accounts, analytics, data, and creatives remain fully owned by you. We believe in complete transparency and long-term trust.",
    },
    {
      question: "Is there a minimum contract or long-term commitment?",
      answer:
        "No long-term lock-ins. Most services are offered on a flexible monthly basis, allowing you to continue based on performance and alignment.",
    },
    {
      question: "How do you measure success?",
      answer:
        "Success is measured using business-focused metrics such as qualified leads, conversions, revenue impact, and return on investment — not vanity metrics.",
    },
    {
      question: "What makes Clever Crow different from other agencies?",
      answer:
        "We focus on systems, clarity, and outcomes. Instead of chasing trends or impressions, we build repeatable growth engines backed by data, execution, and ownership.",
    },
  ];

  const faqs = items || defaultFaqs;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600">
            Clear answers to common questions about our approach and services.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl border bg-white transition ${
                  isOpen
                    ? "border-yellow-400 shadow-md"
                    : "border-gray-200"
                }`}
              >
                {/* Question */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  {/* Accent indicator */}
                  <span
                    className={`ml-4 text-2xl font-semibold transition ${
                      isOpen
                        ? "text-yellow-500"
                        : "text-slate-400"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-slate-700">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
