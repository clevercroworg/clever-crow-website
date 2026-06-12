"use client";

import dynamic from "next/dynamic";

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
  return <Chatbot />;
}
