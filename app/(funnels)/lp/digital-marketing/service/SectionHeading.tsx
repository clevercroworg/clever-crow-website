"use client";

import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  className?: string;
};

// The one heading style used by every section on this page: label, heading, one-line subtitle.
export default function SectionHeading({ eyebrow, title, subtitle, tone = "light", className = "" }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto max-w-3xl text-center ${className}`}
    >
      <p className={`text-xs font-bold uppercase tracking-[0.25em] ${dark ? "text-amber-400" : "text-amber-600"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 text-balance text-[1.85rem] leading-[1.15] tracking-[-0.025em] sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-[#071330]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${dark ? "text-slate-400" : "text-slate-600"}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
