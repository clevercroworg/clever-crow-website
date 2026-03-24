export const metadata = {
  title: "Terms and Conditions | Clever Crow",
};

export default function TermsAndConditions() {
  return (
    <>
      {/* Header Section */}
      <section className="min-h-[400px] bg-gray-50 flex items-center">
        <div className="max-w-4xl mx-auto px-6 pt-40 text-center">
          <a
            href="/"
            className="text-sm text-gray-500 underline inline-block mb-4"
          >
            ← Back to Home
          </a>

          <h1 className="text-4xl md:text-5xl font-bold">
            Terms and Conditions
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            By accessing or using this website, you agree to be bound by these
            Terms and Conditions.
          </p>

          <h2 className="text-2xl font-semibold">Use of Website</h2>
          <p>
            You agree to use this website only for lawful purposes and not to
            misuse any content or services provided.
          </p>

          <h2 className="text-2xl font-semibold">Services</h2>
          <p>
            Clever Crow provides digital marketing, branding, and related
            services. All pricing, timelines, and deliverables are defined in
            individual proposals or agreements.
          </p>

          <h2 className="text-2xl font-semibold">
            Intellectual Property
          </h2>
          <p>
            All content, designs, graphics, and materials on this website are
            the property of Clever Crow and may not be copied or reused without
            written permission.
          </p>

          <h2 className="text-2xl font-semibold">Payments & Refunds</h2>
          <p>
            Payments are non-refundable unless explicitly stated otherwise in
            writing. Delays caused by lack of client input may affect delivery
            timelines.
          </p>

          <h2 className="text-2xl font-semibold">
            Limitation of Liability
          </h2>
          <p>
            Clever Crow shall not be liable for any indirect, incidental, or
            consequential damages, including loss of data or revenue.
          </p>

          <h2 className="text-2xl font-semibold">Third-Party Services</h2>
          <p>
            We may use third-party platforms and tools. Clever Crow is not
            responsible for outages, policy changes, or actions taken by these
            platforms.
          </p>

          <h2 className="text-2xl font-semibold">Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and interpreted in
            accordance with the laws of India.
          </p>

          <h2 className="text-2xl font-semibold">Contact</h2>
          <p>
            For any questions, contact us at{" "}
            <a
              href="mailto:hello@clevercrow.in"
              className="text-yellow-600 underline"
            >
              hello@clevercrow.in
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
