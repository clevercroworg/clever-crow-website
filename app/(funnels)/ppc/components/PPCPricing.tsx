"use client"

import { useCustomQuoteModal } from "@/components/hooks/useCustomQuoteModal"

type PricingItem = {
  title: string
  image?: string
  price: string
  period: string
  features: string[]
}

type PPCPricingProps = {
  heading?: string
  subheading?: string
  items: PricingItem[]
}

export default function PPCPricing({
  heading = "Smart Plans Built for Scalable Growth",
  subheading = "Clear pricing designed to deliver real business results, not vanity metrics.",
  items,
}: PPCPricingProps) {
  const { openCustomQuote, CustomQuoteModal } = useCustomQuoteModal()

  return (
    <section className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {subheading}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <div className="grid md:grid-cols-3">
            {items.map((item, index) => {
              const showDivider = index !== items.length - 1

              return (
                <div
                  key={item.title}
                  className={`group px-8 py-10 transition-colors duration-300 hover:bg-[#f4b400]
                    ${
                      showDivider
                        ? "border-b md:border-b-0 md:border-r border-gray-200"
                        : ""
                    }
                  `}
                >
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-black">
                    {item.title}
                  </h3>

                  {/* Label */}
                  <p className="mt-4 text-xs uppercase tracking-wide text-gray-500 group-hover:text-black/70">
                    Starting from
                  </p>

                  {/* Price */}
                  <div className="mt-1">
                    <span className="text-3xl font-semibold text-gray-900 group-hover:text-black">
                      {item.price}
                    </span>
                    <span className="ml-1 text-sm text-gray-500 group-hover:text-black/70">
                      /{item.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px w-full bg-gray-200 group-hover:bg-black/20" />

                  {/* Features */}
                  <ul className="space-y-3 text-sm text-gray-700 group-hover:text-black">
                    {item.features.map(feature => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-gray-600">
            Need a custom plan or bundled pricing?
          </p>

          <button
            onClick={openCustomQuote}
            className="rounded-lg bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-gray-900"
          >
            Get a Custom Quote
          </button>
        </div>
      </div>

      {/* Modal (shared hook) */}
      <CustomQuoteModal />
    </section>
  )
}
