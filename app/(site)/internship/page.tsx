"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Code2,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Globe,
  Sparkles
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland",
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
  "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

const SKILLS = [
  { id: "mongodb", name: "MongoDB" },
  { id: "react_native", name: "React Native" },
  { id: "nodejs", name: "Node.js" },
  { id: "server", name: "Server" },
  { id: "ai_ml", name: "AI/ML" },
];

const LEVELS = ["Beginner", "Intermediate", "Experienced"];

const EDUCATION_OPTIONS = [
  "PUC", "BCA", "Engineering", "BSC CS", "MCA", "MSC CS", "Other"
];

const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const MONTHS = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];
const YEARS = Array.from({ length: 45 }, (_, i) => 2000 - i);


export default function InternshipPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [country, setCountry] = useState("India");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/internship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSuccess(true);
      form.reset();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }


  if (success) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-2xl border border-gray-100"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Application Received!</h2>
          <p className="text-gray-600 font-medium mb-8">
            Thank you for applying. Our talent acquisition team will review your profile and get back to you soon.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-widest py-4 rounded-2xl transition-all"
          >
            Submit Another
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-white selection:bg-yellow-500/30 min-h-screen pt-32 pb-20 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          badge="Join Our Pack"
          title="Internship"
          titleAccent="Program"
          description="Scale your skills with real-world projects. We are looking for ambitious minds ready to engineer the future of AI/ML and Full stack development."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mt-8 sm:mt-12 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 p-6 sm:p-12 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-yellow-400/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
            
            {/* --- PERSONAL DETAILS --- */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-yellow-100 rounded-lg text-yellow-600">
                  <User size={18} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Full Name" id="name" required placeholder="Enter a name" />
                <FormField label="Email Address" id="email" type="email" required placeholder="Enter email" />
                <FormField label="Phone Number" id="phone" type="tel" required placeholder="+91 99887 76655" />
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">Date of Birth *</label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {/* Day */}
                    <div className="relative">
                      <select
                        name="dob_day"
                        required
                        defaultValue=""
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-4 text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-[13px] sm:text-sm"
                      >
                        <option value="" disabled>Day</option>
                        {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    {/* Month */}
                    <div className="relative">
                      <select
                        name="dob_month"
                        required
                        defaultValue=""
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-4 text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-[13px] sm:text-sm"
                      >
                        <option value="" disabled>Month</option>
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    {/* Year */}
                    <div className="relative">
                      <select
                        name="dob_year"
                        required
                        defaultValue=""
                        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 sm:px-4 py-4 text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-[13px] sm:text-sm"
                      >
                        <option value="" disabled>Year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                      <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* --- EDUCATION --- */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                  <GraduationCap size={18} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Education</h3>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">Highest Degree *</label>
                <div className="relative">
                  <select
                    id="education"
                    name="education"
                    required
                    defaultValue=""
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                  >
                    <option value="" disabled>Select your education...</option>
                    {EDUCATION_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
            </section>

            {/* --- SKILLS --- */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                  <Code2 size={18} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Skills Assessment</h3>
              </div>
              <p className="text-sm text-gray-600 font-medium ml-1">Rate your expertise level in the following technologies:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SKILLS.map(skill => (
                  <div key={skill.id} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">{skill.name}</label>
                    <div className="relative">
                      <select
                        name={`skill_${skill.id}`}
                        defaultValue=""
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                      >
                        <option value="">Not Applicable</option>
                        {LEVELS.map(lvl => <option key={lvl}>{lvl}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* --- LOCATION --- */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                  <Globe size={18} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Location</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">Country *</label>
                  <div className="relative">
                    <select
                      id="country"
                      name="country"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium"
                    >
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">State *</label>
                  <div className="relative">
                    <select
                      id="state"
                      name="state"
                      required={country === "India"}
                      disabled={country !== "India"}
                      defaultValue=""
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 appearance-none focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium disabled:opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="" disabled>Select state...</option>
                      {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">Full Address *</label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  placeholder="Street, Landmark, City, Pincode"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 placeholder:text-gray-500 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all resize-none font-medium text-sm"
                />
              </div>
            </section>

            {/* --- OPTIONS --- */}
            <section className="space-y-8 pt-4">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">I want to run from the beginning *</label>
                <div className="flex flex-wrap gap-6">
                  {["Yes", "No", "Partially"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="run_beginning"
                          value={opt}
                          required
                          className="peer appearance-none w-6 h-6 rounded-full border-2 border-gray-200 checked:border-yellow-400 transition-all focus:outline-none focus:ring-4 focus:ring-yellow-400/10"
                        />
                        <div className="absolute w-2.5 h-2.5 bg-yellow-400 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-gray-800 group-hover:text-gray-950 transition-colors uppercase tracking-wider">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="peer appearance-none w-6 h-6 rounded-lg border-2 border-gray-200 checked:border-yellow-400 transition-all focus:outline-none focus:ring-4 focus:ring-yellow-400/10"
                  />
                  <div className="absolute w-3 h-3 bg-yellow-400 rounded-sm scale-0 peer-checked:scale-100 transition-transform" />
                </div>
                <span className="text-sm font-medium text-gray-800 group-hover:text-gray-950 transition-colors">
                  I consent to the processing of my data and agree to the terms and conditions.
                </span>
              </label>
            </section>

            {/* --- SUBMIT --- */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 px-8 py-5 font-black uppercase tracking-widest text-black transition-all hover:bg-yellow-300 hover:shadow-[0_15px_40px_rgba(250,204,21,0.3)] hover:-translate-y-1 disabled:opacity-70 disabled:pointer-events-none overflow-hidden"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10">Submit Application</span>
                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </>
                )}
              </button>
            </div>


            {error && (
              <p className="text-center text-sm font-bold text-red-500 bg-red-50 py-3 rounded-xl border border-red-100 animate-shake">
                {error}
              </p>
            )}

          </form>
        </motion.div>
      </div>
    </main>
  );
}

function FormField({ label, id, type = "text", required = false, placeholder }: any) {
  return (
    <div className="space-y-2">
        <label htmlFor={id} className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 ml-1">
        {label} {required && "*"}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 sm:px-5 py-3.5 sm:py-4 text-gray-900 placeholder:text-gray-500 focus:border-yellow-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-yellow-400/10 transition-all font-medium text-[15px] sm:text-sm"
      />
    </div>
  );
}
