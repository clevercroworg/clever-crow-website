"use client";

import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

type Service = {
  title: string;
  text: string;
  icon: any;
  href: string;
};

export default function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {services.map((service) => (
        <ServiceCard
          key={service.title}
          title={service.title}
          text={service.text}
          icon={service.icon}
          href={service.href}
        />
      ))}
    </motion.div>
  );
}
