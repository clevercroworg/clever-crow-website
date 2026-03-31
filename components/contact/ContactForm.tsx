"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

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
    <div className="relative rounded-[2.5rem] border border-gray-100 bg-white p-8 sm:p-12 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* Soft Glow Effects for Light Background */}
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-yellow-400/10 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-10">
          <h3 className="text-3xl font-black text-gray-950 tracking-tight">
            Send us a message
          </h3>
          <p className="mt-3 text-gray-600 font-medium leading-relaxed">
            Tell us about your next project, and our growth engineers will get back to you within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[12px] font-black uppercase tracking-[0.1em] text-gray-700 ml-1">
                Your Name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-[12px] font-black uppercase tracking-[0.1em] text-gray-700 ml-1">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-[12px] font-black uppercase tracking-[0.1em] text-gray-700 ml-1">
              What are you looking for? *
            </label>
            <div className="relative">
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
              >
                <option value="" disabled className="text-gray-400">Select a service...</option>
                <option>Digital Marketing (Comprehensive)</option>
                <option>Google & Meta Ads (PPC)</option>
                <option>Search Engine Optimisation (SEO)</option>
                <option>Social Media Management</option>
                <option>Website Design & Development</option>
                <option>AI Lead Automation</option>
                <option>Not Sure / Need Guidance</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-[12px] font-black uppercase tracking-[0.1em] text-gray-700 ml-1">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your goals, current challenges, and timeline..."
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder:text-gray-400 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all resize-none font-medium"
            />
          </div>

          {error && (
            <p className="text-sm font-bold text-red-600 bg-red-50 py-3 px-4 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm font-bold text-emerald-600 bg-emerald-50 py-3 px-4 rounded-xl border border-emerald-100">
              Message sent successfully! Redirecting...
            </p>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 font-black uppercase tracking-widest text-black transition-all hover:bg-yellow-300 hover:shadow-[0_15px_40px_rgba(250,204,21,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span className="relative z-10">Get Growth Audit</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </>
            )}
          </button>
          
          <p className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Secure • Confidential • 24H Response
          </p>
        </form>
      </div>
    </div>
  );
}
