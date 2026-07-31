"use client";

import React, { useState } from "react";
import "../lp.css";

// Components
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import LogoMarquee from "../components/LogoMarquee";
import PerformanceExperts from "../components/PerformanceExperts";
import SuccessStories from "../components/SuccessStories";
import FaqSection from "../components/FaqSection";
import ClientReviews from "../components/ClientReviews";
import Footer from "@/components/Footer";
import CallbackModal from "../components/CallbackModal";
import WhatsAppButton from "../components/WhatsAppButton";
import { launchPackageData } from "./business-launch-data";

export default function LaunchPackageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="landing-page-container bg-white text-slate-900">
      <div className="site-shell">
        <Header />
        <main id="top">
          {/* Hero Section - Standard Dark Blue Navy Gradient, No Badges */}
          <HeroSection data={launchPackageData.hero} />
          
          <LogoMarquee />

          {/* Value Header & Pricing Banner (Light Section) */}
          <section id="package-details" className="py-16 sm:py-24 bg-slate-50 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-700 border border-amber-500/20 mb-4">
                  Complete Business Launch Package
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  What You Get in the Package
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  10 Complete Digital Marketing Deliverables to Get Your Business Online & Ready for Customers
                </p>

                {/* Price Callout Banner */}
                <div className="mt-8 rounded-3xl border border-amber-400/40 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 p-6 sm:p-8 shadow-md">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 line-through text-lg sm:text-xl font-medium">Total Value: ₹48,000+</span>
                        <span className="rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-600/20">
                          SAVE OVER 58%
                        </span>
                      </div>
                      <div className="text-3xl sm:text-5xl font-black text-slate-900 mt-1">
                        ₹19,999 <span className="text-lg font-bold text-amber-600">+ GST</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 font-semibold">
                        One-Time Setup Only • No Compulsory Monthly Commitment • 100% Account Ownership
                      </p>
                    </div>
                    <a
                      href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20the%20Complete%20Business%20Launch%20Package%20(%E2%82%B919%2C999%2BGST)."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-[#f4c542] px-8 py-4 text-base font-bold text-black shadow-lg hover:brightness-105 transition shrink-0 w-full sm:w-auto"
                    >
                      Get Started Today
                    </a>
                  </div>
                </div>
              </div>

              {/* 10 Modules Grid */}
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {launchPackageData.modules.map((module) => (
                  <div
                    key={module.number}
                    className="relative rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-amber-400 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-black tracking-widest text-amber-800 uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                          Module {module.number}
                        </span>
                        <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                          {module.value}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{module.title}</h3>
                      <p className="text-sm text-slate-600 mb-6">{module.description}</p>
                      <div className="border-t border-slate-100 pt-4">
                        <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-3">Included Features:</p>
                        <ul className="space-y-2.5 text-sm text-slate-700">
                          {module.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why This Package Is Valuable & End Result Checklist (Light Section) */}
          <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                  <span className="text-xs font-bold tracking-widest text-amber-800 uppercase bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
                    Why Choose This Package
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    One Dedicated Expert Team Instead of Multiple Vendors
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    Instead of coordinating separately with web developers, SEO freelancers, graphic designers, Google Ads managers and social media agencies, you get your complete digital ecosystem launched seamlessly under one roof.
                  </p>

                  <div className="mt-8 space-y-4">
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Save Time & Hassle</h4>
                        <p className="text-xs text-slate-600 mt-1">Single point of contact for branding, web development, social media and performance ads.</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Consistent Brand Identity</h4>
                        <p className="text-xs text-slate-600 mt-1">Matching graphics, copy and messaging across your website, Google, Facebook, Instagram and WhatsApp.</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Complete Digital Infrastructure</h4>
                        <p className="text-xs text-slate-600 mt-1">Full analytics tracking, Meta Pixel and ad conversion setup configured on day one.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">At the End of the Project, Your Business Will Have:</h3>
                  <div className="grid gap-3">
                    {[
                      "A professional 5-page website",
                      "Domain name and 1-year hosting",
                      "Google Search and Maps presence",
                      "Facebook Business Page",
                      "Instagram Business Profile",
                      "12 professional social media posts",
                      "Google Ads campaign setup",
                      "Facebook and Instagram Ads setup",
                      "WhatsApp lead generation system",
                      "Analytics and conversion tracking"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 border border-amber-300">
                          {index + 1}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Target Audience Section (Light Section) */}
          <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold tracking-widest text-amber-800 uppercase bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
                  Target Industries & Business Types
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Perfect For Any Business Ready to Scale Online
                </h2>
                <p className="mt-3 text-slate-600 text-base">
                  Whether you are launching a new venture or upgrading your existing digital presence, this package delivers everything you need.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {launchPackageData.targetAudience.map((audience, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-amber-400 hover:shadow-sm transition text-center flex items-center justify-center"
                  >
                    <span className="text-sm font-semibold text-slate-800">{audience}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Delivery Timeline & Requirements Needed (Light Section) */}
          <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-2">
                {/* Timeline */}
                <div className="rounded-3xl border border-amber-300 bg-amber-50/50 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-lg">
                      ⏱
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Delivery Timeline</h3>
                      <p className="text-xs text-amber-800 font-bold">7–10 Working Days Delivery</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-6">
                    Our team works swiftly to configure, design, and deploy all 10 digital assets. The timeline begins right after receiving your business details, content, images, approvals, and necessary account accesses.
                  </p>
                  <div className="p-4 rounded-xl bg-white border border-amber-200 text-xs text-slate-600">
                    <span className="font-bold text-slate-900">Note:</span> Third-party platform verification and domain/account approval timelines (such as Google Maps or Meta verification) may vary depending on platform policies.
                  </div>
                </div>

                {/* Requirements Needed */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">What We Need From You</h3>
                  <p className="text-xs text-slate-600 mb-6">To ensure seamless setup within 7–10 working days, we request:</p>
                  <ul className="grid gap-2.5 text-sm text-slate-700">
                    {launchPackageData.requirementsNeeded.map((req, index) => (
                      <li key={index} className="flex items-center gap-3 p-2.5 rounded-lg bg-white border border-slate-200">
                        <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 border border-amber-300">
                          {index + 1}
                        </span>
                        <span className="text-xs font-medium text-slate-800">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 100% Account Ownership & 30-Day Support (Light Section) */}
          <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
                  Transparency & Ownership
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  100% Client Account Ownership & 30 Days Post-Launch Support
                </h2>
                <p className="mt-3 text-slate-600 text-base">
                  All accounts and digital assets are created under your direct ownership. You retain complete master administrative access.
                </p>
              </div>

              {/* Ownership Grid */}
              <div className="mb-16">
                <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Digital Assets You Will Own 100%:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {launchPackageData.ownershipItems.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 text-center">
                      <span className="text-xs font-semibold text-emerald-900">✓ {item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Included vs Not Included */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-white shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="text-emerald-600">✓</span> 30 Days Support Included
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    {launchPackageData.supportDetails.included.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
                  <h3 className="text-xl font-bold text-slate-500 mb-4 flex items-center gap-2">
                    <span className="text-slate-400">✕</span> Not Included in Setup Package
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-500">
                    {launchPackageData.supportDetails.notIncluded.map((ninc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-slate-400">✕</span>
                        <span>{ninc}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-amber-800 italic font-medium">
                    Note: Ongoing ad management, daily campaign optimization, and monthly social media management can be added separately based on your requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof & Case Studies */}
          <PerformanceExperts />
          
          <SuccessStories
            data={launchPackageData.caseStudies}
            title="Proven Results Across Industries"
            subtitle="Explore how our digital marketing infrastructure drives growth for real businesses."
            filterBy="platform"
          />

          {/* Frequently Asked Questions */}
          <FaqSection data={launchPackageData.faqs} />

          <ClientReviews />
        </main>

        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton message="Hi Clever Crow Team, I'm interested in the Complete Business Launch Package (₹19,999 + GST)." />
    </main>
  );
}
