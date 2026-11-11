// Several landing-page forms send the browser tab title as their "source" and pack
// details into an auto-written message. This turns those into clean dashboard fields.
// (Only affects what is saved for the dashboard; the email is unchanged.)

type LeadFields = {
  form_name: string;
  message: string | null;
  company?: string;
  budget?: string;
  service?: string;
};

const AUTO_ENQUIRY = /^New enquiry received(?: from ([^.]+))?\.\s*Source Page:[\s\S]*?\.\s*Referrer\/Landed URL:\s*\S*\s*/;
const CALLBACK = /^Callback Request Details:/;

function looksLikePageTitle(source: string) {
  return !source || source.includes("|");
}

function lineValue(message: string, label: string) {
  const m = message.match(new RegExp(`-\\s*${label}:\\s*(.*)`));
  const v = m?.[1]?.trim();
  return v && v !== "N/A" ? v : undefined;
}

export function normalizeLeadFields(source: string | undefined, message: string | undefined): LeadFields {
  const src = (source || "").trim();
  const msg = (message || "").trim();

  if (CALLBACK.test(msg)) {
    return {
      form_name: looksLikePageTitle(src) ? "LP Callback Popup" : src,
      message: null,
      company: lineValue(msg, "Business"),
      budget: lineValue(msg, "Monthly Budget"),
      service: lineValue(msg, "Service Interest"),
    };
  }

  const auto = msg.match(AUTO_ENQUIRY);
  if (auto) {
    const rest = msg.slice(auto[0].length).trim();
    const section = auto[1]?.trim();
    return {
      form_name: looksLikePageTitle(src) ? (section === "Hero Section" ? "LP Hero Form" : "LP Enquiry Form") : src,
      message: rest || null,
    };
  }

  if (!src) return { form_name: "Contact Page Form", message: msg || null };
  return { form_name: looksLikePageTitle(src) ? "Website Form" : src, message: msg || null };
}
