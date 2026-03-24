"use client";

import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/contact";

export default function InlineContactCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black bg-square-checks" />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Talk to a Google Ads Specialist
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
            We’ll review your business goals, ad budget, and current setup before
            recommending the right approach.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {/* PHONE */}
            <motion.a
              whileHover={{ y: -2 }}
              href={`tel:${CONTACT.phone}`}
              className="
                inline-flex items-center gap-2
                rounded-xl bg-yellow-400 px-8 py-4
                text-base font-semibold text-neutral-900
                shadow-[0_8px_30px_rgba(250,204,21,0.35)]
                transition hover:bg-yellow-300
              "
            >
              <Phone className="h-5 w-5" />
              {CONTACT.phoneDisplay}
            </motion.a>

            {/* WHATSAPP */}
            <motion.a
              whileHover={{ y: -2 }}
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                rounded-xl border border-neutral-600 px-8 py-4
                text-base font-medium text-white
                transition hover:bg-neutral-800
              "
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </motion.a>
          </div>

          <p className="mt-6 text-sm text-neutral-400">
            No obligation. Clear guidance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
