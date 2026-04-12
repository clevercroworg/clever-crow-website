"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Briefcase, 
  Zap, 
  Sparkles,
  Search,
  Code2,
  Megaphone,
  Layout
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const JOBS = [
  {
    id: "performance-marketing",
    title: "Performance Marketing Manager",
    department: "Digital Ads",
    posted: "6 Days Ago",
    type: "Full-Time",
    location: "Remote",
    icon: <Megaphone className="w-6 h-6" />,
    color: "bg-yellow-50 text-yellow-600",
    description: "Scale high-budget Google and Meta Ads campaigns with a focus on ROAS and mathematical precision."
  },
  {
    id: "web-developer",
    title: "Senior Web Developer",
    department: "Technology",
    posted: "8 Days Ago",
    type: "Full-Time",
    location: "Hybrid (Bangalore)",
    icon: <Code2 className="w-6 h-6" />,
    color: "bg-blue-50 text-blue-600",
    description: "Architect high-performance web applications using Next.js 15, Tailwind, and Framer Motion."
  },
  {
    id: "creative-strategist",
    title: "Creative Strategist",
    department: "Branding",
    posted: "5 Days Ago",
    type: "Full-Time",
    location: "Remote",
    icon: <Layout className="w-6 h-6" />,
    color: "bg-violet-50 text-violet-600",
    description: "Bridge the gap between data and design by crafting high-converting ad concepts and landing pages."
  },
  {
    id: "meta-ads-expert",
    title: "Meta Ads Account Manager",
    department: "Paid Social",
    posted: "10 Days Ago",
    type: "Full-Time",
    location: "Remote",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-emerald-50 text-emerald-600",
    description: "Own the end-to-end execution of Meta Ads for premium D2C brands and service businesses."
  }
];

export default function CareersPage() {
  return (
    <main className="bg-white selection:bg-yellow-500/30 min-h-screen">
      
      {/* ═══════════ CINEMATIC HERO ═══════════ */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        {/* Background Styling */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 10% 20%, rgba(82, 168, 255, 0.1), transparent 25%),
                radial-gradient(circle at 90% 80%, rgba(122, 63, 194, 0.08), transparent 25%),
                linear-gradient(180deg, #0f172a 0%, #111827 44%, #020617 100%)
              `
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Join the Precision Engineering Team"
            title="We're Looking for"
            titleAccent="Exceptional Talent"
            description="At Clever Crow, we don't just build websites; we engineer growth systems. Join a team where performance is the only metric that matters."
            theme="dark"
          />
        </div>

        {/* Soft bottom fade to white section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══════════ JOB LISTINGS ═══════════ */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Active Openings</h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{JOBS.length} POSITIONS AVAILABLE</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {JOBS.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="group relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all cursor-pointer overflow-hidden"
              >
                {/* Background Accent */}
                <div className={`absolute -right-12 -top-12 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity ${job.color}`} />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl ${job.color} shrink-0`}>
                      {job.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-full">{job.department}</span>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          <Clock size={12} />
                          {job.posted}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 group-hover:text-yellow-600 transition-colors mb-2">{job.title}</h3>
                      <p className="text-gray-500 font-medium max-w-xl text-sm leading-relaxed">{job.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-6 border-t md:border-0 pt-6 md:pt-0">
                    <div className="flex items-center gap-5">
                      <div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-600">
                        <MapPin size={14} className="text-yellow-500" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-[13px] font-bold text-gray-600">
                        <Briefcase size={14} className="text-yellow-500" />
                        {job.type}
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all group/btn"
                    >
                      Apply Now
                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Culture/Feature Section */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 relative overflow-hidden rounded-[3rem] bg-gray-950 p-12 lg:p-20 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400 opacity-5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-indigo-500 opacity-5 blur-[100px] pointer-events-none" />

          <div className="grid lg:grid-cols-2 lg:items-center gap-16 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-yellow-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-yellow-500/20">
                <Sparkles size={14} />
                The Crow Culture
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tight">
                Engineering <br/> <span className="text-yellow-400 italic">Digital Dominance</span>
              </h2>
              <p className="text-gray-400 font-medium text-lg leading-relaxed mb-10 max-w-lg">
                We are a small, elite team of engineers, marketers, and designers. We value autonomy, technical excellence, and measurable results over everything else.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-black text-xl mb-2 tracking-tight">Radical Autonomy</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">No micromanagement. You own your metrics and your stack.</p>
                </div>
                <div>
                  <h4 className="text-white font-black text-xl mb-2 tracking-tight">Rapid Growth</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">We scale fast. You'll work with premium brands on high-impact projects.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[2rem] bg-white/5 border border-white/10 p-4 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white shadow-[0_0_50px_rgba(255,255,255,0.05)] opacity-5" />
                 <div className="flex flex-col h-full justify-center items-center text-center p-8 relative z-10">
                   <div className="h-20 w-20 rounded-full bg-yellow-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(250,204,21,0.3)]">
                     <Search size={32} className="text-black" />
                   </div>
                   <h3 className="text-white text-2xl font-black mb-4">Can't find your role?</h3>
                   <p className="text-gray-400 font-medium mb-8">If you're an outlier, tell us why. We always have room for the top 1%.</p>
                   <Link 
                     href="/contact" 
                     className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95"
                   >
                     Drop Your CV
                   </Link>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
