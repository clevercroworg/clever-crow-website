"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Phone, Sparkles } from "lucide-react";
import { ADS_CALL_CONVERSION, gtag } from "@/lib/tracking";
import { openQuote } from "../components/QuoteModal";
import { PRICING } from "./chatbot-data";
import { Reveal } from "./ChatbotSections";

// Three chatbot packages: one-time setup + monthly fee. On phones each card shows its first features with a
// "See all" toggle; "Get This Package" opens the quote pop-up with that package chosen.

const PREVIEW = 5;
const rupees = (v?: string) => Number((v ?? "").replace(/[^\d]/g, "")) || 0;

export default function ChatbotPricing() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const trackCall = () => gtag("event", "conversion", { send_to: ADS_CALL_CONVERSION });

  return (
    <section id="package" className="scroll-mt-20 bg-[#f4f5fb] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wide text-indigo-600">
            <span className="h-[3px] w-8 rounded-full bg-[#FFC72C] sm:w-12" aria-hidden="true" />
            {PRICING.preTitle}
            <span className="h-[3px] w-8 rounded-full bg-[#FFC72C] sm:w-12" aria-hidden="true" />
          </p>
          <h2 className="mt-2 text-balance text-[1.7rem] font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">{PRICING.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-[15px] leading-7 text-slate-600 sm:text-lg">{PRICING.subtitle}</p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 sm:mt-12 lg:grid-cols-3 lg:gap-5">
          {PRICING.packages.map((pkg, idx) => {
            const saving = rupees(pkg.strikeSetup) - rupees(pkg.setup);
            const expanded = open[pkg.name];
            const hidden = pkg.features.length - PREVIEW;
            return (
              <Reveal key={pkg.name} delay={idx * 0.08} className={pkg.featured ? "lg:-mt-4" : ""}>
                <article
                  className={`relative flex h-full flex-col rounded-3xl p-6 sm:p-7 ${
                    pkg.featured
                      ? "bg-slate-950 text-white shadow-[0_30px_60px_-25px_rgba(79,70,229,0.6)] ring-2 ring-indigo-500"
                      : "border border-slate-200/80 bg-white text-slate-900 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.12)]"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-[#FFC72C] px-3 py-1 text-[12px] font-bold text-slate-950">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Most popular
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-xl font-black tracking-tight sm:text-2xl">{pkg.name}</h3>
                      <p className={`mt-1 text-[14px] leading-snug ${pkg.featured ? "text-slate-300" : "text-slate-600"}`}>{pkg.tagline}</p>
                    </div>
                    {saving > 0 && (
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[12px] font-bold ring-1 ${pkg.featured ? "bg-emerald-400/15 text-emerald-300 ring-emerald-400/30" : "bg-emerald-50 text-emerald-700 ring-emerald-200"}`}>
                        Save ₹{saving.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <p className={`mt-5 text-[12px] font-bold uppercase tracking-wide ${pkg.featured ? "text-slate-400" : "text-slate-500"}`}>
                    {pkg.custom ? "Setup from" : "One-time setup"}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-4xl font-black tracking-tight">{pkg.setup}</span>
                    <span className={`text-base font-bold ${pkg.featured ? "text-slate-400" : "text-slate-500"}`}>+ GST</span>
                    {pkg.strikeSetup && (
                      <s className={`ml-1 text-lg font-semibold decoration-rose-400 decoration-2 ${pkg.featured ? "text-slate-500" : "text-slate-400"}`}>
                        <span className="sr-only">Regular price </span>
                        {pkg.strikeSetup}
                      </s>
                    )}
                  </div>
                  <p className={`mt-2 inline-flex w-fit items-baseline gap-1 rounded-lg px-2.5 py-1 text-[14px] ${pkg.featured ? "bg-white/10 text-slate-200" : "bg-indigo-50 text-indigo-900"}`}>
                    {pkg.custom ? (
                      <span className="font-bold">Monthly plan as per your needs</span>
                    ) : (
                      <>
                        then <span className="font-black">{pkg.monthly}</span>/month
                      </>
                    )}
                  </p>

                  <p className={`mt-5 rounded-xl px-4 py-2.5 text-[14px] font-bold ${pkg.featured ? "bg-[#FFC72C]/15 text-amber-200" : "bg-slate-100 text-slate-900"}`}>{pkg.limit}</p>

                  <ul className={`mt-4 grid gap-[0.7rem] text-[0.95rem] leading-normal ${pkg.featured ? "text-slate-200" : "text-slate-600"}`}>
                    {pkg.features.map((f, i) => (
                      <li key={f} className={`items-start gap-3 ${i >= PREVIEW && !expanded ? "hidden sm:flex" : "flex"}`}>
                        <Check className={`mt-[0.2rem] h-[18px] w-[18px] shrink-0 stroke-[3] ${pkg.featured ? "text-[#FFC72C]" : "text-indigo-600"}`} aria-hidden="true" />
                        <span className={i === 0 && f.startsWith("Everything in") ? `font-semibold ${pkg.featured ? "text-white" : "text-slate-900"}` : undefined}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  {hidden > 0 && (
                    <button
                      type="button"
                      onClick={() => setOpen((o) => ({ ...o, [pkg.name]: !expanded }))}
                      aria-expanded={!!expanded}
                      className={`mt-3 inline-flex items-center gap-1 self-start text-[14px] font-bold sm:hidden ${pkg.featured ? "text-amber-300" : "text-indigo-700"}`}
                    >
                      {expanded ? "Show fewer" : `See all ${pkg.features.length} features`}
                      <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                  )}

                  <div className="mt-auto grid gap-2 pt-7">
                    <button
                      type="button"
                      onClick={() => openQuote(pkg.name)}
                      className={`inline-flex h-12 items-center justify-center gap-1.5 rounded-xl text-[15px] font-bold transition ${
                        pkg.featured ? "bg-[#FFC72C] text-slate-950 hover:brightness-105" : "bg-slate-950 text-white hover:bg-slate-800"
                      }`}
                    >
                      {pkg.custom ? "Talk to Us" : "Get This Package"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <a
                      href="tel:+919986389444"
                      onClick={trackCall}
                      className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-[14px] font-semibold ${pkg.featured ? "text-slate-300 hover:bg-white/5" : "text-slate-700 hover:bg-slate-50"}`}
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" /> Or call: +91 99863 89444
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 text-center text-[13px] text-slate-500">{PRICING.note}</p>
      </div>
    </section>
  );
}
