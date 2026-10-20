"use client";

import React from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Clapperboard,
  FileText,
  KeyRound,
  MessageCircleQuestion,
  MessagesSquare,
  Palette,
  PenLine,
  SearchCheck,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRoundCog,
  ClipboardList,
  Info,
  LayoutTemplate,
  Megaphone,
  MessageSquareText,
  Phone,
  RefreshCw,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Reveal, RiseText, Stagger, StaggerItem } from "./motion";
import { noOrphan } from "./text";

// "What's Included" deliverables section, used in place of the service plans on campaign LPs.
export type IncludedItem = { title: string; desc: string; icon: LucideIcon };

export type IncludedContent = {
  heading: string;
  intro: string;
  items: IncludedItem[];
  scopeNote?: string;
  cta?: { heading: string; text: string };
};

const LEAD_GEN_ITEMS: IncludedItem[] = [
  { title: "A Plan Built Around Your Business", desc: "We understand your services, ideal customers, target locations and budget to recommend the right campaign approach.", icon: Target },
  { title: "Campaign Setup & Management", desc: "We set up and manage Google Ads, Facebook or Instagram campaigns based on where your potential customers are most likely to respond.", icon: Megaphone },
  { title: "Ad Copy & Creatives", desc: "Clear messaging and relevant visuals that explain your offer and encourage potential customers to enquire.", icon: MessageSquareText },
  { title: "Landing Pages That Encourage Enquiries", desc: "Focused pages with clear service information, strong calls to action and simple forms, WhatsApp and click-to-call options.", icon: LayoutTemplate },
  { title: "Lead Tracking & Organisation", desc: "Track where enquiries come from and organise them in an agreed lead sheet or CRM so your team can follow up.", icon: ClipboardList },
  { title: "Follow-Up Support & Automation", desc: "Set up enquiry acknowledgements, lead alerts and agreed WhatsApp or CRM follow-up workflows to support your sales team.", icon: Workflow },
  { title: "Ongoing Campaign Improvements", desc: "Review search terms, audiences, ads and landing pages. Use performance data and your feedback on lead quality to improve campaigns.", icon: RefreshCw },
  { title: "Clear Monthly Reporting", desc: "Understand your ad spend, tracked enquiries, cost per lead and the actions we recommend next.", icon: BarChart3 },
];

export const LEAD_GEN_INCLUDED: IncludedContent = {
  heading: "What's Included in Your Lead Generation Campaign",
  intro:
    "From finding the right audience to following up with enquiries, we build and manage the steps that help turn interest into business opportunities.",
  items: LEAD_GEN_ITEMS,
  scopeNote:
    "Your proposal will specify the platforms, campaign and creative quantities, landing pages and automation included. Advertising spend and third-party software charges are separate from our service fee.",
  cta: { heading: "Let's Plan Your Lead Generation Campaign", text: "Tell us about your business, target locations and growth goals." },
};

export const SEO_INCLUDED: IncludedContent = {
  heading: "What's Included in Your SEO, AEO & GEO Strategy",
  intro:
    "From Google searches to AI-generated answers, we make your website easier to discover, understand and reference.",
  items: [
    { title: "Website & Search Visibility Audit", desc: "Review your website, search performance and competitors to identify technical issues, content gaps and growth opportunities.", icon: SearchCheck },
    { title: "Keyword & Customer Question Research", desc: "Identify the services, locations and questions your customers search for, then map them to relevant website pages.", icon: KeyRound },
    { title: "On-Page SEO", desc: "Improve page titles, descriptions, headings, internal links and content to make each page relevant to customer searches.", icon: FileText },
    { title: "Technical SEO", desc: "Address crawling, indexing, sitemaps, redirects and mobile usability issues. Review website speed and prioritise improvements.", icon: Settings2 },
    { title: "Service Pages & Helpful Content", desc: "Create or improve service pages, location pages and articles that answer customer questions and support business enquiries.", icon: LayoutTemplate },
    { title: "Answer Engine Optimisation — AEO", desc: "Develop clear answers, useful FAQs and well-structured content to help answer engines understand and surface relevant information.", icon: MessageCircleQuestion },
    { title: "Generative Engine Optimisation — GEO", desc: "Strengthen original insights, supporting evidence and consistent business information to help generative AI platforms understand and potentially reference your business.", icon: Sparkles },
    { title: "Structured Data & Business Credibility", desc: "Implement relevant schema markup and improve business details, author information and trust signals that support your content.", icon: ShieldCheck },
    { title: "Performance Tracking & Monthly Reporting", desc: "Track organic traffic, keyword visibility and enquiries. Review available AI referral data and selected AI-search checks, with clear recommendations for improvement.", icon: BarChart3 },
  ],
};

export const SOCIAL_INCLUDED: IncludedContent = {
  heading: "What's Included in Your Social Media Management",
  intro:
    "From planning content to publishing and reporting, we manage your social presence so you can focus on running your business.",
  items: [
    { title: "Social Media Audit & Strategy", desc: "Review your profiles, audience and competitors to develop a content approach aligned with your brand and business goals.", icon: Target },
    { title: "Profile Setup & Optimisation", desc: "Improve your bio, business details, profile visuals, highlights and contact options to help visitors understand your business and connect.", icon: UserRoundCog },
    { title: "Monthly Content Planning", desc: "Prepare a content calendar covering your services, offers, customer stories and relevant occasions, with a clear schedule for approval.", icon: CalendarDays },
    { title: "Branded Post & Carousel Design", desc: "Create consistent, professional visuals that showcase your business, explain your services and give customers reasons to choose you.", icon: Palette },
    { title: "Reels & Short-Form Video", desc: "Plan video concepts, write scripts and edit supplied footage into engaging reels that highlight your products, services and expertise.", icon: Clapperboard },
    { title: "Captions & Content Writing", desc: "Write clear, relevant captions with suitable keywords, hashtags and prompts that encourage meaningful interaction.", icon: PenLine },
    { title: "Scheduling & Publishing", desc: "Publish approved content across the agreed platforms, maintaining a consistent presence and adapting formats for each channel.", icon: Send },
    { title: "Comments & Message Management", desc: "Monitor comments and messages during agreed hours, respond to routine questions using approved information and pass enquiries to your team.", icon: MessagesSquare },
    { title: "Performance Tracking & Monthly Reporting", desc: "Review reach, engagement, profile visits and available enquiry data. Identify effective content and refine the next month's plan.", icon: BarChart3 },
  ],
};

export default function IncludedSection({ content, onOpenModal }: { content: IncludedContent; onOpenModal: () => void }) {
  return (
    <section id="pricing" className="overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What's included"
          title={content.heading}
          subtitle={content.intro}
        />

        <Stagger className={`mt-10 grid gap-5 [perspective:1200px] sm:mt-12 sm:grid-cols-2 lg:gap-6 ${content.items.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`} stagger={0.08}>
          {content.items.map(({ title, desc, icon: Icon }, idx) => (
            <StaggerItem key={title} variant="tilt" className="h-full">
              <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#071330] text-[#FFCE1B] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-300" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-[#071330]">{noOrphan(title)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Scope note */}
        {content.scopeNote && (
        <Reveal y={20} className="mx-auto mt-10 max-w-4xl">
          <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white/90 p-5 sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <Info className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#071330]">Scope note</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {content.scopeNote}
              </p>
            </div>
          </div>
        </Reveal>
        )}

        {/* Closing CTA */}
        <Reveal y={24} scale={0.98} className="mt-8">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-amber-200 bg-[#FFF9E3] p-8 text-center sm:p-10">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#071330] sm:text-3xl">
              <RiseText text={content.cta?.heading ?? "Let's Build Your Growth Plan"} />
            </h3>
            <p className="max-w-xl text-base text-slate-600">{content.cta?.text ?? "Tell us about your business, goals and budget, and we'll recommend the right approach."}</p>
            <button
              type="button"
              onClick={onOpenModal}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#FFCE1B] px-7 text-sm font-extrabold text-[#071330] shadow-sm transition hover:brightness-105 active:scale-95 cursor-pointer"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Request a Call Back
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
