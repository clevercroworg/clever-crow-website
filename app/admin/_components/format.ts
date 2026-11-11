export const TZ = "Asia/Kolkata";

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: TZ,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { timeZone: TZ, day: "numeric", month: "short", year: "numeric" });
}

export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-IN", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
}

export function timeAgo(iso: string) {
  const secs = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (secs < 60) return "just now";
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return formatDate(iso);
}

export const CHANNEL_STYLES: Record<string, string> = {
  "Google Ads": "bg-blue-50 text-blue-700 ring-blue-200",
  "Meta Ads": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  "LinkedIn Ads": "bg-sky-50 text-sky-700 ring-sky-200",
  "Other Paid": "bg-violet-50 text-violet-700 ring-violet-200",
  "Organic Search": "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Social: "bg-pink-50 text-pink-700 ring-pink-200",
  Email: "bg-teal-50 text-teal-700 ring-teal-200",
  Referral: "bg-orange-50 text-orange-700 ring-orange-200",
  Direct: "bg-slate-100 text-slate-700 ring-slate-200",
};

export const STATUS_STYLES: Record<string, string> = {
  new: "bg-amber-50 text-amber-800 ring-amber-300",
  contacted: "bg-blue-50 text-blue-700 ring-blue-200",
  qualified: "bg-violet-50 text-violet-700 ring-violet-200",
  won: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  lost: "bg-slate-100 text-slate-600 ring-slate-200",
  spam: "bg-rose-50 text-rose-700 ring-rose-200",
};

export const STATUS_LABELS: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  won: "Won",
  lost: "Lost",
  spam: "Spam",
};

export const TYPE_LABELS: Record<string, string> = {
  lead: "Lead",
  career: "Job application",
  internship: "Internship",
};

/** Digits for WhatsApp links; assumes India (+91) for 10-digit numbers. */
export function whatsappNumber(phone: string | null) {
  if (!phone) return null;
  let d = phone.replace(/\D/g, "");
  if (d.startsWith("0")) d = d.replace(/^0+/, "");
  if (d.length === 10) d = `91${d}`;
  return d.length >= 11 ? d : null;
}

export function shortUrl(url: string | null) {
  if (!url) return "";
  try {
    const u = new URL(url);
    return `${u.hostname.replace(/^www\./, "")}${u.pathname === "/" ? "" : u.pathname}`;
  } catch {
    return url;
  }
}
