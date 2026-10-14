// Conversion events from the developer brief. Payloads carry only a placement label:
// never names, phone numbers or free-text answers.
type CollegeEvent = "college_call_click" | "college_whatsapp_click";

type Gtag = (...args: unknown[]) => void;

export function sendGtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: Gtag }).gtag?.(...args);
}

export function trackCollegeEvent(event: CollegeEvent, placement?: string) {
  sendGtag("event", event, placement ? { placement } : {});
}
