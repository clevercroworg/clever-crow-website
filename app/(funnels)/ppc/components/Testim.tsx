export default function TestimonialsAutoScroll() {
  const testimonials = [
    {
      quote:
        "The efficiency it brings is unmatched. It's a vital tool that helped us cut costs significantly.",
      name: "Operations Director",
    },
    {
      quote:
        "It has saved us countless hours. Highly recommended for anyone focused on growth.",
      name: "Operations Analyst",
    },
    {
      quote:
        "A robust solution that fits perfectly into our workflow and scales effortlessly.",
      name: "Project Manager",
    },
    {
      quote:
        "Adopting this solution put us years ahead of the competition.",
      name: "Futurist",
    },
    {
      quote:
        "It revolutionized the way we approach decision-making and execution.",
      name: "Business Consultant",
    },
  ];

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            Loved by people all over the universe
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Trusted by growth-focused teams across industries.
          </p>
        </div>

        {/* Auto Scroll Wrapper */}
        <div className="relative">
          <div className="flex gap-6 animate-testimonial-scroll w-max">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} quote={t.quote} name={t.name} />
            ))}
          </div>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes testimonial-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-testimonial-scroll {
          animation: testimonial-scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function TestimonialCard({
  quote,
  name,
}: {
  quote: string;
  name: string;
}) {
  return (
    <div
      className="w-[360px] shrink-0 rounded-3xl bg-white p-6
                 border border-gray-200
                 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]"
    >
      {/* Stars + Google */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1 text-[#f4b400]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        {/* Google Logo */}
        <img
          src="/images/google-logo.svg"
          alt="Google"
          className="h-5 opacity-70"
        />
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed text-gray-600">
        “{quote}”
      </p>

      {/* Role */}
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-gray-400">
        {name}
      </p>
    </div>
  );
}
