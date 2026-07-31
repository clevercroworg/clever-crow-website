"use client";

import React, { useState } from "react";
import "../lp.css";

// Components
import Header from "../components/Header";
import HeroLaunchPackage from "./HeroLaunchPackage";
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
          {/* Custom Hero Section matching reference mockup */}
          <HeroLaunchPackage onOpenModal={() => setIsModalOpen(true)} />
          
          <LogoMarquee />

          {/* Section 1: Total Package Value Table & Intro (White Section) */}
          <section id="package-details" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto">
                <span className="inline-block rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-800 border border-amber-500/20 mb-4">
                  Complete Business Launch Package
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  What You Get
                </h2>
                <p className="mt-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
                  {launchPackageData.summaryText}
                </p>

                {/* Total Value Summary Callout Table */}
                <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Total Package Value</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                    {launchPackageData.totalValueItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between border-b border-slate-100 pb-2">
                        <span>{item.service}</span>
                        <span className="font-semibold text-slate-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 flex justify-between items-center text-base sm:text-lg font-bold text-slate-900 border-t border-amber-400">
                    <span>Total Value:</span>
                    <span className="text-amber-800 font-extrabold text-xl sm:text-2xl">₹48,000+</span>
                  </div>

                  <div className="mt-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Special Package Price</span>
                      <span className="text-2xl sm:text-4xl font-black text-slate-900">₹19,999 + GST</span>
                      <span className="text-xs text-slate-600 ml-2 font-semibold">(One-Time Setup Only)</span>
                      <p className="text-[11px] text-slate-600 mt-1">
                        No compulsory monthly contract. Ongoing digital marketing management can be added separately based on your requirements.
                      </p>
                    </div>
                    <a
                      href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20the%20Complete%20Business%20Launch%20Package%20(%E2%82%B919%2C999%2BGST)."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl bg-[#f4c542] px-6 py-3.5 text-sm font-bold text-black shadow-md hover:brightness-105 transition shrink-0 w-full sm:w-auto"
                    >
                      Get Started Today
                    </a>
                  </div>
                </div>
              </div>

              {/* 10 Detailed Modules Grid */}
              <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {launchPackageData.modules.map((module) => (
                  <div
                    key={module.number}
                    className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-amber-400 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Heading & Padded Value Badge */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                          {module.number}. {module.title}
                        </h3>
                        <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300 shrink-0 whitespace-nowrap shadow-xs">
                          {module.value}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 mb-6 font-medium leading-relaxed">{module.description}</p>
                      
                      <div className="border-t border-slate-100 pt-5">
                        <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-3">INCLUDED</p>
                        
                        {/* Included Tag Cards with Tick Marks */}
                        <div className="grid gap-2">
                          {module.included.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-amber-300 hover:bg-white transition">
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-300">
                                ✓
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Why This Package Is Valuable (Balanced Grid & Occupied Heights) */}
          <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-12 items-stretch">
                {/* Left Column: Heading & 3 Benefit Feature Cards */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-amber-800 uppercase bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
                      Package Benefits
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                      Why This Package Is Valuable
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-slate-700">
                      {launchPackageData.whyValuableText}
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 border border-amber-300">1</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">One Dedicated Team</h4>
                        <p className="text-xs text-slate-600 mt-0.5">No need to hire separate web designers, ads managers, or SEO freelancers.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 border border-amber-300">2</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Consistent Brand Identity</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Matching design, copy, and messaging across your website, Google, FB & IG.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                      <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5 border border-amber-300">3</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Turnkey Infrastructure</h4>
                        <p className="text-xs text-slate-600 mt-0.5">Full analytics, lead forms, and advertising systems ready on day one.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: End-Result Deliverables Checklist Card */}
                <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        At the end of the project, your business will have:
                      </h3>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shrink-0 hidden sm:inline-block">
                        10 Complete Deliverables
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {launchPackageData.endResultItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-amber-300 transition">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 border border-amber-300">
                            ✓
                          </span>
                          <span className="text-xs font-semibold text-slate-800">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>• 100% Client Ownership</span>
                    <span>• Ready in 7–10 Working Days</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Perfect For (Reduced Height & Single-Line Slow Marquee Carousel) */}
          <section className="py-10 sm:py-12 bg-slate-50 border-t border-slate-200 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-xs font-bold tracking-widest text-amber-800 uppercase bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
                  Target Audience
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  Perfect For
                </h2>
              </div>
            </div>

            {/* Single Line Slow Infinite Marquee Carousel */}
            <div className="logo-marquee">
              <div className="logo-track" style={{ animationDuration: "35s" }}>
                {launchPackageData.targetAudience.map((audience, idx) => (
                  <div
                    key={`a-${idx}`}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200 bg-white shadow-xs hover:border-amber-400 hover:shadow-sm transition shrink-0 whitespace-nowrap"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 border border-emerald-300">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{audience}</span>
                  </div>
                ))}
              </div>

              <div className="logo-track" aria-hidden="true" style={{ animationDuration: "35s" }}>
                {launchPackageData.targetAudience.map((audience, idx) => (
                  <div
                    key={`b-${idx}`}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-slate-200 bg-white shadow-xs hover:border-amber-400 hover:shadow-sm transition shrink-0 whitespace-nowrap"
                  >
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 border border-emerald-300">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{audience}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Delivery Timeline & What We Need From You */}
          <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-12 items-stretch">
                {/* Delivery Timeline Card */}
                <div className="lg:col-span-5 rounded-3xl border border-amber-300 bg-amber-50/50 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-lg border border-amber-300">
                        ⏱
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">Delivery Timeline</h3>
                        <p className="text-base text-amber-900 font-extrabold">{launchPackageData.deliveryTimeline.days}</p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-6">
                      {launchPackageData.deliveryTimeline.note}
                    </p>

                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">1</span>
                        <span className="text-xs font-semibold text-slate-800">Days 1–3: Asset collection & Website Design</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">2</span>
                        <span className="text-xs font-semibold text-slate-800">Days 4–7: Social Profiles & Ad Campaigns Setup</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-amber-200 flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0">3</span>
                        <span className="text-xs font-semibold text-slate-800">Days 8–10: Tracking Verification & Final Launch</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-amber-200 text-xs text-amber-900 font-semibold">
                    ⚡ Fast 7–10 Working Days Turnaround
                  </div>
                </div>

                {/* What We Need From You Card */}
                <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-slate-900">What We Need From You</h3>
                      <span className="text-xs font-bold text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200">
                        Initial Onboarding Checklist
                      </span>
                    </div>

                    <ul className="grid sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
                      {launchPackageData.requirementsNeeded.map((req, index) => (
                        <li key={index} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center shrink-0 border border-amber-300">
                            {index + 1}
                          </span>
                          <span className="text-xs font-medium text-slate-800">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600 font-medium">
                    • Provide details upon project start to ensure 7–10 days delivery timeline.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Account Ownership (Slate-50 Section) */}
          <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
                  Full Control
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Account Ownership
                </h2>
                <p className="mt-3 text-slate-700 text-base">
                  {launchPackageData.accountOwnership.intro}
                </p>
              </div>

              <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">You will retain ownership of:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {launchPackageData.accountOwnership.items.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-3">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span className="text-sm font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Support Included & Not Included */}
          <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-xs font-bold tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-300">
                  Post-Launch Assurance
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Support Included
                </h2>
                <p className="mt-2 text-base font-bold text-amber-800">
                  {launchPackageData.supportDetails.title}
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2 items-stretch">
                {/* Left Card: Included Support */}
                <div className="p-6 sm:p-8 rounded-3xl border border-emerald-300 bg-emerald-50/40 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-slate-900">Support includes:</h3>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                        30 Days Post-Launch
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {launchPackageData.supportDetails.included.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-emerald-200 shadow-xs">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0 border border-emerald-300">
                            ✓
                          </span>
                          <span className="text-xs font-semibold text-slate-800">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 rounded-2xl bg-white border border-emerald-200 text-xs text-slate-700">
                    <span className="font-bold text-emerald-800 block mb-1">🛡 30-Day Setup Guarantee</span>
                    Free assistance with account access, setup corrections, and tracking verification to ensure your system operates smoothly.
                  </div>
                </div>

                {/* Right Card: Not Included */}
                <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 bg-slate-50 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                      <h3 className="text-xl font-bold text-slate-800">Not Included in Base Setup</h3>
                      <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                        Add-On Services
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      {launchPackageData.supportDetails.notIncluded.map((ninc, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200">
                          <span className="text-slate-400 font-bold shrink-0">•</span>
                          <span className="font-medium text-slate-700">{ninc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600 italic">
                    {launchPackageData.supportDetails.note}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof & Portfolio / Case Studies Section */}
          <PerformanceExperts />

          <SuccessStories
            data={launchPackageData.caseStudies}
            title="Success Stories Across Industries"
            subtitle="Explore how our digital marketing infrastructure drives growth for real businesses."
            filterBy="platform"
          />

          {/* Frequently Asked Questions */}
          <FaqSection data={launchPackageData.faqs} />

          {/* Client Reviews Section */}
          <ClientReviews />

          {/* Section 7: Final CTA Section (Blue BG, Compact Height, White Card) */}
          <section className="py-10 sm:py-12 bg-gradient-to-r from-[#0b1739] via-[#0f2456] to-[#0b1739] text-white text-center border-t border-blue-900/40 relative overflow-hidden">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Ready to Launch Your Business Online?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-blue-100/90 max-w-2xl mx-auto">
                Get your website, Google presence, social media accounts, advertising systems and WhatsApp lead setup completed by one professional team.
              </p>

              <div className="mt-6 mx-auto max-w-sm bg-white text-slate-900 p-5 sm:p-6 rounded-2xl shadow-2xl border-2 border-[#f4c542]">
                <h3 className="text-base font-bold text-slate-900">Complete Business Launch Package</h3>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  ₹19,999 <span className="text-xs font-bold text-amber-700">+ GST</span>
                </div>
                <div className="mt-3 space-y-1 text-xs font-semibold text-slate-600">
                  <p>• One-Time Setup</p>
                  <p>• No Monthly Commitment</p>
                  <p>• Domain and Hosting Included</p>
                </div>
                <a
                  href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20the%20Complete%20Business%20Launch%20Package%20(%E2%82%B919%2C999%2BGST)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#f4c542] px-6 py-3 text-sm font-bold text-black shadow-md hover:brightness-110 transition w-full"
                >
                  Get Started Today
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton message="Hi Clever Crow Team, I'm interested in the Complete Business Launch Package (₹19,999 + GST)." />
    </main>
  );
}
