export const metadata = {
  title: "Privacy Policy | Clever Crow",
};

export default function PrivacyPolicy() {
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
            Privacy <span className="text-yellow-500 italic">Policy</span>
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
            Clever Crow ("we", "our", "us") respects your privacy and is committed
            to protecting the personal information you share with us.
          </p>

          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, email, phone number, company name</li>
            <li>Information submitted via forms or inquiries</li>
            <li>IP address, browser type, pages visited</li>
          </ul>

          <h2 className="text-2xl font-semibold">How We Use Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to inquiries and provide services</li>
            <li>Improve our website and marketing</li>
            <li>Send service-related communication</li>
          </ul>

          <h2 className="text-2xl font-semibold">Cookies</h2>
          <p>
            We may use cookies and similar technologies to analyze traffic and
            improve performance.
          </p>

          <h2 className="text-2xl font-semibold">Data Security</h2>
          <p>
            We take reasonable measures to protect your data, but no method of
            transmission is fully secure.
          </p>

          <h2 className="text-2xl font-semibold">Contact</h2>
          <p>
            Email us at{" "}
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
