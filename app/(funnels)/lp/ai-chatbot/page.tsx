import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import ChatbotLandingClient from "./ChatbotLandingClient";

// AI chatbot landing page. All copy and prices live in chatbot-data.ts.
export const metadata: Metadata = {
  title: "AI Chatbot for Website & WhatsApp | Setup from ₹9,999 | Clever Crow",
  description:
    "AI chatbot that answers customers, captures leads and books appointments 24×7 on your website and WhatsApp, in English, Hindi, Kannada and more. Live in about 7 days.",
  robots: { index: false, follow: false },
};

// Optional illustrations: drop a file with one of these names into public/lp/chatbot and it replaces the drawn
// version on the next deploy. Checked at build time.
function optionalImage(name: string) {
  for (const ext of ["webp", "jpg", "png"]) {
    const file = `/lp/chatbot/${name}.${ext}`;
    if (existsSync(path.join(process.cwd(), "public", file))) return file;
  }
  return undefined;
}

export default function ChatbotLandingPage() {
  return <ChatbotLandingClient images={{ night: optionalImage("night-shift"), whatsapp: optionalImage("whatsapp-phone") }} />;
}
