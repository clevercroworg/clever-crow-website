"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  ArrowUpRight,
  Building2,
  Cloud,
  Dumbbell,
  Factory,
  GraduationCap,
  Hotel,
  Landmark,
  PartyPopper,
  Scissors,
  ShoppingCart,
  Stethoscope,
  Store,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Industries drawn from Clever Crow's published case studies and landing pages.
const INDUSTRIES: { name: string; icon: LucideIcon }[] = [
  { name: "Real Estate", icon: Building2 },
  { name: "Education", icon: GraduationCap },
  { name: "Healthcare", icon: Stethoscope },
  { name: "Hospitality", icon: Hotel },
  { name: "E-commerce", icon: ShoppingCart },
  { name: "SaaS & IT", icon: Cloud },
  { name: "Manufacturing", icon: Factory },
  { name: "Fitness & Wellness", icon: Dumbbell },
  { name: "Beauty & Salons", icon: Scissors },
  { name: "Food & Beverage", icon: UtensilsCrossed },
  { name: "Retail & B2B", icon: Store },
  { name: "Finance & Consulting", icon: Landmark },
  { name: "Events & Weddings", icon: PartyPopper },
  { name: "Home Services", icon: Wrench },
];

export default function IndustriesServed({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="industries" className="relative overflow-hidden bg-white py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent 75%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sector experience"
          title="Industries We've Served"
          subtitle="Every industry buys differently. We bring campaign playbooks shaped by what works for businesses like yours."
        />

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {INDUSTRIES.map(({ name, icon: Icon }, idx) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 5) * 0.06, ease: EASE }}
              className="group relative flex aspect-[5/4] flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-amber-300 hover:bg-white hover:shadow-[0_20px_40px_-20px_rgba(7,19,48,0.35)]"
            >
              <span className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-32 w-32 rounded-full bg-amber-300/0 blur-2xl transition duration-300 group-hover:bg-amber-300/40" aria-hidden="true" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-gradient-to-b from-white to-slate-100 text-[#071330] shadow-sm transition duration-300 group-hover:scale-110 group-hover:border-amber-400 group-hover:bg-none group-hover:bg-[#FFCE1B] sm:h-16 sm:w-16">
                <Icon className="h-6 w-6 stroke-[1.75] sm:h-7 sm:w-7" aria-hidden="true" />
              </span>
              <h3 className="relative text-sm font-bold leading-snug text-slate-900 sm:text-base">{name}</h3>
            </motion.div>
          ))}

          <motion.button
            type="button"
            onClick={onOpenModal}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
            className="group flex aspect-[5/4] flex-col items-center justify-center gap-4 rounded-2xl bg-[#071330] p-4 text-center text-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(7,19,48,0.6)] cursor-pointer"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFCE1B] text-[#071330] transition duration-300 group-hover:rotate-45 sm:h-16 sm:w-16">
              <ArrowUpRight className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
            </span>
            <span className="text-sm font-bold leading-snug sm:text-base">
              Your industry?
              <span className="mt-0.5 block text-xs font-medium text-slate-300">Let&apos;s talk</span>
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
