"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Phone, User, X } from "lucide-react";
import { trackLead } from "@/lib/tracking";

// Quote pop-up for landing pages: name, phone, package. Opened by every "Get Free Quote" / "Get This Package" button, so
// the page itself stays short. A bottom sheet on phones, a centred card on larger screens. Saves through /api/leads
// (dashboard + email) and counts as a Google Ads lead. One per page.
const NOT_SURE = "Not sure yet";
const OPEN_EVENT = "cc-lp-open-quote";

type QuoteModalProps = {
  /** Package names shown as choices; "Not sure yet" is added. */
  packages: string[];
  /** What the lead is about, e.g. "E-commerce website". Shown to the team in the lead. */
  service: string;
  /** Name for analytics, e.g. "E-commerce Quote Form". */
  formName: string;
  title: string;
  subtitle: string;
};

/**
 * Saves a quote request as a lead (dashboard + email) and records the Google Ads lead conversion.
 * Shared by the pop-up and the small inline forms. Throws a readable message on failure.
 */
export async function submitQuoteLead(lead: { name: string; phone: string; service: string; pkg: string; formName: string; formLabel?: string }) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: lead.name.trim(),
      phone: lead.phone.trim(),
      email: "",
      service: `${lead.service}: ${lead.pkg}`,
      message: `${lead.service} enquiry. Package: ${lead.pkg}. Page: ${window.location.href}`,
      source: `${document.title} (${lead.formLabel ?? "Quote form"})`,
    }),
  });
  if (!res.ok) throw new Error("Something went wrong. Please try again or call us.");
  await trackLead(lead.formName);
}

/** Opens the quote pop-up, optionally with a package already chosen. */
export function openQuote(packageName?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: packageName ?? null }));
}

export default function QuoteModal({ packages, service, formName, title, subtitle }: QuoteModalProps) {
  const packageKey = packages.join("|");
  const PACKAGES = useMemo(() => [...packageKey.split("|"), NOT_SURE], [packageKey]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState(NOT_SURE);
  const [state, setState] = useState({ loading: false, error: "" });

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const name = (e as CustomEvent<string | null>).detail;
      if (name && PACKAGES.includes(name)) setPkg(name);
      setState({ loading: false, error: "" });
      setIsOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [PACKAGES]);

  // While open: no page scroll behind it, Escape closes, focus starts on the name field.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => nameRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [isOpen]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setState({ loading: false, error: "Please enter your name and a 10-digit mobile number." });
      return;
    }
    setState({ loading: true, error: "" });
    try {
      await submitQuoteLead({ name, phone, service, pkg, formName });
      router.push("/thank-you");
    } catch (err) {
      setState({ loading: false, error: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  const input =
    "h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-[16px] text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="quote-title">
      <button type="button" className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" aria-label="Close" onClick={() => setIsOpen(false)} />
      <div className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl">
          <div className="h-1.5 bg-gradient-to-r from-[#FFC72C] to-[#F59E0B]" aria-hidden="true" />
          <span className="mx-auto mt-2.5 block h-1 w-10 rounded-full bg-slate-200 sm:hidden" aria-hidden="true" />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close quote form"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-8">
            <h2 id="quote-title" className="pr-10 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
            <p className="mt-1.5 text-[15px] text-slate-600">{subtitle}</p>

            <form className="mt-5 space-y-3.5" onSubmit={submit} noValidate>
              <label className="block">
                <span className="sr-only">Your name</span>
                <span className="relative block">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input ref={nameRef} className={input} placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                </span>
              </label>
              <label className="block">
                <span className="sr-only">Mobile number</span>
                <span className="relative block">
                  <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input className={input} placeholder="Mobile number" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </span>
              </label>

              <fieldset>
                <legend className="mb-2 text-sm font-semibold text-slate-700">Which package are you interested in?</legend>
                <div className="grid grid-cols-3 gap-2">
                  {PACKAGES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPkg(p)}
                      aria-pressed={pkg === p}
                      className={`min-h-11 rounded-xl border px-2 py-2 text-[13px] font-semibold leading-tight transition ${
                        pkg === p ? "border-amber-400 bg-amber-50 text-slate-900 ring-2 ring-amber-200" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </fieldset>

              {state.error && (
                <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={state.loading}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-[15px] font-bold text-white transition hover:bg-slate-800 disabled:opacity-70"
              >
                {state.loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {state.loading ? "Sending…" : "Get My Free Quote"}
              </button>
              <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Your details are safe. No spam.
              </p>
            </form>
          </div>
      </div>
    </div>
  );
}
