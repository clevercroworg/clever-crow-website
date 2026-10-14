// Conversion events from the developer brief. Payloads carry only a placement label:
// never names, phone numbers, emails or free-text answers.
type CollegeEvent =
  | "college_plan_cta_click"
  | "college_whatsapp_click"
  | "college_form_start"
  | "college_lead_submit";

type Gtag = (...args: unknown[]) => void;

export function sendGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: Gtag }).gtag?.(...args);
}

export function trackCollegeEvent(event: CollegeEvent, placement?: string) {
  sendGtag("event", event, placement ? { placement } : {});
}
