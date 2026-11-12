"use client";

import { useEffect } from "react";
import { ADS_CALL_CONVERSION, GA4_ID, gtag } from "@/lib/tracking";

// One listener for the whole site: every phone link click is sent to GA4 as phone_call_click and every
// WhatsApp link click as whatsapp_click. Links marked data-ads-call also report the Google Ads call
// conversion (most CTAs already report it in their own onClick, so it is opt-in here to avoid doubles).
export default function ContactClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      const params = { send_to: GA4_ID, link_url: href, link_text: (a.textContent || "").trim().slice(0, 100) };
      if (href.startsWith("tel:")) {
        gtag("event", "phone_call_click", params);
        if (a.hasAttribute("data-ads-call")) gtag("event", "conversion", { send_to: ADS_CALL_CONVERSION });
      } else if (/(^https?:\/\/)?(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//.test(href)) {
        gtag("event", "whatsapp_click", params);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
