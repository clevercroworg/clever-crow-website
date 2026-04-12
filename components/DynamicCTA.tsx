"use client";

import { motion } from "framer-motion";
import { 
  PhoneCall, MessageCircle, Activity, Workflow,
  Target, Share2, LayoutTemplate, Bot, LineChart, 
  MapPin, Video, UserCheck, TrendingUp, MousePointerClick, Layers
} from "lucide-react";

type DynamicCTAProps = {
  primaryCtaText?: string;
};

export default function DynamicCTA({
  primaryCtaText = "+91 99863 89444",
}: DynamicCTAProps) {
  const row1 = [
    { text: "Google & Meta Ads", icon: Target },
    { text: "Social Media Marketing", icon: Share2 },
    { text: "Website Design", icon: LayoutTemplate },
    { text: "AI Lead Automation", icon: Bot },
    { text: "Reporting & Tracking", icon: LineChart },
    { text: "WhatsApp Integration", icon: MessageCircle },
  ];

  const row2 = [
    { text: "Built for Indian Businesses", icon: MapPin },
    { text: "Video Creatives", icon: Video },
    { text: "Lead Follow-ups", icon: UserCheck },
    { text: "Performance Reviews", icon: TrendingUp },
    { text: "Conversion Focused", icon: MousePointerClick },
    { text: "Scalable Systems", icon: Layers },
  ];

  return (
    <section className="relative isolate bg-white px-4 sm:px-6 py-12 sm:py-24 overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, scale: 0.98, y: 20 },
          visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] sm:rounded-3xl px-5 py-8 sm:px-8 sm:py-12 text-center shadow-[0_0_80px_rgba(250,204,21,0.1)]"
      >
        
        {/* Flattened but vibrant yellow-gold background */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[#f5c542]"
          style={{
            backgroundImage: "linear-gradient(180deg, #F5C542 0%, #EAB308 100%)",
          }}
        />

        <div className="relative z-10">
          {/* Badge */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
            className="mb-4"
          >
            <span className="inline-block rounded-full bg-black/5 backdrop-blur-md px-5 py-2 text-[10px] font-black tracking-[0.2em] text-white">
              READY TO SCALE?
            </span>
          </motion.div>


          {/* Buttons */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5, type: "spring" } } }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            {/* Call Button */}
            <a
              href="tel:+919986389444"
              className="
                group relative inline-flex items-center gap-3
                rounded-2xl bg-black px-6 py-4 sm:px-10 sm:py-5
                font-black text-white shadow-xl
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-2xl
                w-full sm:w-auto justify-center
              "
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors shrink-0">
                <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
              </div>
              <span className="text-sm sm:text-lg uppercase tracking-wider whitespace-nowrap">{primaryCtaText}</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/919986389444"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group inline-flex items-center gap-3
                rounded-2xl border border-black/10 bg-white/90 px-6 py-4 sm:px-10 sm:py-5
                font-black text-gray-950 shadow-lg
                transition-all duration-500
                hover:-translate-y-1
                hover:shadow-xl hover:bg-white
                w-full sm:w-auto justify-center
              "
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 sm:h-7 sm:w-7 text-[#25D366] transition-transform duration-500 group-hover:scale-110 shrink-0" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="text-sm sm:text-lg uppercase tracking-wider whitespace-nowrap">Chat with Us</span>
            </a>
          </motion.div>

          {/* Logo Carousel - Reverted to Original Gold Design */}
          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.8, duration: 1 } } }}
            className="relative mt-12 overflow-hidden"
          >
            <div className="mb-6 text-center">
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.3em] text-black underline underline-offset-[6px] decoration-black/20">
                Core Capabilities & Partnerships
              </span>
            </div>

            {/* Row 1 - Refined Horizontal Style */}
            <div className="flex w-max animate-marquee gap-3 sm:gap-5 py-2 sm:py-3">
              {[...row1, ...row1].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 min-w-[170px] sm:min-w-[240px] h-12 sm:h-20 rounded-xl sm:rounded-2xl bg-white/20 border border-white/10 px-4 sm:px-6 shadow-sm transition-transform hover:scale-105"
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-black shrink-0" />
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-black">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 2 - Refined Horizontal Style */}
            <div className="flex w-max animate-marquee-reverse gap-3 sm:gap-5 py-2 sm:py-3">
              {[...row2, ...row2].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 min-w-[170px] sm:min-w-[240px] h-12 sm:h-20 rounded-xl sm:rounded-2xl bg-white/20 border border-white/10 px-4 sm:px-6 shadow-sm transition-transform hover:scale-105"
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 text-black shrink-0" />
                  <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.15em] text-black">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
