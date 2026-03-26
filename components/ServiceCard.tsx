"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import {
  Megaphone,
  BarChart3,
  LayoutTemplate,
  Video,
  Bot,
  LineChart,
  ShoppingBag,
  Search,
  Fingerprint,
  Globe,
} from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  megaphone: Megaphone,
  chart: BarChart3,
  layout: LayoutTemplate,
  video: Video,
  bot: Bot,
  analytics: LineChart,
  shopping: ShoppingBag,
  search: Search,
  brand: Fingerprint,
  globe: Globe,
};

type ServiceCardProps = {
  title: string;
  text: string;
  icon: keyof typeof ICONS;
  href: string;
};

export default function ServiceCard({
  title,
  text,
  icon,
  href,
}: ServiceCardProps) {
  const Icon = ICONS[icon];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="h-full"
    >
      <Link href={href} className="group relative block h-full">
        <div className="relative h-full rounded-[2.2rem] border border-gray-200/50 p-1.5 sm:p-2 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg bg-gray-50/50">
          
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          
          {/* Main Card Shell - Premium Precision Aesthetic */}
          <div
            className="
              relative h-full overflow-hidden rounded-[1.8rem] border border-white
              bg-white p-8 sm:p-10 z-10
              transition-all duration-500 ease-[0.16,1,0.3,1]
              shadow-[0_4px_20px_rgba(0,0,0,0.02)]
            "
          >
            {/* Animated Accent Line */}
            <span
              className="
                absolute top-0 left-0 w-full h-[2px] 
                bg-gradient-to-r from-transparent via-gray-100 to-transparent
                transition-all duration-700
                group-hover:via-yellow-400
              "
            />

            {/* Icon - Professional Aesthetic */}
            <div
              className="
                mb-8 inline-flex h-14 w-14 items-center justify-center rounded-xl 
                bg-gray-50 border border-gray-100 shadow-sm
                transition-all duration-500 ease-out
                group-hover:border-yellow-400/50 group-hover:bg-yellow-50 group-hover:scale-105 group-hover:shadow-md
              "
            >
              {Icon && <Icon className="h-6 w-6 transition-colors duration-500 text-gray-600 group-hover:text-yellow-600" />}
            </div>

            {/* Typography - Structured Authority */}
            <h3 className="text-xl font-bold tracking-tight text-gray-900 transition-colors">
              {title}
            </h3>

            <p className="mt-4 text-base leading-relaxed text-gray-500 font-medium transition-colors">
              {text}
            </p>

            {/* Adaptive Learn More Link */}
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-gray-900 transition-all duration-300">
              <span>Learn More</span>
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>

          </div>
        </div>
      </Link>
    </motion.div>
  );
}
