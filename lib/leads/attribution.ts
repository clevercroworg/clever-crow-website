// Works out where a visitor came from, and what device they used, from the data a
// form submission carries (UTM tags, click IDs, referrer) and the request headers.

export const CHANNELS = [
  "Google Ads",
  "Meta Ads",
  "LinkedIn Ads",
  "Other Paid",
  "Organic Search",
  "Social",
  "Email",
  "Referral",
  "Direct",
] as const;

export type Channel = (typeof CHANNELS)[number];

const PAID_MEDIUM = /(cpc|ppc|paid|cpm|cpv|display|^ads?$|sponsored|retarget)/i;

function hostOf(url?: string | null) {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

export function classifyChannel(input: {
  utm_source?: string | null;
  utm_medium?: string | null;
  gclid?: string | null;
  fbclid?: string | null;
  referrer?: string | null;
}): Channel {
  const src = (input.utm_source || "").toLowerCase();
  const medium = (input.utm_medium || "").toLowerCase();
  const paid = PAID_MEDIUM.test(medium);
  const ref = hostOf(input.referrer);

  if (input.gclid || (/google|adwords|gads/.test(src) && (paid || !medium))) return "Google Ads";
  if (/facebook|^fb$|instagram|^ig$|meta/.test(src) && (paid || !medium)) return "Meta Ads";
  if (/linkedin/.test(src) && (paid || !medium)) return "LinkedIn Ads";
  if (paid) return "Other Paid";
  if (medium === "email" || /newsletter|mailchimp|email/.test(src)) return "Email";
  if (/facebook|^fb$|instagram|^ig$|linkedin|twitter|^x$|youtube|whatsapp|meta/.test(src)) return "Social";
  if (src && /google|bing|yahoo|duckduckgo/.test(src) && medium === "organic") return "Organic Search";

  if (ref) {
    if (/(^|\.)(google|bing|yahoo|duckduckgo|yandex|baidu|ecosia)\./.test(ref)) return "Organic Search";
    if (/(facebook|instagram|linkedin|lnkd\.in|t\.co|twitter|x\.com|youtube|whatsapp|pinterest|reddit|quora)/.test(ref) || input.fbclid)
      return "Social";
    return "Referral";
  }
  if (input.fbclid) return "Social";
  if (src) return "Referral";
  return "Direct";
}

export function parseUserAgent(ua: string) {
  const s = ua || "";
  const device = /ipad|tablet|(android(?!.*mobile))/i.test(s)
    ? "Tablet"
    : /mobi|iphone|ipod|android.*mobile|windows phone/i.test(s)
      ? "Mobile"
      : s
        ? "Desktop"
        : "";

  let browser = "";
  if (/edg\//i.test(s)) browser = "Edge";
  else if (/opr\/|opera/i.test(s)) browser = "Opera";
  else if (/samsungbrowser/i.test(s)) browser = "Samsung Internet";
  else if (/fbav|fban|instagram/i.test(s)) browser = "In-app (Meta)";
  else if (/chrome|crios/i.test(s)) browser = "Chrome";
  else if (/firefox|fxios/i.test(s)) browser = "Firefox";
  else if (/safari/i.test(s)) browser = "Safari";

  let os = "";
  if (/windows/i.test(s)) os = "Windows";
  else if (/iphone|ipad|ipod/i.test(s)) os = "iOS";
  else if (/android/i.test(s)) os = "Android";
  else if (/mac os x|macintosh/i.test(s)) os = "macOS";
  else if (/linux/i.test(s)) os = "Linux";

  return { device, browser, os };
}
