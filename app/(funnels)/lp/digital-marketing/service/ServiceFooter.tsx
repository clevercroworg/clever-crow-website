"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { Reveal } from "./motion";

type ServiceFooterProps = {
  whatsappUrl: string;
  services?: string[];
  onOpenModal: () => void;
  onCallClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onWhatsAppClick: () => void;
};

// Profiles listed in the site's Organization schema (components/seo/OrganizationSchema.tsx).
const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/clevercrow.strategies", icon: FaInstagram },
  { label: "Facebook", href: "https://www.facebook.com/people/Clever-Crow-Strategies/61579261586907/", icon: FaFacebookF },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/clever-crow-strategies/", icon: FaLinkedinIn },
];

export default function ServiceFooter({ whatsappUrl, onOpenModal, onCallClick, onWhatsAppClick }: ServiceFooterProps) {
  return (
    <>
      {/* CTA Section on dark blue */}
      <section className="relative overflow-hidden bg-[#050b1f] py-14 sm:py-20">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-blue-700/20 blur-[140px]" aria-hidden="true" />
        <Reveal y={36} scale={0.97} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#071330] p-8 sm:p-10 lg:p-12 shadow-2xl">
            {/* Background photo: devices with growth charts on the right; overlays keep the text readable */}
            <Image
              src="/lp/digital-marketing/digital-marketing-banner.jpg"
              alt=""
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="pointer-events-none object-cover object-[85%_center]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071330]/95 via-[#071330]/85 to-[#071330]/40 lg:bg-gradient-to-r lg:from-[#071330] lg:via-[#071330]/85 lg:to-[#071330]/15"
              aria-hidden="true"
            />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Let&apos;s grow together</p>
                <p className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">Ready to get more leads and sales?</p>
                <p className="mt-3 text-base text-slate-300">
                  Share your goals and we&apos;ll map out the right mix of SEO, ads, website and automation for your business.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FFCE1B] px-6 text-sm font-bold text-[#071330] transition hover:brightness-105 cursor-pointer shadow-md"
                >
                  Get Free Callback
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
                <a
                  href={whatsappUrl}
                  onClick={onWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-[#071330]/70 px-6 text-sm font-bold text-white backdrop-blur-md transition hover:bg-[#071330]/90 shadow-md"
                >
                  <FaWhatsapp className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Minimal Centralized Footer (white) */}
      <footer id="site-footer" className="relative overflow-hidden border-t border-slate-200 bg-white py-12 text-slate-900 sm:py-16">
        <Reveal y={24} className="relative mx-auto flex max-w-4xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          {/* Clever Crow Logo */}
          <span className="inline-flex items-center px-1 py-1">
            <Image src="/CSS.svg" alt="Clever Crow" width={160} height={25} className="h-7 w-auto" />
          </span>

          {/* Contact (Phone & WhatsApp) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm font-semibold">
            <a
              href="tel:09986389444"
              onClick={onCallClick}
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 transition hover:border-amber-400 hover:bg-white"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-[#071330]">
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              +91 99863 89444
            </a>
            <a
              href={whatsappUrl}
              onClick={onWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-slate-800 transition hover:border-[#25D366] hover:bg-white"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              </span>
              Chat on WhatsApp
            </a>
          </div>

          {/* Social media links */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-400 hover:text-[#071330]"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Bottom Legal bar: Copyright and Privacy Policy */}
          <div className="mt-10 flex w-full flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row">
            <p>© {new Date().getFullYear()} Clever Crow Strategies LLP. All rights reserved.</p>
            <a href="/privacy-policy" className="transition hover:text-slate-900">
              Privacy Policy
            </a>
          </div>
        </Reveal>
      </footer>
    </>
  );
}
