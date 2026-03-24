"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title: string;
  description?: string;
  faqs: FAQItem[];
};

export default function FaqSection({
  title,
  description,
  faqs,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 bg-[#fafafa]">
      <div className="mx-auto max-w-4xl px-6">
        {/* SECTION HEADER */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-gray-600">
              {description}
            </p>
          )}
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white shadow-sm transition"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-gray-900">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border transition ${
                      isOpen
                        ? "border-yellow-400 bg-yellow-400 text-gray-900"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden px-6">
                    <p className="pb-6 text-sm leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
