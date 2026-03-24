"use client";

import { useEffect, useState } from "react";

const services = [
  "AI + SEO & GEO",
  "Performance Advertising",
  "Social Media Management",
  "Website Design & Growth",
];

export default function RotatingText() {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setMounted(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % services.length);
        setMounted(true);
      }, 50);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`block font-bold text-gray-900 ${
        mounted ? "animate-smoke-strong" : "opacity-0"
      }`}
    >
      {services[index]}
    </span>
  );
}
