"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Users,
  Code2,
  BrainCircuit,
  Smartphone,
  BarChart3,
  Cloud,
  ShieldCheck,
  MonitorPlay,
  Sparkles,
  Lock,
  Search
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const INTERNSHIPS = [
  {
    id: "1",
    title: "Full Stack / AI-ML Development",
    posted: "1 day ago",
    filled: 11,
    total: 15,
    fee: "8,999",
    icon: <div className="flex -space-x-2"><Code2 /><BrainCircuit /></div>,
    color: "bg-blue-50 text-blue-600",
    description: "Architect cutting-edge web platforms powered by artificial intelligence and machine learning models.",
    active: true
  },
  {
    id: "7",
    title: "Data Analysis and Power BI analytics",
    posted: "4 days ago",
    filled: 11,
    total: 15,
    fee: "12,999",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "bg-violet-50 text-violet-600",
    description: "Master data visualization, business intelligence, and analytical decision-making using Power BI and advanced tools.",
    active: true
  },
  {
    id: "3",
    title: "Google Ads / Facebook Ads",
    posted: "7 days ago",
    filled: 15,
    total: 15,
    fee: "12,999",
    icon: <MonitorPlay className="w-6 h-6" />,
    color: "bg-orange-50 text-orange-600",
    description: "Master performance marketing and campaign optimization across major platforms. Drive measurable growth and ROI through data-driven advertising strategies.",
    active: false
  },
  {
    id: "4",
    title: "Backend (Node.js/Python)",
    posted: "1 day ago",
    filled: 15,
    total: 15,
    fee: "8,999",
    icon: <Database className="w-6 h-6" />,
    color: "bg-emerald-50 text-emerald-600",
    description: "Architect robust server-side systems and manage complex databases.",
    active: false
  },
  {
    id: "5",
    title: "Frontend (React/Next.js)",
    posted: "3 days ago",
    filled: 15,
    total: 15,
    fee: "8,999",
    icon: <MonitorPlay className="w-6 h-6" />,
    color: "bg-cyan-50 text-cyan-600",
    description: "Create stunning, high-performance user interfaces with modern web technologies.",
    active: false
  },
  {
    id: "6",
    title: "Mobile App (React Native)",
    posted: "11 days ago",
    filled: 15,
    total: 15,
    fee: "8,999",
    icon: <Smartphone className="w-6 h-6" />,
    color: "bg-indigo-50 text-indigo-600",
    description: "Build cross-platform mobile experiences for iOS and Android.",
    active: false
  },
  {
    id: "8",
    title: "Data Science",
    posted: "2 days ago",
    filled: 15,
    total: 15,
    fee: "19,999",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "bg-amber-50 text-amber-600",
    description: "Extract insights from data and drive decision-making through analytics.",
    active: false
  },
  {
    id: "9",
    title: "Digital Marketing",
    posted: "4 days ago",
    filled: 15,
    total: 15,
    fee: "11,999",
    icon: <Search className="w-6 h-6" />,
    color: "bg-red-50 text-red-600",
    description: "Grow brands and reach audiences through strategic digital channels.",
    active: false
  },
  {
    id: "11",
    title: "Cloud (AWS/Azure)",
    posted: "19 days ago",
    filled: 15,
    total: 15,
    fee: "12,999",
    icon: <Cloud className="w-6 h-6" />,
    color: "bg-sky-50 text-sky-600",
    description: "Deploy and manage scalable infrastructure in the cloud.",
    active: false
  },
  {
    id: "12",
    title: "Cybersecurity",
    posted: "13 days ago",
    filled: 15,
    total: 15,
    fee: "4,999",
    icon: <ShieldCheck className="w-6 h-6" />,
    color: "bg-rose-50 text-rose-600",
    description: "Protect systems and data from cyber threats and vulnerabilities.",
    active: false
  },
];

function Database(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
  );
}

export default function InternshipListingPage() {
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
                radial-gradient(circle at 15% 25%, rgba(82, 168, 255, 0.1), transparent 25%),
                radial-gradient(circle at 85% 75%, rgba(122, 63, 194, 0.08), transparent 25%),
                linear-gradient(180deg, #0f172a 0%, #111827 44%, #020617 100%)
              `
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <SectionHeader
            badge="Limited Opportunities"
            title="Explore Our"
            titleAccent="Internships"
            description="Join our dynamic team and kickstart your career. We are looking for passionate individuals for our active roles."
            theme="dark"
          />
        </div>

        {/* Soft bottom fade to white section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ═══════════ LISTING SECTION ═══════════ */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INTERNSHIPS.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={internship.active ? { y: -5 } : {}}
              className={`group relative h-full bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-8 transition-all overflow-hidden`}
            >
              <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity ${internship.color}`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${internship.color} shadow-sm`}>
                    {internship.icon}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      <Clock size={12} />
                      {internship.posted}
                    </span>
                    <div className={`flex items-center gap-1.5 ${internship.filled === internship.total ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"} px-3 py-1 rounded-full border`}>
                      <Users size={12} className={internship.filled === internship.total ? "text-red-400" : "text-gray-400"} />
                      <span className={`text-[12px] font-bold ${internship.filled === internship.total ? "text-red-600" : "text-gray-600"}`}>
                        {internship.filled}/{internship.total} <span className="text-[10px] opacity-70 font-medium">FILLED</span>
                      </span>
                    </div>
                  </div>
                </div>

                <h3 className={`font-black mb-3 ${internship.active ? "text-gray-900 group-hover:text-yellow-600" : "text-gray-900"} transition-colors leading-tight ${internship.title.length > 25 ? "text-lg" : "text-xl"}`}>
                  {internship.title}
                </h3>

                <p className={`text-sm font-medium text-gray-500 leading-relaxed mb-4`}>
                  {internship.description}
                </p>

                <div className="flex items-center justify-between mb-8">
                  <span className="text-[12px] font-black uppercase tracking-widest text-gray-400">Tool Charges/Fees</span>
                  <span className="text-lg font-black text-gray-900 group-hover:text-yellow-600 transition-colors">₹{internship.fee}</span>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-50">
                  {internship.active ? (
                    <Link
                      href={`/internship/${internship.id}`}
                      className="flex items-center justify-between w-full group/btn"
                    >
                      <span className="text-sm font-black uppercase tracking-widest text-gray-900 group-hover/btn:text-yellow-600 transition-colors">
                        Apply Now
                      </span>
                      <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white transition-all group-hover/btn:bg-yellow-400 group-hover/btn:text-black">
                        <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between w-full cursor-not-allowed">
                      <span className="text-sm font-black uppercase tracking-widest text-gray-400">
                        Filled
                      </span>
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                        <Lock size={18} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative overflow-hidden rounded-[2.5rem] bg-gray-900 p-12 text-center"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 opacity-5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 opacity-5 blur-[100px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-yellow-400 text-xs font-black uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              Future Focused
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Can't find the right role?
            </h2>
            <p className="text-gray-400 font-medium text-lg mb-10">
              We are always on the lookout for exceptional talent. If you have a passion for engineering and innovation, reach out to us directly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-yellow-400 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-black hover:bg-yellow-300 transition-all hover:scale-105"
            >
              Contact Our Team
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
