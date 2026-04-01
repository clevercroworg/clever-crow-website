"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TAGS = [
  { text: "#GoogleAds", color: "bg-blue-100 text-blue-700", left: "5%", hideOnMobile: false },
  { text: "#MetaAds", color: "bg-indigo-100 text-indigo-700", left: "17%", hideOnMobile: true },
  { text: "#WebDesign", color: "bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-700", left: "30%", hideOnMobile: false },
  { text: "#LeadGen", color: "bg-emerald-100 text-emerald-700", left: "46%", hideOnMobile: true },
  { text: "#SEO", color: "bg-rose-100 text-rose-700", left: "60%", hideOnMobile: false },
  { text: "#Conversion", color: "bg-purple-100 text-purple-700", left: "72%", hideOnMobile: true },
  { text: "#SocialMedia", color: "bg-orange-100 text-orange-700", left: "10%", hideOnMobile: true },
  { text: "#AIAutomation", color: "bg-cyan-100 text-cyan-700", left: "40%", hideOnMobile: false },
  { text: "#Creatives", color: "bg-pink-100 text-pink-700", left: "54%", hideOnMobile: true },
  { text: "#Development", color: "bg-lime-100 text-lime-700", left: "84%", hideOnMobile: false },
  { text: "#GrowthHacking", color: "bg-teal-100 text-teal-700", left: "24%", hideOnMobile: true },
  { text: "#Analytics", color: "bg-violet-100 text-violet-700", left: "66%", hideOnMobile: false },
  { text: "#ROAS", color: "bg-amber-100 text-amber-700", left: "88%", hideOnMobile: true },
  { text: "#Branding", color: "bg-sky-100 text-sky-700", left: "36%", hideOnMobile: true },
];

const ROTATIONS = [-6, 4, -10, 2, 8, -3, 5, -8, 12, -4, 7, -15, 3, 9];

export default function FallingTags() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {TAGS.map((tag, i) => (
        <motion.span
          key={i}
          initial={{
            top: "0%",
            opacity: 0,
            rotate: 0,
            scale: 0.5,
          }}
          whileInView={{
            top: "calc(100% - 56px)",
            opacity: 1,
            rotate: ROTATIONS[i % ROTATIONS.length],
            scale: 1,
          }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.55,
            delay: 0.1 * i,
            ease: [0.33, 0, 0.97, 0.36],
          }}
          style={{
            position: "absolute",
            left: `clamp(2%, ${tag.left}, calc(100% - 130px))`,
          }}
          className={`
            ${tag.hideOnMobile ? 'hidden sm:inline-flex' : 'inline-flex'} 
            align-middle px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-base font-extrabold
            shadow-lg border border-white/50 backdrop-blur-md
            whitespace-nowrap select-none overflow-hidden
            ${tag.color}
          `}
        >
          {tag.text}
        </motion.span>
      ))}
    </div>
  );
}
