"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Phone, Sparkles } from "lucide-react";
import { ADS_CALL_CONVERSION, gtag } from "@/lib/tracking";
import type { PricingMeta } from "../website/website-data";
import { openQuote } from "./EcommerceQuoteModal";

// Package cards for the e-commerce page. On phones each card shows its first features and a "see all" toggle,
// so both prices stay close together. "Get This Package" opens the quote pop-up with that package chosen.

const PREVIEW = 6;
const rupees = (v?: string) => Number((v ?? "").replace(/[^\d]/g, "")) || 0;

export default function EcommercePricing({ data }: { data: PricingMeta }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const trackCall = () => gtag("event", "conversion", { send_to: ADS_CALL_CONVERSION });

  return (
    <section id="package" className="scroll-mt-20 bg-[#fbf8f3] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wide text-blue-600">
            <span className="h-[3px] w-8 rounded-full bg-[#f4c542] sm:w-12" aria-hidden="true" />
            {data.preTitle}
            <span className="h-[3px] w-8 rounded-full bg-[#f4c542] sm:w-12" aria-hidden="true" />
          </p>
          <h2 className="mt-2 text-balance text-[1.7rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">{data.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-lg">{data.subtitle}</p>
        </div>

        <div className="mt-9 grid grid-cols-1 items-start gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
          {data.packages.map((pkg) => {
            const saving = rupees(pkg.strikePrice) - rupees(pkg.price);
            const expanded = open[pkg.name];
            const hidden = pkg.features.length - PREVIEW;
            return (
              <article
                key={pkg.name}
                className={`relative flex flex-col rounded-3xl bg-white p-6 sm:p-8 ${
                  pkg.featured
                    ? "border-2 border-[#f4c542] shadow-[0_24px_50px_-20px_rgba(244,180,0,0.45)]"
                    : "border border-slate-200/80 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.12)]"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-3 py-1 text-[12px] font-bold text-amber-300 sm:left-8">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Most popular
                  </span>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{pkg.name}</h3>
                    <p className="mt-1 text-[14px] leading-snug text-slate-600">{pkg.description}</p>
                  </div>
                  {saving > 0 && (
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[12px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                      Save ₹{saving.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-4xl font-black tracking-tight text-slate-950">{pkg.price}</span>
                  {pkg.priceNote && <span className="text-base font-bold text-slate-500">{pkg.priceNote}</span>}
                  {pkg.strikePrice && (
                    <s className="ml-1 text-lg font-semibold text-slate-400 decoration-rose-400 decoration-2">
                      <span className="sr-only">Regular price </span>
                      {pkg.strikePrice}
                    </s>
                  )}
                </div>
                {pkg.priceTerm && <p className="mt-1 text-[13px] text-slate-500">{pkg.priceTerm}</p>}

                {pkg.pagesIncluded && (
                  <p className={`mt-5 rounded-xl px-4 py-2.5 text-[14px] font-bold text-slate-900 ${pkg.featured ? "bg-[#fdf0c4]" : "bg-slate-100"}`}>
                    {pkg.pagesIncluded}
                  </p>
                )}

                <ul className="mt-4 grid gap-[0.7rem] text-[0.95rem] leading-normal text-slate-600">
                  {pkg.features.map((f, i) => (
                    // Phones show the first few unless expanded; larger screens always show everything.
                    <li key={f} className={`items-start gap-3 ${i >= PREVIEW && !expanded ? "hidden sm:flex" : "flex"}`}>
                      <Check className="mt-[0.2rem] h-[18px] w-[18px] shrink-0 stroke-[3] text-[#f4b400]" aria-hidden="true" />
                      <span className={i === 0 && f.startsWith("Everything in") ? "font-semibold text-slate-900" : undefined}>{f}</span>
                    </li>
                  ))}
                </ul>
                {hidden > 0 && (
                  <button
                    type="button"
                    onClick={() => setOpen((o) => ({ ...o, [pkg.name]: !expanded }))}
                    aria-expanded={!!expanded}
                    className="mt-3 inline-flex items-center gap-1 self-start text-[14px] font-bold text-blue-700 sm:hidden"
                  >
                    {expanded ? "Show fewer" : `See all ${pkg.features.length} features`}
                    <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                )}

                <div className="mt-auto grid gap-2.5 pt-7">
                  <button
                    type="button"
                    onClick={() => openQuote(pkg.name)}
                    className={`inline-flex h-12 items-center justify-center gap-1.5 rounded-xl text-[15px] font-bold transition ${
                      pkg.featured ? "bg-[#f4c542] text-slate-950 hover:brightness-105" : "bg-slate-950 text-white hover:bg-slate-800"
                    }`}
                  >
                    Get This Package <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  {data.cardCta && (
                    <a
                      href={data.cardCta.href}
                      onClick={trackCall}
                      className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-[14px] font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" /> Or call us: +91 99863 89444
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {data.quoteText && (
          <p className="mt-8 text-center text-[15px] text-slate-600">
            {data.quoteText}{" "}
            {data.quoteLinkText && (
              <a href={data.quoteHref ?? "tel:+919986389444"} onClick={trackCall} className="font-bold text-blue-700 underline-offset-4 hover:underline">
                {data.quoteLinkText}
              </a>
            )}
          </p>
        )}
      </div>
    </section>
  );
}
