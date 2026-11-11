"use client";

import { useRouter } from "next/navigation";

/** A table row that opens a link when clicked anywhere (except on inner links/buttons). */
export default function ClickableRow({ href, children }: { href: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <tr
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a,button")) return;
        if (e.metaKey || e.ctrlKey) window.open(href, "_blank");
        else router.push(href);
      }}
      className="cursor-pointer align-top hover:bg-amber-50/40"
    >
      {children}
    </tr>
  );
}
