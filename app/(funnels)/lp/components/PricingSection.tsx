"use client";

import React from "react";

type PackageInfo = {
  label: string;
  name: string;
  oldPrice?: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

type PricingMeta = {
  preTitle?: string;
  title: string;
  subtitle: string;
  packages: PackageInfo[];
  quoteText?: string;
  quoteHref?: string;
};

type PricingSectionProps = {
  data?: PricingMeta;
};

const defaultPricing: PricingMeta = {
  preTitle: "",
  title: "Simple Pricing for Different Growth Stages",
  subtitle: "Start small or choose ongoing management for stronger long-term performance.",
  packages: [
    {
      label: "Basic",
      name: "Basic",
      price: "₹7,999",
      description: "Best if: Best-in-budget marketing for instant leads.",
      features: ["Campaign setup", "Keyword research", "Ad copy creation", "Conversion tracking setup", "7 days basic optimisation"],
    },
    {
      label: "Growth",
      name: "Growth",
      price: "₹29,999",
      description: "Best if: Aggressively dominate your local market.",
      features: ["Everything in Basic", "Ongoing campaign optimisation", "Weekly testing and improvements", "Budget optimisation", "Reporting support"],
      featured: true,
    },
  ],
  quoteText: "Need a broader scope or custom plan?",
  quoteHref: "tel:+919986389444",
};

export default function PricingSection({ data }: PricingSectionProps) {
  const pricing = data ?? defaultPricing;

  return (
    <section id="pricing" className="pricing-light-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {pricing.preTitle && <p className="text-sm font-bold uppercase tracking-wide text-brand-soft">{pricing.preTitle}</p>}
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{pricing.title}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">{pricing.subtitle}</p>
        </div>
        <div className={`mx-auto mt-10 grid gap-8 ${pricing.packages.length === 1 ? "max-w-md" : "max-w-5xl lg:grid-cols-2"}`}>
          {pricing.packages.map((pkg) => (
            <article className={`package-card ${pkg.featured ? "package-card-featured" : ""}`} key={pkg.name}>
              <div className="package-card-body">
                <div className="package-title-row">
                  <div>
                    <p className={`package-eyebrow ${pkg.featured ? "package-eyebrow-featured" : ""}`}>{pkg.label}</p>
                    <h3 className="package-title">
                      {pkg.price}{" "}
                      <span className="package-price-suffix">{pkg.name}</span>
                    </h3>
                  </div>
                </div>
                <p className="mt-4 text-[15px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">{pkg.description}</p>
                <ul className="package-list mt-4">
                  {pkg.features.map((feature) => (<li key={feature}>{feature}</li>))}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <div className="package-quote-line">
          <p>{pricing.quoteText} <a href={pricing.quoteHref ?? "tel:+919986389444"}>Call us for a custom quote</a>.</p>
        </div>
      </div>
    </section>
  );
}
