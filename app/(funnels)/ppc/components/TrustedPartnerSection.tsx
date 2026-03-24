import { IconCheck } from "@tabler/icons-react";

export default function TrustedPartnerSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — LOGO CARDS */}
          <div className="flex flex-col gap-8">

            {/* Google Partner */}
            <div className="rounded-2xl bg-slate-50 p-8 flex flex-col items-center text-center">
              <img
                src="/images/ppc/google-partner.png"
                alt="Google Partner Premier 2025"
                className="h-24 w-auto object-contain mb-4"
              />
              <p className="text-lg font-semibold text-gray-900">
                Google Partner
              </p>
            </div>

            {/* Meta Certified */}
            <div className="rounded-2xl bg-slate-50 p-8 flex flex-col items-center text-center">
              <img
                src="/images/ppc/meta-certified.png"
                alt="Meta Certified"
                className="h-20 w-auto object-contain mb-4"
              />
              <p className="text-lg font-semibold text-gray-900">
                Meta Certified
              </p>
            </div>

          </div>

          {/* RIGHT — CONTENT */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900">
              Your Trusted Performance Marketing Partner
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              With over 15 years of experience helping brands grow online,
              Clevercrow specializes in creating marketing systems that drive
              ROI, not just traffic. Our team of certified experts ensures every
              campaign is built for scale, accountability, and measurable success.
            </p>

            <ul className="mt-10 space-y-4">
              {[
                "15+ Years of Marketing Experience",
                "Google & Meta Certified Professionals",
                "100+ Businesses Grown Across India",
                "Transparent Reporting & Real ROI Tracking",
              ].map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <IconCheck
                    size={22}
                    stroke={2.5}
                    className="text-green-600 mt-0.5"
                  />
                  <span className="text-base text-gray-800">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
