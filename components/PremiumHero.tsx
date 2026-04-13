"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Activity, Zap, TrendingUp, Layers, ArrowRight } from "lucide-react";

export default function PremiumHero({ onCallbackClick }: { onCallbackClick?: () => void }) {
  const [loadTime, setLoadTime] = useState<string>("0.12");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const calculateLoadTime = () => {
        const perf = window.performance;
        const nav = perf.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
        if (nav) {
          const time = (nav.domInteractive - nav.fetchStart) / 1000;
          setLoadTime(time.toFixed(2));
        }
      };
      
      const timer = setTimeout(calculateLoadTime, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] pb-10 md:pb-16 pt-12 md:pt-16 overflow-hidden font-sans selection:bg-yellow-500/30">
      {/* ───────────────── BACKGROUND ───────────────── */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 8% 10%, rgba(82, 168, 255, 0.15), transparent 25%),
              radial-gradient(circle at 82% 78%, rgba(122, 63, 194, 0.12), transparent 25%),
              radial-gradient(circle at 52% 52%, rgba(255, 255, 255, 0.02), transparent 26%),
              linear-gradient(180deg, #0f172a 0%, #111827 44%, #020617 100%)
            `
          }}
        />
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 26%, rgba(255, 255, 255, 0.04), transparent 16%),
              radial-gradient(circle at 88% 8%, rgba(255, 255, 255, 0.03), transparent 18%),
              radial-gradient(circle at left center, rgba(255, 255, 255, 0.05) 1.5px, transparent 2px),
              radial-gradient(circle at right center, rgba(255, 255, 255, 0.05) 1.5px, transparent 2px),
              radial-gradient(circle at center, rgba(255, 255, 255, 0.02) 0.8px, transparent 1.2px)
            `,
            backgroundSize: "auto, auto, 26px 26px, 26px 26px, 18px 18px"
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 transition-all duration-500">
        
        {/* ───────────────── CONTENT ───────────────── */}
        <div className="relative mx-auto max-w-[1100px] text-center pt-24 md:pt-32">
          
          {/* Performance Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [10, 0, 0, 10],
              x: 0
            }}
            transition={{
              duration: 5,
              times: [0, 0.15, 0.85, 1],
              repeat: Infinity,
              repeatDelay: 2
            }}
            className="absolute -right-12 top-20 hidden lg:inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-[11px] font-black tracking-[0.15em] text-blue-100 uppercase backdrop-blur-2xl shadow-2xl skew-x-[-4deg]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 shadow-inner">
              <Activity className="h-5 w-5 text-green-400 animate-pulse" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="opacity-60">Engine Load</span>
              <span className="mt-1 text-[18px] font-black text-white tracking-normal">{loadTime}<span className="text-[12px] opacity-40 ml-0.5">s</span></span>
            </div>
          </motion.div>

          {/* Kickers */}
          <div className="hidden md:inline-flex items-center justify-center gap-2 md:gap-3 mb-10 w-full overflow-x-auto pb-2 scrollbar-hide px-4">
             {[
               { icon: <Zap className="w-3.5 h-3.5 md:w-[15px] md:h-[15px]" />, text: "Build Fast", color: "text-amber-400" },
               { icon: <TrendingUp className="w-3.5 h-3.5 md:w-[15px] md:h-[15px]" />, text: "Rank Higher", color: "text-emerald-400" },
               { icon: <Layers className="w-3.5 h-3.5 md:w-[15px] md:h-[15px]" />, text: "Grow Faster", color: "text-blue-400" }
             ].map((kicker, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1, duration: 0.8 }}
                 className="flex flex-none items-center gap-2 md:gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 md:py-2.5 pl-1.5 md:pl-2.5 pr-3 md:pr-6 text-[10px] md:text-[12px] font-black tracking-widest text-white/80 uppercase backdrop-blur shadow-xl hover:bg-white/[0.08] transition-colors cursor-default whitespace-nowrap"
               >
                 <div className={`flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-white/5 ${kicker.color} shadow-lg`}>
                    {kicker.icon}
                 </div>
                 {kicker.text}
               </motion.div>
             ))}
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl font-black leading-[1.1] text-white md:text-6xl lg:text-7xl xl:text-8xl tracking-tight"
          >
            Smart Strategies.{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 pb-1">
                Clever Design.
                <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="absolute -bottom-1 left-0 h-1 bg-yellow-500/20 rounded-full"
                />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mx-auto mt-10 max-w-5xl text-lg leading-relaxed text-slate-400 md:text-2xl md:leading-[1.7] text-balance font-medium px-4"
          >
            We create <span className="text-white">high performance websites</span> and <span className="text-white">AI driven Digital Marketing Strategies</span> to help you <span className="text-yellow-500 font-bold">scale faster worldwide.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row px-4"
          >
            <button
              onClick={onCallbackClick}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-yellow-500 px-8 py-5 text-[15px] font-black uppercase tracking-widest text-slate-900 transition-all hover:scale-105 active:scale-95 sm:w-auto shadow-[0_20px_40px_rgba(234,179,8,0.3)]"
            >
              Request a Call Back
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-chat'));
              }}
              className="group flex w-full items-center justify-center gap-3 rounded-full border-2 border-white/20 bg-white/5 px-8 py-5 text-[15px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-white/40 active:scale-95 sm:w-auto"
            >
              Chat With Us
            </button>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] font-black text-white/40">Scroll to Explore</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}
