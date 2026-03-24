import { IconPhone, IconBrandWhatsapp } from "@tabler/icons-react";

export default function MobileStickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="flex border-t border-black/10 bg-white">

        {/* Call */}
        <a
          href="tel:09986389444"
          className="flex w-1/2 items-center justify-center gap-2 py-4 text-sm font-medium text-black active:bg-black/5"
        >
          <IconPhone size={20} stroke={1.8} />
          Call
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/919986389444"
          target="_blank"
          rel="noopener noreferrer"
          className="
            flex w-1/2 items-center justify-center gap-2
            bg-[#25D366]
            py-4
            text-sm font-medium
            text-white
            active:bg-[#1EBE5D]
          "
        >
          <IconBrandWhatsapp size={20} stroke={1.8} />
          WhatsApp
        </a>

      </div>
    </div>
  );
}
