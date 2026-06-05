import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
        `}
      </Script>
      <Header />
      {children}
      <Footer />
    </>
  );
}
