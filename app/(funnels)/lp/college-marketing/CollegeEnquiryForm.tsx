"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  BUDGET_OPTIONS,
  EMPTY_COLLEGE_ENQUIRY,
  ROLE_OPTIONS,
  validateCollegeEnquiry,
  type CollegeEnquiry,
  type CollegeEnquiryErrors,
} from "@/lib/college-enquiry";
import { ADS_LEAD_CONVERSION, ENQUIRY, WHATSAPP_LINK } from "./college-data";
import { sendGtag, trackCollegeEvent } from "./tracking";

type TextField = Exclude<keyof CollegeEnquiry, "consent">;

type FieldConfig = {
  name: TextField;
  label: string;
  required: boolean;
  type?: "text" | "tel" | "email" | "url";
  options?: readonly string[];
  placeholder?: string;
  autoComplete?: string;
  helper?: string;
};

const FIELDS: FieldConfig[] = [
  { name: "institution", label: "College / Institution Name", required: true, autoComplete: "organization" },
  { name: "city", label: "City", required: true, autoComplete: "address-level2" },
  { name: "name", label: "Your Name", required: true, autoComplete: "name" },
  { name: "role", label: "Your Role", required: true, options: ROLE_OPTIONS },
  { name: "phone", label: "Phone / WhatsApp Number", required: true, type: "tel", placeholder: "+91 98765 43210", autoComplete: "tel" },
  { name: "email", label: "Work Email", required: false, type: "email", autoComplete: "email" },
  // Ordered so the two-column grid fills every row: courses|intake, website|budget.
  { name: "courses", label: "Courses to Promote", required: true, placeholder: "e.g. B.Tech CSE, MBA, Nursing" },
  { name: "intake", label: "Next Admission Intake", required: false, placeholder: "e.g. August 2027" },
  { name: "website", label: "College Website", required: false, type: "url", placeholder: "yourcollege.edu.in", autoComplete: "url" },
  { name: "budget", label: "Monthly Advertising Budget", required: false, options: BUDGET_OPTIONS, helper: ENQUIRY.budgetHelper },
];

const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f4c542] focus-visible:border-slate-900";

export default function CollegeEnquiryForm() {
  const [values, setValues] = useState<CollegeEnquiry>(EMPTY_COLLEGE_ENQUIRY);
  const [errors, setErrors] = useState<CollegeEnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const startedAt = useRef<number | null>(null);
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const markStarted = () => {
    if (startedAt.current !== null) return;
    startedAt.current = Date.now();
    trackCollegeEvent("college_form_start");
  };

  const update = <K extends keyof CollegeEnquiry>(name: K, value: CollegeEnquiry[K]) => {
    markStarted();
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has an error, re-check it as the user corrects it.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateCollegeEnquiry(next)[name] }));
    }
  };

  const validateField = (name: keyof CollegeEnquiry) => {
    const message = validateCollegeEnquiry(values)[name];
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validateCollegeEnquiry(values);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      // The global UtmTracker enriches POSTs to /api/leads* with campaign parameters.
      const response = await fetch("/api/leads/college", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          hp_field: honeypot.current?.value ?? "",
          form_ms: Date.now() - (startedAt.current ?? Date.now()),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error("Submission failed");
      }

      setStatus("success");
      trackCollegeEvent("college_lead_submit");
      sendGtag("event", "conversion", { send_to: ADS_LEAD_CONVERSION });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden="true" />
        <p className="mt-4 text-lg font-bold text-slate-900 leading-relaxed">{ENQUIRY.success}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
        {FIELDS.map((field) => {
          const id = `college-${field.name}`;
          const error = errors[field.name];
          const describedBy = [field.helper ? `${id}-help` : "", error ? `${id}-error` : ""].filter(Boolean).join(" ");
          const shared = {
            id,
            name: field.name,
            value: values[field.name],
            required: field.required,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": describedBy || undefined,
            onBlur: () => validateField(field.name),
            className: `${inputClass} ${error ? "border-rose-400" : "border-slate-300"}`,
          };

          return (
            <div key={field.name}>
              <label htmlFor={id} className="mb-1.5 block text-sm font-bold text-slate-800">
                {field.label}
                {field.required ? (
                  <span className="text-rose-600" aria-hidden="true"> *</span>
                ) : (
                  <span className="font-medium text-slate-500"> (optional)</span>
                )}
              </label>

              {field.options ? (
                <select {...shared} onChange={(e) => update(field.name, e.target.value)}>
                  <option value="">Select…</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  {...shared}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  inputMode={field.type === "tel" ? "tel" : undefined}
                  onChange={(e) => update(field.name, e.target.value)}
                />
              )}

              {field.helper && (
                <p id={`${id}-help`} className="mt-1.5 text-xs text-slate-500">
                  {field.helper}
                </p>
              )}
              {error && (
                <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-rose-700">
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="college-hp">Leave this field empty</label>
        <input ref={honeypot} id="college-hp" name="hp_field" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "college-consent-error" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c542]"
          />
          <span>
            {ENQUIRY.consent}{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-slate-900 underline underline-offset-2 hover:text-amber-800"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="college-consent-error" className="mt-1.5 text-sm font-medium text-rose-700">
            {errors.consent}
          </p>
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
          {ENQUIRY.failure}{" "}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCollegeEvent("college_whatsapp_click", "form_error")}
            className="font-bold underline underline-offset-2"
          >
            Open WhatsApp
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4c542] px-5 py-3.5 text-center text-[15px] font-black leading-snug sm:px-6 sm:text-base text-slate-950 shadow-xs transition hover:brightness-105 active:scale-[0.99] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer"
      >
        {status === "submitting" ? (
          <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true" />
        )}
        <span>{status === "submitting" ? "Sending…" : ENQUIRY.submit}</span>
      </button>
    </form>
  );
}
