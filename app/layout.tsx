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
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17335403082"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17335403082');

            // Phone conversion tracking configuration
            gtag('config', 'AW-17335403082/uHSsCKf5i_QaEMqElcpA', {
              'phone_conversion_number': '09986389444'
            });

            // Global Click-to-Call conversion tracking helper
            window.gtag_report_conversion = function(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-17335403082/ul0ECKr5i_QaEMqElcpA',
                    'value': 200.0,
                    'currency': 'INR',
                    'event_callback': callback
                });
              } else {
                callback();
              }
              return false;
            };
          `}
        </Script>
        {children}
        <ClientChatbot />
      </body>
    </html>
  );
}
