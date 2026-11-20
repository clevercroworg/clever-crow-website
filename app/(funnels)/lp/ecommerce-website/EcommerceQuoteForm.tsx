"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Phone, User } from "lucide-react";
import { trackLead } from "@/lib/tracking";

// Short quote form: name, phone, package. Saves through /api/leads (dashboard + email) and counts as a Google Ads lead.
const PACKAGES = ["Starter Store", "Growth Store", "Not sure yet"];

export default function EcommerceQuoteForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState("Not sure yet");
  const [state, setState] = useState({ loading: false, error: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setState({ loading: false, error: "Please enter your name and a 10-digit mobile number." });
      return;
    }
    setState({ loading: true, error: "" });
    try {
      const source = `${document.title} (Quote form)`;
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: "",
          service: `E-commerce website: ${pkg}`,
          message: `E-commerce website enquiry. Package: ${pkg}. Page: ${window.location.href}`,
          source,
        }),
      });
      if (!res.ok) throw new Error("Something went wrong. Please try again or call us.");
      await trackLead("E-commerce Quote Form");
      router.push("/thank-you");
    } catch (err) {
      setState({ loading: false, error: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  }

  const input =
    "h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-[16px] text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100";

  return (
    <section id="quote" className="scroll-mt-20 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-xl px-5 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-amber-200/80 bg-white shadow-[0_30px_70px_-28px_rgba(7,19,48,0.35)]">
          <div className="h-1.5 bg-gradient-to-r from-[#FFC72C] to-[#F59E0B]" aria-hidden="true" />
          <div className="p-5 sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Get a free quote for your store</h2>
            <p className="mt-1.5 text-[15px] text-slate-600">Share your number. Our team will call you within working hours to understand your products and suggest the right package.</p>

            <form className="mt-5 space-y-3.5" onSubmit={submit} noValidate>
              <label className="block">
                <span className="sr-only">Your name</span>
                <span className="relative block">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                  <input className={input} placeholder="Your name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
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
    </section>
  );
}
