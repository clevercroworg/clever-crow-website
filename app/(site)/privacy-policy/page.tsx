export const metadata = {
  title: "Privacy Policy | Clever Crow",
};

export default function PrivacyPolicy() {
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
            Privacy <span className="text-yellow-500 italic">Policy</span>
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
              Clever Crow ("we", "our", "us") respects your privacy and is committed
              to protecting the personal information you share with us.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>Name, email, phone number, company name</li>
                <li>Information submitted via forms or inquiries</li>
                <li>IP address, browser type, pages visited</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">How We Use Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-slate-400">
                <li>Respond to inquiries and provide services</li>
                <li>Improve our website and marketing</li>
                <li>Send service-related communication</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Cookies</h2>
              <p className="text-slate-400">
                We may use cookies and similar technologies to analyze traffic and
                improve performance.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Data Security</h2>
              <p className="text-slate-400">
                We take reasonable measures to protect your data, but no method of
                transmission is fully secure.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-tight">Contact</h2>
              <p className="text-slate-400">
                Email us at{" "}
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
