"use client";

import React from "react";
import {
  ArrowRight,
  BarChart3,
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

// "What's Included in Your Lead Generation Campaign" — replaces the services/plans section on the
// lead-generation LP. Copy supplied by the client (Oct 2026).
const INCLUDED: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "A Plan Built Around Your Business",
    desc: "We understand your services, ideal customers, target locations and budget to recommend the right campaign approach.",
    icon: Target,
  },
  {
    title: "Campaign Setup & Management",
    desc: "We set up and manage Google Ads, Facebook or Instagram campaigns based on where your potential customers are most likely to respond.",
    icon: Megaphone,
  },
  {
    title: "Ad Copy & Creatives",
    desc: "Clear messaging and relevant visuals that explain your offer and encourage potential customers to enquire.",
    icon: MessageSquareText,
  },
  {
    title: "Landing Pages That Encourage Enquiries",
    desc: "Focused pages with clear service information, strong calls to action and simple forms, WhatsApp and click-to-call options.",
    icon: LayoutTemplate,
  },
  {
    title: "Lead Tracking & Organisation",
    desc: "Track where enquiries come from and organise them in an agreed lead sheet or CRM so your team can follow up.",
    icon: ClipboardList,
  },
  {
    title: "Follow-Up Support & Automation",
    desc: "Set up enquiry acknowledgements, lead alerts and agreed WhatsApp or CRM follow-up workflows to support your sales team.",
    icon: Workflow,
  },
  {
    title: "Ongoing Campaign Improvements",
    desc: "Review search terms, audiences, ads and landing pages. Use performance data and your feedback on lead quality to improve campaigns.",
    icon: RefreshCw,
  },
  {
    title: "Clear Monthly Reporting",
    desc: "Understand your ad spend, tracked enquiries, cost per lead and the actions we recommend next.",
    icon: BarChart3,
  },
];

export default function LeadGenIncluded({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section id="pricing" className="overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What's included"
          title="What's Included in Your Lead Generation Campaign"
          subtitle="From finding the right audience to following up with enquiries, we build and manage the steps that help turn interest into business opportunities."
        />

        <Stagger className="mt-10 grid gap-5 [perspective:1200px] sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" stagger={0.08}>
          {INCLUDED.map(({ title, desc, icon: Icon }, idx) => (
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
        <Reveal y={20} className="mx-auto mt-10 max-w-4xl">
          <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white/90 p-5 sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <Info className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#071330]">Scope note</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Your proposal will specify the platforms, campaign and creative quantities, landing pages and automation included.
                Advertising spend and third-party software charges are separate from our service fee.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Closing CTA */}
        <Reveal y={24} scale={0.98} className="mt-8">
          <div className="flex flex-col items-center gap-5 rounded-3xl border border-amber-200 bg-[#FFF9E3] p-8 text-center sm:p-10">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#071330] sm:text-3xl">
              <RiseText text="Let's Plan Your Lead Generation Campaign" />
            </h3>
            <p className="max-w-xl text-base text-slate-600">Tell us about your business, target locations and growth goals.</p>
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
