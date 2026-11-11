import Script from "next/script";

export const metadata = {
  robots: "noindex, nofollow",
};

// Google Analytics 4 tag for all /lp landing pages
const GA4_ID = "G-T0KB069PZ1";

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-lp-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}');
        `}
      </Script>
      {children}
    </>
  );
}
