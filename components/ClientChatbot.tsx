"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Chatbot = dynamic(
  () =>
    import("./Chatbot").catch((err) => {
      console.warn("Dynamic import for Chatbot failed, reloading page to fetch latest chunks:", err);
      if (typeof window !== "undefined") {
        window.location.reload();
      }
      throw err;
    }),
  { ssr: false }
);

export default function ClientChatbot() {
  const pathname = usePathname();
  // No chatbot inside the admin dashboard.
  if (pathname?.startsWith("/team/leads-portal")) return null;
  return <Chatbot />;
}
