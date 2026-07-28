"use client";

import React, { useState, useEffect } from "react";
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

import { digitalMarketingSetupData, SetupModule } from "./digital-marketing-setup-data";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Share2,
  Search,
  Target,
  BarChart3,
  LineChart,
  Cpu,
  TrendingUp,
  Store,
  Code2,
  Magnet,
  Compass,
  Megaphone,
  LayoutDashboard,
  FileCheck,
  Zap,
  Lock,
} from "lucide-react";

export default function SetupLandingClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [hasMounted]);

  if (!hasMounted) return null;

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case "Store":
        return <Store className="h-6 w-6 text-amber-600" />;
      case "Share2":
        return <Share2 className="h-6 w-6 text-amber-600" />;
      case "Search":
        return <Search className="h-6 w-6 text-amber-600" />;
      case "Code2":
        return <Code2 className="h-6 w-6 text-amber-600" />;
      case "Magnet":
        return <Magnet className="h-6 w-6 text-amber-600" />;
      case "Compass":
        return <Compass className="h-6 w-6 text-amber-600" />;
      case "Megaphone":
        return <Megaphone className="h-6 w-6 text-amber-600" />;
      case "LayoutDashboard":
        return <LayoutDashboard className="h-6 w-6 text-amber-600" />;
      case "FileCheck":
        return <FileCheck className="h-6 w-6 text-amber-600" />;
      case "ShieldCheck":
        return <ShieldCheck className="h-6 w-6 text-amber-600" />;
      default:
        return <Zap className="h-6 w-6 text-amber-600" />;
    }
  };

  const getReadinessIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <Search className="h-5 w-5 text-amber-600" />;
      case "Share2":
        return <Share2 className="h-5 w-5 text-amber-600" />;
      case "Target":
        return <Target className="h-5 w-5 text-amber-600" />;
      case "BarChart3":
        return <BarChart3 className="h-5 w-5 text-amber-600" />;
      case "LineChart":
        return <LineChart className="h-5 w-5 text-amber-600" />;
      case "Cpu":
        return <Cpu className="h-5 w-5 text-amber-600" />;
      case "TrendingUp":
        return <TrendingUp className="h-5 w-5 text-amber-600" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-amber-600" />;
    }
  };

  return (
    <main className="landing-page-container bg-white text-slate-900">
      <div className="site-shell">
        <Header />

        <main id="top">
          {/* Hero Section */}
          <HeroSection data={digitalMarketingSetupData.hero} />

          {/* Logo Marquee */}
          <LogoMarquee />

          {/* Business Readiness Grid */}
          <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  Turnkey Infrastructure
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
                  {digitalMarketingSetupData.readiness.title}
                </h2>
                <p className="mt-3 text-slate-600 text-base sm:text-lg">
                  {digitalMarketingSetupData.readiness.subtitle}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {digitalMarketingSetupData.readiness.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 group-hover:scale-110 transition-transform">
                      {getReadinessIcon(item.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}

                {/* Summary Card */}
                <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-500/10 via-amber-100/40 to-white p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">One-Time Fee</span>
                    <h3 className="text-3xl font-black text-slate-900 mt-1">₹19,999 <span className="text-sm font-medium text-slate-600">+ GST</span></h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      No monthly commitment. Complete ownership transfer upon handover.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#f4c542] px-4 py-2.5 text-sm font-bold text-slate-950 hover:brightness-105 transition shadow-md"
                  >
                    Get Started Today
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 10 Modules Detailed Section */}
          <section id="modules" className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                  Full 10-Step Deliverable Framework
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
                  10 Comprehensive Setup Modules
                </h2>
                <p className="mt-4 text-slate-600 text-base sm:text-lg">
                  Every technical component pre-built, tested, and handed over under your business ownership.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {digitalMarketingSetupData.modules.map((mod: SetupModule) => (
                  <div
                    key={mod.id}
                    className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-8 transition-all duration-300 hover:border-amber-400 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm">
                          {getModuleIcon(mod.iconName)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                            {mod.badge}
                          </span>
                          <h3 className="text-xl font-bold text-slate-900">
                            {mod.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                      {mod.description}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {mod.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing & Handover Card */}
          <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl rounded-3xl border border-amber-300 bg-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wider">
                    {digitalMarketingSetupData.pricing.package.label}
                  </span>
                  <h2 className="mt-4 text-3xl font-black text-slate-900 sm:text-4xl">
                    {digitalMarketingSetupData.pricing.package.name}
                  </h2>
                  <div className="mt-6 flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-black text-slate-900 sm:text-6xl">
                      {digitalMarketingSetupData.pricing.package.price}
                    </span>
                    <span className="text-lg font-bold text-slate-600">
                      {digitalMarketingSetupData.pricing.package.tax}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-600 text-sm sm:text-base">
                    {digitalMarketingSetupData.pricing.package.description}
                  </p>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto border-t border-slate-200 pt-8">
                  {digitalMarketingSetupData.pricing.package.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                      <div className="h-5 w-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span dangerouslySetInnerHTML={{ __html: feat }} />
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#f4c542] hover:brightness-105 text-slate-950 font-bold text-base transition shadow-md flex items-center justify-center gap-2"
                  >
                    Request Call Back for Setup
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <a
                    href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20Complete%20Digital%20Marketing%20Setup.%20(Ref:%20LP/Digital-Marketing-Setup)"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition flex items-center justify-center gap-2 shadow-md"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Ownership Guarantee Badge */}
                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-center gap-2 text-xs text-slate-500 text-center">
                  <Lock className="h-4 w-4 text-amber-600" />
                  <span>100% Client Ownership Guaranteed • No Monthly Commitments</span>
                </div>
              </div>
            </div>
          </section>

          {/* Inclusions vs Exclusions Scope Section */}
          <section className="py-20 bg-white border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider">
                  Transparent Boundaries
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  {digitalMarketingSetupData.scope.title}
                </h2>
                <p className="mt-3 text-slate-600 text-base">
                  {digitalMarketingSetupData.scope.subtitle}
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Included */}
                <div className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">What IS Included</h3>
                      <p className="text-xs text-emerald-700 font-semibold">One-Time Setup Deliverables</p>
                    </div>
                  </div>
                  <ul className="space-y-3.5">
                    {digitalMarketingSetupData.scope.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                        <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                      <XCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">What is NOT Included</h3>
                      <p className="text-xs text-rose-700 font-semibold">Add-on Services / Direct Ad Spend</p>
                    </div>
                  </div>
                  <ul className="space-y-3.5">
                    {digitalMarketingSetupData.scope.notIncluded.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                        <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                <Sparkles className="h-4 w-4 text-amber-600 inline-block mr-2" />
                {digitalMarketingSetupData.scope.note}
              </div>
            </div>
          </section>

          {/* Timeline Breakdown Section */}
          <section className="py-16 bg-slate-50 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4">
                    <Clock className="h-4 w-4" />
                    Delivery Speed
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    Estimated Delivery Timeline: 5‒7 Working Days
                  </h3>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    Timeline begins upon receipt of platform access & verification details. Processed systematically to ensure zero missing tracking events or verification hurdles.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="shrink-0 px-8 py-4 rounded-2xl bg-[#f4c542] hover:brightness-105 text-slate-950 font-bold text-sm transition shadow-md"
                >
                  Book Your Setup Slot
                </button>
              </div>
            </div>
          </section>

          {/* Performance Experts */}
          <PerformanceExperts />

          {/* Success Stories */}
          <SuccessStories
            data={digitalMarketingSetupData.caseStudies}
            title="Setup & Campaign Case Studies"
            subtitle="Real businesses equipped with robust tracking and high-converting marketing setup."
            filterBy="platform"
          />

          {/* FAQs */}
          <FaqSection data={digitalMarketingSetupData.faqs} />

          {/* Client Reviews */}
          <ClientReviews />
        </main>

        <Footer />
      </div>

      <CallbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WhatsAppButton message="Hi Clever Crow Team, I'm interested in Complete Digital Marketing Setup services." />
    </main>
  );
}
