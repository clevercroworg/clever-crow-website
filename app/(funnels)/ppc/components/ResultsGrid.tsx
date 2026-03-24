export default function ResultsSaaS() {
  const stats = [
    {
      value: "218%",
      label: "Increase in eCommerce orders",
      brand: "Baatu",
      logo: "/images/results/baatu.png",
    },
    {
      value: "343.2%",
      label: "Conversion rate improvement",
      brand: "Marketing Unzipped",
      logo: "/images/results/wedding-unzipped.png",
    },
    {
      value: "147%",
      label: "Top 5 keyword rankings achieved",
      brand: "Forest Edge",
      logo: "/images/results/forest-edge.png",
    },
    {
      value: "120%",
      label: "Growth in lead generation",
      brand: "Enterprise Client",
      logo: "/images/results/government.png",
    },
    {
      value: "85%",
      label: "Increase in organic traffic",
      brand: "Moloney & Co.",
      logo: "/images/results/moloney.png",
    },
    {
      value: "200%",
      label: "Boost in social engagement",
      brand: "Malpe Boating",
      logo: "/images/results/malpe-boating.png",
    },
  ]

  return (
    <section className="relative py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-900">
            Proven growth, real numbers
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Measurable results delivered through strategy, execution, and data.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 shadow-sm
                         transition-all duration-300 hover:-translate-y-1
                         hover:shadow-lg"
            >
              {/* Accent bar */}
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r
                               from-indigo-500 via-purple-500 to-pink-500
                               opacity-0 group-hover:opacity-100 transition" />

              {/* Metric */}
              <div className="text-5xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </div>

              {/* Label */}
              <p className="mt-3 text-slate-600 leading-relaxed">
                {item.label}
              </p>

              {/* Divider */}
              <div className="mt-6 h-px bg-slate-100" />

              {/* Brand */}
              <div className="mt-4 flex items-center gap-3">
                <img
  src={item.logo}
  alt={item.brand}
  className="h-6 w-6 object-contain grayscale group-hover:grayscale-0 transition"
/>

                <span className="text-sm font-medium text-black">
                  {item.brand}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
