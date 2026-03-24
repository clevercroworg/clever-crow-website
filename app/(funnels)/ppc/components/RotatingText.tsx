"use client";

import { useEffect, useState } from "react";

type RotatingTextProps = {
  texts: string[];
  interval?: number;
};

export default function RotatingText({
  texts,
  interval = 2200,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      {texts.map((text, i) => (
        <span
          key={i}
          className={`absolute left-0 top-0 z-10
            text-[#f4b400]
            transition-all duration-500 ease-out
            ${
              i === index
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            }
          `}
          style={{
            textShadow: "0 0 20px rgba(244,180,0,0.35)",
          }}
        >
          {text}
        </span>
      ))}
    </span>
  );
}
