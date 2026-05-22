export const metadata = {
  title: "Terms and Conditions | Clever Crow",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-yellow-500/30 selection:text-black">
      {/* Header Section */}
      <section className="relative pt-44 pb-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <a
            href="/"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-yellow-500 transition-colors inline-block mb-6"
          >
            ← Back to Home
          </a>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Terms and <span className="text-yellow-500 italic">Conditions</span>
          </h1>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <section className="space-y-10 text-[15px] leading-relaxed">
          <p>
            By accessing or using this website, you agree to be bound by these
            Terms and Conditions.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Use of Website</h2>
            <p className="text-slate-400">
              You agree to use this website only for lawful purposes and not to
              misuse any content or services provided.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Services</h2>
            <p className="text-slate-400">
              Clever Crow provides digital marketing, branding, and related
              services. All pricing, timelines, and deliverables are defined in
              individual proposals or agreements.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Intellectual Property</h2>
            <p className="text-slate-400">
              All content, designs, graphics, and materials on this website are
              the property of Clever Crow and may not be copied or reused without
              written permission.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Payments & Refunds</h2>
            <p className="text-slate-400">
              Payments are non-refundable unless explicitly stated otherwise in
              writing. Delays caused by lack of client input may affect delivery
              timelines.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Limitation of Liability</h2>
            <p className="text-slate-400">
              Clever Crow shall not be liable for any indirect, incidental, or
              consequential damages, including loss of data or revenue.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Third-Party Services</h2>
            <p className="text-slate-400">
              We may use third-party platforms and tools. Clever Crow is not
              responsible for outages, policy changes, or actions taken by these
              platforms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Governing Law</h2>
            <p className="text-slate-400">
              These Terms and Conditions are governed by and interpreted in
              accordance with the laws of India.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Contact</h2>
            <p className="text-slate-400">
              For any questions, contact us at{" "}
              <a
                href="mailto:hello@clevercrow.in"
                className="text-yellow-500 hover:text-yellow-400 underline font-semibold transition-colors"
              >
                hello@clevercrow.in
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
