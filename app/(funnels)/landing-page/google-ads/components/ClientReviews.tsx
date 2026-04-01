"use client";

import React from "react";
import { motion } from "framer-motion";

const googleAdsReviews = [
  {
    name: "Manipal Group or Institutes",
    text: "We partnered with CleverCrow to improve our digital presence and lead generation. Their understanding of SEO, Google Ads, and automation is extremely practical. Within a few months, we saw consistent inbound leads.",
    rating: 5,
  },
  {
    name: "KIFSE",
    text: "CleverCrow helped us restructure our paid ads and website funnels. What stood out was their data-driven approach and clear communication. The transition was seamless and results were immediate.",
    rating: 5,
  },
  {
    name: "Malpe Boating",
    text: "The CleverCrow team understood our business goals clearly and implemented solutions that genuinely saved us time and increased our ROI. Highly recommended for any growing brand.",
    rating: 5,
  },
  {
    name: "Bethany",
    text: "CleverCrow stands out for their honesty and execution. Everything was delivered on time and with clear outcomes. They transformed our digital strategy completely.",
    rating: 5,
  },
];

export default function ClientReviews() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Client Reviews</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">What Clients Say About Working With Us</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Clear communication, structured execution, and practical optimisation support.
          </p>
        </div>
        <div className="flex overflow-hidden py-4 w-full relative mt-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-slate-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-slate-50 to-transparent" />
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-6 px-3"
          >
            {[...googleAdsReviews, ...googleAdsReviews].map((t, i) => (
              <div
                key={i}
                className="relative flex flex-col justify-between rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] w-[280px] sm:w-[350px]"
              >
                <div>
                  <div className="mb-4 flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                  <p className="mt-5 text-sm sm:text-base leading-7 sm:leading-8 text-slate-700 italic">
                    “{t.text}”
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="mt-1 text-xs text-slate-500">Google Ads Management Client</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
