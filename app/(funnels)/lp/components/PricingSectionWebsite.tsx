"use client";

import React from "react";

export default function PricingSectionWebsite() {
  return (
    <section id="pricing" className="pricing-light-section py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Website Packages for Every Stage</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            Choose the package that fits your business needs. All include conversion-focused design and SEO optimization.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
          {/* Startup Web Package */}
          <article className="package-card">
            <div className="package-card-body">
              <div className="package-title-row">
                <div>
                  <p className="package-eyebrow">Startup Web Package</p>
                  <h3 className="package-title">₹16,999 <span className="package-price-suffix">One-Time</span></h3>
                </div>
              </div>
              <p className="mt-4 text-[15px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
                Best if: You need a fast, professional website to launch quickly.
              </p>
              <ul className="package-list mt-4">
                <li>5-page responsive website</li>
                <li>SEO-friendly structure</li>
                <li>2 revisions</li>
                <li>Live chat widget</li>
                <li>7 days support</li>
              </ul>
            </div>
          </article>

          {/* Business Web Package */}
          <article className="package-card package-card-featured">
            <div className="package-card-body">
              <div className="package-title-row">
                <div>
                  <p className="package-eyebrow package-eyebrow-featured">Business Web Package</p>
                  <h3 className="package-title">₹29,999 <span className="package-price-suffix">One-Time</span></h3>
                </div>
              </div>
              <p className="mt-4 text-[15px] font-bold text-slate-900 whitespace-nowrap overflow-hidden text-ellipsis">
                Best if: You need lead-gen and growth-focused experience.
              </p>
              <ul className="package-list mt-4">
                <li>10-page responsive website</li>
                <li>On-page SEO + analytics</li>
                <li>Blog module</li>
                <li>Conversion-focused design</li>
                <li>Priority response</li>
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
