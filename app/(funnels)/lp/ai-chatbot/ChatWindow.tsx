"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import AnimatedBot from "@/components/AnimatedBot";
import type { ChatLine } from "./chatbot-data";

// A chat window that plays a conversation: the visitor's message appears, the bot "types", then answers.
// Loops while it's on screen. `finale` shows a closing toast (e.g. "Lead sent to your team").
// People who reduce motion see the whole conversation at once.

type Props = {
  lines: ChatLine[];
  title?: string;
  finale?: string;
  className?: string;
  /** Restart from the first line when this changes (e.g. a new industry tab). */
  playKey?: string;
  compact?: boolean;
};

export default function ChatWindow({ lines, title = "Clever Crow AI", finale, className = "", playKey, compact = false }: Props) {
  const reduce = useReducedMotion();
  const [playedCount, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [played, setDone] = useState(false);
  // Reduced motion: everything at once, nothing plays.
  const shown = reduce ? lines.length : playedCount;
  const done = reduce || played;

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)));
    (async () => {
      while (!cancelled) {
        setShown(0);
        setDone(false);
        await wait(600);
        for (let i = 0; i < lines.length && !cancelled; i++) {
          if (lines[i].from === "bot") {
            setTyping(true);
            await wait(1100);
            setTyping(false);
          } else {
            await wait(700);
          }
          if (!cancelled) setShown(i + 1);
          await wait(900);
        }
        if (cancelled) break;
        setDone(true);
        await wait(3800);
      }
    })();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [lines, reduce, playKey]);

  const bubble = compact ? "text-[13px] px-3 py-2" : "text-[14px] px-3.5 py-2.5";

  return (
    <div className={`overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.35)] ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-[#0a1433] to-[#14245c] px-4 py-3 text-white">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
          <AnimatedBot isSpeaking={typing} animate className="h-9 w-9" expression={typing ? "thinking" : "happy"} />
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0f1d4a] bg-emerald-400" />
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block text-[14px] font-bold">{title}</span>
          <span className="block text-[11px] text-emerald-300">{typing ? "typing…" : "Online · replies instantly"}</span>
        </span>
      </div>

      {/* Messages */}
      <div className={`relative flex flex-col gap-2 bg-[#f6f7fb] p-3.5 ${compact ? "min-h-[248px]" : "min-h-[300px]"}`} aria-live="off">
        <AnimatePresence initial={false}>
          {lines.slice(0, shown).map((line, i) => (
            <motion.div
              key={`${playKey ?? ""}-${i}`}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`max-w-[85%] rounded-2xl leading-snug ${bubble} ${
                line.from === "user" ? "self-end rounded-br-md bg-[#FFC72C] text-slate-950" : "self-start rounded-bl-md bg-white text-slate-800 shadow-sm"
              }`}
            >
              {line.text}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1 self-start rounded-2xl rounded-bl-md bg-white px-3.5 py-3 shadow-sm"
              aria-hidden="true"
            >
              {[0, 1, 2].map((d) => (
                <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d * 0.15}s` }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {finale && done && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 flex items-center gap-2 self-center rounded-full bg-emerald-50 px-3 py-1.5 text-[12px] font-bold text-emerald-700 ring-1 ring-emerald-200"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> {finale}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fake input */}
      <div className="flex items-center gap-2 border-t border-slate-100 px-3.5 py-2.5" aria-hidden="true">
        <span className="flex-1 rounded-full bg-slate-100 px-3.5 py-2 text-[12px] text-slate-400">Type your message…</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFC72C] text-slate-950">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  );
}
