"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Linkedin,
  Instagram,
  Facebook,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#0d121d] text-gray-400 overflow-hidden font-sans">
      {/* ───────────────── TOP NAV SECTION ───────────────── */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Services Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-8 tracking-tight">Services</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/services/google-ads" className="hover:text-yellow-400 transition-colors">Google Ads Management</Link></li>
              <li><Link href="/services/meta-ads" className="hover:text-yellow-400 transition-colors">Meta Ads Management</Link></li>
              <li><Link href="/services/business-websites" className="hover:text-yellow-400 transition-colors">Website Development</Link></li>
              <li><Link href="/services/mobile-app-development" className="hover:text-yellow-400 transition-colors">App Development</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-8 tracking-tight">Company</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-yellow-400 transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-yellow-400 transition-colors">Our Work / Case Studies</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/internship" className="hover:text-yellow-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white text-lg font-bold mb-8 tracking-tight">Resources</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-yellow-400 transition-colors">Blog</Link></li>
              <li><Link href="/services" className="hover:text-yellow-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 transition-colors">Free Consultation</Link></li>
            </ul>
          </div>

          {/* Get in Touch Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-white text-lg font-bold mb-4 tracking-tight">Get in Touch</h3>
            
            {/* Phone Button */}
            <a
              href="tel:+919986389444"
              className="flex items-center gap-3 w-full bg-[#161b2b] border border-white/5 hover:border-white/10 px-6 py-4 rounded-2xl text-white transition-all group shadow-lg"
            >
              <div className="bg-white/10 p-2 rounded-lg group-hover:scale-110 transition-transform">
                <Phone size={18} />
              </div>
              <span className="font-bold tracking-tight text-sm">+91 99863 89444</span>
            </a>

            {/* Request a Quote Button */}
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full bg-[#f4c542] hover:bg-[#eab308] px-6 py-4 rounded-2xl text-black font-bold text-sm transition-all shadow-lg active:scale-95"
            >
              <Mail size={18} />
              Request a Quote
            </Link>

            {/* Chat With Us Button */}
            <a
              href="https://wa.me/919986389444"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#22c55e] hover:bg-[#16a34a] px-6 py-4 rounded-2xl text-white font-bold text-sm transition-all shadow-lg active:scale-95"
            >
              <FaWhatsapp size={20} />
              Chat With Us
            </a>
          </div>
        </div>
      </div>

      {/* ───────────────── FLOATING WHITE BRAND BAR ───────────────── */}
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10">
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 flex-1">
            <Link href="/" className="shrink-0 transition-transform hover:scale-105 active:scale-95">
              <Image
                src="/logo-dark.svg"
                alt="Clever Crow"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto select-none"
              />
            </Link>
            
            <p className="text-[#4b5563] text-sm md:text-base leading-relaxed font-medium text-center md:text-left max-w-2xl">
              Clever Crow Strategies helps ambitious brands grow with premium websites, sharper campaigns, and creative systems built to convert.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/", label: "Facebook" },
              { Icon: Instagram, href: "https://www.instagram.com/clevercrow.strategies", label: "Instagram" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/clever-crow-strategies/", label: "LinkedIn" }
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-yellow-400"
              >
                <Icon size={20} className="text-[#374151] group-hover:text-yellow-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────────── BOTTOM LEGAL BAR ───────────────── */}
      <div className="border-t border-white/5 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] md:text-xs font-bold uppercase tracking-widest text-gray-500">
          
          <p className="flex items-center gap-3">
            © {currentYear} Clever Crow Strategies LLP. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              Back to Top
              <ArrowRight size={14} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

