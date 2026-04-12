import "./globals.css";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import ClientChatbot from "@/components/ClientChatbot";

export const metadata: Metadata = {
  title: "Clever Crow | Result Demanding Marketing Agency",
  description: "Bespoke digital strategy, app development, and AI-driven SEO.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
        <ClientChatbot />
      </body>
    </html>
  );
}
