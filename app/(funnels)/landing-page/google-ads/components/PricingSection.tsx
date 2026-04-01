"use client";

import React from "react";

export default function PricingSection() {
  return (
    <section id="pricing" className="pricing-light-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple Pricing for Different Growth Stages</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Start small or choose ongoing management for stronger long-term performance.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Basic Package */}
          <article className="package-card">
            <div className="package-card-body">
              <div className="package-title-row">
                <div>
                  <p className="package-eyebrow">Basic</p>
                  <h3 className="package-title">₹7,999 <span className="package-price-suffix">One-Time Setup</span></h3>
                </div>
              </div>
              <p className="mt-4 text-[15px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
                Best if: Best-in-budget marketing for instant leads.
              </p>
              <ul className="package-list mt-4">
                <li>Campaign setup</li>
                <li>Keyword research</li>
                <li>Ad copy creation</li>
                <li>Conversion tracking setup</li>
                <li>7 days basic optimisation</li>
              </ul>
            </div>
          </article>

          {/* Growth Package */}
          <article className="package-card package-card-featured">
            <div className="package-card-body">
              <div className="package-title-row">
                <div>
                  <p className="package-eyebrow package-eyebrow-featured">Growth</p>
                  <h3 className="package-title">₹19,999 <span className="package-price-suffix">/ month</span></h3>
                </div>
              </div>
              <p className="mt-4 text-[15px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
                Best if: Aggressively dominate your local market.
              </p>
              <ul className="package-list mt-4">
                <li>Everything in Basic</li>
                <li>Ongoing campaign optimisation</li>
                <li>Weekly testing and improvements</li>
                <li>Budget optimisation</li>
                <li>Reporting support</li>
              </ul>
            </div>
          </article>
        </div>
        <div className="package-quote-line">
          <p>Need a broader scope or custom plan? <a href="tel:+919986389444">Call us for a custom quote</a>.</p>
        </div>
      </div>
    </section>
  );
}
