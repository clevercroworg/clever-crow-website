"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BarChart3, BookOpen, CalendarCheck, FileText, Filter, Globe, Languages, MessageCircle, Moon, Phone, UserCheck, Users, type LucideIcon } from "lucide-react";
import AnimatedBot from "@/components/AnimatedBot";
import { ADS_CALL_CONVERSION, gtag } from "@/lib/tracking";
import ChatWindow from "./ChatWindow";
import { openLiveDemo } from "./ChatbotHero";
import { CHANNELS, DEMO, FEATURES, FINAL_CTA, HERO_CHAT, NIGHT_SHIFT, PROCESS, USE_CASES } from "./chatbot-data";

/** Fades and lifts content in as it scrolls into view (once). Still for people who reduce motion. */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ preTitle, title, subtitle, dark = false }: { preTitle: string; title: string; subtitle: string; dark?: boolean }) {
  return (
    <Reveal className="text-center">
      <p className={`flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-wide ${dark ? "text-amber-300" : "text-indigo-600"}`}>
        <span className="h-[3px] w-8 rounded-full bg-[#FFC72C] sm:w-12" aria-hidden="true" />
        {preTitle}
        <span className="h-[3px] w-8 rounded-full bg-[#FFC72C] sm:w-12" aria-hidden="true" />
      </p>
      <h2 className={`mt-2 text-balance text-[1.7rem] font-black leading-tight tracking-tight sm:text-4xl ${dark ? "text-white" : "text-slate-900"}`}>{title}</h2>
      <p className={`mx-auto mt-3 max-w-2xl text-balance text-[15px] leading-7 sm:text-lg ${dark ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>
    </Reveal>
  );
}

/** Phones only: the hero's chat window, as its own block right after the hero. */
export function MobileChatDemo() {
  return (
    <section className="bg-[#fbfaf7] px-5 pb-10 pt-2 lg:hidden">
      <Reveal>
        <p className="mb-3 text-center text-[13px] font-bold uppercase tracking-wide text-slate-500">See it in action</p>
        <ChatWindow lines={HERO_CHAT} finale="Lead sent to your team" compact className="mx-auto max-w-[420px]" />
      </Reveal>
    </section>
  );
}

export function NightShift({ image }: { image?: string }) {
  // The timeline "plays" like a live feed: each event lights up in turn, a glow travels down the line.
  const reduce = useReducedMotion();
  const [live, setLive] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setLive((n) => (n + 1) % NIGHT_SHIFT.events.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060b24] via-[#0b1438] to-[#141c4d] py-14 text-white sm:py-20 lg:py-24">
      {/* Stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white motion-safe:animate-[cbTwinkle_3s_ease-in-out_infinite]"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 7) * -0.45}s`, opacity: 0.6 }}
          />
        ))}
        {/* A shooting star now and then */}
        <span className="absolute left-[10%] top-[12%] h-px w-24 rotate-[20deg] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 motion-safe:animate-[cbShoot_7s_ease-in_infinite]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
        <div className="min-w-0">
          <Reveal>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-300">
              <Moon className="h-4 w-4" aria-hidden="true" /> {NIGHT_SHIFT.preTitle}
            </p>
            <h2 className="mt-2 text-balance text-[1.7rem] font-black leading-tight tracking-tight sm:text-4xl">{NIGHT_SHIFT.title}</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-slate-300 sm:text-lg">{NIGHT_SHIFT.subtitle}</p>
          </Reveal>

          {/* Timeline: time | dot on the line | event. The line runs through the dot column only. */}
          <ol className="relative mt-8 grid gap-3 sm:gap-4">
            <span className="absolute bottom-5 left-[calc(3.6rem+0.625rem+0.5rem)] top-5 w-px -translate-x-1/2 bg-white/15 sm:left-[calc(4.1rem+0.75rem+0.5rem)]" aria-hidden="true">
              <span className="absolute left-1/2 top-0 h-10 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-amber-300 to-transparent motion-safe:animate-[cbTravel_4.4s_linear_infinite]" />
            </span>
            {NIGHT_SHIFT.events.map((e, i) => {
              const on = reduce || i === live;
              return (
                <Reveal key={e.time} delay={i * 0.08}>
                  <li className="grid grid-cols-[3.6rem_1rem_1fr] items-center gap-x-2.5 sm:grid-cols-[4.1rem_1rem_1fr] sm:gap-x-3">
                    <span className={`text-right text-[12px] font-bold tabular-nums transition-colors sm:text-[13px] ${on ? "text-amber-300" : "text-slate-400"}`}>{e.time}</span>
                    <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
                      {on && !reduce && <span className="absolute h-4 w-4 animate-ping rounded-full bg-amber-300/60" />}
                      <span className={`relative h-2.5 w-2.5 rounded-full ring-4 ring-[#0b1438] transition-colors ${on ? "bg-amber-300" : "bg-slate-500"}`} />
                    </span>
                    <span
                      className={`rounded-2xl border px-4 py-2.5 text-[14px] leading-snug transition-all duration-500 sm:text-[15px] ${
                        on ? "border-amber-300/40 bg-white/[0.1] text-white shadow-[0_0_30px_-8px_rgba(252,211,77,0.45)]" : "border-white/10 bg-white/[0.04] text-slate-300"
                      }`}
                    >
                      {e.text}
                    </span>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>

        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[460px]">
          {image ? (
            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-amber-300/10 blur-2xl" aria-hidden="true" />
              <Image
                src={image}
                alt="A small shop closed for the night while the AI chatbot on the phone keeps replying to customers"
                width={1024}
                height={1024}
                sizes="(min-width: 1024px) 460px, (min-width: 640px) 460px, 92vw"
                className="relative h-auto w-full rounded-3xl ring-1 ring-white/10"
              />
              {/* Live notification over the picture */}
              <div className="absolute -bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-2.5 text-slate-900 shadow-xl sm:left-auto sm:right-[-1rem] sm:w-[270px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <Users className="h-4 w-4" aria-hidden="true" />
                </span>
                <span key={live} className="min-w-0 leading-tight motion-safe:animate-[cbFade_0.5s_ease-out]">
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-slate-400">{NIGHT_SHIFT.events[live].time} · while you sleep</span>
                  <span className="block truncate text-[13px] font-bold">{NIGHT_SHIFT.events[live].text}</span>
                </span>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex aspect-square w-full max-w-[380px] items-center justify-center rounded-3xl bg-white/[0.04] ring-1 ring-white/10" aria-hidden="true">
              <AnimatedBot isSpeaking animate className="h-32 w-32" expression="happy" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Animated line between the workflow steps: vertical on phones, horizontal on desktop. */
function Connector() {
  return (
    <div className="flex items-center justify-center py-1 lg:px-2 lg:py-0" aria-hidden="true">
      <span className="relative block h-10 w-[2px] overflow-hidden rounded-full bg-indigo-100 lg:h-[2px] lg:w-full">
        <span className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#6366f1,transparent)] motion-safe:animate-[cbFlowX_1.6s_linear_infinite] max-lg:bg-[linear-gradient(180deg,transparent,#6366f1,transparent)] max-lg:motion-safe:animate-[cbFlowY_1.6s_linear_infinite]" />
      </span>
    </div>
  );
}

/** Customer → chatbot → your team, with animated connecting lines. Horizontal on desktop, vertical on phones. */
export function Workflow() {
  const team = [
    { icon: MessageCircle, label: "Lead alert on your WhatsApp" },
    { icon: FileText, label: "Saved to Google Sheet or CRM" },
    { icon: CalendarCheck, label: "Booking added to your calendar" },
  ];
  return (
    <Reveal className="mx-auto mt-12 max-w-5xl rounded-3xl border border-slate-200/80 bg-gradient-to-br from-[#fbfaf7] to-[#f1f3ff] p-5 sm:mt-16 sm:p-8">
      <p className="text-center text-[13px] font-bold uppercase tracking-wide text-slate-500">How a message becomes a customer</p>
      <div className="mt-6 grid items-center lg:grid-cols-[1fr_80px_auto_80px_1fr]">
        {/* Customers */}
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-[12px] font-bold uppercase tracking-wide text-slate-400">Customer messages</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {CHANNELS.items.map((c) => (
              <span key={c.id} className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold ${CHANNEL_STYLE[c.id]}`}>
                <span className="scale-75">
                  <ChannelIcon id={c.id} />
                </span>
                {c.name === "Facebook Messenger" ? "Messenger" : c.name}
              </span>
            ))}
          </div>
        </div>
        <Connector />
        {/* Bot */}
        <div className="mx-auto flex flex-col items-center rounded-3xl bg-slate-950 px-6 py-4 text-white shadow-[0_20px_40px_-20px_rgba(79,70,229,0.7)]">
          <span className="motion-safe:animate-[cbBob_3.5s_ease-in-out_infinite]">
            <AnimatedBot isSpeaking animate className="h-16 w-16" expression="focused" />
          </span>
          <p className="mt-1 text-[13px] font-bold">Your AI chatbot</p>
          <p className="text-[11px] text-indigo-200">Answers · qualifies · books</p>
        </div>
        <Connector />
        {/* Team */}
        <ul className="grid gap-2">
          {team.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-[13px] font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200/70">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function ChannelIcon({ id }: { id: string }) {
  if (id === "whatsapp")
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.12c-.24.68-1.42 1.3-1.95 1.34-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.92-4.66-4.1-.13-.18-1.1-1.47-1.1-2.81 0-1.33.7-1.99.95-2.26.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.47.24.56.79 1.92.86 2.06.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.89 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.33z" />
      </svg>
    );
  if (id === "instagram")
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  if (id === "facebook")
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.17.16.15.26.35.27.57l.05 1.78a.8.8 0 0 0 1.12.71l1.98-.87c.17-.08.36-.09.53-.04.91.25 1.88.38 2.91.38 5.64 0 10-4.13 10-9.7S17.64 2 12 2zm6 7.46-2.94 4.66a1.5 1.5 0 0 1-2.17.4l-2.34-1.75a.6.6 0 0 0-.72 0l-3.16 2.4c-.42.32-.97-.18-.69-.63l2.94-4.66a1.5 1.5 0 0 1 2.17-.4l2.34 1.75c.21.16.51.16.72 0l3.16-2.4c.42-.32.97.18.69.63z" />
      </svg>
    );
  return <Globe className="h-6 w-6" aria-hidden="true" />;
}

const CHANNEL_STYLE: Record<string, string> = {
  web: "bg-indigo-600 text-white",
  whatsapp: "bg-[#25D366] text-white",
  instagram: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white",
  facebook: "bg-gradient-to-br from-[#00b2ff] to-[#006aff] text-white",
};

export function Channels({ image }: { image?: string }) {
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...CHANNELS} />
        <div className={`mt-9 grid items-center gap-8 sm:mt-12 ${image ? "lg:grid-cols-[1fr_360px] lg:gap-12" : ""}`}>
          <div className={`grid gap-3 sm:grid-cols-2 sm:gap-5 ${image ? "" : "lg:grid-cols-4"}`}>
            {CHANNELS.items.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.07}>
                <article className="group h-full rounded-2xl border border-slate-200/80 bg-[#fbfaf7] p-5 transition hover:-translate-y-1 hover:shadow-lg sm:p-6">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md transition group-hover:scale-110 ${CHANNEL_STYLE[c.id]}`}>
                    <ChannelIcon id={c.id} />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{c.name}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-600">{c.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {image && (
            <Reveal delay={0.15} className="mx-auto w-full max-w-[300px] sm:max-w-[360px] motion-safe:animate-[cbBob_6s_ease-in-out_infinite]">
              <Image
                src={image}
                alt="The AI chatbot replying to a customer on WhatsApp"
                width={896}
                height={1200}
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 360px, 80vw"
                className="h-auto w-full rounded-3xl shadow-[0_30px_60px_-30px_rgba(15,23,42,0.6)]"
              />
            </Reveal>
          )}
        </div>
        <Workflow />
      </div>
    </section>
  );
}

const FEATURE_ICONS: Record<string, LucideIcon> = {
  leads: Users,
  calendar: CalendarCheck,
  language: Languages,
  handover: UserCheck,
  qualify: Filter,
  analytics: BarChart3,
};

export function Features() {
  return (
    <section className="bg-[#fbfaf7] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...FEATURES} />
        <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {/* Lead card: your documents flowing into the bot */}
          <Reveal className="col-span-2 lg:row-span-2">
            <article className="flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 p-5 text-white sm:p-7">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <BookOpen className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-xl font-black sm:text-2xl">{FEATURES.lead.title}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-indigo-100 sm:text-[15px]">{FEATURES.lead.text}</p>
              </div>
              <div className="flex items-center gap-3" aria-hidden="true">
                <div className="grid gap-1.5">
                  {["Services & prices", "FAQs", "Brochure.pdf"].map((d, i) => (
                    <span
                      key={d}
                      className="flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1.5 text-[11px] font-semibold motion-safe:animate-[cbFeed_3s_ease-in-out_infinite]"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      <FileText className="h-3.5 w-3.5" /> {d}
                    </span>
                  ))}
                </div>
                <svg viewBox="0 0 60 20" className="h-5 w-14 shrink-0 text-amber-300" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M2 10h48" strokeDasharray="4 6" className="motion-safe:animate-[cbDash_1.6s_linear_infinite]" />
                  <path d="M44 4l8 6-8 6" />
                </svg>
                <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15">
                  <AnimatedBot isSpeaking animate className="h-16 w-16" expression="focused" />
                </span>
              </div>
            </article>
          </Reveal>
          {FEATURES.items.map((f, i) => {
            const Icon = FEATURE_ICONS[f.icon] ?? MessageCircle;
            return (
              <Reveal key={f.title} delay={(i % 2) * 0.06}>
                <article className="h-full rounded-2xl border border-slate-200/80 bg-white p-4 transition hover:-translate-y-1 hover:shadow-md sm:p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-11 sm:w-11">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-[15px] font-bold leading-snug text-slate-900 sm:mt-4 sm:text-base">{f.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-600 sm:text-[14px]">{f.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function UseCases() {
  const [active, setActive] = useState(USE_CASES.items[0].id);
  const current = USE_CASES.items.find((u) => u.id === active) ?? USE_CASES.items[0];
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...USE_CASES} />
        <div className="mt-8 grid items-start gap-6 sm:mt-10 lg:grid-cols-[260px_1fr] lg:gap-10">
          <div role="tablist" aria-label="Industries" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
            {USE_CASES.items.map((u) => (
              <button
                key={u.id}
                type="button"
                role="tab"
                aria-selected={u.id === active}
                onClick={() => setActive(u.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[14px] font-bold transition lg:rounded-2xl lg:px-5 lg:py-3.5 lg:text-left ${
                  u.id === active ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {u.name}
              </button>
            ))}
          </div>
          <ChatWindow key={current.id} lines={current.chat} playKey={current.id} title={`${current.name} assistant`} compact className="w-full" />
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="relative overflow-hidden bg-[#0a1433] py-14 text-white sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <SectionHeading {...PROCESS} dark />
        <ol className="relative mt-9 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          <span className="absolute bottom-6 left-5 top-5 w-px bg-gradient-to-b from-[#FFC72C] to-white/10 sm:hidden" aria-hidden="true" />
          <span className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-[#FFC72C] via-white/20 to-white/10 lg:block" aria-hidden="true" />
          {PROCESS.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="relative flex gap-4 sm:block">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFC72C] text-base font-black text-slate-950 ring-8 ring-[#0a1433]">
                  {i + 1}
                </span>
                <div className="min-w-0 sm:mt-5">
                  <p className="text-[12px] font-bold uppercase tracking-wider text-amber-300">{step.days}</p>
                  <h3 className="mt-0.5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-slate-300">{step.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DemoBand() {
  return (
    <section className="bg-[#fbfaf7] px-5 py-12 sm:px-6 sm:py-16">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#fff3cf] via-[#fff8e8] to-[#e9ecff] px-6 py-10 sm:px-12 sm:py-12">
        <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-10">
          <div className="mx-auto motion-safe:animate-[cbBob_4s_ease-in-out_infinite]">
            <AnimatedBot isSpeaking animate className="h-28 w-28 drop-shadow-xl sm:h-36 sm:w-36" expression="excited" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-balance text-[1.6rem] font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">{DEMO.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600 sm:text-lg">{DEMO.text}</p>
            <button
              type="button"
              onClick={openLiveDemo}
              className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-7 text-[15px] font-bold text-white hover:bg-slate-800"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat With Our AI Now
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function FinalCta({ onQuote, whatsappMessage }: { onQuote: () => void; whatsappMessage: string }) {
  return (
    <section className="bg-white px-5 py-12 sm:px-6 sm:py-16">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1433] via-[#14245c] to-[#3b2a8c] px-6 py-10 text-center text-white sm:px-12 sm:py-14">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-[90px]" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-violet-400/25 blur-[90px]" aria-hidden="true" />
        <div className="relative">
          <h2 className="text-balance text-[1.6rem] font-black leading-tight tracking-tight sm:text-4xl">{FINAL_CTA.title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:text-lg">{FINAL_CTA.text}</p>
          <div className="mx-auto mt-7 grid max-w-md gap-3 sm:flex sm:max-w-none sm:justify-center">
            <button type="button" onClick={onQuote} className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl bg-[#FFC72C] px-7 text-[15px] font-bold text-slate-950 hover:brightness-105">
              Get Free Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={`https://wa.me/919986389444?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-7 text-[15px] font-bold text-white hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/** Phones only: call, live demo and quote always one tap away. */
export function MobileActionBar({ onQuote }: { onQuote: () => void }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur sm:hidden">
      <div className="grid grid-cols-[1fr_1.15fr_1.35fr] gap-2">
        <a
          href="tel:+919986389444"
          onClick={() => gtag("event", "conversion", { send_to: ADS_CALL_CONVERSION })}
          className="flex h-11 items-center justify-center gap-1.5 rounded-xl border border-slate-300 text-[14px] font-bold text-slate-900"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </a>
        <button type="button" onClick={openLiveDemo} className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-slate-950 text-[14px] font-bold text-white">
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Try Demo
        </button>
        <button type="button" onClick={onQuote} className="flex h-11 items-center justify-center rounded-xl bg-[#FFC72C] text-[14px] font-bold text-slate-950">
          Get Free Quote
        </button>
      </div>
    </div>
  );
}
