"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  theme?: "light" | "dark";
};

export default function SectionHeader({ badge, title, titleAccent, description, theme = "light" }: SectionHeaderProps) {
  const isDark = theme === "dark";

  return (
    <div className="mb-10 sm:mb-20 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[11px] sm:text-sm font-black uppercase tracking-[0.4em] text-yellow-500 mb-4"
      >
        {badge}
      </motion.p>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`font-black tracking-[-0.03em] pb-2 leading-[1.1] ${isDark ? "text-white" : "text-gray-900"}`}
        style={{ fontSize: "clamp(32px, 4.5vw, 65px)" }}
      >
        {title} <span className="text-yellow-500">{titleAccent}</span>
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`mx-auto mt-8 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed ${isDark ? "text-slate-400" : "text-gray-500"}`}
      >
        {description}
      </motion.p>
    </div>
  );
}
