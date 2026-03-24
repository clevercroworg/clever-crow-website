type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

/* ===== CONFIG ===== */
const ROWS = 4;
const CARD_HEIGHT = 120;
const GAP = 24; // gap-6
/* ================== */

const testimonials: Testimonial[] = [
  { quote: "Leads became predictable and scalable.", name: "Daniel Wong", role: "Growth Manager" },
  { quote: "They think like owners.", name: "David Wilson", role: "Angel Investor" },
  { quote: "Clear communication and execution.", name: "Sophia Turner", role: "Brand Manager" },
  { quote: "Perfect for serious growth.", name: "Ankit Jain", role: "Ecom Founder" },
  { quote: "Lower CPL with higher intent leads.", name: "Kunal Shah", role: "Startup Advisor" },
  { quote: "Strong reporting and transparency.", name: "Emily Brown", role: "CMO" },
  { quote: "They understand funnels, not just ads.", name: "Olivia Martin", role: "Product Marketer" },
  { quote: "Great ROI and process.", name: "Vikram Singh", role: "Managing Director" },
  { quote: "Campaigns scaled without chaos.", name: "Michael Chen", role: "Ops Director" },
  { quote: "High-quality leads consistently.", name: "Pooja Nair", role: "Sales Lead" },
  { quote: "Results-focused approach.", name: "Chris Adams", role: "Growth Consultant" },
  { quote: "Scales well with budget.", name: "Nisha Kapoor", role: "Marketing Strategist" },
  { quote: "Execution is fast and structured.", name: "Rahul Iyer", role: "Business Head" },
  { quote: "Reliable growth partner.", name: "Laura Scott", role: "VP Marketing" },
  { quote: "Finally a team that delivers.", name: "Arjun Malhotra", role: "Founder" },
  { quote: "Strong fundamentals and clarity.", name: "Jason Lee", role: "Performance Lead" },
];

export default function TestimonialsVertical() {
  const columnHeight = ROWS * CARD_HEIGHT + (ROWS - 1) * GAP;

  const col1 = testimonials.slice(0, 6);
  const col2 = testimonials.slice(6, 12);
  const col3 = testimonials.slice(12, 18);
  const col4 = testimonials.slice(18);

  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
            Trusted by fast-growing teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            20+ founders, marketers, and operators sharing real results.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Column items={col1} height={columnHeight} />
          <Column items={col2} height={columnHeight} />
          <Column items={col3} height={columnHeight} />
          <Column items={col4} height={columnHeight} />
        </div>
      </div>
    </section>
  );
}

/* ===== COLUMN ===== */

function Column({
  items,
  height,
}: {
  items: Testimonial[];
  height: number;
}) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height }}
    >
      <div className="flex flex-col gap-6 animate-scroll-up">
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </div>
  );
}

/* ===== CARD ===== */

function TestimonialCard({ quote, name, role }: Testimonial) {
  return (
    <div
      className="relative rounded-2xl bg-white border border-gray-200 p-4
                 shadow-[0_12px_24px_-16px_rgba(0,0,0,0.15)]
                 flex flex-col justify-between"
      style={{ height: CARD_HEIGHT }}
    >
      {/* Stars + Google */}
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-[#f4b400] text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <img
          src="/images/google-logo.svg"
          alt="Google"
          className="h-4 opacity-70"
        />
      </div>

      {/* Quote */}
      <p className="mt-2 text-sm leading-snug text-gray-600 line-clamp-2">
        “{quote}”
      </p>

      {/* Meta */}
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}
