"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

type WhatYouGetProps = {
  title: string;
  subtitle?: string;
  items: string[];
};

export default function WhatYouGet({ title, subtitle, items }: WhatYouGetProps) {
  return (
    <section className="relative bg-[#fafafa] py-24 sm:py-32">
      {/* High-End Ambient Lighting */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(147,51,234,0.03),transparent_70%)]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24 items-start">
          
          {/* HEADER (Sticky on Desktop) */}
          <div className="max-w-xl lg:sticky lg:top-32 h-fit mb-10 lg:mb-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center rounded-full bg-indigo-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-6 border border-indigo-100"
            >
              The Scope
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-black text-gray-950 tracking-tight leading-[1.1]"
            >
              {title}
            </motion.h2>
            
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 text-base sm:text-lg text-gray-600 leading-relaxed font-medium opacity-80"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* DELIVERABLES LIST (Scalable 2-Column Grid of Rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 sm:gap-y-6">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex items-start gap-5 p-5 sm:p-6 rounded-2xl bg-white/40 border border-transparent transition-all duration-300 hover:bg-white hover:border-gray-100 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]"
              >
                {/* Minimal Left-Accent Bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-indigo-600 rounded-r-full transition-all duration-300 group-hover:h-3/5" />
                
                {/* Icon Circle */}
                <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-400 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
                  <Check className="h-4 w-4 stroke-[3]" />
                </div>
                
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">
                     Step {String(index + 1).padStart(2, '0')}
                   </span>
                   <h3 className="text-[15px] sm:text-[16px] font-bold text-gray-900 leading-snug tracking-tight">
                     {item}
                   </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
