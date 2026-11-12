"use client";

import React from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal, Stagger, StaggerItem } from "./motion";
import type { PricingPackage } from "./page-content";

// Monthly packages with prices. Shown only on pages that set `pricingPackages` in page-content.ts.
export default function PricingPackages({
  packages,
  onChoose,
  onCustom,
}: {
  packages: PricingPackage[];
  onChoose: (packageName: string) => void;
  onCustom: () => void;
}) {
  return (
    <section id="packages" className="overflow-hidden pb-6 pt-10 sm:pb-8 sm:pt-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple Monthly Packages"
          subtitle="Choose the package that fits where your business is today. All prices are per month, plus GST."
        />

        <Stagger className="mt-10 grid items-stretch gap-6 md:grid-cols-3" stagger={0.1}>
          {packages.map((pkg) => {
            const featured = Boolean(pkg.highlight);
            return (
              <StaggerItem key={pkg.name} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7 ${
                    featured
                      ? "border-[#071330] bg-[#071330] text-white md:-my-3 md:py-10"
                      : "border-slate-200 bg-white text-slate-900"
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-[#FFCE1B] px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#071330] shadow-sm">
                      <Sparkles className="h-3.5 w-3.5" /> {pkg.highlight}
                    </span>
                  )}

                  <h3 className={`text-lg font-extrabold tracking-tight ${featured ? "text-white" : "text-[#071330]"}`}>{pkg.name}</h3>

                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                    <span className={`text-4xl font-extrabold tracking-tight ${featured ? "text-[#FFCE1B]" : "text-[#071330]"}`}>
                      {pkg.price}
                    </span>
                    <span className={`text-sm font-semibold ${featured ? "text-slate-300" : "text-slate-500"}`}>+ GST / month</span>
                  </p>

                  <p className={`mt-4 rounded-xl px-3.5 py-2.5 text-sm leading-snug ${featured ? "bg-white/10 text-slate-200" : "bg-amber-50 text-slate-700"}`}>
                    <span className={`font-bold ${featured ? "text-white" : "text-[#071330]"}`}>Best for: </span>
                    {pkg.bestFor}
                  </p>

                  <ul className="mt-5 flex-1 space-y-3 text-[15px]">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            featured ? "bg-[#FFCE1B] text-[#071330]" : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className={featured ? "text-slate-100" : "text-slate-700"}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onChoose(pkg.name)}
                    className={`mt-7 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-extrabold transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                      featured
                        ? "bg-[#FFCE1B] text-[#071330] hover:bg-[#ffd84d]"
                        : "border border-slate-200 bg-slate-50 text-[#071330] hover:border-amber-300 hover:bg-[#fff9e3]"
                    }`}
                  >
                    Get Started with {pkg.name}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal y={16}>
          <p className="mt-8 text-center text-sm text-slate-600">
            Need a different mix of services?{" "}
            <button type="button" onClick={onCustom} className="cursor-pointer font-bold text-[#071330] underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-700">
              Ask for a custom plan
            </button>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
