"use client";

import React from "react";

type HeroMeta = {
  badges: string[];
  title: string;
  accentTitle: string;
  subtitle: string;
  highlights: string[];
  ctaLabel?: string;
};

type HeroSectionProps = {
  data?: HeroMeta;
};

const defaultHero: HeroMeta = {
  badges: ["Google Ads Experts", "Google Certified", "Performance Focused", "Lead Generation"],
  title: "Google Ads Management",
  accentTitle: "@ Just ₹7,999",
  subtitle: "Get More Qualified Leads with Google Ads Management",
  highlights: ["15+ Years of Experience", "Certified Professionals", "550+ Happy Clients", "Best Customer Support"],
  ctaLabel: "View Pricing",
};

export default function HeroSection({ data }: HeroSectionProps) {
  const hero = data ?? defaultHero;

  return (
    <section className="hero-section relative overflow-hidden pt-20 sm:pt-24">
      <div className="hero-grid"></div>
      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>
      <div className="mx-auto grid max-w-7xl gap-7 px-4 pb-8 pt-5 sm:px-6 lg:grid-cols-[1.34fr_0.66fr] lg:items-start lg:px-8 lg:pb-9">
        <div className="relative z-10 max-w-3xl">
          <div className="hero-badge-row">
            {hero.badges.map((badge) => (
              <div
                key={badge}
                className={`hero-top-badge ${badge === hero.badges[0] ? "hero-top-badge-primary" : ""}`}
              >
                {badge}
              </div>
            ))}
          </div>
          <h1 className="mt-6 text-4xl tracking-tight text-white sm:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
            <span className="font-light text-white">{hero.title}</span>
            <span className="block font-extrabold offer-highlight">{hero.accentTitle}</span>
          </h1>
          <p className="mt-3 text-xl font-medium text-white/86 sm:text-2xl">{hero.subtitle}</p>
          <ul className="hero-checklist mt-9 grid gap-4 sm:grid-cols-2">
            {hero.highlights.map((item) => (
              <li key={item} className="hero-check-item">
                <span className="hero-check-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-10">
          <div className="hero-form-card mx-auto max-w-sm rounded-[24px] p-4 sm:p-5">
            <div className="mb-3">
              <h3 className="text-base font-bold text-slate-900 sm:text-[1.35rem]">Request a Call Back</h3>
            </div>
            <form className="space-y-2.5" onSubmit={(e) => { e.preventDefault(); alert("Thanks!"); }}>
              <input type="text" name="hero_name" placeholder="Enter your name" className="hero-light-input" />
              <input type="tel" name="hero_phone" placeholder="Enter your phone" className="hero-light-input" />
              <button type="submit" className="mt-2 w-full rounded-2xl bg-[#f4c542] px-5 py-3.5 text-[15px] font-bold text-black transition hover:brightness-110 shadow-[0_8px_20px_rgba(244,197,66,0.25)]">Request a Call</button>
            </form>
          </div>
          <div className="hero-privacy-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="11" width="14" height="10" rx="2"></rect>
              <path d="M8 11V8a4 4 0 1 1 8 0v3"></path>
            </svg>
            <span>We respect your privacy</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-cue">
        <a href="#pricing" className="hero-scroll-link">
          <span>{hero.ctaLabel || "View Pricing"}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14"></path>
            <path d="m6 13 6 6 6-6"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
