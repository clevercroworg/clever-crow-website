"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Check, MessageCircle, Star } from "lucide-react";
import AnimatedBot from "@/components/AnimatedBot";
import ChatWindow from "./ChatWindow";
import { HERO, HERO_CHAT } from "./chatbot-data";

/** Opens the site's real AI assistant (components/Chatbot.tsx), which runs on this page as the live demo. */
export const openLiveDemo = () => window.dispatchEvent(new Event("open-chat"));

// Light, playful hero (the other LPs use dark heroes): chat-bubble doodles, the robot mascot and a chat window that
// plays a real-looking conversation. Phones get a compact version; the chat window follows as its own block.

function Doodles() {
  const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Dotted paper */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(15,23,42,0.13) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 75% 70% at 50% 40%, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 70% at 50% 40%, black, transparent 80%)",
        }}
      />
      {/* Chat bubbles drifting at the edges */}
      <svg viewBox="0 0 64 52" className="absolute left-[3%] top-[24%] hidden h-14 w-16 text-indigo-300 lg:block motion-safe:animate-[cbDrift_10s_ease-in-out_infinite]" {...stroke} strokeWidth="2.2">
        <path d="M8 6h48a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H26l-12 10v-10H8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
        <path d="M16 18h32M16 27h20" />
      </svg>
      <svg viewBox="0 0 64 52" className="absolute left-[44%] top-[14%] hidden h-10 w-12 text-amber-400 lg:block motion-safe:animate-[cbDrift_12s_ease-in-out_infinite_-4s]" {...stroke} strokeWidth="2.4">
        <path d="M56 6H8a4 4 0 0 0-4 4v24a4 4 0 0 0 4 4h30l12 10v-10h6a4 4 0 0 0 4-4V10a4 4 0 0 0-4-4z" />
        <circle cx="20" cy="22" r="2" fill="currentColor" />
        <circle cx="32" cy="22" r="2" fill="currentColor" />
        <circle cx="44" cy="22" r="2" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 64 52" className="absolute right-[4%] top-[16%] h-8 w-10 text-indigo-300 sm:h-12 sm:w-14 motion-safe:animate-[cbDrift_11s_ease-in-out_infinite_-2s]" {...stroke} strokeWidth="2.2">
        <path d="M8 6h48a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H26l-12 10v-10H8a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
      </svg>
      {/* Curly arrow from the copy toward the chat (desktop) */}
      <svg viewBox="0 0 160 110" className="absolute left-[47%] top-[52%] hidden h-24 w-36 text-slate-400/70 lg:block" {...stroke} strokeWidth="2.2">
        <path d="M6 90c30-6 40-40 70-44s30 30 6 32-14-46 66-58" strokeDasharray="6 8" className="motion-safe:animate-[cbDash_3s_linear_infinite]" />
        <path d="M132 12l18 7-13 14" />
      </svg>
      {/* Sparkles */}
      {["left-[8%] bottom-[18%]", "right-[46%] bottom-[10%]", "right-[3%] bottom-[26%]", "left-[38%] top-[10%]"].map((pos, i) => (
        <svg
          key={pos}
          viewBox="0 0 24 24"
          className={`absolute ${pos} hidden h-5 w-5 text-amber-400 sm:block motion-safe:animate-[cbTwinkle_3s_ease-in-out_infinite]`}
          style={{ animationDelay: `${i * -0.7}s` }}
          {...stroke}
          strokeWidth="2"
        >
          <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
        </svg>
      ))}
      {/* Soft colour blobs */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-amber-200/50 blur-[90px]" />
      <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-indigo-200/50 blur-[100px]" />
    </div>
  );
}

export default function ChatbotHero({ onQuote }: { onQuote: () => void }) {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, delay, ease: "easeOut" as const } };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff8e8] via-[#fbfaf7] to-[#eef1ff] pb-8 pt-[5.5rem] text-slate-900 sm:pb-14 sm:pt-28 lg:pb-20 lg:pt-32">
      <Doodles />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <div className="lg:col-span-7">
          <motion.div {...rise(0)} className="flex items-center gap-2.5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-slate-200/70 lg:hidden">
              <AnimatedBot isSpeaking animate className="h-11 w-11" expression="excited" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-[12px] font-bold text-indigo-700 sm:text-[13px]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {HERO.badge}
            </span>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="mt-4 text-[clamp(1.9rem,8.4vw,2.7rem)] font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            {HERO.title}{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{HERO.accent}</span>
              {/* Hand-drawn underline */}
              <svg viewBox="0 0 300 18" className="absolute -bottom-1.5 left-0 z-0 h-3 w-full text-[#FFC72C]" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 13c60-9 140-12 294-6" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:mt-6 sm:text-lg">
            {HERO.subtitle}
          </motion.p>

          <motion.ul {...rise(0.22)} className="mt-4 grid max-w-xl grid-cols-2 gap-x-3 gap-y-2 sm:mt-7 sm:gap-x-6">
            {HERO.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] font-semibold leading-snug text-slate-800 sm:text-[15px]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                  <Check className="h-3 w-3 stroke-[3]" aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.div {...rise(0.3)} className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={openLiveDemo}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 text-[15px] font-bold text-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.7)] transition hover:bg-slate-800 sm:px-7"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Try Live Demo
            </button>
            <button
              type="button"
              onClick={onQuote}
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#FFC72C] px-4 text-[15px] font-bold text-slate-950 transition hover:brightness-105 sm:px-7"
            >
              Get Free Quote
            </button>
            <a href="#package" className="col-span-2 inline-flex items-center justify-center gap-1 text-[14px] font-bold text-indigo-700 sm:col-span-1 sm:h-12 sm:px-3">
              View packages <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <motion.p {...rise(0.36)} className="mt-4 hidden flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500 sm:flex">
            <span className="flex items-center gap-1 font-semibold text-slate-800">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" /> 4.9/5 rating
            </span>
            <span aria-hidden="true">·</span>
            <span>150+ businesses served</span>
            <span aria-hidden="true">·</span>
            <span>15+ years experience</span>
          </motion.p>
        </div>

        {/* Desktop: the chat window, with the mascot peeking over it */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 30, rotate: 2 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="relative hidden lg:col-span-5 lg:block"
        >
          {/* Mascot waving from the chat window's lower-left corner */}
          <div className="absolute -bottom-10 -left-16 z-20 flex flex-col items-start motion-safe:animate-[cbBob_4s_ease-in-out_infinite] xl:-left-20">
            <span className="mb-1 ml-14 rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[13px] font-bold text-slate-800 shadow-lg ring-1 ring-slate-200/70">
              Hi! I reply in seconds 👋
            </span>
            <AnimatedBot isSpeaking animate className="h-28 w-28 drop-shadow-xl" expression="excited" />
          </div>
          <ChatWindow lines={HERO_CHAT} finale="Lead sent to your team" className="relative z-10 mx-auto max-w-[420px]" />
        </motion.div>
      </div>
    </section>
  );
}
