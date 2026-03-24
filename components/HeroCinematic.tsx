"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, Suspense } from "react";
import { ArrowRight, TrendingUp, Users, Zap, BarChart3, Globe, Shield } from "lucide-react";
import dynamic from 'next/dynamic';
import { GradientButton } from "@/components/ui/gradient-button";

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/20 animate-pulse" />
});

type HeroCinematicProps = {
  onCallbackClick?: () => void;
};

const fadeUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function HeroCinematic({ onCallbackClick }: HeroCinematicProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#05070a]">
      
      {/* ── 3D SPLINE SCENE BACKGROUND ── */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <Spline
          scene="https://prod.spline.design/D0av0Bp8E9JYYVEv/scene.splinecode" 
          className="w-full h-full scale-105"
        />
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center min-h-[100svh] pt-32 pb-16 lg:pt-24 lg:pb-24">
          
          {/* ──── LEFT: High-Contrast Heading (7 cols) ──── */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Minimal Badge */}
            <motion.div {...fadeUp(0)} className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
              <Shield className="h-3.5 w-3.5 text-yellow-500" />
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white/50 uppercase">
                International Standard Delivery
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[5.5rem] font-black tracking-[-0.03em] text-white"
            >
              We Build The <br className="hidden sm:block" />
              <span className="relative inline-block text-yellow-500">
                Future
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  className="absolute -bottom-1 sm:-bottom-2 left-0 h-1.5 sm:h-2 w-full origin-left bg-yellow-400/20 rounded-full"
                />
              </span> of Digital luxury
            </motion.h1>

            {/* Subtext */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 sm:mt-10 max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed text-white/40 font-medium"
            >
              Engineering <strong className="text-white/80">World-Class Web Architectures</strong> and <strong className="text-white/80">Premium Ad Systems</strong> — tailored for visionaries.
            </motion.p>

            {/* CTAs */}
            <motion.div
              {...fadeUp(0.35)}
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onCallbackClick}
                className="group flex items-center justify-center gap-3 rounded-full bg-yellow-500 hover:bg-yellow-400 px-8 py-4 sm:py-4.5 text-[15px] font-extrabold text-black shadow-[0_0_40px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.6)] transition-all hover:-translate-y-1"
              >
                Audit Your Strategy
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="/services"
                className="group flex items-center justify-center gap-3 rounded-full bg-white hover:bg-gray-100 px-8 py-4 sm:py-4.5 text-[15px] font-bold text-black transition-all shadow-xl hover:-translate-y-1"
              >
                 Capabilities
                 <Globe className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </a>
            </motion.div>

            {/* Metric Footer */}
            <motion.div
              {...fadeUp(0.5)}
              className="mt-16 sm:mt-24 pt-10 border-t border-white/5 w-full flex flex-wrap gap-10 sm:gap-20"
            >
              {[
                { label: "Client ROAS", value: "12X" },
                { label: "Leads Gen", value: "5Cr+" },
                { label: "Verified", value: "40+" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-black text-white/90">{s.value}</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-2">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ──── RIGHT: LIGHTER & ADAPTIVE DASHBOARD (5 cols) ──── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="relative group">
              {/* Main Growth Card - Lighter & Airier */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] backdrop-blur-[40px] p-6 sm:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.3)] ring-1 ring-white/5"
              >
                <div className="flex items-center justify-between mb-8 sm:mb-12">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 ring-1 ring-yellow-500/30">
                      <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div>
                      <h4 className="text-[10px] sm:text-[11px] font-black text-yellow-500 uppercase tracking-[0.15em]">Growth Trajectory</h4>
                      <p className="text-2xl sm:text-3xl md:text-[2.75rem] font-black text-white leading-tight">+412%</p>
                    </div>
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/5 flex items-center justify-center text-white/50 text-sm sm:text-base font-light">
                    01
                  </div>
                </div>

                {/* Adaptive Geometric Visualization */}
                <div className="flex items-end gap-1.5 sm:gap-2 h-20 sm:h-28">
                  {[35, 55, 45, 75, 60, 95, 80, 115, 100, 140].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: 1 + i * 0.04, ease: "easeOut" }}
                      className={`flex-1 rounded-full transition-all duration-500 ${
                        i === 9 ? "bg-yellow-500 shadow-[0_0_25px_rgba(234,179,8,0.4)]" : "bg-white/10 hover:bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Adaptive Sub-Widgets */}
              <div className="grid grid-cols-2 gap-4 mt-4 sm:mt-6">
                <motion.div 
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 sm:p-6 shadow-xl backdrop-blur-3xl ring-1 ring-white/5"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Users className="h-4 w-4 text-blue-400/80" />
                    <span className="text-[9px] sm:text-[10px] font-extrabold text-white/60 uppercase tracking-widest">Global Reach</span>
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl font-black text-white/90">1.8M+</p>
                </motion.div>

                <motion.div 
                   animate={{ x: [0, 5, 0] }}
                   transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                   className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 sm:p-6 shadow-xl backdrop-blur-3xl ring-1 ring-white/5"
                >
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <Zap className="h-4 w-4 text-emerald-400/80" />
                    <span className="text-[9px] sm:text-[10px] font-extrabold text-white/60 uppercase tracking-widest">Efficiency</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg sm:text-xl md:text-2xl font-black text-white/90">24/7</p>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                </motion.div>
              </div>

              {/* Conversion Performance - Extra Light Layer */}
              <motion.div 
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="mt-4 sm:mt-6 rounded-3xl border border-white/5 bg-black/40 p-5 sm:p-6 backdrop-blur-[50px] flex items-center justify-between ring-1 ring-white/5 shadow-2xl"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 ring-1 ring-purple-500/20">
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-white/60 uppercase tracking-[0.15em]">Conv. Performance</p>
                    <p className="text-lg sm:text-xl md:text-2xl font-black text-white">8.42%</p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-[10px] font-black text-yellow-500 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/5 tracking-tighter">PREMIUM LEVEL</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative luxury markers */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 hidden xl:flex flex-col gap-12 text-white/5 text-[10px] font-black tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">
        <span>STRATEGY</span>
        <span>DESIGN</span>
        <span>GROWTH</span>
      </div>

    </section>
  );
}
