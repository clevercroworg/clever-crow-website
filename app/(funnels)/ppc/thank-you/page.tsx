"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold mb-4">
          Thank You for Your Enquiry!
        </h1>

        <p className="text-gray-600 mb-6">
          Our team will contact you shortly.
        </p>

        {source && (
          <p className="text-xs text-gray-400 mb-4">
            Source: {source}
          </p>
        )}

        <a
          href="tel:+919986389444"
          className="inline-block bg-black text-white px-6 py-3 rounded font-semibold"
        >
          Call Us Now
        </a>
      </div>
    </section>
  );
}

export default function ThankYou() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
