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
  const trackRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);

  // Measure slider overflow and compute track height (client-side only to avoid hydration mismatch)
  useEffect(() => {
    const measure = () => {
      if (sliderRef.current) {
        const range = sliderRef.current.scrollWidth - window.innerWidth;
        setScrollRange(range);
        // Track height = horizontal distance + one viewport height
        // This gives exactly enough vertical scroll to reveal all cards horizontally
        setTrackHeight(range + window.innerHeight);
      }
    };
    measure();
    const t = setTimeout(measure, 300);
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  // Track vertical scroll progress through the tall track container
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for buttery animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress [0→1] to horizontal translation [0→-scrollRange]
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange]);

  return (
    <>
      {/* 
        CRITICAL: The section wrapper must NOT have overflow-hidden, 
        because that breaks position:sticky on the inner viewport.
        Instead we clip only the background layer.
      */}
      <section className="relative bg-[#010204] pt-20 sm:pt-28">
        
        {/* ─── BACKGROUND LAYER (clipped independently) ─── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1224] via-[#010204] to-[#0a1224] opacity-50" />
          <div className="absolute inset-0 bg-[#010204]" />

          {/* Animated Moving Grid */}
          <motion.div
            animate={{ x: [-20, 0], y: [-20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-40px] opacity-[0.3] will-change-transform"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.25) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Animated Orbs */}
          <motion.div
            animate={{ x: [0, 100, -80, 0], y: [0, -100, 80, 0], scale: [1, 1.2, 0.9, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-yellow-500/25 blur-[100px] rounded-full will-change-transform"
          />
          <motion.div
            animate={{ x: [0, -120, 100, 0], y: [0, 120, -100, 0], scale: [1.1, 0.9, 1.2, 1.1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-10%] right-[-10%] w-[900px] h-[900px] bg-blue-600/25 blur-[120px] rounded-full will-change-transform"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-fuchsia-600/20 blur-[150px] rounded-full will-change-transform"
          />

          {/* Sweeping ripples */}
          <motion.div
            animate={{ top: ["-20%", "120%"], opacity: [0, 0.6, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute left-[-5%] w-[400px] h-[60%] bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent rotate-[25deg] blur-[80px]"
          />
          <motion.div
            animate={{ top: ["-20%", "120%"], opacity: [0, 0.5, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 3.5 }}
            className="absolute right-[-5%] w-[400px] h-[60%] bg-gradient-to-b from-transparent via-fuchsia-500/30 to-transparent rotate-[-25deg] blur-[80px]"
          />
        </div>

        {/* ─── SECTION HEADER (normal flow, scrolls away) ─── */}
        <div className="relative z-10 w-full px-6 mb-12 sm:mb-20">
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
              Scroll to explore the integrated growth ecosystems where every byte of data fuels your marketing engine.
            </motion.p>
          </div>
        </div>

        {/* ─── HORIZONTAL SCROLL TRACK ─── 
             This tall container converts vertical scroll into horizontal card movement.
             Its height = scrollRange + 1 viewport, so there's exactly enough scroll
             distance to reveal every card with no blank space at the end.
        */}
        <div
          ref={trackRef}
          className="relative z-10 w-full"
          style={{ height: trackHeight > 0 ? `${trackHeight}px` : "300vh" }}
        >
          {/* Sticky viewport — pins to the screen while scrolling through the track */}
          <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
            <motion.div
              ref={sliderRef}
              style={{ x }}
              className="relative flex gap-5 sm:gap-8 pl-[8vw] sm:pl-[10vw] pr-[30vw] sm:pr-[35vw] items-stretch py-8 w-max will-change-transform"
            >
              {/* Energy Line */}
              <div className="absolute left-[8vw] sm:left-[10vw] right-[30vw] sm:right-[35vw] top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-0">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 w-48 bg-gradient-to-r from-transparent via-yellow-500/70 to-transparent blur-[3px]"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Cards */}
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, scale: 0.85, y: 60 }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { delay: 0.1, duration: 0.8, ease: [0.21, 1.02, 0.73, 1] },
                  }}
                  viewport={{ once: true, margin: "0% -5% 0% 0%" }}
                  className="group relative z-10 flex flex-col w-[80vw] sm:w-[50vw] lg:w-[32vw] max-w-[450px] shrink-0 rounded-[2.5rem] p-6 sm:p-8 transition-all duration-700 hover:scale-[1.02] border border-white/10 bg-[#1e293b]/90 shadow-2xl min-h-[400px] sm:min-h-[420px] lg:min-h-[460px] overflow-visible will-change-transform"
                >
                  {/* Glow Overlay */}
                  <div className={`absolute inset-0 rounded-[2.5rem] opacity-25 group-hover:opacity-40 transition-opacity duration-500 ${pillar.theme}`} />
                  <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent rounded-t-[2.5rem] pointer-events-none mix-blend-overlay" />

                  <div className="relative mb-5 sm:mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group-hover:bg-white/20">
                      <pillar.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                    >
                      <Activity className="h-5 w-5 text-white/30" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-3 sm:mb-4 tracking-tight leading-tight text-white uppercase">
                    {pillar.title}
                  </h3>

                  <p className="text-[16px] sm:text-[18px] leading-relaxed sm:leading-relaxed mb-6 sm:mb-8 font-medium tracking-tight text-white/70 group-hover:text-white transition-colors">
                    {pillar.description}
                  </p>

                  <div className="mt-auto pt-4 sm:pt-5 border-t border-white/10 space-y-2 sm:space-y-3 relative z-20">
                    {pillar.metrics.map((metric, mi) => (
                      <div key={mi} className="flex items-center gap-2.5 sm:gap-4 group/item">
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white opacity-40 group-hover/item:opacity-100 group-hover/item:scale-150 transition-all group-hover/item:shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                        <span className="text-[11px] sm:text-[13px] font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/70 transition-colors group-hover/item:text-white leading-tight">
                          {metric}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Lighting */}
                  <div className={`absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] blur-[60px] rounded-full opacity-20 pointer-events-none transition-opacity duration-700 group-hover:opacity-40 ${pillar.theme}`} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── BOTTOM CTA ─── */}
        <div className="relative z-10 w-full px-6 py-16 sm:py-24">
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
    </>
  );
}
