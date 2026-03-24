"use client";

import { useEffect, useState } from "react";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";

const messages = [
  "Now offering AI SEO & Automation services",
  "Book a free consultation for your business",
  "Helping Indian businesses grow with AI & digital marketing",
];

export default function TopBar() {
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const isHidden = localStorage.getItem("cc_topbar_hidden");
    if (isHidden) setHidden(true);
  }, []);

  useEffect(() => {
    if (hidden) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200">
      <div className="relative container mx-auto px-4 py-2 text-sm text-gray-700">
        
        {/* CENTERED CONTENT */}
        <div className="flex items-center justify-center gap-2">
          <SparklesIcon className="h-4 w-4 text-gray-900" />
          <span>{messages[index]}</span>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={() => {
            localStorage.setItem("cc_topbar_hidden", "true");
            setHidden(true);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900"
          aria-label="Close"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
