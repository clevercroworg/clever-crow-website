"use client";

import React from "react";

export default function PerformanceExperts() {
  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 items-center">
          
          {/* Left Side: Copy and Checklist */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Performance Marketing Experts
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-2xl">
              With over 15 years of experience helping brands grow online, Clevercrow creates marketing systems that drive ROI, not just traffic.
            </p>
            
            <ul className="space-y-6">
              {[
                "15+ Years of Marketing Experience",
                "Google & Meta Certified Professionals",
                "100+ Businesses Grown Across India",
                "Transparent Reporting & Real ROI Tracking"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-slate-900 font-bold text-lg">
                  <div className="flex-shrink-0 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M20 6L9 17L4 12"></path>
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Side: Certified Partners */}
          <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 h-full flex flex-col justify-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center lg:text-left">
              CERTIFIED PARTNERS
            </h3>
            
            <div className="space-y-4">
              {/* Google Partner Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col items-center justify-center text-center group transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-10 h-10" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <div className="flex flex-col items-start translate-y-0.5">
                    <span className="text-[12px] font-black text-slate-800 leading-tight">Google</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">Partner</span>
                  </div>
                </div>
                <p className="font-bold text-slate-900 text-sm">Google Certified</p>
              </div>
              
              {/* Meta Certified Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-center group transition-all hover:shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-8 h-8 text-[#0668E1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                  <span className="text-2xl font-bold tracking-tighter text-slate-900">Meta</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">Meta Certified</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
