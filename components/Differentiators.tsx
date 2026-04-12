"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  BarChart3,
  LineChart,
  Layers,
  ShieldCheck,
} from "lucide-react";

import Image from "next/image";

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setValue(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { ref, value };
}

/* ── Shared card style ── */
const card = "group relative rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-7 sm:p-9 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08]";

/* ── Main Component ── */
export default function Differentiators() {
  return (
    <section
      className="relative overflow-hidden bg-[#020617] py-16 sm:py-32"
    >
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.8), transparent 80%),
              linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%)
            `
          }}
        />
      </div>
      
      {/* Decorative orbs - Bottom Layer */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none will-change-transform transform-gpu" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-[100px] pointer-events-none will-change-transform transform-gpu" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">

        {/* ── Section Header ── */}
        <div className="mx-auto mb-16 sm:mb-20 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-yellow-400 mb-5"
          >
            Why Choose Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-black text-white tracking-[-0.03em] pb-2"
            style={{ fontSize: "clamp(35px, 4.5vw, 65px)", lineHeight: "1" }}
          >
            What Makes{" "}
            <span className="text-yellow-500">Clever Crow</span>{" "}
            <span className="italic text-slate-300">Different</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 sm:mt-10 max-w-2xl text-[19px] sm:text-[21px] md:text-[23px] text-slate-200 font-medium leading-relaxed"
          >
            We don't operate like a traditional agency. We build marketing 
            and technology systems that compound results over time.
          </motion.p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">

          {/* ── Card 1: Strategy ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`${card} lg:col-span-5 lg:row-span-2 flex flex-col will-change-transform transform-gpu`}
          >
            <div className="mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 transition-transform group-hover:scale-110 shadow-inner">
              <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight relative">
              Strategy-Led Execution
              
              <div className="absolute -top-24 -right-12 w-32 h-32 flex items-center justify-center pointer-events-none select-none">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-yellow-400 blur-2xl flex-shrink-0"
                />
                <motion.div
                  animate={{ scale: [0.8, 1.1, 0.8], rotate: [0, 90, 180, 270, 360] }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" }
                  }}
                  className="relative h-16 w-16 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-500 to-orange-400 shadow-[0_0_40px_rgba(251,191,36,0.5)] flex items-center justify-center overflow-hidden"
                >
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.4),transparent_60%)] animate-pulse" />
                </motion.div>
              </div>
            </h3>
            <p className="mt-3 text-[17px] sm:text-[19px] leading-relaxed text-slate-200">
              Every campaign starts with a clear strategy. We plan, execute, and refine in disciplined cycles to maximize every rupee spent.
            </p>

            <div className="mt-6 sm:mt-8 space-y-4">
              {[
                { step: "01", label: "Research & Audit", desc: "Deep-dive into your market, competitors, and current funnel performance." },
                { step: "02", label: "Plan & Architect", desc: "Define KPIs, channels, budgets, and a 90-day execution roadmap." },
                { step: "03", label: "Execute & Optimize", desc: "Launch campaigns, A/B test creatives, and iterate weekly for compounding results." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex gap-4 items-start"
                >
                  <span className="text-[10px] font-black text-yellow-400 bg-yellow-400/10 rounded-lg px-2.5 py-1.5 shrink-0">{item.step}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[17px] font-bold text-white">{item.label}</p>
                    <p className="text-[15px] text-slate-300 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 flex-1 flex flex-col justify-end">
              <div className="flex items-end gap-1.5 sm:gap-2 h-24 sm:h-32">
                {[25, 40, 35, 55, 50, 70, 65, 85, 80, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={`flex-1 rounded-md sm:rounded-lg ${i === 9 ? "bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.3)]" : "bg-yellow-500/20"}`}
                  />
                ))}
              </div>
              <p className="mt-3 text-[10px] font-bold text-yellow-500/50 uppercase tracking-widest">Quarterly Growth Trajectory</p>
            </div>
          </motion.div>

          {/* ── Card 2: Under One Roof ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className={`${card} lg:col-span-7 flex flex-col will-change-transform transform-gpu`}
          >
            <div className="mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-orange-400/10 text-orange-400 transition-transform group-hover:scale-110 shadow-inner">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Everything Under One Roof</h3>
            <p className="mt-3 text-[17px] sm:text-[19px] leading-relaxed text-slate-200">
              No handoffs. Strategy, creatives, ads, web, and mobile development work as one unified system.
            </p>

            <div className="mt-6 sm:mt-8 flex-1 flex flex-col justify-end">
              <div className="relative flex items-start justify-between">
                <div className="absolute top-[18px] sm:top-[22px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-orange-400/50 via-orange-400/30 to-slate-800" />
                {[
                  { label: "Ads", desc: "Paid campaigns" },
                  { label: "Web", desc: "Sites & apps" },
                  { label: "Mobile", desc: "iOS & Android" },
                  { label: "Creative", desc: "Design & video" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-10px" }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="relative z-10 flex flex-col items-center gap-2 flex-1"
                  >
                    <div className={`h-9 w-9 sm:h-11 sm:w-11 rounded-full border-2 flex items-center justify-center text-[9px] sm:text-[10px] font-black shadow-lg ${i === 0 ? "border-orange-400 bg-orange-400/20 text-orange-400" : "border-slate-800 bg-slate-900/50 text-slate-400"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-slate-200 uppercase tracking-wider">{item.label}</span>
                    <span className="text-[8px] sm:text-[9px] font-medium text-slate-400 hidden sm:block">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-3 rounded-xl bg-orange-400/5 border border-orange-400/10 px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0" />
                <span className="text-[11px] sm:text-xs font-bold text-orange-400">All services connected in a single workflow</span>
              </div>
            </div>
          </motion.div>

          {/* ── Card 3: Transparent Reporting ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className={`${card} lg:col-span-7 will-change-transform transform-gpu`}
          >
            <div className="mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 transition-transform group-hover:scale-110 shadow-inner">
              <LineChart className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Transparent Reporting</h3>
            <p className="mt-3 text-[17px] sm:text-[19px] leading-relaxed text-slate-200">
              Clear metrics, shared dashboards, and decisions driven by real data — never opinions.
            </p>
            <div className="mt-6 sm:mt-8 space-y-3">
              {[
                { label: "ROAS", value: "12.4×", width: "85%", color: "bg-emerald-400" },
                { label: "CTR", value: "4.2%", width: "60%", color: "bg-emerald-400" },
                { label: "CPA", value: "₹42", width: "40%", color: "bg-emerald-400" },
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <span>{m.label}</span>
                    <span className="text-emerald-400">{m.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-900 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: m.width }}
                      viewport={{ once: true, margin: "-10px" }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className={`h-full rounded-full ${m.color} shadow-[0_0_10px_rgba(16,185,129,0.3)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 4: Long-Term Growth ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className={`${card} lg:col-span-6 will-change-transform transform-gpu`}
          >
            <div className="mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-blue-400/10 text-blue-400 transition-transform group-hover:scale-110 shadow-inner">
              <Layers className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Built for Long-Term Growth</h3>
            <p className="mt-3 text-[17px] sm:text-[19px] leading-relaxed text-slate-200">
              We build systems that improve every month — not short-term hacks or one-off campaigns.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col gap-2.5">
              {["Foundation", "Optimization", "Scale", "Compound"].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <div className={`h-2 w-2 rounded-full shrink-0 ${i === 3 ? "bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]" : "bg-slate-700"}`} />
                  <span className={`text-[17px] font-bold ${i === 3 ? "text-blue-400" : "text-slate-500"}`}>{step}</span>
                  {i === 3 && <span className="ml-auto text-[10px] font-black text-blue-400 bg-blue-400/10 px-2.5 py-1 rounded-full border border-blue-400/20">ACTIVE</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Card 5: Proven Track Record ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className={`${card} lg:col-span-6 will-change-transform transform-gpu`}
          >
            <div className="mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-400 transition-transform group-hover:scale-110 shadow-inner">
              <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Proven Track Record</h3>
            <p className="mt-3 text-[17px] sm:text-[19px] leading-relaxed text-slate-200">
              120+ campaigns delivered with measurable outcomes. Our clients stay because results compound over time.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col gap-3 border-l-2 border-slate-800 pl-5">
              {[
                { year: "2021", event: "Founded & first 10 clients" },
                { year: "2022", event: "50+ campaigns, 5× growth" },
                { year: "2023", event: "100+ campaigns, enterprise" },
                { year: "2024", event: "International expansion" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-10px" }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-[10px] font-black text-violet-400 bg-violet-400/10 px-2 py-1 rounded-md whitespace-nowrap shrink-0 border border-violet-400/20">{m.year}</span>
                  <span className="text-[17px] text-slate-300 font-medium">{m.event}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* ── Stats Strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 sm:mt-20 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 transform-gpu will-change-transform shadow-2xl"
        >
          <StatsStrip />
        </motion.div>
      </div>
    </section>
  );
}

/* ── Stats Strip ── */
function StatsStrip() {
  const campaigns = useCountUp(120);
  const reviews = useCountUp(40);
  const speed = useCountUp(5);
  const cpl = useCountUp(30);

  const stats = [
    { ref: campaigns.ref, value: `${campaigns.value}+`, label: "Campaigns" },
    { ref: reviews.ref, value: `${reviews.value}+`, label: "Reviews" },
    { ref: speed.ref, value: `${speed.value}×`, label: "Faster Response" },
    { ref: cpl.ref, value: `${cpl.value}%`, label: "CPL Reduction" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center">
          <span ref={s.ref} className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">
            {s.value}
          </span>
          <span className="mt-2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
