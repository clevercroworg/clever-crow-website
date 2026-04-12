"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Zap, Code2, Cpu, ArrowRight, Activity, Target, Workflow, TrendingUp, Layers, PenTool, BarChart3 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const pillars = [
  {
    title: "Performance-Led Acquisition",
    description: "We build high-intent acquisition flywheels across Google & Meta that turn every rupee of spend into a data-point.",
    icon: Target,
    theme: "bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white",
    iconBg: "bg-white/10",
    metrics: ["Algorithmic Bidding", "High-Intent Funnels", "Real-Time ROI"],
    glow: "shadow-[0_20px_50px_-15px_rgba(37,99,235,0.3)]",
  },
  {
    title: "Full-Stack Infrastructure",
    description: "We engineer lightning-fast, conversion-optimized ecosystems that ensure zero leakage from your ad spend.",
    icon: Code2,
    theme: "bg-gradient-to-br from-rose-600 via-orange-500 to-amber-400 text-white",
    iconBg: "bg-white/10",
    metrics: ["Core Web Vitals Max", "Conversion Engineering", "Native UX"],
    glow: "shadow-[0_20px_50px_-15px_rgba(244,63,94,0.25)]",
  },
  {
    title: "AI Growth Intelligence",
    description: "AI-driven automation that handles lead-nurturing, cross-platform tracking, and growth discovery automatically.",
    icon: Cpu,
    theme: "bg-gradient-to-br from-emerald-600 via-teal-500 to-cyan-400 text-white",
    iconBg: "bg-white/10",
    metrics: ["Auto-Nurture Flows", "Predictive Analytics", "System Ownership"],
    glow: "shadow-[0_20px_50px_-15px_rgba(16,185,129,0.25)]",
  },
  {
    title: "Strategic Scale & Advisory",
    description: "Fractional CMO strategy and expansion frameworks to dominate your market share and maximize valuation.",
    icon: Workflow,
    theme: "bg-gradient-to-br from-fuchsia-700 via-purple-600 to-indigo-500 text-white",
    iconBg: "bg-white/10",
    metrics: ["Market Expansion", "LTV Maximization", "Strategic Exit Prep"],
    glow: "shadow-[0_20px_50px_-15px_rgba(192,38,211,0.25)]",
  },
  {
    title: "Omnichannel Experience",
    description: "We orchestrate cohesive, high-converting touchpoints across every channel, fusing Neuromarketing UI/UX with continuous brand equity scaling.",
    icon: Layers,
    theme: "bg-gradient-to-br from-violet-700 via-fuchsia-600 to-pink-500 text-white",
    iconBg: "bg-white/10",
    metrics: ["Neuromarketing UI/UX", "Multi-Touch Attribution", "Brand Equity Scaling"],
    glow: "shadow-[0_20px_50px_-15px_rgba(217,70,239,0.25)]",
  },
  {
    title: "Conversion-Centric CRO",
    description: "Continuous testing algorithms that rapidly iterate landing pages and checkout systems to extract the absolute massive yield per visitor.",
    icon: BarChart3,
    theme: "bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 text-white",
    iconBg: "bg-white/10",
    metrics: ["Heatmap Analysis", "A/B Multivariate Testing", "Frictionless UI"],
    glow: "shadow-[0_20px_50px_-15px_rgba(245,158,11,0.25)]",
  },
];

export default function StrategicEcosystem() {
  return (
    <>
      <section className="relative bg-[#010204] pt-20 sm:pt-28 overflow-hidden">
        
        {/* ─── BACKGROUND LAYER (clipped independently) ─── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1224] via-[#010204] to-[#0a1224] opacity-50" />
          <div className="absolute inset-0 bg-[#010204]/80" />

          {/* Animated Moving Grid */}
          <motion.div
            animate={{ x: [-20, 0], y: [-20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] opacity-[0.3]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Animated Orbs */}
          <motion.div
             animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
             transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/30 blur-[120px] rounded-full"
          />
          <motion.div
             animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-yellow-600/20 blur-[150px] rounded-full"
          />
        </div>

        {/* ─── SECTION HEADER ─── */}
        <div className="relative z-10 w-full px-6 mb-12 sm:mb-16">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              {...fadeUp(0)}
              className="mb-4 sm:mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 sm:px-5 sm:py-2 backdrop-blur-xl shadow-lg"
            >
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-500" />
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                Growth Architecture
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.1)}
              className="font-black tracking-[-0.03em] text-white pb-2"
              style={{ fontSize: "clamp(32px, 4vw, 55px)", lineHeight: "1" }}
            >
              The Strategic{" "}
              <span className="relative inline-block text-yellow-500">
                System
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-500/20 rounded-full" />
              </span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.2)}
              className="mt-4 sm:mt-6 mx-auto max-w-2xl text-sm sm:text-lg text-white/40 font-medium leading-relaxed px-4"
            >
              Explore the integrated growth ecosystems where every byte of data fuels your marketing engine.
            </motion.p>
          </div>
        </div>

        {/* ─── 2x2 GRID CARDS ─── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pb-16 pt-4 sm:pt-8 w-full">
              {/* Cards - Static to prevent scroll stuttering */}
              {pillars.slice(0, 4).map((pillar, i) => {
                return (
                  <div
                    key={pillar.title}
                    className="group relative z-10 flex flex-col w-full rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 border border-white/10 bg-[#1e293b]/90 shadow-2xl min-h-[350px] sm:min-h-[420px]"
                  >
                  {/* Glow Overlay */}
                  <div className={`absolute inset-0 rounded-3xl sm:rounded-[2.5rem] opacity-25 group-hover:opacity-40 transition-opacity duration-500 ${pillar.theme}`} />
                  <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl sm:rounded-t-[2.5rem] pointer-events-none mix-blend-overlay" />

                  <div className="relative mb-4 sm:mb-6 flex items-center justify-between">
                    <div className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:bg-white/20">
                      <pillar.icon className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-[17px] sm:text-2xl font-black mb-2 sm:mb-3 tracking-tight leading-tight text-white uppercase relative z-10">
                    {pillar.title}
                  </h3>

                  <p className="text-[13px] sm:text-[16px] leading-relaxed mb-5 sm:mb-6 font-medium tracking-tight text-white/70 group-hover:text-white transition-colors relative z-10">
                    {pillar.description}
                  </p>

                  <div className="mt-auto pt-4 sm:pt-5 border-t border-white/10 space-y-1.5 sm:space-y-2 relative z-20">
                    {pillar.metrics.map((metric, mi) => (
                      <div key={mi} className="flex items-center gap-2 sm:gap-2.5 group/item">
                        <div className="h-1 sm:h-1.5 w-1 sm:w-1.5 rounded-full bg-white opacity-40 group-hover/item:opacity-100 group-hover/item:scale-150 transition-all group-hover/item:shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.12em] text-white/70 transition-colors group-hover/item:text-white leading-tight">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                );
              })}
          </div>
        </div>

        {/* ─── BOTTOM CTA ─── */}
        <div className="relative z-10 w-full px-6 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="relative group p-[1px] rounded-full bg-gradient-to-r from-indigo-500 via-yellow-500 to-emerald-500 shadow-[0_0_40px_rgba(234,179,8,0.1)] hover:shadow-[0_0_60px_rgba(234,179,8,0.2)] transition-shadow duration-500">
              <div className="relative flex items-center gap-3 sm:gap-5 px-5 sm:px-10 py-3 sm:py-5 rounded-full bg-[#05070a] backdrop-blur-2xl transition-all group-hover:bg-[#080d15]">
                <Workflow className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-[10px] sm:text-base font-black tracking-tight text-white/80 text-center leading-tight">
                  Unified Growth. Full Transparency. 100% Client Ownership.
                </span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-white/30 group-hover:translate-x-1.5 transition-transform group-hover:text-white shrink-0" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </>
  );
}
