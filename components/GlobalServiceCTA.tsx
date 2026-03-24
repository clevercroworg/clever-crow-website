"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GlobalServiceCTA() {
  return (
    <section className="relative overflow-hidden bg-black py-20 md:py-24">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-check-grid opacity-40" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Speak With a Marketing Expert
          </h2>

          {/* Subtext */}
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            We’ll understand your business and guide you on the best next steps
            based on your goals.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="tel:+919986389444"
              className="inline-flex min-w-[220px] items-center justify-center rounded-xl bg-yellow-400 px-6 py-3 text-base font-medium text-black transition hover:bg-yellow-300"
            >
              Call Now
            </Link>

            <Link
              href="https://wa.me/919986389444"
              target="_blank"
              className="inline-flex min-w-[220px] items-center justify-center rounded-xl border border-white/30 bg-transparent px-6 py-3 text-base font-medium text-white transition hover:border-white"
            >
              WhatsApp Us
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-6 text-sm text-gray-400">
            No obligation. Honest advice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
