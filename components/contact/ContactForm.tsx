"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Sparkles, ChevronDown } from "lucide-react";

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
      email: formData.get("email"),
      phone: formData.get("phone"),
      company: formData.get("company"),
      service: formData.get("service"),
      budget: formData.get("budget"),
      timeline: formData.get("timeline"),
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

      // Fire Google Ads conversion tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-17335403082/YwV4CJ-q_e8YEPq9me49",
        });
        (window as any).gtag("event", "GenerateLead", {
          event_category: "Leads",
          event_label: "Lead Form Submit",
        });
      }

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
    <div className="relative rounded-[2.5rem] border border-slate-200/60 bg-white/95 p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.05)] backdrop-blur-2xl overflow-hidden group">
      {/* Background Glows */}
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-amber-400/5 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none transition-opacity group-hover:opacity-20" />

      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Send us a <span className="text-amber-500 italic">message</span>
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none transition-all focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
            
            {/* Email Address */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none transition-all focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Phone Number */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 99863 89444"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none transition-all focus:ring-2 focus:ring-amber-500/10"
              />
            </div>

            {/* Company / Website */}
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
                Company / Website
              </label>
              <input
                id="company"
                name="company"
                placeholder="example.com"
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none transition-all focus:ring-2 focus:ring-amber-500/10"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Service Selection */}
            <div className="space-y-1.5">
              <label htmlFor="service" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
                Required Service *
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  required
                  defaultValue=""
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 appearance-none focus:border-amber-500 focus:bg-white focus:outline-none transition-all focus:ring-2 focus:ring-amber-500/10"
                >
                  <option value="" disabled>Select service...</option>
                  <option value="Website Development">Website Design & Dev</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Google & Meta Ads">Google & Meta Ads (PPC)</option>
                  <option value="SEO Services">SEO Services</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="AI Lead Automation">AI Lead Automation</option>
                  <option value="Not Sure / Consultation">Not Sure / Consultation</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={14} className="stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Budget Selection */}
            <div className="space-y-1.5">
              <label htmlFor="budget" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
                Monthly Budget *
              </label>
              <div className="relative">
                <select
                  id="budget"
                  name="budget"
                  required
                  defaultValue=""
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 appearance-none focus:border-amber-500 focus:bg-white focus:outline-none transition-all focus:ring-2 focus:ring-amber-500/10"
                >
                  <option value="" disabled>Select budget...</option>
                  <option value="Under ₹50,000 / $600">Under ₹50,000 / $600</option>
                  <option value="₹50,000 - ₹1,50,000 / $600 - $1,800">₹50,000 - ₹1,50,000</option>
                  <option value="₹1,50,000 - ₹5,00,000 / $1,800 - $6,000">₹1,50,000 - ₹5,00,000</option>
                  <option value="₹5,00,000+ / $6,000+">₹5,00,000+ / $6,000+</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <ChevronDown size={14} className="stroke-[2.5]" />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Dropdown */}
          <div className="space-y-1.5">
            <label htmlFor="timeline" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
              Project Timeline *
            </label>
            <div className="relative">
              <select
                id="timeline"
                name="timeline"
                required
                defaultValue=""
                className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 appearance-none focus:border-amber-500 focus:bg-white focus:outline-none transition-all focus:ring-2 focus:ring-amber-500/10"
              >
                <option value="" disabled>Select timeline...</option>
                <option value="Immediate (Within 2 weeks)">Immediate (Within 2 weeks)</option>
                <option value="Within 1 Month">Within 1 Month</option>
                <option value="1 to 3 Months">1 to 3 Months</option>
                <option value="Just researching / exploring">Just researching / exploring</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <ChevronDown size={14} className="stroke-[2.5]" />
              </div>
            </div>
          </div>

          {/* Message / Project Details */}
          <div className="space-y-1.5">
            <label htmlFor="message" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2 block">
              Additional Details / Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Tell us about your current challenges, custom requirements, etc..."
              className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/30 px-5 py-3.5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none transition-all resize-none focus:ring-2 focus:ring-amber-500/10"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-bold text-red-500">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-600">
              Message sent successfully! Redirecting...
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="group relative flex w-full items-center justify-center gap-2.5 rounded-2xl bg-amber-500 px-6 py-4 font-black uppercase tracking-widest text-slate-900 shadow-lg shadow-amber-500/10 transition-all hover:scale-[1.01] hover:bg-amber-600 active:scale-[0.99] disabled:opacity-70 disabled:pointer-events-none overflow-hidden cursor-pointer"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <span className="relative z-10 text-[12px]">Get Growth Audit</span>
                <ArrowRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </>
            )}
          </button>
          
          <p className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">
            Secure • Confidential • 24H Response
          </p>
        </form>
      </div>
    </div>
  );
}
