"use client";

import React from "react";

export default function HeroSectionWebsite() {
  return (
    <section className="hero-section relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
      <div className="hero-grid"></div>
      <div className="hero-orb hero-orb-one"></div>
      <div className="hero-orb hero-orb-two"></div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="text-center">
          <div className="hero-badge-row">
            <div className="hero-top-badge hero-top-badge-primary">Website Growth Packages</div>
            <div className="hero-top-badge">Conversion-Focused Design</div>
            <div className="hero-top-badge">SEO-Ready Structure</div>
            <div className="hero-top-badge">Fast Launch</div>
          </div>
          <h1 className="mt-6 text-4xl tracking-tight text-white sm:text-5xl lg:text-[3.1rem] lg:leading-[1.08]">
            <span className="font-light text-white">Your Website.</span>
            <span className="block font-extrabold offer-highlight">Built to Convert. Designed to Impress.</span>
          </h1>
          <p className="mt-3 text-xl font-medium text-white/86 sm:text-2xl">
            High-performing websites for businesses that need leads, not just pages. Fast load. Mobile first. SEO-ready structure from day one.
          </p>
          <ul className="hero-checklist mt-9 grid gap-4 sm:grid-cols-2">
            <li className="hero-check-item">
              <span className="hero-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 5 5L20 7"></path>
                </svg>
              </span>
              <span>15+ Years Experience</span>
            </li>
            <li className="hero-check-item">
              <span className="hero-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 5 5L20 7"></path>
                </svg>
              </span>
              <span>550+ Happy Clients</span>
            </li>
            <li className="hero-check-item">
              <span className="hero-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 5 5L20 7"></path>
                </svg>
              </span>
              <span>Certified Team</span>
            </li>
            <li className="hero-check-item">
              <span className="hero-check-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 12 5 5L20 7"></path>
                </svg>
              </span>
              <span>Fast Delivery & Support</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <a href="#pricing" className="hero-scroll-link">
          <span>Explore Plans</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m7 13 5 5 5-5M7 6l5 5 5-5"></path>
          </svg>
        </a>
      </div>
    </section>
  );
}
