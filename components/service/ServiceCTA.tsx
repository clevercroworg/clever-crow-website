"use client";

import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export default function ServiceCTA() {
  return (
    <section className="bg-neutral-950 py-24 bg-square-checks text-white">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-3xl font-semibold">
          Speak With a Marketing Expert

        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
          We’ll review your business goals, ad budget, and current setup before
          recommending the right approach.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {/* PHONE */}
          <a
            href={`tel:${CONTACT.phone}`}
            className="
              inline-flex items-center gap-2
              rounded-lg bg-yellow-400 px-6 py-3
              font-medium text-neutral-900
              transition hover:bg-yellow-300
            "
          >
            <Phone className="h-4 w-4" />
            {CONTACT.phoneDisplay}
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-2
              rounded-lg border border-neutral-600 px-6 py-3
              font-medium text-white
              transition hover:bg-neutral-800
            "
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>

        <p className="mt-4 text-sm text-neutral-400">
          No obligation. Clear guidance.
        </p>
      </div>
    </section>
  );
}
