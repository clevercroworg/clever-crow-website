"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Globe, 
  CheckCircle2, 
  User, 
  Phone, 
  Lock, 
  Star, 
  Award, 
  Code2, 
  Rocket, 
  Smartphone, 
  ArrowRight, 
  Gauge, 
  BarChart3,
  Search,
  Check
} from "lucide-react";

type HeroMeta = {
  badges?: string[];
  title?: string;
  accentTitle?: string;
  subtitle?: string;
  highlights?: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

type HeroSectionProps = {
  data?: HeroMeta;
};

export default function HeroSection({ data }: HeroSectionProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setStatusMsg("Please enter both name and phone number.");
      return;
    }
    setLoading(true);
    setStatusMsg("");

    try {
      const currentUrl = typeof window !== "undefined" ? window.location.href : "";
      const currentTitle = typeof window !== "undefined" ? document.title : "";
      const source = currentTitle || "Landing Page Hero Form";

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email: "",
          message: `New enquiry received from Hero Section. Source Page: ${source}. Referrer/Landed URL: ${currentUrl}`,
          source: source,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      // Fire Google Ads conversion tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49",
        });
        (window as any).gtag("event", "GenerateLead", {
          event_category: "Leads",
          event_label: "Lead Form Submit",
        });
      }

      setName("");
      setPhone("");
      router.push("/thank-you");
    } catch (err: any) {
      setStatusMsg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#040817] pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24 lg:pb-28 text-white min-h-[900px] flex items-center">
      {/* ============================================================ */}
      {/* 1. LAYERED ATMOSPHERIC BACKGROUND & LIGHTING                 */}
      {/* ============================================================ */}
      
      {/* Base Deep Navy → Royal Blue Gradient Layer */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-[#040817] via-[#0A122E] via-40% to-[#0F1C4A] opacity-95" 
      />

      {/* Blueprint Grid Overlay (5-8% opacity) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px"
        }}
      />

      {/* Radial Light Orbs & Volumetric Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-blue-500/20 to-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Orbit Rings & Concentric SVG Paths behind Showcase */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none z-0 opacity-25">
        <svg viewBox="0 0 900 900" className="w-full h-full animate-[spin_120s_linear_infinite]">
          <circle cx="450" cy="450" r="280" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="450" cy="450" r="380" fill="none" stroke="rgba(99,102,241,0.2)" strokeWidth="1" />
          <circle cx="450" cy="450" r="440" fill="none" stroke="rgba(244,197,66,0.15)" strokeWidth="1" strokeDasharray="12 12" />
        </svg>
      </div>

      {/* Floating Sparkle Dot Accents */}
      <div className="absolute top-24 left-[20%] w-2 h-2 rounded-full bg-[#FFC72C] blur-[1px] animate-ping opacity-75" />
      <div className="absolute bottom-32 left-[15%] w-1.5 h-1.5 rounded-full bg-blue-400 blur-[1px] animate-pulse" />
      <div className="absolute top-40 right-[35%] w-2 h-2 rounded-full bg-indigo-400 blur-[1px] animate-pulse" />

      {/* ============================================================ */}
      {/* 2. THREE-COLUMN HERO CONTENT GRID                            */}
      {/* ============================================================ */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">

          {/* -------------------------------------------------------- */}
          {/* LEFT COLUMN: Headline, Paragraph, Trust, Stats            */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6 text-left">

            {/* Massive Bold Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-[3.6rem] font-black text-white leading-[1.08] tracking-tight">
              Your Website.
              <span className="block mt-1 bg-gradient-to-r from-[#FFC72C] via-amber-300 to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,199,44,0.35)]">
                Built to Convert.
              </span>
            </h1>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed font-normal max-w-xl">
              High-performing websites for businesses that need{" "}
              <span className="font-semibold text-white underline decoration-[#FFC72C]/70 underline-offset-4">
                leads
              </span>
              , not just pages. Fast load, mobile first, SEO ready—everything from day one.
            </p>

            {/* Trust Checklist (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-200">15+ Years Experience</span>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-200">550+ Happy Clients</span>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-200">Certified Team</span>
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold text-slate-200">Fast Delivery & Support</span>
              </div>
            </div>

            {/* Client Statistics Cards Bar */}
            <div className="pt-3">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/15 backdrop-blur-xl shadow-xl grid grid-cols-3 divide-x divide-white/10 text-center">
                <div className="px-2">
                  <div className="flex items-center justify-center gap-1 text-[#FFC72C] mb-1">
                    <Globe className="w-4 h-4" />
                    <span className="text-lg sm:text-xl font-black text-white">150+</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400">Websites Delivered</p>
                </div>

                <div className="px-2">
                  <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-lg sm:text-xl font-black text-white">98%</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400">Client Satisfaction</p>
                </div>

                <div className="px-2">
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-lg sm:text-xl font-black text-white">4.9/5</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400">Average Rating</p>
                </div>
              </div>
            </div>

          </div>


          {/* -------------------------------------------------------- */}
          {/* CENTER COLUMN: 3D Laptop Showcase & Floating UI Widgets  */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center py-6 my-4 lg:my-0">
            
            {/* Ambient Lighting Stage/Pedestal */}
            <div className="absolute w-[360px] sm:w-[460px] h-[160px] bg-gradient-to-t from-blue-600/40 via-indigo-600/30 to-transparent rounded-[100%] blur-[35px] bottom-4 pointer-events-none" />

            <div className="relative w-full max-w-[540px]">

              {/* FLOATING CARD 1: +220% Conversion Lift (Top Left) */}
              <div className="absolute -top-6 -left-4 sm:-left-8 z-30 p-3 sm:p-3.5 rounded-2xl bg-[#0b132b]/90 border border-emerald-500/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-3 transform -rotate-3 hover:rotate-0 transition duration-300 animate-[bounce_6s_infinite]">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-black text-emerald-400 tracking-wide">+220% LIFT</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-300">Conversion Rate</p>
                </div>
              </div>

              {/* FLOATING CARD 2: 98 SEO Score (Top Right) */}
              <div className="absolute -top-4 -right-2 sm:-right-6 z-30 p-3 sm:p-3.5 rounded-2xl bg-[#0b132b]/90 border border-blue-500/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-3 transform rotate-3 hover:rotate-0 transition duration-300 animate-[pulse_4s_infinite]">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 font-black text-sm">
                  98
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs font-black text-white">SEO Score</span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-400">Google Optimized</p>
                </div>
              </div>

              {/* FLOATING CARD 3: A+ Performance 0.4s (Middle Left) */}
              <div className="absolute top-1/2 -left-6 sm:-left-12 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-xl bg-[#0b132b]/90 border border-amber-500/30 backdrop-blur-xl shadow-xl flex items-center gap-2.5 transform -rotate-6">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <span className="text-xs font-black text-amber-300">0.4s Load Time</span>
                  <p className="text-[10px] text-slate-400 font-medium">A+ Performance</p>
                </div>
              </div>

              {/* FLOATING CARD 4: Google Ranking #1 (Bottom Right) */}
              <div className="absolute bottom-6 -right-4 sm:-right-8 z-30 p-3 rounded-2xl bg-[#0b132b]/90 border border-purple-500/30 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-2.5 transform rotate-6">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-white flex items-center gap-1">
                    Google Ranking <span className="text-emerald-400 font-extrabold">↑ #1</span>
                  </span>
                  <p className="text-[10px] text-slate-400">First Page Guarantee</p>
                </div>
              </div>

              {/* CENTRAL 3D LAPTOP MOCKUP (Rotated 6-10 degrees) */}
              <div className="relative mx-auto transform rotate-[6deg] hover:rotate-0 transition-transform duration-700 ease-out z-20">
                
                {/* Laptop Display Lid & Bezel */}
                <div className="relative mx-auto w-[340px] sm:w-[460px] lg:w-[480px] h-[220px] sm:h-[290px] lg:h-[300px] bg-slate-900 rounded-t-2xl p-2 sm:p-3 border-t-2 border-x-2 border-slate-700 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
                  
                  {/* Camera / Notch dot */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-800 border border-slate-700 z-40" />

                  {/* Display Screen Screen Viewport */}
                  <div className="relative w-full h-full bg-[#070B19] rounded-lg overflow-hidden border border-slate-800/80 group">
                    
                    {/* Screen Content Mockup */}
                    <div className="w-full h-full p-4 bg-gradient-to-b from-[#0A122E] to-[#050917] text-white flex flex-col justify-between">
                      
                      {/* Mock Header Nav inside Laptop */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-[#FFC72C] flex items-center justify-center font-black text-[10px] text-black">
                            C
                          </div>
                          <span className="text-xs font-extrabold tracking-wide">Clever Crow</span>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-slate-400">
                          <span>Services</span>
                          <span>Portfolio</span>
                          <span>Pricing</span>
                          <span className="px-2 py-0.5 rounded-full bg-[#FFC72C] text-black font-bold">Contact</span>
                        </div>
                      </div>

                      {/* Mock Hero Content inside Laptop Screen */}
                      <div className="my-auto space-y-2">
                        <span className="text-[9px] font-bold text-[#FFC72C] uppercase tracking-widest bg-[#FFC72C]/10 px-2 py-0.5 rounded-md border border-[#FFC72C]/20 inline-block">
                          Top-Tier Web Design Agency
                        </span>
                        <h3 className="text-base sm:text-xl font-black text-white leading-tight">
                          We Build Digital <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-[#FFC72C]">
                            Experiences That Scale
                          </span>
                        </h3>
                        <p className="text-[10px] text-slate-400 max-w-[240px]">
                          250+ Custom sites built for fast growth and high conversion.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button className="px-3 py-1 text-[10px] font-bold bg-[#FFC72C] text-black rounded-md shadow-sm">
                            Get Proposal
                          </button>
                          <button className="px-3 py-1 text-[10px] font-bold bg-white/10 text-white rounded-md border border-white/10">
                            View Work
                          </button>
                        </div>
                      </div>

                      {/* Mock Screen Footer Badges */}
                      <div className="flex items-center justify-between text-[9px] text-slate-500 border-t border-white/5 pt-1.5">
                        <span>⚡ 99/100 Speed</span>
                        <span>🔒 SSL Secured</span>
                        <span>📈 10x ROI</span>
                      </div>

                    </div>

                    {/* Realistic Screen Glass Reflection Flare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Laptop Base / Keyboard Section */}
                <div className="relative mx-auto w-[390px] sm:w-[520px] lg:w-[540px] h-[16px] sm:h-[20px] bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 rounded-b-xl border-t border-slate-600 shadow-[0_20px_40px_rgba(0,0,0,0.9)] flex items-center justify-center">
                  {/* Laptop Opening Thumb Latch */}
                  <div className="w-16 h-1 bg-slate-900 rounded-full" />
                </div>

                {/* FLOATING MOBILE DEVICE beside laptop */}
                <div className="absolute -bottom-4 -right-4 sm:-right-8 z-30 w-[70px] sm:w-[95px] h-[130px] sm:h-[180px] bg-slate-950 rounded-2xl border-2 border-slate-700 p-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transform -rotate-12 hover:rotate-0 transition duration-300 hidden sm:block">
                  <div className="w-full h-full bg-[#050917] rounded-xl p-1.5 flex flex-col justify-between overflow-hidden text-white border border-slate-800">
                    <div className="w-6 h-1 bg-slate-800 rounded-full mx-auto mb-1" />
                    <div className="space-y-1 my-auto">
                      <div className="w-full h-1.5 bg-[#FFC72C] rounded-full" />
                      <div className="w-3/4 h-1.5 bg-blue-400 rounded-full" />
                      <div className="w-full h-8 bg-indigo-900/40 rounded-md border border-indigo-500/30 p-1 flex items-center justify-center">
                        <span className="text-[7px] font-extrabold text-[#FFC72C]">Mobile Ready</span>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-slate-800 rounded-full" />
                  </div>
                </div>

              </div>

            </div>
          </div>


          {/* -------------------------------------------------------- */}
          {/* RIGHT COLUMN: Premium Glassmorphism Callback Form        */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="relative rounded-[28px] bg-[#0B1535]/85 border border-white/15 p-6 sm:p-7 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_40px_rgba(99,102,241,0.15)]">
              
              {/* Decorative Subtle Accent Glow inside Form */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FFC72C]/10 rounded-full blur-2xl pointer-events-none" />

              {/* Form Title */}
              <div className="mb-5">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Request a <span className="text-[#FFC72C]">Call Back</span>
                </h3>
                <p className="text-xs text-slate-300/80 mt-1">
                  Get a free strategy consultation & custom quote within 15 minutes.
                </p>
              </div>

              {/* Callback Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="hero_name"
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/12 text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] transition shadow-inner"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="hero_phone"
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/12 text-white placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-[#FFC72C] focus:ring-1 focus:ring-[#FFC72C] transition shadow-inner"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 rounded-xl bg-gradient-to-r from-[#FFC72C] via-amber-400 to-[#F59E0B] py-3.5 px-5 text-sm font-black text-slate-950 flex items-center justify-center gap-2 hover:shadow-[0_10px_25px_rgba(255,199,44,0.35)] hover:scale-[1.01] transition duration-200 active:scale-[0.99] disabled:opacity-50"
                >
                  <span>{loading ? "Submitting..." : "Request a Call"}</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                {statusMsg && (
                  <p className="text-xs text-rose-400 font-semibold mt-1 text-center bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">
                    {statusMsg}
                  </p>
                )}
              </form>

              {/* Privacy & Trust Badge */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
                <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>We respect your privacy. 100% Confidential.</span>
              </div>

            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 3. BOTTOM FEATURE BADGES BAR                                  */}
        {/* ============================================================ */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 z-10 relative">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/12 text-xs sm:text-sm font-bold text-slate-200 backdrop-blur-md shadow-md hover:border-[#FFC72C]/50 hover:bg-white/[0.08] transition">
            <Code2 className="w-4 h-4 text-[#FFC72C]" />
            WEBSITE DEVELOPMENT
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/12 text-xs sm:text-sm font-bold text-slate-200 backdrop-blur-md shadow-md hover:border-[#FFC72C]/50 hover:bg-white/[0.08] transition">
            <TrendingUp className="w-4 h-4 text-[#FFC72C]" />
            CONVERSION FOCUSED
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/12 text-xs sm:text-sm font-bold text-slate-200 backdrop-blur-md shadow-md hover:border-[#FFC72C]/50 hover:bg-white/[0.08] transition">
            <Rocket className="w-4 h-4 text-[#FFC72C]" />
            SEO • SPEED OPTIMIZED
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/12 text-xs sm:text-sm font-bold text-slate-200 backdrop-blur-md shadow-md hover:border-[#FFC72C]/50 hover:bg-white/[0.08] transition">
            <Smartphone className="w-4 h-4 text-[#FFC72C]" />
            MOBILE FIRST
          </span>
        </div>

      </div>
    </section>
  );
}

