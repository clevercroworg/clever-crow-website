"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "We were burning money on ads with no clarity. Clever Crow rebuilt our funnel, fixed tracking, and within weeks our cost per lead dropped while lead quality improved drastically. This finally feels like a scalable growth system, not experiments.",
    name: "Daniel Wong",
    role: "Growth Manager",
    company: "SaaS Startup",
  },
  {
    quote:
      "What stood out was how deeply they understood our business. It wasn’t just ads — it was positioning, messaging, creatives, and reporting. We finally had predictable growth instead of random spikes.",
    name: "Sophia Turner",
    role: "Brand Lead",
    company: "D2C Brand",
  },
  {
    quote:
      "Most agencies chase vanity metrics. Clever Crow focuses on revenue, intent, and long-term ROI. The communication is clear, execution is fast, and decisions are backed by data.",
    name: "Ankit Jain",
    role: "Founder",
    company: "Ecommerce Company",
  },
  {
    quote:
      "They operate like an internal growth team, not a vendor. Weekly insights, honest feedback, and strong ownership. Easily one of the best marketing partnerships we’ve had.",
    name: "Emily Brown",
    role: "CMO",
    company: "Tech Company",
  },
];

const PER_VIEW = 2;

export default function TestimonialsCarousel() {
  const [slide, setSlide] = useState(0);
  const totalSlides = Math.ceil(testimonials.length / PER_VIEW);

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(t);
  }, [totalSlides]);

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/testimonials-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-4xl font-semibold text-white">
            Founders trust us with growth
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Real feedback from teams who wanted predictable, scalable results —
            not vanity metrics.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className="min-w-full grid grid-cols-1 gap-8 md:grid-cols-2"
              >
                {testimonials
                  .slice(i * PER_VIEW, i * PER_VIEW + PER_VIEW)
                  .map((t, idx) => (
                    <TestimonialCard key={idx} {...t} />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== CARD ===== */

function TestimonialCard({
  quote,
  name,
  role,
  company,
}: Testimonial) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      {/* Stars */}
      <div className="mb-4 flex text-[#f4b400]">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-lg leading-relaxed text-gray-200">
        “{quote}”
      </p>

      {/* Meta */}
      <div className="mt-6">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-gray-400">
          {role}
          {company && ` · ${company}`}
        </p>
      </div>
    </div>
  );
}
