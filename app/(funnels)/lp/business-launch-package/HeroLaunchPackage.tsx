"use client";

import React from "react";
import Image from "next/image";

type HeroLaunchPackageProps = {
  onOpenModal?: () => void;
};

export default function HeroLaunchPackage({ onOpenModal }: HeroLaunchPackageProps) {
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 pb-12 bg-[#050814] text-white">
      {/* Background Ambient Neon Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-blue-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 left-0 w-[400px] h-[350px] bg-indigo-600/15 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Subtle Dot Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: `32px 32px`
        }} 
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Headline, Subtitle, Price Card, CTA & 2D Icon Grid */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-[#0d1636]/80 px-3.5 py-1.5 text-xs font-semibold text-purple-200 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="uppercase tracking-wider">One-Time Business Setup</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Complete Business <br />
              <span className="text-white">
                Launch Package
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl">
              Everything your business needs to start getting customers online.
            </p>

            {/* Pricing Card (Dark Glass Box) */}
            <div className="rounded-2xl border border-blue-500/30 bg-[#0a1128]/90 p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(30,58,138,0.25)] max-w-md">
              <span className="text-xs font-semibold text-slate-400 block">Worth ₹48,000+</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#f4c542]">₹19,999</span>
                <span className="text-sm font-bold text-white">+ GST</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>No Monthly Commitment</span>
                <span>•</span>
                <span>100% Ownership</span>
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-1">
              <a
                href="https://wa.me/919986389444?text=Hi%20Clever%20Crow%2C%20I%27m%20interested%20in%20the%20Complete%20Business%20Launch%20Package%20(%E2%82%B919%2C999%2BGST)."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between gap-6 rounded-full bg-[#f4c542] px-8 py-4 text-base font-bold text-black shadow-[0_8px_30px_rgba(244,197,66,0.3)] hover:brightness-110 hover:scale-[1.02] transition duration-200 group min-w-[260px]"
              >
                <span>Get Started Today</span>
                <div className="flex items-center gap-3">
                  <span className="h-5 w-[1px] bg-black/20" />
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </a>
            </div>

            {/* 2D Platform Vector Icon Grid */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
                
                {/* 1. Website (2D Globe Icon) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#09132e]/60 border border-blue-900/40 hover:border-blue-500/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">Website</span>
                </div>

                {/* 2. Domain & Hosting (2D Server/Layout Icon) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#09132e]/60 border border-blue-900/40 hover:border-blue-500/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="8" rx="2" />
                      <rect x="2" y="13" width="20" height="8" rx="2" />
                      <line x1="6" y1="7" x2="6.01" y2="7" strokeWidth="3" />
                      <line x1="6" y1="17" x2="6.01" y2="17" strokeWidth="3" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">Domain & Hosting</span>
                </div>

                {/* 3. Google Business (2D Map Pin Icon) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#09132e]/60 border border-blue-900/40 hover:border-blue-500/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">Google Business</span>
                </div>

                {/* 4. Facebook & Instagram (2D Social Icon) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#09132e]/60 border border-blue-900/40 hover:border-blue-500/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">Facebook & Instagram</span>
                </div>

                {/* 5. Ads Setup (2D Megaphone Icon) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#09132e]/60 border border-blue-900/40 hover:border-blue-500/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M22 12A10 10 0 0 0 12 2v10z" />
                      <path d="M12 12L2.1 10.05A10 10 0 0 0 12 22V12z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">Ads Setup</span>
                </div>

                {/* 6. WhatsApp (2D Chat Icon) */}
                <div className="flex flex-col items-center gap-2 p-2.5 rounded-xl bg-[#09132e]/60 border border-blue-900/40 hover:border-blue-500/40 transition">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">WhatsApp</span>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Large High-Res Hero Showcase Graphic Asset */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg lg:max-w-xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-blue-600/30 to-emerald-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition duration-500" />
              <div className="relative rounded-3xl border border-slate-700/60 bg-[#070d24]/80 p-2 sm:p-3 backdrop-blur-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/landing-page/business-launch-hero.png"
                  alt="Complete Business Launch Package Ecosystem Digital Showcase"
                  width={900}
                  height={850}
                  className="w-full h-auto object-contain rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Trust Ribbon Bar (Full Width across bottom with 2D Icons) */}
        <div className="mt-12 rounded-2xl border border-blue-900/50 bg-[#0a1128]/80 p-4 sm:p-5 backdrop-blur-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            
            {/* 1. Businesses Served */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white">100+ Businesses Served</span>
            </div>

            {/* 2. Days Delivery */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white">7–10 Days Delivery</span>
            </div>

            {/* 3. 100% Ownership */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white">100% Ownership</span>
            </div>

            {/* 4. Support */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <span className="text-xs sm:text-sm font-bold text-white">30 Days Support</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
