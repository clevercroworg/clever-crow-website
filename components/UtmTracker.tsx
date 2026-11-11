"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Tracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      // 1. Capture and save UTM parameters
      const utmParams = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
        "gclid", // Google Ads click ID
        "fbclid", // Meta (Facebook/Instagram) click ID
      ];
      let hasNewUtms = false;
      const newUtmData: Record<string, string> = {};

      utmParams.forEach((param) => {
        const val = searchParams.get(param);
        if (val) {
          newUtmData[param] = val;
          hasNewUtms = true;
        }
      });

      if (hasNewUtms) {
        localStorage.setItem("cc_utm_data", JSON.stringify(newUtmData));
      }

      // First page of this visit (the page they landed on), kept for the browser tab session.
      if (!sessionStorage.getItem("cc_landing_url") || hasNewUtms) {
        sessionStorage.setItem("cc_landing_url", window.location.href);
      }

      // 2. Capture and save external referrer
      const referrer = document.referrer;
      if (referrer) {
        try {
          const refUrl = new URL(referrer);
          // Only save if it's not from our own domain
          if (
            refUrl.hostname !== window.location.hostname &&
            !window.location.hostname.includes(refUrl.hostname)
          ) {
            localStorage.setItem("cc_external_referrer", referrer);
          }
        } catch {
          // If referrer is not a valid URL structure (e.g. app link), still check substring
          if (!referrer.includes(window.location.hostname)) {
            localStorage.setItem("cc_external_referrer", referrer);
          }
        }
      }
    } catch (e) {
      console.error("UTM Tracker initialization error:", e);
    }
  }, [searchParams]);

  useEffect(() => {
    try {
      // Helper function to read persisted tracking data
      const getTrackingData = () => {
        const data: Record<string, string> = {};
        try {
          const savedUtms = localStorage.getItem("cc_utm_data");
          if (savedUtms) {
            Object.assign(data, JSON.parse(savedUtms));
          }
          const savedReferrer = localStorage.getItem("cc_external_referrer");
          if (savedReferrer) {
            data["referrer"] = savedReferrer;
          }
          const landingUrl = sessionStorage.getItem("cc_landing_url");
          if (landingUrl) {
            data["landing_url"] = landingUrl;
          }
        } catch (e) {
          console.error("Error reading tracking data:", e);
        }
        data["landed_url"] = window.location.href;
        return data;
      };

      // 3. Intercept fetch globally to enrich POST requests to our form endpoints
      // (/api/leads, /api/careers, /api/internship) with source/attribution data.
      const originalFetch = window.fetch;
      window.fetch = function (input, init) {
        const isFormPost =
          typeof input === "string" &&
          /\/api\/(leads|careers|internship)(\?|$)/.test(input) &&
          (init?.method || "").toUpperCase() === "POST" &&
          !!init?.body;

        // Multipart forms (careers): add the fields that aren't already there.
        if (isFormPost && init!.body instanceof FormData) {
          try {
            const form = init!.body as FormData;
            const trackingData = getTrackingData();
            for (const [key, value] of Object.entries(trackingData)) {
              if (!form.has(key) && value) form.append(key, value);
            }
          } catch (e) {
            console.error("Error enriching form submission payload:", e);
          }
        } else if (isFormPost && typeof init!.body === "string") {
          try {
            const body = JSON.parse(init!.body as string);
            const trackingData = getTrackingData();
            const enrichedBody = {
              ...trackingData,
              ...body, // original UI payload fields override if present
              landed_url: body.landed_url || trackingData.landed_url || window.location.href,
              referrer: body.referrer || trackingData.referrer || "Direct / None",
            };
            init!.body = JSON.stringify(enrichedBody);
          } catch (e) {
            console.error("Error enriching lead submission payload:", e);
          }
        }
        return originalFetch.apply(this, arguments as any);
      };
    } catch (e) {
      console.error("Fetch interceptor setup error:", e);
    }
  }, []);

  return null;
}

export default function UtmTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
