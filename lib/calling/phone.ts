// Phone number handling. Only Indian mobile numbers are called automatically.

/** "+91 98450-12345", "098450 12345", "9845012345" → "+919845012345". Returns null for anything else. */
export function normalizeIndianMobile(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let digits = String(raw).replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  if (!/^[6-9]\d{9}$/.test(digits)) return null;
  return `+91${digits}`;
}

/** "+919845012345" → "+91 98•••••345" for logs and lists. */
export function maskPhone(e164: string | null | undefined): string {
  if (!e164) return "";
  const d = e164.replace(/\D/g, "");
  if (d.length < 6) return "•••";
  return `+${d.slice(0, 2)} ${d.slice(2, 4)}${"•".repeat(Math.max(0, d.length - 7))}${d.slice(-3)}`;
}
