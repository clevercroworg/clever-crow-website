type PricingTier = {
  title: string;
  price: string;
  description: string;
};

type PricingSectionProps = {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  note?: string;
};

export default function PricingSection({
  title = "Pricing (Indicative)",
  subtitle = "Our pricing depends on ad spend, account complexity, and business goals. Below is a typical range to help you quickly assess fit.",
  tiers,
  note = "Ad spend is billed separately by Google. Final pricing is confirmed after understanding your business and goals.",
}: PricingSectionProps) {
  return (
   <section className="bg-ambient-light py-28">

      <div className="mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="mb-14 max-w-3xl">
          <h2 className="text-3xl font-semibold text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-gray-600">
            {subtitle}
          </p>
        </div>

        {/* Pricing tiers */}
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-gray-50 px-6 py-8"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {tier.title}
              </h3>

              <div className="mt-3 text-2xl font-semibold text-gray-900">
                {tier.price}
              </div>

              <p className="mt-4 text-sm text-gray-600">
                {tier.description}
              </p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 max-w-3xl text-sm text-gray-500">
          {note}
        </p>
      </div>
    </section>
  );
}
