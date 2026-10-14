"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight, Building2, Check, ChevronDown, Info, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "../lp.css";
import type { CaseStudy } from "./case-studies";
import {
  ADS_CALL_CONVERSION,
  EXPERIENCE,
  FAQS,
  FOOTER,
  HERO,
  HERO_IMAGE,
  IMPROVE,
  INSTITUTIONS,
  NAV_LINKS,
  PHONE_DISPLAY,
  PHONE_HREF,
  PLAN_BASIS,
  REPORTING,
  RESULTS,
  SERVICES,
  WHATSAPP_LINK,
} from "./college-data";
import { sendGtag, trackCollegeEvent } from "./tracking";

function trackCall(placement: string) {
  trackCollegeEvent("college_call_click", placement);
  sendGtag("event", "conversion", { send_to: ADS_CALL_CONVERSION });
}

const EASE = [0.22, 1, 0.36, 1] as const;

// Sections sit below a fixed header; scroll-mt keeps anchor targets visible.
const SECTION = "scroll-mt-28 py-12 sm:py-16 lg:py-24 border-b border-slate-200";
const CONTAINER = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <Reveal className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      <span className="mb-3 inline-flex items-center gap-2 rounded-md bg-slate-950 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-xs">
        <Building2 className="h-3.5 w-3.5 text-[#f4c542]" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{intro}</p>}
    </Reveal>
  );
}

function CallCta({ placement, className = "" }: { placement: string; className?: string }) {
  return (
    <a
      href={PHONE_HREF}
      onClick={() => trackCall(placement)}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4c542] px-6 py-3 text-center text-sm font-black sm:whitespace-nowrap text-slate-950 shadow-xs transition hover:brightness-105 active:scale-[0.99] sm:text-base ${FOCUS_RING} ${className}`}
    >
      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Call {PHONE_DISPLAY}</span>
    </a>
  );
}

function WhatsAppCta({ placement, label, className = "" }: { placement: string; label: string; className?: string }) {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackCollegeEvent("college_whatsapp_click", placement)}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 sm:whitespace-nowrap shadow-2xs transition hover:bg-slate-50 sm:text-base ${FOCUS_RING} ${className}`}
    >
      <FaWhatsapp className="h-4 w-4 text-emerald-600" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

export default function CollegeLandingClient({ caseStudies }: { caseStudies: CaseStudy[] }) {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroInView, setHeroInView] = useState(true);

  const hasResults = caseStudies.length > 0;
  const navLinks = NAV_LINKS.filter((link) => hasResults || link.href !== "#results");

  useEffect(() => {
    const handleScroll = () => setIsHeaderScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // The mobile sticky bar stays hidden while the hero CTAs are on screen, so it never duplicates them.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* lp.css sets a dark color-scheme on :root; this page is light, so native controls must be too. */}
      <div className="landing-page-container min-h-screen bg-white [color-scheme:light] font-sans text-slate-900 selection:bg-amber-300 selection:text-slate-900">
        {/* ----------------------------------------------------------- */}
        {/* 1. HEADER */}
        {/* ----------------------------------------------------------- */}
        <header
          id="site-header"
          className={`fixed inset-x-0 top-3 z-50 transition-all duration-300 ${isHeaderScrolled ? "header-scrolled" : ""}`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
            <a href="#top" className={`flex shrink-0 items-center rounded-md ${FOCUS_RING}`}>
              <Image
                src="/logo-dark.svg"
                alt="Clever Crow Strategies"
                width={130}
                height={36}
                className="h-8 w-auto sm:h-9"
                priority
              />
            </a>

            <nav aria-label="Page sections" className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-md text-sm font-bold text-slate-700 transition hover:text-slate-950 ${FOCUS_RING}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href={PHONE_HREF}
              onClick={() => trackCall("header")}
              className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-[#f4c542] px-4 text-sm font-black text-slate-950 shadow-xs transition hover:brightness-105 sm:h-11 sm:px-5 ${FOCUS_RING}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="sm:hidden">Call Now</span>
              <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
            </a>
          </div>
        </header>

        <main>
          {/* ----------------------------------------------------------- */}
          {/* 2. HERO (rendered visible immediately: no entrance animation) */}
          {/* ----------------------------------------------------------- */}
          <section
            id="top"
            className="relative overflow-hidden border-b border-slate-200 bg-[#faf8f5] pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24"
          >
            <div className={`${CONTAINER} grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14`}>
              <div className="space-y-6 lg:col-span-7">
                <span className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-xs sm:text-xs">
                  <Building2 className="h-3.5 w-3.5 text-[#f4c542]" aria-hidden="true" />
                  {HERO.audience}
                </span>

                <h1 className="text-balance text-[2.15rem] font-black leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem]">
                  {HERO.titleLead}{" "}
                  <span className="bg-[linear-gradient(transparent_64%,#f4c542_64%,#f4c542_92%,transparent_92%)] px-0.5 [box-decoration-break:clone]">
                    {HERO.titleAccent}
                  </span>
                </h1>

                <p className="max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">{HERO.paragraph}</p>
                <p className="max-w-2xl text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">
                  {HERO.secondary}
                </p>

                <ul aria-label="Services" className="flex flex-wrap items-center gap-2">
                  {HERO.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-bold text-slate-700 shadow-2xs"
                    >
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                  <CallCta placement="hero" />
                  <WhatsAppCta placement="hero" label={HERO.secondaryCta} />
                </div>

                <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Info className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  {HERO.clarification}
                </p>
              </div>

              <div className="lg:col-span-5">
                {HERO_IMAGE ? (
                  <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
                    <Image
                      src={HERO_IMAGE.src}
                      alt={HERO_IMAGE.alt}
                      width={HERO_IMAGE.width}
                      height={HERO_IMAGE.height}
                      priority
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
                    <p className="text-xs font-black uppercase tracking-widest text-amber-800">Your plan is built around</p>
                    <ul className="mt-5 divide-y divide-slate-100">
                      {PLAN_BASIS.map((item) => (
                        <li key={item.title} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f4c542]/30 text-slate-900">
                            <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block text-base font-bold text-slate-950">{item.title}</span>
                            <span className="block text-sm leading-relaxed text-slate-600">{item.desc}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 3. COLLEGE EXPERIENCE – LOGO GRID */}
          {/* ----------------------------------------------------------- */}
          <section id="experience" className={`${SECTION} bg-white`}>
            <div className={CONTAINER}>
              <SectionHeading eyebrow="Our Experience" title={EXPERIENCE.heading} intro={EXPERIENCE.intro} />

              <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
                {INSTITUTIONS.map((institution, idx) => (
                  <Reveal key={institution.name} delay={idx * 0.05} className="h-full">
                    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-6 text-center shadow-2xs sm:px-6 sm:py-8">
                      <div className="flex h-14 w-full items-center justify-center sm:h-16">
                        {institution.logo ? (
                          <Image
                            src={institution.logo.src}
                            alt={`${institution.name} logo`}
                            width={institution.logo.width}
                            height={institution.logo.height}
                            sizes="200px"
                            className="max-h-12 w-auto max-w-[85%] object-contain sm:max-h-14"
                          />
                        ) : (
                          <span className="text-balance text-base font-black leading-snug text-slate-800 sm:text-lg">
                            {institution.name}
                          </span>
                        )}
                      </div>
                      {institution.logo && (
                        <span className="text-xs font-semibold leading-snug text-slate-600 sm:text-sm">
                          {institution.name}
                        </span>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 4. SELECTED RESULTS & CASE STUDIES (approved entries only in production) */}
          {/* ----------------------------------------------------------- */}
          {hasResults && (
            <section id="results" className={`${SECTION} bg-[#faf8f5]`}>
              <div className={CONTAINER}>
                <SectionHeading eyebrow="Selected Results" title={RESULTS.heading} intro={RESULTS.intro} />

                {caseStudies.some((study) => !study.approved) && (
                  <p className="mx-auto -mt-4 mb-8 max-w-2xl rounded-xl border border-dashed border-amber-400 bg-amber-50 px-4 py-2.5 text-center text-xs font-semibold text-amber-900 sm:mb-10">
                    Development preview: cards marked Draft are pending verification and are hidden in production.
                  </p>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {caseStudies.map((study, idx) => {
                    const details = [
                      ["Period", study.details?.period],
                      ["Challenge", study.details?.challenge],
                      ["Our Work", study.details?.ourWork],
                      ["Result", study.details?.result],
                    ].filter((row): row is [string, string] => Boolean(row[1]));

                    return (
                      <Reveal key={study.id} delay={idx * 0.06} className="h-full">
                        <article
                          className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-xs transition hover:shadow-md ${
                            study.approved ? "border-slate-200/90" : "border-dashed border-amber-400"
                          }`}
                        >
                          {/* Logo strip: fixed height so every card's content starts on the same line */}
                          <div className="flex h-24 items-center justify-between gap-4 border-b border-slate-100 bg-white px-6 sm:px-7">
                            {study.logo ? (
                              <Image
                                src={study.logo.src}
                                alt={`${study.institution} logo`}
                                width={study.logo.width}
                                height={study.logo.height}
                                sizes="220px"
                                className="h-12 w-auto max-w-[75%] object-contain object-left"
                              />
                            ) : (
                              <span className="text-lg font-black text-slate-900">{study.institution}</span>
                            )}
                            {!study.approved && (
                              <span className="shrink-0 rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950">
                                Draft
                              </span>
                            )}
                          </div>

                          <div className="flex flex-1 flex-col p-6 sm:p-7">
                            <p className="text-[11px] font-black uppercase tracking-widest text-amber-800">
                              {study.kind === "result" ? "Result" : "Experience"}
                            </p>
                            <p
                              className={`mt-2 tracking-tight text-slate-950 ${
                                study.kind === "result"
                                  ? "text-[1.65rem] font-black leading-[1.15]"
                                  : "text-xl font-bold leading-snug"
                              }`}
                            >
                              {study.headline}
                            </p>
                            {study.supportingLine && (
                              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{study.supportingLine}</p>
                            )}

                            {details.length > 0 && (
                              <dl className="mt-5 space-y-3 text-sm">
                                {details.map(([label, value]) => (
                                  <div key={label}>
                                    <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</dt>
                                    <dd className="mt-0.5 leading-relaxed text-slate-800">{value}</dd>
                                  </div>
                                ))}
                              </dl>
                            )}

                            {/* Footer pinned to the bottom so cards of different lengths still line up */}
                            <div className="mt-auto pt-6">
                              <div className="border-t border-slate-100 pt-4">
                                <h3 className="text-base font-bold text-slate-950">{study.institution}</h3>
                                <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                  {study.category}
                                </p>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Reveal>
                    );
                  })}
                </div>

                <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-600">
                  Institution-level outcomes during our engagements. Admissions also depend on course demand, fees,
                  reputation and counselling.
                </p>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------- */}
          {/* 5. WHAT WE HELP YOUR COLLEGE IMPROVE */}
          {/* ----------------------------------------------------------- */}
          <section className={`${SECTION} bg-white`}>
            <div className={CONTAINER}>
              <SectionHeading eyebrow="What We Help Improve" title={IMPROVE.heading} />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {IMPROVE.cards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <Reveal key={card.title} delay={idx * 0.06} className="h-full">
                      <div className="h-full rounded-2xl border border-slate-200/90 bg-[#faf8f5] p-6 transition hover:border-amber-400 hover:bg-white sm:p-7">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900">
                          <Icon className="h-5 w-5 stroke-[1.8]" aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 text-lg font-bold leading-snug text-slate-950">{card.title}</h3>
                        <p className="mt-2 text-base leading-relaxed text-slate-600">{card.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 6. SERVICES */}
          {/* ----------------------------------------------------------- */}
          <section id="services" className={`${SECTION} bg-[#faf8f5]`}>
            <div className={CONTAINER}>
              <SectionHeading eyebrow="Services" title={SERVICES.heading} intro={SERVICES.intro} />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {SERVICES.items.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <Reveal key={service.title} delay={idx * 0.05} className="h-full">
                      <div className="h-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition hover:border-amber-300 hover:shadow-md sm:p-7">
                        <div className="flex items-center gap-4">
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200/70 bg-amber-50 text-amber-800">
                            <Icon className="h-5 w-5 stroke-[1.8]" aria-hidden="true" />
                          </span>
                          <h3 className="flex-1 text-lg font-bold leading-snug text-slate-950">{service.title}</h3>
                          <span className="self-start pt-1 font-mono text-xs font-bold text-slate-300" aria-hidden="true">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-4 border-t border-slate-100 pt-4 text-base leading-relaxed text-slate-600">
                          {service.desc}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 7. PERFORMANCE REPORTING (labelled metrics, no sample numbers) */}
          {/* ----------------------------------------------------------- */}
          <section className={`${SECTION} bg-white`}>
            <div className={CONTAINER}>
              <SectionHeading eyebrow="Performance Reporting" title={REPORTING.heading} intro={REPORTING.intro} />

              <Reveal className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-6">
                {[
                  { title: "Marketing metrics", items: REPORTING.marketing },
                  { title: "Admissions metrics", items: REPORTING.admissions },
                ].map((group, idx) => (
                  <React.Fragment key={group.title}>
                    {idx === 1 && (
                      <div className="flex items-center justify-center" aria-hidden="true">
                        <span className="flex h-10 w-10 rotate-90 items-center justify-center rounded-full bg-[#f4c542] text-slate-950 md:rotate-0">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    )}
                    <div className="rounded-2xl border border-slate-200/90 bg-[#faf8f5] p-6 sm:p-7">
                      <h3 className="text-xs font-black uppercase tracking-widest text-amber-800">{group.title}</h3>
                      <ul className="mt-4 divide-y divide-slate-200/70">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-center gap-3 py-3 text-base font-semibold text-slate-900">
                            <Check className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </React.Fragment>
                ))}
              </Reveal>

              <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-slate-600">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                {REPORTING.note}
              </p>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* 8. FAQ (answers stay in the HTML; collapsed visually) */}
          {/* ----------------------------------------------------------- */}
          <section id="faqs" className={`${SECTION} bg-[#faf8f5]`}>
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" />

              <div className="space-y-3.5">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  const buttonId = `college-faq-button-${idx}`;
                  const panelId = `college-faq-panel-${idx}`;
                  return (
                    <div key={faq.q} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs">
                      <h3>
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left transition hover:text-amber-800 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-slate-900 sm:p-6"
                        >
                          <span className="text-base font-bold text-slate-900 sm:text-lg">{faq.q}</span>
                          <ChevronDown
                            className={`h-5 w-5 shrink-0 text-amber-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      >
                        <div className="overflow-hidden" inert={!isOpen}>
                          <p className="border-t border-slate-100 px-5 pb-6 pt-4 text-base leading-relaxed text-slate-600 sm:px-6">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>

        {/* ----------------------------------------------------------- */}
        {/* 10. FOOTER (compact) */}
        {/* ----------------------------------------------------------- */}
        <footer className="border-t border-slate-200 bg-white pb-28 pt-10 md:pb-10">
          <div className={`${CONTAINER} flex flex-col gap-6 md:flex-row md:items-center md:justify-between`}>
            <div className="space-y-2">
              <Image src="/logo-dark.svg" alt="Clever Crow Strategies" width={130} height={36} className="h-8 w-auto" />
              <p className="text-sm font-bold text-slate-900">{FOOTER.company}</p>
              <p className="text-sm text-slate-600">{FOOTER.tagline}</p>
              <p className="text-sm text-slate-500">{FOOTER.location}</p>
            </div>
            <div className="space-y-2 md:text-right">
              <nav aria-label="Legal" className="flex items-center gap-3 text-sm font-semibold text-slate-700 md:justify-end">
                <a href="/privacy-policy" className={`rounded hover:text-slate-950 hover:underline ${FOCUS_RING}`}>
                  Privacy Policy
                </a>
                <span className="text-slate-300" aria-hidden="true">·</span>
                <a href="/contact" className={`rounded hover:text-slate-950 hover:underline ${FOCUS_RING}`}>
                  Contact Us
                </a>
              </nav>
              <p className="text-xs text-slate-500">© {new Date().getFullYear()} {FOOTER.company}</p>
            </div>
          </div>
        </footer>

        {/* Mobile sticky CTA: hidden on desktop and while the hero CTAs are visible */}
        <div
          className={`fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
            heroInView ? "translate-y-full" : "translate-y-0"
          }`}
          aria-hidden={heroInView}
          inert={heroInView}
        >
          <div className="grid grid-cols-2 gap-2">
            <a
              href={PHONE_HREF}
              onClick={() => trackCall("mobile_sticky")}
              className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#f4c542] text-sm font-black text-slate-950 ${FOCUS_RING}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCollegeEvent("college_whatsapp_click", "mobile_sticky")}
              className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 text-sm font-bold text-white ${FOCUS_RING}`}
            >
              <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
