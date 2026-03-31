"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Linkedin,
  Instagram,
  Facebook,
  Phone,
  Bot
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="relative w-full bg-white text-gray-600 border-t border-gray-100 overflow-hidden">
      {/* ───────────────── CONVERSION STRIP ───────────────── */}
      {!pathname.startsWith("/internship") && (
        <div className="border-b border-black/5 bg-yellow-400">
          <div className="mx-auto max-w-7xl px-6 py-5 sm:py-6 lg:py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-lg lg:text-xl font-black tracking-tight text-gray-900">
                Ready to grow your business?
              </h3>
              <p className="text-sm font-bold text-gray-800">
                Consult with our experts for a custom growth audit.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+919986389444"
                className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-gray-950 transition-all hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1"
              >
                <Phone size={16} className="group-hover:rotate-12 transition-transform" />
                Call Now
              </a>

              <a
                href="https://wa.me/919986389444"
                target="_blank"
                className="group inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/40 backdrop-blur-md px-6 py-3 text-sm font-bold text-gray-900 transition-all hover:bg-white hover:border-black/20 hover:shadow-lg hover:-translate-y-1"
              >
                <FaWhatsapp size={18} className="text-[#25D366] group-hover:scale-110 transition-transform" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ───────────── MAIN FOOTER ───────────── */}
      <div className="relative overflow-hidden bg-white">
        {/* Visible Dotted Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.06)_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-[0.9] z-0 pointer-events-none" />
        
        {/* Top Fade overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none z-0" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-8 pb-6 sm:py-8 lg:py-10">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">

            {/* ───── BRAND ───── */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="flex flex-col items-center">
                <Link href="/" className="inline-block">
                  <Image
                    src="/logo-dark.svg"
                    alt="Clever Crow"
                    width={220}
                    height={60}
                    className="h-12 sm:h-14 w-auto select-none"
                  />
                </Link>

                {/* Social - Unique Circle Style */}
                <div className="mt-6 flex gap-4 pl-0 sm:pl-2">
                  {[
                    { Icon: Linkedin, href: "https://www.linkedin.com/company/clever-crow-strategies/", label: "LinkedIn" },
                    { Icon: Instagram, href: "https://www.instagram.com/clevercrow.strategies", label: "Instagram" },
                    { Icon: Facebook, href: "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/", label: "Facebook" }
                  ].map(({ Icon, href, label }, i) => (
                    <Link
                      key={i}
                      href={href}
                      target="_blank"
                      aria-label={label}
                      className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 transition-all hover:bg-yellow-400 hover:border-yellow-400 hover:-translate-y-1 shadow-sm"
                    >
                      <Icon size={18} className="text-gray-500 transition-colors group-hover:text-black" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* ───── NAVIGATION GRID ───── */}
            <div className="lg:col-span-8 grid gap-6 sm:gap-8 sm:grid-cols-3">
              
              {/* ───── SERVICES & EXPERIENCE / INTERNSHIP TRACKS ───── */}
              {!pathname.startsWith("/internship") ? (
                <>
                  <div>
                    <h4 className="mb-4 sm:mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                      Growth Stack
                    </h4>
                    <ul className="space-y-3 sm:space-y-4 text-sm font-bold text-gray-600">
                      <li><Link href="/services/marketing-strategy" className="transition-colors hover:text-yellow-600">Digital Marketing</Link></li>
                      <li><Link href="/services/google-ads" className="transition-colors hover:text-yellow-600">Google & Meta Ads</Link></li>
                      <li><Link href="/services/seo" className="transition-colors hover:text-yellow-600">Strategic SEO</Link></li>
                      <li><Link href="/services/logo-design" className="transition-colors hover:text-yellow-600">Brand Identity</Link></li>
                      <li><Link href="/services/ai-seo" className="transition-colors tracking-tight text-gray-900 hover:text-yellow-600 underline decoration-yellow-400/50 decoration-2 underline-offset-4">AI Systems</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-4 sm:mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                      Experience
                    </h4>
                    <ul className="space-y-3 sm:space-y-4 text-sm font-bold text-gray-600">
                      <li><Link href="/contact" className="transition-colors hover:text-yellow-600">Company Story</Link></li>
                      <li><Link href="/services" className="transition-colors hover:text-yellow-600">Case Results</Link></li>
                      <li><Link href="/#testimonials" className="transition-colors hover:text-yellow-600">Client Reviews</Link></li>
                      <li><Link href="/contact" className="transition-colors hover:text-yellow-600">Contact Hub</Link></li>
                      <li><Link href="/internship" className="transition-colors hover:text-yellow-600">Careers</Link></li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4 className="mb-4 sm:mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                      Active Tracks
                    </h4>
                    <ul className="space-y-3 sm:space-y-4 text-sm font-bold text-gray-600">
                      <li><Link href="/internship/1" className="transition-colors hover:text-yellow-600">AI-ML Development</Link></li>
                      <li><Link href="/internship/1" className="transition-colors hover:text-yellow-600">Full Stack Web</Link></li>
                      <li><Link href="/internship/10" className="transition-colors hover:text-yellow-600">Content Writing</Link></li>
                      <li><Link href="/internship/7" className="transition-colors hover:text-yellow-600">Web Design</Link></li>
                      <li><Link href="/internship" className="transition-colors text-gray-900 hover:text-yellow-600 underline decoration-yellow-400/50 decoration-2 underline-offset-4">View All Tracks</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-4 sm:mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                      Information
                    </h4>
                    <ul className="space-y-3 sm:space-y-4 text-sm font-bold text-gray-600">
                      <li><Link href="/about" className="transition-colors hover:text-yellow-600">About Clever Crow</Link></li>
                      <li><Link href="/internship" className="transition-colors hover:text-yellow-600">How to Apply</Link></li>
                      <li><Link href="/terms" className="transition-colors hover:text-yellow-600">Internship Terms</Link></li>
                      <li><Link href="/privacy" className="transition-colors hover:text-yellow-600">Data Privacy</Link></li>
                      <li><Link href="/contact" className="transition-colors hover:text-yellow-600">Help Desk</Link></li>
                    </ul>
                  </div>
                </>
              )}

              {/* ───── CONTACT & REGIONAL ───── */}
              <div>
                <h4 className="mb-4 sm:mb-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-900">
                  Global HQ
                </h4>
                <address className="not-italic text-sm font-bold leading-relaxed text-gray-600">
                  Business Bay, 2nd Floor<br />
                  Udupi–Manipal Highway<br />
                  Kunjibettu, KA, India
                </address>
                
                <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-100 space-y-2 sm:space-y-3">
                  <a
                    href="tel:+919986389444"
                    className="block text-lg font-black text-gray-900 hover:text-yellow-600 transition-colors"
                  >
                    +91 99863 89444
                  </a>
                  <a
                    href="mailto:hello@clevercrow.in"
                    className="block text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    hello@clevercrow.in
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ───────────── BOTTOM LEGAL BAR ───────────── */}
      <div className="relative z-10 border-t border-gray-100 bg-gray-50/80 backdrop-blur-md pb-24 sm:pb-0">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 sm:py-6 lg:py-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-3">
            <span className="h-1 w-5 bg-yellow-400/50 rounded-full" />
            © {new Date().getFullYear()} Clever Crow Strategies LLP
          </p>

          <div className="flex flex-wrap gap-8">
            <Link href="/privacy" className="transition-colors hover:text-gray-900 border-b border-transparent hover:border-gray-200">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-gray-900 border-b border-transparent hover:border-gray-200">Terms of Service</Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="text-gray-400 hover:text-yellow-600 transition-colors active:translate-y-0.5"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>

      {/* ───────────── STICKY MOBILE CTA ───────────── */}
      {!pathname.startsWith("/internship") && (
        <div className="fixed bottom-4 left-4 right-4 z-[100] flex gap-2 rounded-3xl sm:rounded-full bg-white/95 backdrop-blur-xl px-3 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.15)] sm:hidden border border-gray-100">
          <a
            href="tel:+919986389444"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl sm:rounded-full bg-yellow-400 py-3.5 text-[11px] font-black uppercase tracking-widest text-gray-950 shadow-xl shadow-yellow-500/10 active:scale-95 transition-transform"
          >
            <Phone size={14} />
            Call
          </a>

          <a
            href="https://wa.me/919986389444"
            target="_blank"
            className="flex items-center justify-center px-4 rounded-2xl sm:rounded-full bg-[#25D366] py-3.5 text-white shadow-xl shadow-green-500/10 active:scale-95 transition-transform"
          >
            <FaWhatsapp size={20} />
          </a>

          <button
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-chat"))}
            className="flex items-center justify-center px-4 rounded-2xl sm:rounded-full bg-zinc-900 py-3.5 text-white shadow-xl shadow-zinc-900/10 active:scale-95 transition-transform"
          >
            <Bot size={20} />
          </button>
        </div>
      )}
    </footer>
  );
}
