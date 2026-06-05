import "./globals.css";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import ClientChatbot from "@/components/ClientChatbot";
import Script from "next/script";

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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17335403082"
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Base Config
            gtag('config', 'AW-17335403082');
            
            // Phone forwarding number replacement configuration
            gtag('config', 'AW-17335403082/uHSsCKf5i_QaEMqElcpA', {
              'phone_conversion_number': '09986389444'
            });
          `}
        </Script>
        {children}
        <ClientChatbot />
      </body>
    </html>
  );
}
