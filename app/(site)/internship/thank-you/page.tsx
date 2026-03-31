"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Internship";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="max-w-2xl w-full bg-white rounded-[3rem] p-10 sm:p-16 text-center shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] border border-gray-100 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-yellow-400/10 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10 font-sans">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 transition-transform hover:rotate-0 duration-500">
          <CheckCircle2 size={48} strokeWidth={2.5} />
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-black text-gray-950 mb-6 tracking-tight leading-tight">
          Application <br />
          <span className="text-yellow-500">Received!</span>
        </h1>
        
        <p className="text-gray-600 text-lg font-medium mb-10 leading-relaxed px-4">
          Thank you for applying for <span className="text-gray-900 font-black">{role}</span>. 
          Our talent acquisition team will review your profile and get back to you soon over email or phone.
        </p>
        
        <Link
          href="/internship"
          className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-gray-950 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all hover:bg-gray-800 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          <span>SUBMIT ANOTHER</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ThankYouPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-gray-50/50 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />
      
      <Suspense fallback={<div className="text-gray-400 font-bold animate-pulse">Loading...</div>}>
        <ThankYouContent />
      </Suspense>
    </main>
  );
}
