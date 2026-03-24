"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type HowItHelpsProps = {
  badge: string;
  title: string;
  description: string;
  pills: string[];
  imageSrc: string;
  imageAlt: string;
};

export default function HowItHelps({
  badge,
  title,
  description,
  pills,
  imageSrc,
  imageAlt,
}: HowItHelpsProps) {
  return (
    <section className="relative bg-white py-20 md:py-24 overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 bg-check-grid" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="glass-card"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            {/* LEFT: IMAGE */}
            <div className="flex justify-center">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={420}
                height={320}
                className="rounded-xl object-cover"
                priority
              />
            </div>

            {/* RIGHT: CONTENT */}
            <div>
              <span className="inline-block mb-4 rounded-full border border-gray-300/60 bg-white px-3 py-1 text-xs font-medium text-gray-600">
                {badge}
              </span>

              <h2 className="text-gray-900">
                {title}
              </h2>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-700">
                {description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {pills.map((pill, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-gray-300/60 bg-white px-3 py-1.5 text-xs text-gray-700"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
