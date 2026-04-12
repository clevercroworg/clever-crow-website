"use client";

import { motion } from "framer-motion";
import { Star, MessageCircle, Quote } from "lucide-react";

const testimonials = [
  {
    source: "Google",
    name: "Anand Shetty",
    text: "We partnered with CleverCrow to improve our digital presence and lead generation. Their understanding of SEO, Google Ads, and automation is extremely practical. Within a few months, we saw consistent inbound leads.",
    rating: 5,
  },
  {
    source: "Trustpilot",
    name: "Rohit Kulkarni",
    text: "CleverCrow helped us restructure our paid ads and website funnels. What stood out was their data-driven approach and clear communication. The transition was seamless and results were immediate.",
    rating: 5,
  },
  {
    source: "Google",
    name: "Pooja Rao",
    text: "The CleverCrow team understood our business goals clearly and implemented solutions that genuinely saved us time and increased our ROI. Highly recommended for any growing brand.",
    rating: 5,
  },
  {
    source: "Google",
    name: "Suresh Nayak",
    text: "CleverCrow stands out for their honesty and execution. Everything was delivered on time and with clear outcomes. They transformed our digital strategy completely.",
    rating: 5,
  },
  {
    source: "Trustpilot",
    name: "Neha Deshpande",
    text: "Their strategic inputs and AI-driven optimizations made a noticeable difference in lead quality. We've seen a 40% jump in conversion rates since starting with them.",
    rating: 5,
  },
  {
    source: "Google",
    name: "Vivek Hegde",
    text: "From audit to execution, everything was planned well. The automation systems reduced a lot of manual work and allowed us to focus on our core business operations.",
    rating: 5,
  },
  {
    source: "Trustpilot",
    name: "Karan Johar",
    text: "Remarkable growth in just 3 months. Their tech-first approach to marketing is exactly what we needed.",
    rating: 5,
  },
  {
    source: "Google",
    name: "Megha Singh",
    text: "The best agency we've worked with. No fluff, just pure performance and data-backed strategies.",
    rating: 5,
  },
];

const Row = ({ 
  items, 
  direction = "left", 
  speed = 30, 
  isBig = false 
}: { 
  items: any[], 
  direction?: "left" | "right", 
  speed?: number, 
  isBig?: boolean 
}) => {
  return (
    <div className="flex overflow-hidden py-4">
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-6 px-3"
      >
        {[...items, ...items].map((t, i) => (
          <div
            key={i}
            className={`
              relative flex flex-col justify-between rounded-3xl border border-gray-100 bg-white/70 backdrop-blur-md 
              p-6 transition-all duration-300 hover:border-yellow-400/40 hover:shadow-2xl hover:-translate-y-1
              ${isBig ? "w-[85vw] sm:w-[450px]" : "w-[280px] sm:w-[320px]"}
            `}
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-gray-100 group-hover:text-yellow-100 transition-colors">
              <Quote size={isBig ? 40 : 24} fill="currentColor" />
            </div>

            <div>
              <div className="mb-4 flex items-center gap-1 text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={isBig ? 16 : 12} fill="currentColor" className="drop-shadow-sm" />
                ))}
              </div>
              <p className={`
                ${isBig ? "text-base sm:text-lg mb-8" : "text-sm mb-6"} 
                font-medium leading-relaxed text-gray-800 italic
              `}>
                "{t.text}"
              </p>
            </div>

            <div className="mt-auto flex items-center gap-4 border-t border-gray-100 pt-5">
              <div className={`
                ${isBig ? "h-12 w-12" : "h-10 w-10"} 
                rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center 
                font-black text-yellow-700 shadow-sm
              `}>
                {t.name.charAt(0)}
              </div>
              <div>
                <div className={`${isBig ? "text-base" : "text-sm"} font-black text-gray-900`}>
                  {t.name}
                </div>
                <div className="flex items-center gap-2">
                   <div className="h-1 w-1 rounded-full bg-yellow-400" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                    {t.source}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative isolate overflow-hidden bg-slate-50 py-16 sm:py-32">
      {/* Background Artwork Design */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Simple Mesh Gradient */}
        <div className="absolute inset-x-0 top-0 h-[800px] w-full bg-[radial-gradient(circle_at_50%_0%,rgba(254,240,172,0.3),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[800px] w-full bg-[radial-gradient(circle_at_50%_100%,rgba(254,240,172,0.2),transparent_70%)]" />
        
        {/* Decorative Floating Blobs (Artistic Design) */}
        <svg className="absolute left-0 top-1/4 h-[400px] w-[400px] opacity-[0.03] text-yellow-600" viewBox="0 0 200 200">
          <path fill="currentColor" d="M45,-76.3C57.4,-69.5,66.1,-55.8,73.1,-41.6C80.1,-27.4,85.5,-12.7,84.4,1.8C83.2,16.2,75.4,30.4,66,42.8C56.6,55.1,45.5,65.6,32.4,72.4C19.3,79.1,4.2,82.2,-10.1,80.1C-24.3,78,-37.7,70.6,-49.2,61.4C-60.6,52.2,-70.1,41.2,-76.7,28.4C-83.3,15.6,-86.9,1.1,-84.9,-12.6C-82.9,-26.3,-75.2,-39.3,-64.5,-47.9C-53.7,-56.6,-40,-60.8,-27.9,-68.3C-15.8,-75.7,-5.2,-86.3,5.3,-95.5C15.8,-104.7,45,-76.3,45,-76.3Z" transform="translate(100 100)" />
        </svg>
        <svg className="absolute right-0 bottom-1/4 h-[400px] w-[400px] opacity-[0.03] text-blue-600" viewBox="0 0 200 200">
          <path fill="currentColor" d="M41.5,-73.4C52.7,-67.2,60.1,-53.4,66.8,-39.8C73.4,-26.2,79.2,-12.7,80,1.4C80.8,15.5,76.6,30.2,68.9,43.4C61.3,56.5,50.2,68.1,36.5,74.7C22.8,81.3,6.5,82.9,-10.1,81.1C-26.6,79.3,-43.3,74.1,-56.2,63.9C-69.1,53.7,-78.2,38.5,-82.4,22.2C-86.6,5.9,-85.9,-11.5,-79.8,-27.4C-73.8,-43.3,-62.4,-57.8,-48.7,-64.8C-35,-71.8,-18.9,-71.4,-2.4,-67.3C14.1,-63.2,30.3,-79.7,41.5,-73.4Z" transform="translate(100 100)" />
        </svg>

        {/* Dots Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full mb-16 sm:mb-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-yellow-700 shadow-sm">
              <MessageCircle size={14} />
              Client Trust & Growth
            </span>
          </div>

          <h2 className="mx-auto max-w-4xl font-black tracking-[-0.03em] text-gray-950 pb-2" style={{ fontSize: "clamp(24px, 4vw, 50px)", lineHeight: "1" }}>
            Trusted by Brands That <br className="hidden sm:block" />
            <span className="text-yellow-500 drop-shadow-sm">Demand Results.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base sm:text-xl font-medium text-gray-600">
            Don't just take our word for it. Join 40+ businesses that have unified their 
            growth systems with Clever Crow.
          </p>
        </motion.div>
      </div>

      <div className="relative isolate px-6">
        {/* Review Score Container - Moved Above Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex justify-center"
        >
          <div className="inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-6 rounded-3xl bg-white/50 backdrop-blur-md border border-white/80 p-6 shadow-xl">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-gray-950">4.9/5</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Score</span>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="flex flex-col items-center">
              <span className="text-3xl font-black text-gray-950">40+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Verified Leads</span>
            </div>
            <div className="h-10 w-px bg-gray-200" />
            <div className="flex flex-col items-center px-4">
              <div className="flex items-center gap-1 text-yellow-500 mb-1">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 underline decoration-yellow-400/50 underline-offset-4 cursor-pointer">Read All Reviews</span>
            </div>
          </div>
        </motion.div>

        {/* Edge Blur Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-64 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-64 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />

        <div className="flex flex-col gap-2 sm:gap-6">
          {/* Row 1: Left moving, Mixed */}
          <Row items={testimonials.slice(0, 4)} direction="left" speed={45} isBig={true} />
          
          {/* Row 2: Right moving, Mixed */}
          <Row items={testimonials.slice(4, 8)} direction="right" speed={45} isBig={true} />
        </div>
      </div>
    </section>
  );
}
