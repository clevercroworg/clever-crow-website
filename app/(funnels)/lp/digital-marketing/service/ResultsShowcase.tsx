"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  GraduationCap,
  Pill,
  Search,
  ShoppingCart,
  Stethoscope,
  Store,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { FaGoogle, FaMeta } from "react-icons/fa6";
import SectionHeading from "./SectionHeading";
import { CASE_STUDIES, type CaseStudy, type ResultMetric } from "./results-data";

const EASE = [0.22, 1, 0.36, 1] as const;

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Education: GraduationCap,
  "Real Estate": Building2,
  "E-commerce": ShoppingCart,
  Healthcare: Stethoscope,
  Pharma: Pill,
  "Retail & B2B": Store,
};

function ChannelMark({ channel, className = "" }: { channel: CaseStudy["channel"]; className?: string }) {
  if (channel === "Google Ads") return <FaGoogle className={`text-[#4285F4] ${className}`} aria-hidden="true" />;
  if (channel === "Meta Ads") return <FaMeta className={`text-[#0866FF] ${className}`} aria-hidden="true" />;
  return <Search className={`text-emerald-500 ${className}`} aria-hidden="true" />;
}

function MetricIcon({ trend, className = "" }: { trend: ResultMetric["trend"]; className?: string }) {
  const Icon = trend === "rank" ? Trophy : TrendingUp;
  return <Icon className={className} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ */
/* Gallery tiles: real screenshot + designed tiles from real results   */
/* ------------------------------------------------------------------ */

function ScreenshotTile({ study }: { study: CaseStudy }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <Image src={study.screenshot} alt={`${study.client} website`} width={600} height={400} sizes="(min-width: 1024px) 260px, 45vw" className="aspect-[3/2] w-full object-cover object-top" />
      <div className="px-3 py-3 sm:px-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Landing experience</p>
        <p className="mt-0.5 truncate text-sm font-bold text-slate-900">{study.client}</p>
      </div>
    </div>
  );
}

function MetricTile({ metric, tone }: { metric: ResultMetric; tone: "amber" | "light" }) {
  const amber = tone === "amber";
  return (
    <div
      className={`flex aspect-square flex-col justify-between rounded-2xl p-4 shadow-2xl shadow-black/40 sm:p-5 ${
        amber ? "bg-gradient-to-br from-[#FFD84D] to-[#F5A623] text-[#071330]" : "bg-white text-[#071330]"
      }`}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${amber ? "bg-[#071330]/10" : "bg-amber-100 text-amber-700"}`}>
        <MetricIcon trend={metric.trend} className="h-4 w-4" />
      </span>
      <div>
        <p className="text-3xl font-black leading-none tracking-tight sm:text-4xl">{metric.value}</p>
        <p className={`mt-2 text-xs font-semibold leading-snug sm:text-sm ${amber ? "text-[#071330]/75" : "text-slate-500"}`}>{metric.label}</p>
      </div>
    </div>
  );
}

function ChannelTile({ study }: { study: CaseStudy }) {
  return (
    <div className="flex aspect-[4/5] flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-4 shadow-2xl shadow-black/40 backdrop-blur sm:p-5">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg">
        <ChannelMark channel={study.channel} className="h-6 w-6" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Channel</p>
        <p className="mt-1 text-lg font-bold text-white sm:text-xl">{study.channel}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {study.tags.slice(1).map((tag) => (
            <span key={tag} className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold text-slate-300 sm:text-[11px]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineTile({ study }: { study: CaseStudy }) {
  return (
    <div className="flex aspect-square flex-col justify-between rounded-2xl border border-amber-400/20 bg-[#0d1d47] p-4 shadow-2xl shadow-black/40 sm:p-5">
      <CalendarDays className="h-6 w-6 text-amber-400" aria-hidden="true" />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Timeline</p>
        <p className="mt-1 text-2xl font-black capitalize text-white sm:text-3xl">{study.timeline}</p>
      </div>
    </div>
  );
}

function IndustryTile({ study }: { study: CaseStudy }) {
  const Icon = INDUSTRY_ICONS[study.industry] ?? Store;
  return (
    <div className="flex aspect-square flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b3a8a] to-[#0d1d47] p-4 shadow-2xl shadow-black/40 sm:p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200/70">Industry</p>
        <p className="mt-1 text-lg font-bold leading-tight text-white sm:text-xl">{study.industry}</p>
      </div>
    </div>
  );
}

function CreativeTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
      <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 260px, 45vw" className="object-cover" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One case-study row                                                  */
/* ------------------------------------------------------------------ */

// Matches the page container (max-w-7xl with lg:px-8) so text lines up with other sections
// while the gallery runs to the screen edge.
const EDGE_LEFT = "lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]";
const EDGE_RIGHT = "lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))]";

function CaseStudyRow({ study, index }: { study: CaseStudy; index: number }) {
  const galleryLeft = index % 2 === 1;

  const m1 = <MetricTile key="m1" metric={study.metrics[0]} tone="amber" />;
  const m2 = <MetricTile key="m2" metric={study.metrics[1]} tone="light" />;
  const shot = <ScreenshotTile key="shot" study={study} />;
  const channel = <ChannelTile key="ch" study={study} />;
  const timeline = <TimelineTile key="tl" study={study} />;
  const industry = <IndustryTile key="ind" study={study} />;

  const visuals = (study.creatives ?? []).map((src, i) => (
    <CreativeTile key={`v${i}`} src={src} alt={`${study.industry} campaign visual ${i + 1}`} />
  ));

  // One loop of columns, wide enough to fill large screens. With campaign visuals, photos are
  // interleaved with the result tiles; without them, tile pairs repeat in a different order.
  const columns: React.ReactNode[][] =
    visuals.length >= 3
      ? [[m1, visuals[0]], [shot, channel], [visuals[1], industry], [m2, visuals[2]], [timeline]]
      : [
          [m1, shot],
          [channel, timeline],
          [industry, m2],
          [shot, m1],
          [timeline, channel],
          [m2, industry],
        ];
  // The track holds the loop twice and slides by exactly half its width, so the motion never jumps.
  const track = [...columns, ...columns];

  return (
    <div
      className={`grid grid-cols-1 items-center gap-8 border-t border-white/10 py-12 first:border-t-0 sm:gap-10 sm:py-20 lg:gap-0 ${
        galleryLeft ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      }`}
    >
      {/* Text panel */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`order-2 px-4 sm:px-6 ${galleryLeft ? `lg:order-2 lg:pl-14 ${EDGE_RIGHT}` : `lg:order-1 ${EDGE_LEFT} lg:pr-14`}`}
      >
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-slate-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6">
          {study.logo ? (
            <span className="inline-flex h-14 max-w-full items-center rounded-2xl bg-white px-5 shadow-sm sm:h-16 sm:px-6">
              <Image
                src={study.logo.src}
                alt={study.client}
                width={study.logo.width}
                height={study.logo.height}
                className="h-9 w-auto max-w-[200px] object-contain sm:h-10 sm:max-w-[240px]"
              />
            </span>
          ) : (
            <span className="inline-flex h-14 max-w-full items-center rounded-2xl border border-white/15 bg-white/5 px-5 text-xl font-bold text-white sm:h-16 sm:px-6 sm:text-2xl">
              {study.client}
            </span>
          )}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-6 border-y border-white/10 py-6">
          {study.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="flex items-center gap-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                <MetricIcon trend={metric.trend} className="h-6 w-6 shrink-0 text-amber-400" />
                {metric.value}
              </p>
              <p className="mt-1.5 text-sm text-slate-400">{metric.label}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-7 text-2xl font-bold leading-tight text-white sm:text-[1.75rem]">{study.headline}</h3>
        <p className="mt-4 text-base leading-relaxed text-slate-300">{study.story}</p>

      </motion.div>

      {/* Endless carousel: alternate rows travel in opposite directions; pauses on hover. Slides in from its side. */}
      <motion.div
        initial={{ opacity: 0, x: galleryLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -80px 0px" }}
        transition={{ duration: 0.9, ease: EASE }}
        className={`group relative order-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] ${
          galleryLeft
            ? "lg:order-1 lg:[mask-image:linear-gradient(270deg,transparent,black_12%)]"
            : "lg:order-2 lg:[mask-image:linear-gradient(90deg,transparent,black_12%)]"
        }`}
        aria-hidden="true"
      >
        <div
          className={`flex w-max items-start motion-safe:animate-[svc-marquee_30s_linear_infinite] group-hover:[animation-play-state:paused] ${
            galleryLeft ? "[animation-direction:reverse]" : ""
          }`}
        >
          {track.map((tiles, i) => (
            <div
              key={i}
              className={`flex w-[200px] shrink-0 flex-col gap-3 pr-3 sm:w-[240px] sm:gap-4 sm:pr-4 lg:w-[260px] ${
                (i % columns.length) % 2 === 1 ? "pt-12 sm:pt-16" : ""
              }`}
            >
              {tiles}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function ResultsShowcase() {
  return (
    <section id="results" className="relative overflow-hidden bg-[#050b1f] py-20 text-white sm:py-28">
      {/* Background: soft glows and a grid that fades out */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-blue-700/20 blur-[160px]" />
        <div className="absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-amber-500/10 blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "linear-gradient(180deg, black, transparent 30%)",
            WebkitMaskImage: "linear-gradient(180deg, black, transparent 30%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow="Real campaigns · Real numbers"
          title="Our Results"
          subtitle="Selected outcomes from Google Ads, Meta Ads and SEO campaigns we have run for businesses across education, real estate, healthcare, e-commerce and more."
        />

      </div>

      <div className="relative mt-10 sm:mt-14">
        {CASE_STUDIES.map((study, index) => (
          <CaseStudyRow key={study.id} study={study} index={index} />
        ))}
      </div>

      <p className="relative mt-6 px-4 text-center text-xs text-slate-500">Results vary by industry, budget, location and competition.</p>
    </section>
  );
}
