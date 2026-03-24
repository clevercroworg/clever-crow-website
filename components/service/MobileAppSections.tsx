"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Palette,
  Server,
  Rocket,
  ShoppingCart,
  CalendarCheck,
  GraduationCap,
  HeartPulse,
  Store,
  Building2,
  Target,
  Sparkles,
  TrendingUp,
  ListChecks,
  Headphones,
  Search,
  LayoutDashboard,
  Paintbrush,
  Code2,
  Send,
  CheckCircle2,
} from "lucide-react";

/* ── animation helper ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

/* ── data ── */

const services = [
  {
    icon: Smartphone,
    number: "01",
    title: "Custom Mobile App Development",
    description:
      "We build custom mobile applications based on your business model, goals, and user needs.",
    bullets: [
      "Android app development",
      "iOS app development",
      "Cross-platform app development with React Native",
    ],
    accent: "bg-blue-500",
    accentLight: "bg-blue-50 text-blue-600",
  },
  {
    icon: Palette,
    number: "02",
    title: "UI/UX Design for Mobile Apps",
    description:
      "We design intuitive app experiences that are easy to use and visually modern.",
    bullets: [
      "User flow planning",
      "Wireframes and screen planning",
      "Clean, conversion-focused interface design",
    ],
    accent: "bg-purple-500",
    accentLight: "bg-purple-50 text-purple-600",
  },
  {
    icon: Server,
    number: "03",
    title: "Backend & Admin Dashboard",
    description:
      "A strong app needs a strong system behind it. We develop the backend structure needed to manage your application smoothly.",
    bullets: [
      "API integrations",
      "Admin dashboard",
      "User management",
      "Secure and scalable setup",
    ],
    accent: "bg-emerald-500",
    accentLight: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Rocket,
    number: "04",
    title: "MVP Development",
    description:
      "Need to launch fast? We help startups and new businesses build MVPs that focus on the right features first.",
    bullets: [
      "Launch faster",
      "Reduce initial development cost",
      "Validate your idea with less risk",
    ],
    accent: "bg-orange-500",
    accentLight: "bg-orange-50 text-orange-600",
  },
];

const appTypes = [
  { icon: ShoppingCart, label: "E-commerce mobile apps" },
  { icon: CalendarCheck, label: "Booking and appointment apps" },
  { icon: GraduationCap, label: "Education and learning apps" },
  { icon: HeartPulse, label: "Healthcare and service apps" },
  { icon: Store, label: "Marketplace apps" },
  { icon: Building2, label: "Internal business apps" },
];

const whyChoose = [
  {
    icon: Target,
    title: "Business-Focused Approach",
    text: "We do not just build apps. We create digital products that support growth, improve user experience, and solve real business problems.",
  },
  {
    icon: Sparkles,
    title: "Modern Design",
    text: "We build clean, premium interfaces that help users trust your brand and engage better with your app.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Development",
    text: "Your app is planned with future growth in mind, making it easier to expand features later.",
  },
  {
    icon: ListChecks,
    title: "Clear Process",
    text: "From planning to launch, we keep the process simple, transparent, and structured.",
  },
  {
    icon: Headphones,
    title: "Post-Launch Support",
    text: "We can continue with updates, maintenance, and improvements after your app goes live.",
  },
];

const processSteps = [
  {
    icon: Search,
    step: "01",
    title: "Discovery & Strategy",
    text: "We understand your idea, business goals, target audience, and feature requirements.",
  },
  {
    icon: LayoutDashboard,
    step: "02",
    title: "Planning & Wireframes",
    text: "We map the app structure, user journey, and key screens before moving into design and development.",
  },
  {
    icon: Paintbrush,
    step: "03",
    title: "UI/UX Design",
    text: "We create a modern interface that is user-friendly, brand-aligned, and built for clarity.",
  },
  {
    icon: Code2,
    step: "04",
    title: "Development & Testing",
    text: "We build the app, connect the backend, and test everything for performance, usability, and stability.",
  },
  {
    icon: Send,
    step: "05",
    title: "Launch & Support",
    text: "We help launch your app and continue supporting future updates and feature improvements.",
  },
];

const techStack = [
  { name: "React Native", logo: "/logos/tech/react-native.svg" },
  { name: "Node.js", logo: "/logos/tech/nodejs.svg" },
  { name: "Firebase", logo: "/logos/tech/firebase.svg" },
  { name: "API Integrations", logo: "/logos/tech/api.svg" },
  { name: "Admin Dashboard Systems", logo: "/logos/tech/admin-dashboard.svg" },
  { name: "AI Integration", logo: "/logos/tech/ai-integration.svg" },
];

/* ────────────────────── COMPONENT ────────────────────── */

export default function MobileAppSections() {
  return (
    <>
      {/* ═══════════ SECTION 2: PROBLEM + SOLUTION ═══════════ */}
      <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-check-grid" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="glass-card">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block mb-5 rounded-full border border-gray-300/60 bg-white px-4 py-1.5 text-xs font-semibold text-gray-600">
                Business-Driven Apps
              </span>
              <h2 className="text-gray-900">
                A Great App Needs More Than Just Development
              </h2>
              <p className="mt-6 text-[16px] sm:text-lg leading-relaxed text-gray-600">
                Many businesses want a mobile app, but end up with poor design,
                slow performance, confusing user journeys, or a product that does
                not support long-term growth.
              </p>
              <p className="mt-4 text-[16px] sm:text-lg leading-relaxed text-gray-700 font-medium">
                At CleverCrow, we build mobile apps with a clear business
                purpose. We focus on performance, usability, and scalability so
                your app not only looks good, but also works smoothly for your
                users and supports your business goals.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {["Performance Focused", "Clear Business Purpose", "Smooth Usability", "Long-term Growth"].map(
                  (pill, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm"
                    >
                      {pill}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ SECTION 3: WHAT WE OFFER ═══════════ */}
      <section className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[140px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[140px]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 border border-indigo-100 mb-5">
              Our Services
            </span>
            <h2 className="text-gray-950">
              Mobile App Development Services
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((svc, i) => (
              <motion.div
                key={svc.number}
                {...fadeUp(i * 0.08)}
                className="group relative rounded-3xl bg-white border border-gray-100 p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${svc.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* icon + number */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${svc.accentLight} transition-transform duration-300 group-hover:scale-105`}>
                    <svc.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black text-gray-300 tracking-widest">
                    {svc.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                  {svc.title}
                </h3>
                <p className="text-[15px] text-gray-600 leading-relaxed mb-5">
                  {svc.description}
                </p>
                <ul className="space-y-2.5">
                  {svc.bullets.map((b, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-[14px] text-gray-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 4: APP TYPES WE BUILD ═══════════ */}
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(250,204,21,0.04),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-yellow-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-700 border border-yellow-200 mb-5">
              What We Build
            </span>
            <h2 className="text-gray-950">
              Apps We Can Build for Your Business
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {appTypes.map((app, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                className="group flex flex-col items-center text-center gap-4 rounded-2xl bg-gray-50/60 border border-gray-100 p-6 sm:p-8 transition-all duration-300 hover:bg-white hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-50 text-yellow-600 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-white group-hover:scale-105">
                  <app.icon className="h-6 w-6" />
                </div>
                <span className="text-[14px] sm:text-[15px] font-semibold text-gray-800 leading-snug">
                  {app.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 5: WHY CHOOSE CLEVERCROW ═══════════ */}
      <section className="relative py-24 sm:py-32 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-yellow-900/8 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 border border-white/10 mb-5">
              Why Us
            </span>
            <h2 className="text-white">
              Why Businesses Choose CleverCrow
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.07)}
                className={`group relative rounded-3xl bg-white/[0.04] border border-white/[0.08] p-8 sm:p-10 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.15] ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-400 mb-5 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-gray-900 group-hover:scale-105">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[15px] text-gray-400 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 6: PROCESS ═══════════ */}
      <section id="process" className="relative py-24 sm:py-32 bg-[#fafafa] overflow-hidden">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(147,51,234,0.03),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-purple-50 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 border border-purple-100 mb-5">
              Our Process
            </span>
            <h2 className="text-gray-950">
              Our Mobile App Development Process
            </h2>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-300 via-purple-200 to-transparent" />

            <div className="space-y-8 sm:space-y-10">
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.08)}
                  className="relative flex gap-6 sm:gap-8 items-start"
                >
                  {/* step icon */}
                  <div className="relative z-10 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white border-2 border-purple-200 shadow-md shrink-0 transition-all duration-300 hover:border-purple-400 hover:shadow-lg">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>

                  <div className="flex-1 pb-2">
                    <span className="text-[10px] font-black text-purple-500 tracking-widest uppercase mb-2 block">
                      Step {step.step}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-gray-600 leading-relaxed max-w-xl">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SECTION 7: TECHNOLOGY WE USE ═══════════ */}
      <section className="relative py-14 sm:py-16 bg-gray-900 overflow-hidden">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-gradient-to-l from-gray-900 to-transparent z-10" />

        <div className="relative z-[5] mx-auto max-w-7xl px-6">
          <motion.p
            {...fadeUp()}
            className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-8 sm:mb-10"
          >
            Technology We Use
          </motion.p>

          <div className="relative overflow-hidden">
            <div className="flex w-max animate-marquee gap-8 sm:gap-12">
              {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl bg-white/[0.05] border border-white/[0.08] px-5 py-3 shrink-0"
                >
                  <img src={tech.logo} alt={tech.name} className="h-6 w-6 shrink-0" />
                  <span className="text-sm font-semibold text-gray-300 whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative bg-neutral-950 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/8 rounded-full blur-[200px]" />
        </div>
        <div className="bg-square-checks absolute inset-0 opacity-30" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div {...fadeUp()}>
            <span className="inline-flex items-center rounded-full bg-white/5 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 border border-white/10 mb-6">
              Get Started
            </span>
          </motion.div>

          <motion.h2
            {...fadeUp(0.1)}
            className="text-white"
          >
            Let&apos;s Build Your Mobile App
          </motion.h2>

          <motion.p
            {...fadeUp(0.15)}
            className="mx-auto mt-6 max-w-2xl text-lg text-neutral-400 leading-relaxed"
          >
            Tell us about your app idea and we will help you plan the right
            solution for your business.
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4"
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-yellow-400 px-8 py-4 text-[15px] font-black text-gray-900 shadow-xl shadow-yellow-400/15 transition-all duration-300 hover:bg-yellow-300"
            >
              Get Free Consultation
            </a>
            <a
              href="https://wa.me/919986389444"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-neutral-700 bg-white/5 px-8 py-4 text-[15px] font-bold text-white transition-all duration-300 hover:bg-white/10"
            >
              Talk to Our Team
            </a>
          </motion.div>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-6 text-sm text-neutral-500"
          >
            No obligation · Free consultation · Clear guidance
          </motion.p>
        </div>
      </section>
    </>
  );
}
