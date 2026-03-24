"use client";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Clever Crow helped us move from random ad experiments to a structured growth engine. CPL dropped and lead quality improved within weeks.",
    name: "Daniel Wong",
    role: "Growth Manager",
  },
  {
    quote:
      "Execution speed, transparency, and ownership are rare. This felt like working with an internal growth team.",
    name: "Sophia Turner",
    role: "Brand Lead",
  },
  {
    quote:
      "Clear positioning, better funnels, and consistent results. No fluff, just solid execution.",
    name: "Ankit Jain",
    role: "Founder",
  },
  {
    quote:
      "They focus on outcomes, not vanity metrics. Reporting is clean and decisions are data-backed.",
    name: "Emily Brown",
    role: "CMO",
  },
  {
    quote:
      "Reliable, structured, and honest. Exactly what we needed to scale confidently.",
    name: "Rahul Iyer",
    role: "Business Head",
  },
  {
    quote:
      "Everything from ads to landing pages finally works together as one system.",
    name: "Nisha Kapoor",
    role: "Marketing Strategist",
  },
];

export default function TestimonialsWall() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-10">

         <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Trusted by teams that care about results
          </h2>
          <p className="mt-4 text-lg text-slate-600">
           Perspectives from long-term client partnerships.
          </p>
        </div>

         
            


      <div className="mx-auto max-w-7xl px-6 space-y-10">
        {/* Row 1 */}
        <Marquee direction="left" />

        {/* Row 2 */}
        <Marquee direction="right" />
      </div>
    </section>
  );
}

/* ===== MARQUEE ===== */

function Marquee({ direction }: { direction: "left" | "right" }) {
  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent" />

      <div
        className={`flex gap-6 ${
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        } hover:[animation-play-state:paused]`}
      >
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="w-[340px] shrink-0">
            <TestimonialCard {...t} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== CARD ===== */
function TestimonialCard({ quote, name, role }: Testimonial) {
  return (
    <div
      className="relative rounded-2xl border border-slate-200 bg-white p-6
                 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.25)]"
    >
      {/* Top row: stars + Google */}
      <div className="mb-4 flex items-center justify-between">
        {/* Stars */}
        <div className="flex text-[#f4b400] text-sm gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {/* Google icon */}
        <img
          src="/images/google-logo.svg"
          alt="Google"
          className="h-4 opacity-70"
        />
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-slate-800">
        “{quote}”
      </p>

      {/* Meta */}
      <div className="mt-5">
        <p className="text-sm font-semibold text-slate-900">
          {name}
        </p>
        <p className="text-xs text-slate-600">
          {role}
        </p>
      </div>
    </div>
  );
}
