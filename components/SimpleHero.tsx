"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, TrendingUp, Users, Briefcase, CheckCircle } from "lucide-react";

export default function SimpleHero({ onCallbackClick }: { onCallbackClick?: () => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const [loadTime, setLoadTime] = useState<string | null>(null);

  useEffect(() => {
    const calculateLoadTime = () => {
      if (typeof window !== "undefined") {
        const perf = window.performance;
        const nav = perf.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        
        if (nav) {
          // Time from start of fetch to site being interactive
          const time = nav.domInteractive - nav.fetchStart;
          setLoadTime((time / 1000).toFixed(2));
        } else {
          // Fallback for older browsers
          const time = perf.now() / 1000;
          setLoadTime(time.toFixed(2));
        }
      }
    };

    // The navigation entry might not be ready immediately on mount
    const timer = setTimeout(calculateLoadTime, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95dvh] flex flex-col items-center justify-center bg-[#020202] text-white overflow-hidden pt-24"
    >
      {/* ───────────────── MINIMAL BACKGROUND ───────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-yellow-600/5 blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[900px] h-[900px] rounded-full bg-yellow-500/5 blur-[180px]" />
        
        {/* Static Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(234,179,8,0.1)_1.5px,transparent_1.5px)] [background-size:80px_80px] opacity-40" />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-[5]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">

        {/* Static Authority Badge */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-12 flex items-center justify-start px-8 gap-3 bg-yellow-500/[0.03] backdrop-blur-3xl border border-yellow-500/20 py-3 rounded-full w-auto select-none"
        >
          <div className="w-5 h-5 flex items-center justify-center shrink-0">
            <Bot className="h-5 w-5 text-yellow-500" />
          </div>
          <span className="text-[10px] sm:text-xs font-black tracking-[0.1em] sm:tracking-[0.2em] uppercase text-yellow-50">
            Build fast. Rank higher. Grow faster
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-4xl sm:text-7xl md:text-8xl font-extrabold tracking-tight leading-tight mb-10"
        >
          <span className="text-white">Smart Strategies. </span>
          <motion.span 
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ backgroundSize: "200% auto" }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-500 to-yellow-600"
          >
            Clever Design.
          </motion.span>
        </motion.h1>

        {/* Subheading */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mb-6"
        >
          <p className="text-lg sm:text-2xl md:text-3xl text-gray-300 leading-relaxed font-bold">
            We create <span className="text-white relative inline-block">
              high performance websites
              <motion.span 
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
                className="absolute bottom-1 left-0 h-[3px] bg-yellow-500" 
              />
            </span> and <span className="text-white">AI driven marketing strategies</span> to help you <span className="text-yellow-500 italic underline underline-offset-4 decoration-yellow-500/20">scale faster worldwide.</span>
          </p>
        </motion.div>

        {/* Dynamic Load Metric */}
        {loadTime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 mb-14 px-4 py-1.5 rounded-full bg-white/5 border border-white/10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              This page loaded in <span className="text-emerald-400">{loadTime}s</span>
            </span>
          </motion.div>
        )}

        {/* High-Impact CTAs */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-7"
        >
          <button
            onClick={onCallbackClick}
            className="group relative flex w-full sm:w-auto h-18 py-5 items-center justify-center gap-4 rounded-2xl bg-yellow-500 px-8 sm:px-14 text-[16px] sm:text-[18px] font-black text-black transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Get a Free Consultation
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          <a
            href="#portfolio"
            className="group flex w-full sm:w-auto h-18 py-5 items-center justify-center px-8 sm:px-12 text-[16px] sm:text-[18px] font-bold text-white border-2 border-white/20 hover:border-yellow-500 rounded-2xl backdrop-blur-3xl transition-all duration-300"
          >
            View Our Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
