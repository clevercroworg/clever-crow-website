"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type LogoItem = {
  src: string;
  alt: string;
};

type ServiceHeroProps = {
  title: string;
  subtitle: string;
  serviceName: string;
    eyebrow?: string; // ✅  

  /* PAGE-SPECIFIC (OPTIONAL) */
  highlights?: string[]; // ✅ optional
  tools?: LogoItem[];    // ✅ optional
};

export default function ServiceHero({
  title,
  subtitle,
  serviceName,
    eyebrow = "",
  highlights = [], // ✅ SAFE DEFAULT
  tools = [],      // ✅ SAFE DEFAULT
}: ServiceHeroProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/send-lead-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          service: serviceName,
          pageUrl: window.location.href,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      window.location.href = "/thank-you";
    } catch (err) {
      setError("Failed to send request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden pt-[150px] pb-24">
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[#fafafa]" />
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-200/30 blur-[120px]" />
        <div className="absolute -top-32 right-[-200px] h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-white to-transparent" />
        <div className="hero-noise absolute inset-0 opacity-[0.35]" />
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">


          {/* LEFT */}
          <div>
            {eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-purple-600">
                {eyebrow}
              </p>
            )}



            <h1 
              className="text-3xl font-black leading-[1.12] text-gray-950 sm:text-4xl lg:text-[40px] tracking-tight"
              style={{ maxWidth: "900px", fontSize: "clamp(32px, 4.5vw, 38px)" }}
            >
              {title}
            </h1>
            
            <p className="mt-6 max-w-2xl text-base sm:text-[17px] text-gray-600 font-medium leading-relaxed">
              {subtitle}
            </p>

            {/* HIGHLIGHTS (SAFE) */}
            {highlights.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {highlights.map((item, idx) => (
                  <span
                    key={idx}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-8 text-sm text-gray-500">
              Trusted by service businesses & growth-focused brands across India
            </p>

            {/* TOOLS / LOGOS (SAFE) */}
            {tools.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-8 opacity-80">
                {tools.map((tool, idx) => (
                  <img
                    key={idx}
                    src={tool.src}
                    alt={tool.alt}
                    className="h-7"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE CTA CARD WITH INLINE FORM TRANSITION */}
          <div className="relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0 z-20">
            {/* Decorative background aura for the card */}
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-br from-yellow-400/30 via-purple-400/20 to-pink-400/30 blur-2xl opacity-70" />
            
            <motion.div layout className="relative rounded-[2rem] border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              {/* Internal decorative shapes */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-yellow-300/30 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-purple-300/30 blur-2xl pointer-events-none" />

              <AnimatePresence mode="wait" initial={false}>
                {!isModalOpen ? (
                  <motion.div
                    key="cta"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 text-center p-8 sm:p-10"
                  >
                    <div className="inline-flex items-center justify-center rounded-full bg-purple-100/80 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-700 mb-6 border border-purple-200/50">
                      Priority Access
                    </div>
                    
                    <h3 className="text-2xl sm:text-[28px] font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                      Unlock Your Free <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Growth Strategy</span>
                    </h3>
                    
                    <p className="text-[15px] font-medium text-gray-600 mb-8 leading-relaxed">
                      Get a comprehensive audit and a custom execution plan designed to scale your ROI.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-5">
                      {/* The Button */}
                      <div className="relative group w-full">
                        {/* Minimal Outer Glow / Ripple */}
                        <div className="absolute -inset-1 rounded-full bg-yellow-400/10 blur-sm group-hover:bg-yellow-400/20 transition-all duration-700 animate-pulse" />
                        <div className="absolute inset-0 rounded-full bg-yellow-400/15 animate-ping [animation-duration:3s]" />
                        
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="relative z-10 w-full flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3.5 sm:px-8 sm:py-5 text-[16px] sm:text-lg font-black text-gray-900 shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(250,204,21,0.5)]"
                        >
                          <span>Request a Call Back</span>
                          <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 object-contain" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Trust Indicators */}
                      <div className="flex items-center justify-center gap-8 mt-2 opacity-80">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">24<span className="text-sm">H</span></span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Response</span>
                        </div>
                        <div className="h-8 w-px bg-gray-300" />
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xl sm:text-2xl font-black text-gray-900 leading-none">0</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">Obligation</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 p-8 sm:p-10"
                  >
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-900 transition-colors bg-white/50 hover:bg-white rounded-full"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Request a Call Back</h3>
                    <p className="mt-2 text-sm text-gray-600 font-medium">
                      Speak with a specialist within 24 hours.
                    </p>

                    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                      <input
                        name="name"
                        required
                        placeholder="Your Name *"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white/50 px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      />
                      <input
                        name="phone"
                        required
                        placeholder="Phone number *"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white/50 px-4 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all"
                      />

                      {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-4 h-14 w-full rounded-xl text-[15px] font-bold tracking-wide transition-all text-gray-900 ${
                          isLoading
                            ? "cursor-not-allowed bg-yellow-300 opacity-70"
                            : "bg-yellow-400 hover:bg-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:-translate-y-0.5"
                        }`}
                      >
                        {isLoading ? "Sending..." : "Request a Call Back"}
                      </button>
                    </form>

                    <p className="mt-6 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                      No spam • No obligation • Clear guidance
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Form modal is now completely inline within the right column. */}
    </section>
  );
}
