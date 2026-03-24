"use client";

import { motion } from "framer-motion";
import { 
  SiGoogleads, 
  SiMeta, 
  SiShopify, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiFramer, 
  SiTypescript,
  SiGoogleanalytics,
  SiOpenai
} from "react-icons/si";

const techStack = [
  { name: "Google Ads", icon: SiGoogleads, color: "#4285F4" },
  { name: "Meta Ads", icon: SiMeta, color: "#0668E1" },
  { name: "Shopify", icon: SiShopify, color: "#96BF48" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Analytics", icon: SiGoogleanalytics, color: "#E37400" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "AI Automation", icon: SiOpenai, color: "#412991" },
  { name: "Framer", icon: SiFramer, color: "#0055FF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
];

export default function TechStack() {
  // Duplicate the list for seamless infinite scroll
  const duplicatedStack = [...techStack, ...techStack];

  return (
    <section className="relative bg-white py-6 sm:py-12 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 mb-5 sm:mb-8 text-center">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
          Integrated Technology Stack
        </span>
      </div>

      <div className="relative flex overflow-hidden">
        {/* Gradients for smooth fade edge */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex items-center whitespace-nowrap gap-6 sm:gap-14 py-2 sm:py-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 35,
            delay: 0.5,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedStack.map((tech, i) => (
            <div
              key={i}
              className="group flex items-center gap-2 sm:gap-4 transition-all duration-300"
            >
              <div 
                className="flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-gray-50 border border-gray-100 transition-all group-hover:bg-white group-hover:scale-110 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] shrink-0"
              >
                <tech.icon 
                  className="h-5 w-5 sm:h-7 sm:w-7 transition-transform" 
                  style={{ color: tech.color }}
                />
              </div>
              <span className="text-xs sm:text-base font-bold text-gray-600 transition-colors group-hover:text-gray-950">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
