"use client";

import { Suspense, useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

// Meta (Facebook) Pixel for the whole site, main pages and every /lp landing page.
// - Base code: loads fbevents.js and tracks the first PageView.
// - PageView on client-side navigation (App Router changes pages without a reload).
// - Contact when a phone (tel:) or WhatsApp link is clicked.
// - Lead after a successful lead-form submission; SubmitApplication for careers/internship.
// Pages that already send their own Contact/Lead events are skipped to avoid double counting.
export const META_PIXEL_ID = "916068127722896";

const SELF_TRACKED_PATHS = ["/lp/hospitality"]; // covers /lp/hospitality and /lp/hospitality-marketing

type Fbq = (...args: unknown[]) => void;

function track(event: string, params?: Record<string, unknown>) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (fbq) fbq("track", event, params);
}

function isSelfTracked() {
  return SELF_TRACKED_PATHS.some((p) => window.location.pathname.startsWith(p));
}

function RouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstLoad = useRef(true);

  useEffect(() => {
    // The base code already tracked the first page view.
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    track("PageView");
  }, [pathname, searchParams]);

  return null;
}

function InteractionTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (isSelfTracked()) return;
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) track("Contact", { method: "phone" });
      else if (/wa\.me|api\.whatsapp\.com|whatsapp:\/\//i.test(href)) track("Contact", { method: "whatsapp" });
    };
    document.addEventListener("click", onClick, true);

    // Observe form submissions to our own lead endpoints and track only successful ones.
    const originalFetch = window.fetch;
    window.fetch = async function (input: RequestInfo | URL, init?: RequestInit) {
      const response = await originalFetch.call(this, input, init);
      try {
        const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
        const method = (init?.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
        if (method === "POST" && response.ok && !isSelfTracked()) {
          if (/\/api\/(careers|internship)\b/.test(url)) track("SubmitApplication");
          else if (/\/api\/(leads|send-lead-email)\b/.test(url)) track("Lead");
        }
      } catch {
        // Tracking must never break a form submission.
      }
      return response;
    };

    return () => {
      document.removeEventListener("click", onClick, true);
      window.fetch = originalFetch;
    };
  }, []);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
      <InteractionTracker />
    </>
  );
}
