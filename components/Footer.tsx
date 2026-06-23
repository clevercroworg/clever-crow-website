"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Linkedin,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Mail
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-white text-slate-600 font-sans border-t border-slate-200/80">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Description Column (3/12 width) */}
          <div className="lg:col-span-3 flex flex-col items-start gap-6">
            <Link href="/" className="shrink-0 transition-transform hover:scale-105 active:scale-95">
              <Image
                src="/logo-dark.svg"
                alt="Clever Crow"
                width={160}
                height={45}
                className="h-9 w-auto select-none"
              />
            </Link>
            
            <p className="text-sm font-medium leading-relaxed text-slate-500 max-w-[260px]">
              We build intelligent digital systems and marketing strategies that drive measurable growth.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/company/clever-crow-strategies/", label: "LinkedIn" },
                { Icon: Instagram, href: "https://www.instagram.com/clevercrow.strategies", label: "Instagram" },
                { Icon: Facebook, href: "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/", label: "Facebook" }
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow hover:border-amber-500"
                >
                  <Icon size={16} className="text-slate-600 group-hover:text-amber-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns Wrapper (7/12 width) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            
            {/* Services */}
            <div>
              <h4 className="text-slate-900 text-[13px] font-extrabold uppercase tracking-widest mb-5">Services</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-slate-500">
                <li><Link href="/website-development-company" className="hover:text-amber-500 transition-colors">Web Development</Link></li>
                <li><Link href="/app-development-company" className="hover:text-amber-500 transition-colors">App Development</Link></li>
                <li><Link href="/ai-automation-agency" className="hover:text-amber-500 transition-colors">AI Automation</Link></li>
                <li><Link href="/digital-marketing-agency" className="hover:text-amber-500 transition-colors">Digital Marketing</Link></li>
                <li><Link href="/digital-marketing-agency" className="hover:text-amber-500 transition-colors">Branding</Link></li>
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-slate-900 text-[13px] font-extrabold uppercase tracking-widest mb-5">Solutions</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-slate-500">
                <li><Link href="/business-website-development" className="hover:text-amber-500 transition-colors">Business Website</Link></li>
                <li><Link href="/ecommerce-website-development" className="hover:text-amber-500 transition-colors">CMS & Booking</Link></li>
                <li><Link href="/ai-chatbot-development" className="hover:text-amber-500 transition-colors">AI Automation</Link></li>
                <li><Link href="/digital-marketing-agency" className="hover:text-amber-500 transition-colors">Marketing System</Link></li>
                <li><Link href="/saas-product-development" className="hover:text-amber-500 transition-colors">SaaS Development</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-slate-900 text-[13px] font-extrabold uppercase tracking-widest mb-5">Company</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-slate-500">
                <li><Link href="/" className="hover:text-amber-500 transition-colors">About Us</Link></li>
                <li><Link href="/#portfolio" className="hover:text-amber-500 transition-colors">Case Studies</Link></li>
                <li><Link href="/careers" className="hover:text-amber-500 transition-colors">Careers</Link></li>
                <li><Link href="/careers" className="hover:text-amber-500 transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-slate-900 text-[13px] font-extrabold uppercase tracking-widest mb-5">Industries</h4>
              <ul className="space-y-3.5 text-xs font-semibold text-slate-500">
                <li><Link href="/industries/ecommerce-growth-marketing" className="hover:text-amber-500 transition-colors">E-commerce</Link></li>
                <li><Link href="/industries/healthcare-digital-marketing" className="hover:text-amber-500 transition-colors">Healthcare</Link></li>
                <li><Link href="/industries/education-marketing" className="hover:text-amber-500 transition-colors">Education</Link></li>
                <li><Link href="/industries/real-estate-digital-marketing" className="hover:text-amber-500 transition-colors">Real Estate</Link></li>
                <li><Link href="/industries/hotels-resorts-marketing" className="hover:text-amber-500 transition-colors">Hospitality</Link></li>
              </ul>
            </div>
            
          </div>

          {/* Get in Touch Column (3/12 width) */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <h4 className="text-slate-900 text-[13px] font-extrabold uppercase tracking-widest mb-2">Get in Touch</h4>
            
            <div className="space-y-4 text-xs font-semibold text-slate-500">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  2nd Floor, Business Bay Centre,<br />
                  Udupi–Manipal Highway, Kunjibettu,<br />
                  Udupi, Karnataka 576102, India
                </span>
              </div>
              {/* Phone */}
              <a href="tel:+919986389444" className="flex items-center gap-2.5 hover:text-amber-500 transition-colors">
                <Phone size={14} className="text-slate-400 shrink-0" />
                <span>99863 89444</span>
              </a>
              {/* Email */}
              <a href="mailto:hello@clevercrow.in" className="flex items-center gap-2.5 hover:text-amber-500 transition-colors">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <span>hello@clevercrow.in</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ───────────────── BOTTOM LEGAL BAR ───────────────── */}
      <div className="border-t border-slate-200/60 py-6 bg-slate-50">
        <div className="mx-auto max-w-[1360px] px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          <p>© {currentYear} Clever Crow. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <span className="text-slate-300">|</span>
            <Link href="/terms-and-conditions" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
