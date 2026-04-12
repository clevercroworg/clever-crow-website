"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function ContactForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      source: "Contact Page Form",
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      form.reset();

      setTimeout(() => {
        router.push("/thank-you");
      }, 1200);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative rounded-[3rem] border border-white/10 bg-white/5 p-8 sm:p-12 shadow-2xl backdrop-blur-2xl overflow-hidden group">
      {/* Background Orbs */}
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-yellow-400/10 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20" />

      <div className="relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 border border-yellow-500/20 mb-6">
            <Sparkles size={12} />
            Growth Audit
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight">
            Send us a <span className="text-yellow-500 italic">message</span>
          </h3>
          <p className="mt-3 text-slate-400 font-medium leading-relaxed">
            Tell us about your next project, and our growth engineers will get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 focus:border-yellow-500 focus:bg-white/10 focus:outline-none transition-all ring-1 ring-white/5"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 XXX XXX XXXX"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 focus:border-yellow-500 focus:bg-white/10 focus:outline-none transition-all ring-1 ring-white/5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
              What are you looking for?
            </label>
            <div className="relative">
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white appearance-none focus:border-yellow-500 focus:bg-white/10 focus:outline-none transition-all ring-1 ring-white/5"
              >
                <option value="" disabled className="bg-[#020617]">Select a service...</option>
                <option value="Digital Marketing" className="bg-[#020617]">Digital Marketing (Comprehensive)</option>
                <option value="Google & Meta Ads" className="bg-[#020617]">Google & Meta Ads (PPC)</option>
                <option value="SEO" className="bg-[#020617]">Search Engine Optimisation (SEO)</option>
                <option value="Social Media" className="bg-[#020617]">Social Media Management</option>
                <option value="Website Development" className="bg-[#020617]">Website Design & Development</option>
                <option value="AI Lead Automation" className="bg-[#020617]">AI Lead Automation</option>
                <option value="Not Sure" className="bg-[#020617]">Not Sure / Need Guidance</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your goals, current challenges, and timeline..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-slate-600 focus:border-yellow-500 focus:bg-white/10 focus:outline-none transition-all resize-none ring-1 ring-white/5"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm font-bold text-emerald-400">
              Message sent successfully! Redirecting...
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-500 px-8 py-5 font-black uppercase tracking-widest text-slate-900 shadow-xl shadow-yellow-500/20 transition-all hover:scale-[1.02] hover:bg-yellow-400 active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span className="relative z-10 text-[14px]">Get Growth Audit</span>
                <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </>
            )}
          </button>
          
          <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
            Secure • Confidential • 24H Response
          </p>
        </form>
      </div>
    </div>
  );
}
