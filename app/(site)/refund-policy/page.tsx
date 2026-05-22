export const metadata = {
  title: "Cancellation & Refund Policy | Clever Crow",
};

export default function RefundPolicy() {
  return (
    <div className="min-h-screen selection:bg-yellow-500/30 selection:text-black">
      {/* Header Section — White */}
      <section className="relative pt-44 pb-16 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <a
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-yellow-600 transition-colors inline-block mb-6"
          >
            ← Back to Home
          </a>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
            Cancellation & <span className="text-yellow-500 italic">Refund Policy</span>
          </h1>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content Section — Dark */}
      <main className="bg-[#020617] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <section className="space-y-10 text-[15px] leading-relaxed text-slate-300">
            <p>
              At Clever Crow, we strive to deliver high-quality marketing, design, and web development services. Because our services are tailored and require dedicated resource allocation, we operate under the following cancellation and refund guidelines.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Service Cancellation</h2>
              <p className="text-slate-400">
                Clients may request to cancel services at any time. Cancellation requests must be submitted in writing via email to hello@clevercrow.in. Upon cancellation, the client will be responsible for any fees associated with work already completed or milestones achieved prior to the cancellation date.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Refund Policy</h2>
              <p className="text-slate-400">
                Due to the custom nature of web design, development, branding, and marketing services, payments made for onboarding, setup, project milestones, or retainer months are generally non-refundable. 
              </p>
              <p className="text-slate-400">
                If a project is cancelled before completion, refunds for unearned portions of payments may be evaluated on a case-by-case basis at the sole discretion of Clever Crow, based on the volume of hours and resources consumed.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Third-Party Fees</h2>
              <p className="text-slate-400">
                Fees paid for third-party tools, themes, plugins, hosting, domain registration, or advertising spend (e.g., Google Ads or Meta Ads budgets) are entirely non-refundable as they are paid directly to external vendors.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Contact Us</h2>
              <p className="text-slate-400">
                If you have any questions or require clarification regarding our Cancellation & Refund Policy, please reach out to us at{" "}
                <a
                  href="mailto:hello@clevercrow.in"
                  className="text-yellow-500 hover:text-yellow-400 underline font-semibold transition-colors"
                >
                  hello@clevercrow.in
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
