export default function TestimonialsAutoScroll() {
  const testimonials = [
    "The efficiency it brings is unmatched. It's a vital tool that helped us cut costs significantly.",
    "It has saved us countless hours. Highly recommended for anyone focused on growth.",
    "A robust solution that fits perfectly into our workflow and scales effortlessly.",
    "Adopting this solution put us years ahead of the competition.",
    "It revolutionized the way we approach decision-making and execution.",
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

        {/* Auto-scroll row */}
        <div className="relative">
          <div className="flex w-max gap-6 animate-testimonial-scroll">
            {[...testimonials, ...testimonials].map((quote, i) => (
              <TestimonialCard key={i} quote={quote} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Card ---------------- */

function TestimonialCard({ quote }: { quote: string }) {
  return (
    <div className="w-[360px] shrink-0 rounded-3xl bg-white p-6
                    border border-gray-200
                    shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)]">
      {/* Stars + Google */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1 text-[#f4b400]">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <img
          src="/images/google-logo.svg"
          alt="Google"
          className="h-5 opacity-70"
        />
      </div>

      <p className="text-sm leading-relaxed text-gray-600">
        “{quote}”
      </p>
    </div>
  );
}
