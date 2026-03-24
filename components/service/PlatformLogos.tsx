export default function PlatformLogos() {
  const logos = [
    { name: "Google Ads", src: "/logos/google-ads.svg" },
    { name: "GA4", src: "/logos/ga4.svg" },
    { name: "Tag Manager", src: "/logos/gtm.svg" },
    { name: "Search Console", src: "/logos/search-console.svg" },
  ];

  return (
    <section className="relative bg-white/70 py-10 overflow-hidden">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-6 text-center text-sm font-medium text-gray-500">
          Platforms we work with
        </p>

        <div className="relative overflow-hidden">
          <div className="flex w-max animate-marquee gap-16">
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 grayscale"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
