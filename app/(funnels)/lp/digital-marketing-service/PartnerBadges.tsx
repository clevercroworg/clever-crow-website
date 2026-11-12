import React from "react";
import { SiMeta } from "react-icons/si";

// "Partner of" Google Partner + Meta Business Partner, shown in the navbar.
// Used only on pages that set `partnerBadges: true` in page-content.ts.
//   variant="inline": sits beside the logo (tablet and desktop)
//   variant="strip":  thin row under the logo on phones, where there is no room beside it
// If you have Google's official Partner badge embed code, it can replace the Google badge below.

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function PartnerBadges({ variant }: { variant: "inline" | "strip" }) {
  if (variant === "strip") {
    return (
      <div className="border-t border-slate-100 bg-slate-50/70 md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-2.5 px-4 py-1.5 text-[10px] font-semibold text-slate-600">
          <span className="text-[9px] uppercase tracking-[0.16em] text-slate-400 max-[359px]:hidden">Partner of</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <GoogleG className="h-3.5 w-3.5 shrink-0" />
            Google Partner
          </span>
          <span className="h-3 w-px bg-slate-300" aria-hidden="true" />
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <SiMeta className="h-4 w-4 shrink-0" style={{ color: "#0866FF" }} aria-hidden="true" />
            Meta Business Partner
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">
      <span className="h-8 w-px bg-slate-200" aria-hidden="true" />
      <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Partner of</p>
      <ul className="flex items-center gap-3 lg:gap-4">
        <li className="flex h-10 flex-col items-center justify-center gap-0.5 rounded-[5px] border border-slate-300 bg-white px-2">
          <GoogleG className="h-[18px] w-[18px] shrink-0" />
          <span className="whitespace-nowrap text-[8px] font-medium leading-none text-slate-500">Google Partner</span>
        </li>
        <li className="flex flex-col justify-center leading-none">
          <span className="flex items-center gap-1">
            <SiMeta className="h-5 w-5 shrink-0" style={{ color: "#0866FF" }} aria-hidden="true" />
            <span className="text-[17px] font-bold tracking-tight text-slate-900">Meta</span>
          </span>
          <span className="mt-1 whitespace-nowrap text-[9px] font-medium text-slate-600">Business Partner</span>
        </li>
      </ul>
    </div>
  );
}
