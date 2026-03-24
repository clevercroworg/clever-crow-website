"use client";

import { motion } from "framer-motion";

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "1",
    title: "Diagnose the Opportunity",
    description: "We deep-dive into your business, market, and numbers to identify where growth is actually coming from — and where it’s leaking.",
  },
  {
    number: "2",
    title: "Architect the Growth System",
    description: "We design a tailored growth system combining paid media, content, websites, and AI automation — aligned to your goals.",
  },
  {
    number: "3",
    title: "Execute with Precision",
    description: "Our team launches, manages, and refines campaigns and systems with clear accountability and performance tracking.",
  },
  {
    number: "4",
    title: "Optimise, Scale, Repeat",
    description: "We analyse results, remove friction, and scale what works — turning early wins into sustainable growth.",
  },
];


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function OurProcess() {
  return (
    <section className="relative w-full bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            A Clear Process. Measurable Growth.
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-gray-600">
            No guesswork. No jargon. Just a structured approach focused on results.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative grid gap-12 md:grid-cols-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={item}
              className="group relative text-center"
            >
              {/* Number */}
              <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-lg font-bold text-yellow-600 transition-all duration-300 group-hover:scale-105 group-hover:bg-yellow-200">
                {step.number}

                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full ring-2 ring-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
