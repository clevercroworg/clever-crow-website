"use client";

import { IconPhone, IconBrandWhatsapp } from "@tabler/icons-react";

export default function HeaderPPC() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur border-b shadow-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        
        {/* LOGO */}
        <img
          src="/logo.png"
          alt="Clever Crow"
          className="h-8"
        />

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* PHONE (visible on desktop + mobile) */}
          <a
            href="tel:09986389444"
            className="
              flex items-center gap-2
              rounded-lg
              bg-yellow-400
              px-3 py-1.5
              text-sm font-semibold
              text-gray-900
              shadow
              hover:bg-yellow-500
              transition
            "
          >
            <IconPhone size={16} />
            <span>09986389444</span>
          </a>

          {/* WHATSAPP (icon only) */}
          <a
            href="https://wa.me/919986389444"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex h-9 w-9 items-center justify-center
              rounded-lg
              bg-[#25D366]
              text-white
              shadow
              hover:bg-[#1EBE5D]
              transition
            "
            aria-label="Chat on WhatsApp"
          >
            <IconBrandWhatsapp size={18} />
          </a>

        </div>
      </div>
    </header>
  );
}
