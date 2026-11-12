// Google tag IDs and small helpers shared by the site's forms and buttons.
// The tag itself loads once, for every page, from app/layout.tsx.

export const GA4_ID = "G-T0KB069PZ1";
export const ADS_ID = "AW-17335403082";
export const ADS_LEAD_CONVERSION = `${ADS_ID}/YwV4CJ-q_e8YEPq9me49`; // form submitted
export const ADS_CALL_CONVERSION = `${ADS_ID}/ul0ECKr5i_QaEMqElcpA`; // phone link clicked
export const ADS_CALL_FORWARDING = `${ADS_ID}/uHSsCKf5i_QaEMqElcpA`; // number swap for call tracking

type Gtag = (...args: unknown[]) => void;

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof g === "function") g(...args);
}

/**
 * Lead form submitted: Google Ads lead conversion + GA4 generate_lead. Resolves once Google has
 * received the conversion (or after 1.2s at most), so it is safe to redirect with a full page load
 * right after awaiting it.
 */
export function trackLead(formName: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || typeof (window as unknown as { gtag?: Gtag }).gtag !== "function") {
      resolve();
      return;
    }
    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };
    gtag("event", "generate_lead", { send_to: GA4_ID, form_name: formName });
    gtag("event", "conversion", { send_to: ADS_LEAD_CONVERSION, event_callback: finish, event_timeout: 1200 });
    setTimeout(finish, 1300);
  });
}
