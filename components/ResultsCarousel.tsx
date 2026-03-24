"use client";

import Image from "next/image";

type ResultMetric = {
  value: string;
  label: string;
};

type ResultCard = {
  client: string;
  industry: string;
  headline: string;
  image: string; // path from /public
  metrics: ResultMetric[];
};

type ResultsCarouselProps = {
  title?: string;
  subtitle?: string;
  items: ResultCard[];
};

export default function ResultsCarousel({
  title = "Case Study Highlights",
  subtitle = "Measurable results from real businesses",
  items,
}: ResultsCarouselProps) {
  return (
    <section className="bg-white py-24 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-4xl">
          <h2 className="text-4xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max gap-8 px-6 animate-marquee">
          {[...items, ...items].map((item, index) => (
            <div
              key={index}
              className="w-[360px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={item.image}
                  alt={`${item.client} Google Ads case study`}
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {item.client}
                </p>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {item.headline}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {item.industry}
                </p>

                {/* Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {item.metrics.map((metric, i) => (
                    <div key={i}>
                      <p className="text-xl font-extrabold text-purple-600">
                        {metric.value}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
