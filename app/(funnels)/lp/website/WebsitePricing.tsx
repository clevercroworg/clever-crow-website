"use client";

import { Check } from "lucide-react";
import { ADS_CALL_CONVERSION, gtag } from "@/lib/tracking";
import type { PricingMeta } from "./website-data";

// Pricing section for /lp/website only (the shared PricingSection stays as it is for the other LPs).

export default function WebsitePricing({ data }: { data: PricingMeta }) {
  const trackCall = () => gtag("event", "conversion", { send_to: ADS_CALL_CONVERSION });

  return (
    <section id="package" className="scroll-mt-24 bg-[#fbf8f3] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wide text-blue-600">
            <span className="h-[3px] w-8 rounded-full bg-[#f4c542] sm:w-12" aria-hidden="true" />
            {data.preTitle}
            <span className="h-[3px] w-8 rounded-full bg-[#f4c542] sm:w-12" aria-hidden="true" />
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{data.subtitle}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 md:grid-cols-2 md:gap-6">
          {data.packages.map((pkg) => (
            <article
              key={pkg.name}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.12)] sm:p-8"
            >
              <span className="h-1.5 w-14 rounded-full bg-[#f4c542]" aria-hidden="true" />
              <h3 className="package-title !mt-4">{pkg.name}</h3>
              {pkg.description && <p className="mt-1 text-[14px] font-medium leading-relaxed text-slate-700">{pkg.description}</p>}

              <p className="package-title !mt-4">
                {pkg.price}
                {pkg.priceNote && <span className="ml-1 align-baseline text-base font-bold text-slate-500">{pkg.priceNote}</span>}
              </p>
              {(pkg.strikePrice || pkg.priceTerm) && (
                <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-500">
                  {pkg.strikePrice && (
                    <>
                      <s className="font-semibold text-slate-400 decoration-2">
                        <span className="sr-only">Regular price </span>
                        {pkg.strikePrice}
                      </s>
                      <span className="h-4 w-px bg-slate-300" aria-hidden="true" />
                    </>
                  )}
                  {pkg.priceTerm}
                </p>
              )}

              {pkg.pagesIncluded && (
                <p
                  className={`mt-5 rounded-lg px-4 py-2.5 text-[14px] font-bold text-slate-900 ${
                    pkg.featured ? "bg-[#fdf0c4]" : "bg-slate-100"
                  }`}
                >
                  {pkg.pagesIncluded}
                </p>
              )}

              <ul className="mt-4 grid gap-[0.7rem] text-[0.96rem] leading-normal text-slate-600">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-[0.2rem] h-[18px] w-[18px] shrink-0 stroke-[3] text-[#f4b400]" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              {data.cardCta && (
                <div className="mt-auto pt-7">
                  <a
                    href={data.cardCta.href}
                    onClick={trackCall}
                    className={`inline-flex h-12 w-full items-center justify-center rounded-xl text-sm font-bold transition ${
                      pkg.featured
                        ? "bg-[#f4c542] text-slate-950 hover:brightness-105"
                        : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {data.cardCta.label}
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>

        {data.quoteText && (
          <div className="package-quote-line">
            <p>
            {data.quoteText}{" "}
            {data.quoteLinkText && (
              <a href={data.quoteHref ?? "tel:+919986389444"} onClick={trackCall}>
                {data.quoteLinkText}
              </a>
            )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
