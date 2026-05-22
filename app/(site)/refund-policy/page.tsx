export const metadata = {
  title: "Cancellation & Refund Policy | Clever Crow",
};

export default function RefundPolicy() {
  return (
    <>
      {/* ═══════════ CINEMATIC HERO ═══════════ */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Background Styling */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 10% 20%, rgba(82, 168, 255, 0.08), transparent 25%),
                radial-gradient(circle at 90% 80%, rgba(122, 63, 194, 0.05), transparent 25%),
                linear-gradient(180deg, #0f172a 0%, #111827 44%, #020617 100%)
              `
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <a
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-yellow-500 transition-colors inline-block mb-8"
          >
            ← Back to Home
          </a>

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Cancellation & <span className="text-yellow-500 italic">Refund Policy</span>
          </h1>

          <p className="mt-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">
            Last updated: January 2026
          </p>
        </div>

        {/* Soft bottom fade to white section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            At Clever Crow, we strive to deliver high-quality marketing, design, and web development services. Because our services are tailored and require dedicated resource allocation, we operate under the following cancellation and refund guidelines.
          </p>

          <h2 className="text-2xl font-semibold">Service Cancellation</h2>
          <p>
            Clients may request to cancel services at any time. Cancellation requests must be submitted in writing via email to hello@clevercrow.in. Upon cancellation, the client will be responsible for any fees associated with work already completed or milestones achieved prior to the cancellation date.
          </p>

          <h2 className="text-2xl font-semibold">Refund Policy</h2>
          <p>
            Due to the custom nature of web design, development, branding, and marketing services, payments made for onboarding, setup, project milestones, or retainer months are generally non-refundable. 
          </p>
          <p>
            If a project is cancelled before completion, refunds for unearned portions of payments may be evaluated on a case-by-case basis at the sole discretion of Clever Crow, based on the volume of hours and resources consumed.
          </p>

          <h2 className="text-2xl font-semibold">Third-Party Fees</h2>
          <p>
            Fees paid for third-party tools, themes, plugins, hosting, domain registration, or advertising spend (e.g., Google Ads or Meta Ads budgets) are entirely non-refundable as they are paid directly to external vendors.
          </p>

          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have any questions or require clarification regarding our Cancellation & Refund Policy, please reach out to us at{" "}
            <a
              href="mailto:hello@clevercrow.in"
              className="text-yellow-600 underline font-semibold"
            >
              hello@clevercrow.in
            </a>
          </p>
        </section>
      </main>
    </>
  );
}
