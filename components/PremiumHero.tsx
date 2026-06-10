"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Code, 
  Cpu, 
  Megaphone, 
  BarChart3, 
  Clock, 
  Users, 
  Settings as SettingsIcon,
  TrendingUp,
  Activity
} from "lucide-react";

type TabType = "analytics" | "activity" | "leads" | "settings";

export default function PremiumHero({ onCallbackClick }: { onCallbackClick?: () => void }) {
  const [loadTime, setLoadTime] = useState<string>("0.12");
  const [activeTab, setActiveTab] = useState<TabType>("analytics");
  
  // Settings tab switches state
  const [settings, setSettings] = useState({
    autoPilot: true,
    speedOptimize: true,
    roasMaximize: false,
  });

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

  // Jagged Line Chart Data Points matching the mockup
  const chartPoints = [
    { x: 10, y: 100 },
    { x: 30, y: 85 },
    { x: 50, y: 90 },
    { x: 70, y: 75 },
    { x: 90, y: 80 },
    { x: 110, y: 65 },
    { x: 130, y: 70 },
    { x: 150, y: 55 },
    { x: 170, y: 60 },
    { x: 190, y: 45 },
    { x: 210, y: 50 },
    { x: 230, y: 35 },
    { x: 250, y: 42 },
    { x: 270, y: 20 },
    { x: 295, y: 10 }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#FAF9F6] pt-24 pb-20 lg:pt-28 lg:pb-28 overflow-hidden font-sans">
      {/* ───────────────── BACKGROUND DOTS & RADIAL GLOW ───────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.05) 1.2px, transparent 1.2px)`,
            backgroundSize: "24px 24px"
          }}
        />
        {/* Modern radial flares for warm light aesthetics */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-amber-200/20 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/30 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-16 xl:gap-20 items-center">
          
          {/* ───────────────── LEFT COLUMN (TEXT CONTENT) ───────────────── */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start text-left">
            
            {/* Pill kicker badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex flex-wrap md:flex-nowrap items-center gap-1.5 md:gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-md shadow-sm"
            >
              <span className="text-[8.5px] md:text-[9.5px] font-extrabold tracking-wider uppercase text-slate-500">Web Development</span>
              <span className="h-1 w-1 rounded-full bg-amber-500 shrink-0" />
              <span className="text-[8.5px] md:text-[9.5px] font-extrabold tracking-wider uppercase text-slate-500">App Development</span>
              <span className="h-1 w-1 rounded-full bg-amber-500 shrink-0" />
              <span className="text-[8.5px] md:text-[9.5px] font-extrabold tracking-wider uppercase text-slate-500">AI Automation</span>
              <span className="h-1 w-1 rounded-full bg-amber-500 shrink-0" />
              <span className="text-[8.5px] md:text-[9.5px] font-extrabold tracking-wider uppercase text-slate-500">Digital Marketing</span>
            </motion.div>

            {/* Main Title Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 md:mt-8 text-[40px] md:text-[56px] lg:text-[66px] font-black leading-[1.1] tracking-tight text-slate-900 font-sans"
            >
              <span className="block sm:whitespace-nowrap">Websites. Apps.</span>
              <span className="block">Automation.</span>
              <span className="block text-amber-500">Growth.</span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 md:mt-8 text-base md:text-lg text-slate-600 max-w-[480px] leading-relaxed font-medium"
            >
              Clever Crow helps businesses grow with high-performance websites, custom applications, AI automation, and performance marketing that deliver <span className="text-amber-600 font-bold">measurable results.</span>
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={onCallbackClick}
                className="group flex items-center justify-center gap-2.5 rounded-2xl bg-amber-500 px-6 py-4.5 text-xs font-black uppercase tracking-widest text-slate-900 shadow-md shadow-amber-500/20 hover:bg-amber-600 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4.5 h-4.5 shrink-0" />
                BOOK A STRATEGY CALL
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                href="#portfolio"
                className="group flex items-center justify-center gap-2.5 rounded-2xl border-2 border-slate-200 bg-white px-6 py-4.5 text-xs font-black uppercase tracking-widest text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                VIEW OUR WORK
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Trust checkmark badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex items-center gap-2 text-slate-500 text-xs md:text-sm font-semibold"
            >
              <ShieldCheck className="h-5 w-5 text-amber-500 shrink-0" />
              <span>Trusted by growing businesses across India</span>
            </motion.div>

          </div>

          {/* ───────────────── RIGHT COLUMN (VISUAL DASHBOARD GRID) ───────────────── */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex flex-col items-center justify-center w-full">
            
            {/* Unified Dashboard Frame */}
            <div className="w-full max-w-[720px] lg:ml-auto bg-[#F9FAFB]/95 border border-slate-100 rounded-[2.5rem] p-5 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col md:flex-row gap-5 md:gap-6 items-stretch">
              
              {/* Left Sidebar */}
              <div className="flex flex-row md:flex-col items-center justify-around md:justify-start py-1.5 md:py-2 gap-4 md:gap-6 shrink-0 md:border-r border-slate-100 md:pr-5">
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                    activeTab === "analytics" 
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-sm" 
                      : "text-slate-400 border-transparent hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab("activity")}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                    activeTab === "activity" 
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-sm" 
                      : "text-slate-400 border-transparent hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab("leads")}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                    activeTab === "leads" 
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-sm" 
                      : "text-slate-400 border-transparent hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Users className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`p-2.5 rounded-xl transition-all cursor-pointer border ${
                    activeTab === "settings" 
                      ? "bg-amber-500/10 text-amber-500 border-amber-500/20 shadow-sm" 
                      : "text-slate-400 border-transparent hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <SettingsIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col gap-6">
                
                {/* TOP ROW: Main Chart Card (Left) and Metric Cards (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                  
                  {/* 1. Main Chart Card (2/3 width) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2 bg-white border border-slate-100/90 rounded-[2rem] p-6 shadow-sm flex flex-col justify-between h-[300px] relative overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {activeTab === "analytics" && (
                        <motion.div
                          key="analytics"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex-1 flex flex-col justify-between h-full"
                        >
                          {/* Header */}
                          <div>
                            <h4 className="text-slate-800 font-black text-[15px] leading-tight">Business Overview</h4>
                            <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">Last 30 days</span>
                          </div>

                          {/* Floating Badge (styled exactly like the image mockup) */}
                          <div className="absolute top-6 right-6 bg-white border border-slate-100/90 rounded-2xl p-2.5 shadow-md flex flex-col items-center min-w-[95px] z-20">
                            <span className="text-base font-black text-slate-800 leading-none">+32%</span>
                            <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">vs last month</span>
                          </div>

                          {/* Chart Grid & SVGs */}
                          <div className="flex gap-3 h-[140px] mt-4 select-none relative z-10">
                            {/* Y-axis labels */}
                            <div className="flex flex-col justify-between text-[9px] font-bold text-slate-400 pb-5">
                              <span>60K</span>
                              <span>40K</span>
                              <span>20K</span>
                              <span>0</span>
                            </div>
                            {/* Plot */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="relative flex-1">
                                {/* Horizontal grid guidelines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                  <div className="w-full border-t border-slate-100/50" />
                                  <div className="w-full border-t border-slate-100/50" />
                                  <div className="w-full border-t border-slate-100/50" />
                                  <div className="w-full border-t border-slate-100/50" />
                                </div>

                                {/* Jagged SVG plot */}
                                <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                                  <defs>
                                    <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#f4b000" stopOpacity="0.2" />
                                      <stop offset="100%" stopColor="#f4b000" stopOpacity="0.0" />
                                    </linearGradient>
                                  </defs>

                                  {/* Area gradient under path */}
                                  <motion.path
                                    d="M10,100 L30,85 L50,90 L70,75 L90,80 L110,65 L130,70 L150,55 L170,60 L190,45 L210,50 L230,35 L250,42 L270,20 L295,10 L295,120 L10,120 Z"
                                    fill="url(#glowGradient)"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                  />

                                  {/* Main Jagged Line */}
                                  <motion.path
                                    d="M10,100 L30,85 L50,90 L70,75 L90,80 L110,65 L130,70 L150,55 L170,60 L190,45 L210,50 L230,35 L250,42 L270,20 L295,10"
                                    fill="none"
                                    stroke="#EAB308"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.6, ease: "easeInOut" }}
                                  />

                                  {/* Coordinate dots markers */}
                                  {chartPoints.map((pt, idx) => (
                                    <motion.circle
                                      key={idx}
                                      cx={pt.x}
                                      cy={pt.y}
                                      r="4.5"
                                      fill="#F59E0B"
                                      stroke="#EA580C"
                                      strokeWidth="1.5"
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.4 + (idx * 0.05), duration: 0.3 }}
                                    />
                                  ))}
                                </svg>
                              </div>
                              
                              {/* X-axis labels */}
                              <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-2 px-1">
                                <span>May 1</span>
                                <span>May 8</span>
                                <span>May 15</span>
                                <span>May 22</span>
                                <span>May 29</span>
                              </div>
                            </div>
                          </div>

                          {/* Status Footer */}
                          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-100/60 text-[9px] font-bold text-emerald-700">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                              </span>
                              <span>Load Time: {loadTime}s</span>
                            </div>
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full" />
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "activity" && (
                        <motion.div
                          key="activity"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex-1 flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="text-slate-800 font-black text-[15px] leading-tight">System Activity Log</h4>
                              <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">Last 30 days</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100/50">
                              <span className="text-[9px] font-black leading-none">Live Syncing</span>
                            </div>
                          </div>

                          <div className="space-y-2.5 my-4 flex-1 flex flex-col justify-center">
                            {[
                              { desc: "AI Optimizer swept Google Ads bids", time: "2 mins ago" },
                              { desc: "Auto-ingested 24 landing page leads", time: "15 mins ago" },
                              { desc: "Performance cache regenerated", time: "1 hour ago" },
                              { desc: "System audit completed successfully", time: "3 hours ago" }
                            ].map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100/70 text-[10px] font-semibold text-slate-700 shadow-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                  </span>
                                  <span className="truncate max-w-[170px] md:max-w-xs">{item.desc}</span>
                                </div>
                                <span className="text-[8.5px] text-slate-400 font-medium shrink-0">{item.time}</span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-slate-100 text-[9px] text-slate-400 font-semibold">
                            All systems operating normally.
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "leads" && (
                        <motion.div
                          key="leads"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex-1 flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="text-slate-800 font-black text-[15px] leading-tight">Lead Distribution Stats</h4>
                              <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">Last 30 days</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100/50">
                              <span className="text-[9px] font-black leading-none">Google & Meta</span>
                            </div>
                          </div>

                          <div className="space-y-3.5 my-4 flex-1 flex flex-col justify-center">
                            {[
                              { label: "Web & App Development", value: 45, color: "bg-amber-500" },
                              { label: "AI Automation", value: 35, color: "bg-purple-500" },
                              { label: "Digital Marketing", value: 20, color: "bg-blue-500" }
                            ].map((item, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex justify-between text-[9.5px] font-black text-slate-700">
                                  <span>{item.label}</span>
                                  <span>{item.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.value}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                                    className={`h-full ${item.color} rounded-full`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-slate-100 text-[9px] text-slate-400 font-semibold">
                            Real-time traffic ingestion active.
                          </div>
                        </motion.div>
                      )}

                      {activeTab === "settings" && (
                        <motion.div
                          key="settings"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="flex-1 flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h4 className="text-slate-800 font-black text-[15px] leading-tight">AI Settings Panel</h4>
                              <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">Last 30 days</span>
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-500/20">
                              <span className="text-[9px] font-black leading-none">Auto-Pilot</span>
                            </div>
                          </div>

                          <div className="space-y-2 my-4 flex-1 flex flex-col justify-center">
                            {[
                              { key: "autoPilot", label: "AI Auto-Pilot", desc: "Automate bid optimizations" },
                              { key: "speedOptimize", label: "Edge Delivery Cache", desc: "TTFB below 50ms across India" },
                              { key: "roasMaximize", label: "Maximize ROAS Focus", desc: "Shift budgets to active winners" }
                            ].map((item) => (
                              <div
                                key={item.key}
                                onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-sm cursor-pointer hover:bg-slate-100/60 transition-colors"
                              >
                                <div className="flex-1 pr-3">
                                  <h5 className="text-[10.5px] font-black text-slate-800 leading-tight">{item.label}</h5>
                                  <p className="text-[9px] font-medium text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
                                </div>
                                <div className={`w-7 h-4 shrink-0 rounded-full p-0.5 transition-colors duration-200 flex items-center ${settings[item.key as keyof typeof settings] ? 'bg-amber-500' : 'bg-slate-200'}`}>
                                  <motion.div
                                    layout
                                    className="w-3.2 h-3.2 bg-white rounded-full shadow-sm"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-slate-100 text-[9px] text-slate-400 font-semibold">
                            Settings sync automatic.
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* 2. Metric Cards Column (1/3 width stack) */}
                  <div className="lg:col-span-1 flex flex-col gap-6 justify-between h-[300px]">
                    
                    {/* Leads Generated Metric Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.6 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      onClick={() => setActiveTab("leads")}
                      className="flex-1 bg-white border border-slate-100/90 rounded-[1.8rem] p-5 cursor-pointer hover:scale-[1.01] hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] transition-all duration-200 flex flex-col justify-between h-[140px] select-none"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Leads Generated</span>
                        <span className="text-3xl font-black text-slate-800 leading-none mt-1.5 block">2.4K</span>
                      </div>
                      <div className="flex items-end justify-between mt-2 gap-4">
                        <span className="text-[10px] font-bold text-emerald-500 block leading-tight">
                          +18% <span className="opacity-70 font-semibold text-slate-400 block mt-0.5 lowercase">vs last month</span>
                        </span>
                        <div className="w-16 h-8 text-emerald-500 shrink-0">
                          <svg className="w-full h-full" viewBox="0 0 50 20" fill="none">
                            <path d="M0,15 Q12,6 25,12 T50,2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Conversion Rate Metric Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      whileHover={{ y: -4, transition: { duration: 0.2 } }}
                      onClick={() => setActiveTab("analytics")}
                      className="flex-1 bg-white border border-slate-100/90 rounded-[1.8rem] p-5 cursor-pointer hover:scale-[1.01] hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] transition-all duration-200 flex flex-col justify-between h-[140px] select-none"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
                        <span className="text-3xl font-black text-slate-800 leading-none mt-1.5 block">5.8%</span>
                      </div>
                      <div className="flex items-end justify-between mt-2 gap-4">
                        <span className="text-[10px] font-bold text-blue-500 block leading-tight">
                          +14% <span className="opacity-70 font-semibold text-slate-400 block mt-0.5 lowercase">vs last month</span>
                        </span>
                        <div className="w-16 h-8 text-blue-500 shrink-0">
                          <svg className="w-full h-full" viewBox="0 0 50 20" fill="none">
                            <path d="M0,18 Q12,16 25,8 T50,2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                  </div>

                </div>

                {/* BOTTOM ROW: The Staggered Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                  
                  {/* Feature 1: Web & App Dev */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveTab("analytics")}
                    className="group relative bg-white border border-slate-100 rounded-[1.8rem] p-6 shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] transition-all cursor-pointer flex flex-col justify-between h-[155px]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 shadow-sm shadow-blue-500/5">
                      <Code className="w-4.5 h-4.5" />
                    </div>
                    <div className="mt-2 flex-1">
                      <h4 className="text-[13px] font-black text-slate-800 tracking-tight">Web & App Development</h4>
                      <p className="text-[10px] font-medium text-slate-400 mt-1 leading-snug">Fast, secure and scalable digital experiences.</p>
                    </div>
                    <div className="mt-1 flex justify-end">
                      <ArrowRight className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </motion.div>

                  {/* Feature 2: AI Automation */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveTab("settings")}
                    className="group relative bg-white border border-slate-100 rounded-[1.8rem] p-6 shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] transition-all cursor-pointer flex flex-col justify-between h-[155px]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-50 text-purple-500 shadow-sm shadow-purple-500/5">
                      <Cpu className="w-4.5 h-4.5" />
                    </div>
                    <div className="mt-2 flex-1">
                      <h4 className="text-[13px] font-black text-slate-800 tracking-tight">AI Automation</h4>
                      <p className="text-[10px] font-medium text-slate-400 mt-1 leading-snug">Automate workflows and boost productivity.</p>
                    </div>
                    <div className="mt-1 flex justify-end">
                      <ArrowRight className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </motion.div>

                  {/* Feature 3: Digital Marketing */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    onClick={() => setActiveTab("activity")}
                    className="group relative bg-white border border-slate-100 rounded-[1.8rem] p-6 shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] transition-all cursor-pointer flex flex-col justify-between h-[155px]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 shadow-sm shadow-blue-500/5">
                      <Megaphone className="w-4.5 h-4.5" />
                    </div>
                    <div className="mt-2 flex-1">
                      <h4 className="text-[13px] font-black text-slate-800 tracking-tight">Digital Marketing</h4>
                      <p className="text-[10px] font-medium text-slate-400 mt-1 leading-snug">Reach the right audience and grow sales.</p>
                    </div>
                    <div className="mt-1 flex justify-end">
                      <ArrowRight className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </motion.div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
