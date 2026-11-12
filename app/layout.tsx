import "./globals.css";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import ClientChatbot from "@/components/ClientChatbot";
import UtmTracker from "@/components/UtmTracker";
import MetaPixel from "@/components/MetaPixel";
import Script from "next/script";
import ContactClickTracking from "@/components/analytics/ContactClickTracking";
import { ADS_CALL_FORWARDING, ADS_ID, GA4_ID } from "@/lib/tracking";

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
        {/* Google tag (gtag.js): loaded once for every page; configures GA4 and Google Ads. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA4_ID}');
            gtag('config', '${ADS_ID}');
            // Google Ads call tracking: swaps the displayed number for a forwarding number
            gtag('config', '${ADS_CALL_FORWARDING}', { 'phone_conversion_number': '09986389444' });
          `}
        </Script>
        <ContactClickTracking />
        <MetaPixel />
        <UtmTracker />
        {children}
        <ClientChatbot />
      </body>
    </html>
  );
}
