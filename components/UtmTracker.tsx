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
        } catch (e) {
          console.error("Error reading tracking data:", e);
        }
        data["landed_url"] = window.location.href;
        return data;
      };

      // 3. Intercept fetch globally to enrich all POST requests to /api/leads
      const originalFetch = window.fetch;
      window.fetch = function (input, init) {
        if (
          typeof input === "string" &&
          input.includes("/api/leads") &&
          init?.method === "POST" &&
          init.body
        ) {
          try {
            const body = JSON.parse(init.body as string);
            const trackingData = getTrackingData();
            const enrichedBody = {
              ...trackingData,
              ...body, // original UI payload fields override if present
              landed_url: body.landed_url || trackingData.landed_url || window.location.href,
              referrer: body.referrer || trackingData.referrer || "Direct / None",
            };
            init.body = JSON.stringify(enrichedBody);
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
