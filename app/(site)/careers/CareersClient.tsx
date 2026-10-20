"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  FilePenLine,
  FileText,
  GraduationCap,
  Loader2,
  MapPin,
  PlayCircle,
  Sparkles,
  Upload,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { CV_ACCEPT, CV_MAX_BYTES, OPEN_ROLES, isAllowedCvName, type OpenRole } from "./careers-data";
import { SocialIllustration, UgcIllustration } from "./RoleIllustration";
import "./careers.css";

const EASE = [0.22, 1, 0.36, 1] as const;

const ICONS: Record<OpenRole["responsibilities"][number]["icon"], LucideIcon> = {
  plan: FilePenLine,
  reels: BarChart3,
  community: Users,
  camera: Camera,
  video: PlayCircle,
  story: Sparkles,
};

const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function PosterButton({ children, onClick, href, type = "button", disabled }: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls =
    "group inline-flex min-h-[3.25rem] items-center gap-3 rounded-2xl bg-slate-950 py-2 pl-2 pr-6 text-base font-bold text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 cursor-pointer";
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFC21A] text-slate-950 transition-transform group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
      {children}
    </>
  );
  return href ? (
    <a href={href} className={cls}>{inner}</a>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>{inner}</button>
  );
}

/* ------------------------------------------------------------------ */
/* Role card: poster-style summary with expandable full details       */
/* ------------------------------------------------------------------ */

function RoleCard({ role, onApply }: { role: OpenRole; onApply: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const panelId = `${role.id}-details`;
  const Illustration = role.id === "ugc-content-creator" ? UgcIllustration : SocialIllustration;

  return (
    <Reveal>
      <article id={role.id} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25)]">
        <div className="grid grid-cols-1 gap-8 p-6 sm:p-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-center lg:gap-12 lg:p-12">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 sm:text-sm">{role.eyebrow}</p>
            <h3 className="mt-3 text-[2.25rem] font-black leading-[1.02] tracking-tight text-slate-950 sm:text-5xl lg:text-[3.4rem]">
              {role.title}
            </h3>
            <p className="mt-5 inline-flex max-w-full rounded-full bg-[#FFC21A] px-4 py-2 text-sm font-bold text-slate-950 sm:text-base">
              {role.highlight}
            </p>
            <p className="mt-5 text-xl font-semibold leading-snug text-slate-800 sm:text-2xl">{role.tagline}</p>

            <ul className="mt-6 space-y-3">
              {role.responsibilities.map(({ title, icon }) => {
                const Icon = ICONS[icon];
                return (
                  <li key={title} className="flex items-center gap-3.5 text-[15px] font-medium text-slate-700 sm:text-base">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-slate-900">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    {title}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                { icon: Briefcase, label: role.employmentType },
                { icon: Clock, label: role.engagement },
                { icon: MapPin, label: role.location },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 sm:text-sm">
                  <Icon className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[280px] sm:max-w-[340px] md:max-w-none">
            <Illustration />
          </div>
        </div>

        {/* Action bar */}
        <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/70 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-12">
          <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
            <PosterButton onClick={() => onApply(role.id)}>Apply Now</PosterButton>
            <span className="text-sm text-slate-500">{role.applyHint}</span>
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 self-start text-sm font-bold text-slate-900 underline-offset-4 hover:underline sm:self-auto cursor-pointer"
          >
            {open ? "Hide role details" : "View full role details"}
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>

        {/* Details: kept in the HTML, collapsed visually */}
        <div id={panelId} className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden" inert={!open}>
            <div className="grid grid-cols-1 gap-10 border-t border-slate-100 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-2 lg:px-12">
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-slate-950">About the role</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">{role.summary}</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-950">What you&apos;ll do</h4>
                  <ul className="mt-4 space-y-4">
                    {role.responsibilities.map(({ title, detail, icon }) => {
                      const Icon = ICONS[icon];
                      return (
                        <li key={title} className="flex gap-3.5">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-slate-900">
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span>
                            <span className="block text-[15px] font-semibold text-slate-900">{title}</span>
                            <span className="mt-0.5 block text-sm leading-relaxed text-slate-600">{detail}</span>
                          </span>
                        </li>
                      );
                    })}
                    {role.alsoDo.map((item) => (
                      <li key={item} className="flex gap-3.5 text-sm leading-relaxed text-slate-600">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center">
                          <Check className="h-4 w-4 text-amber-600" aria-hidden="true" />
                        </span>
                        <span className="pt-2">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h4 className="text-lg font-bold text-slate-950">What we&apos;re looking for</h4>
                  <ul className="mt-4 space-y-3">
                    {role.requirements.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-950">Good to have</h4>
                  <ul className="mt-4 space-y-3">
                    {role.niceToHave.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Application form                                                    */
/* ------------------------------------------------------------------ */

type Errors = Partial<Record<"role_id" | "name" | "email" | "phone" | "portfolio" | "cv" | "form", string>>;

const inputCls =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:border-slate-900";

function Field({ id, label, required, error, hint, children }: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
        {required ? <span className="text-rose-600" aria-hidden="true"> *</span> : <span className="font-normal text-slate-500"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate-500">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-rose-700">{error}</p>}
    </div>
  );
}

function ApplicationForm({ roleId, setRoleId }: { roleId: string; setRoleId: (id: string) => void }) {
  const role = OPEN_ROLES.find((r) => r.id === roleId) ?? OPEN_ROLES[0];
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [cvName, setCvName] = useState("");
  const startedAt = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);

  const markStarted = () => {
    if (startedAt.current === null) startedAt.current = Date.now();
  };

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const cv = data.get("cv");
    const cvFile = cv instanceof File && cv.size > 0 ? cv : null;
    if (get("name").length < 2) e.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(get("email"))) e.email = "Enter a valid email address.";
    if (!/^\+?\d{10,15}$/.test(get("phone").replace(/[\s\-().]/g, ""))) e.phone = "Enter a valid phone number.";
    if (role.applyWith === "samples" && !get("portfolio")) e.portfolio = "Add a link to your portfolio or sample videos.";
    if (role.applyWith === "cv" && !cvFile) e.cv = "Attach your CV.";
    else if (cvFile && !isAllowedCvName(cvFile.name)) e.cv = "Upload a PDF, DOC or DOCX file.";
    else if (cvFile && cvFile.size > CV_MAX_BYTES) e.cv = "Your CV must be 4 MB or smaller.";
    return e;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    data.set("role_id", role.id);
    data.set("form_ms", String(Date.now() - (startedAt.current ?? Date.now())));
    setStatus("submitting");
    try {
      const res = await fetch("/api/careers", { method: "POST", body: data });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error("failed");
      }
      setStatus("success");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="py-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-bold text-slate-950">Application received</h3>
        <p className="mx-auto mt-2 max-w-sm text-slate-600">
          Thanks for applying for {role.title}. Our team will review your application and get in touch if there&apos;s a fit.
        </p>
      </div>
    );
  }

  const describedBy = (id: keyof Errors, hint?: boolean) =>
    errors[id] ? `careers-${id}-error` : hint ? `careers-${id}-hint` : undefined;

  return (
    <form ref={formRef} onSubmit={handleSubmit} onChange={markStarted} noValidate className="space-y-5">
      {/* Role picker */}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-800">Applying for</legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {OPEN_ROLES.map((r) => {
            const active = r.id === role.id;
            return (
              <label
                key={r.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                  active ? "border-slate-950 bg-amber-50 ring-1 ring-slate-950" : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <input
                  type="radio"
                  name="role_choice"
                  value={r.id}
                  checked={active}
                  onChange={() => {
                    setRoleId(r.id);
                    setErrors({});
                  }}
                  className="h-4 w-4 accent-slate-950"
                />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-slate-950">{r.title}</span>
                  <span className="block text-xs text-slate-500">{r.employmentType} · {r.location}</span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="careers-name" label="Full name" required error={errors.name}>
          <input id="careers-name" name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={`${inputCls} ${errors.name ? "border-rose-400" : "border-slate-300"}`} />
        </Field>
        <Field id="careers-email" label="Email" required error={errors.email}>
          <input id="careers-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={`${inputCls} ${errors.email ? "border-rose-400" : "border-slate-300"}`} />
        </Field>
        <Field id="careers-phone" label="Phone / WhatsApp" required error={errors.phone}>
          <input id="careers-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone")} className={`${inputCls} ${errors.phone ? "border-rose-400" : "border-slate-300"}`} />
        </Field>
        <Field id="careers-city" label="City">
          <input id="careers-city" name="city" type="text" autoComplete="address-level2" className={`${inputCls} border-slate-300`} />
        </Field>
      </div>

      <Field
        id="careers-portfolio"
        label={role.applyWith === "samples" ? "Portfolio or sample videos link" : "Portfolio or social profile link"}
        required={role.applyWith === "samples"}
        error={errors.portfolio}
        hint={role.applyWith === "samples" ? "Instagram, YouTube, Google Drive or a portfolio site." : "A page you manage, a portfolio or your Instagram / LinkedIn."}
      >
        <input id="careers-portfolio" name="portfolio" type="url" placeholder="https://" aria-invalid={!!errors.portfolio} aria-describedby={describedBy("portfolio", true)} className={`${inputCls} ${errors.portfolio ? "border-rose-400" : "border-slate-300"}`} />
      </Field>

      <Field id="careers-cv" label="CV / resume" required={role.applyWith === "cv"} error={errors.cv} hint="PDF, DOC or DOCX, up to 4 MB.">
        <div
          className={`relative flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-4 transition focus-within:border-slate-900 ${
            errors.cv ? "border-rose-300 bg-rose-50/40" : cvName ? "border-emerald-300 bg-emerald-50/50" : "border-slate-300 bg-slate-50 hover:border-slate-400"
          }`}
        >
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${cvName ? "bg-emerald-100 text-emerald-700" : "bg-white text-slate-500 shadow-sm"}`}>
            {cvName ? <FileText className="h-5 w-5" aria-hidden="true" /> : <Upload className="h-5 w-5" aria-hidden="true" />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-slate-900">{cvName || "Choose a file"}</span>
            <span className="block text-xs text-slate-500">{cvName ? "Ready to upload" : "Tap to browse"}</span>
          </span>
          {cvName && (
            <button
              type="button"
              onClick={() => {
                if (cvRef.current) cvRef.current.value = "";
                setCvName("");
              }}
              className="relative z-10 rounded-full p-1.5 text-slate-500 hover:bg-white hover:text-slate-900 cursor-pointer"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <input
            ref={cvRef}
            id="careers-cv"
            name="cv"
            type="file"
            accept={CV_ACCEPT}
            aria-invalid={!!errors.cv}
            aria-describedby={describedBy("cv", true)}
            onChange={(e) => {
              setCvName(e.target.files?.[0]?.name ?? "");
              setErrors((prev) => ({ ...prev, cv: undefined }));
            }}
            className={`absolute inset-0 h-full w-full cursor-pointer opacity-0 ${cvName ? "pointer-events-none" : ""}`}
          />
        </div>
      </Field>

      <Field id="careers-note" label="Why you'd be a great fit">
        <textarea id="careers-note" name="note" rows={3} maxLength={1000} className={`${inputCls} resize-y border-slate-300`} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="careers-company-site">Leave this field empty</label>
        <input id="careers-company-site" name="company_site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
          We couldn&apos;t send your application. Please check the fields above and try again.
        </p>
      )}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <PosterButton type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />Sending…</span>
          ) : (
            "Submit Application"
          )}
        </PosterButton>
        <p className="text-xs text-slate-500">
          By applying you agree to our{" "}
          <Link href="/privacy-policy" className="font-semibold text-slate-700 underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function CareersClient() {
  const [roleId, setRoleId] = useState(OPEN_ROLES[0].id);
  const role = OPEN_ROLES.find((r) => r.id === roleId) ?? OPEN_ROLES[0];

  const applyFor = (id: string) => {
    setRoleId(id);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="overflow-x-clip bg-white text-slate-900">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative isolate overflow-hidden bg-[#FFFCF2] pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#FFD84D]/40 blur-[110px]" />
          <div className="absolute -right-32 top-32 h-[460px] w-[460px] rounded-full bg-amber-200/50 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: "radial-gradient(rgba(15,23,42,0.09) 1px, transparent 1.2px)",
              backgroundSize: "24px 24px",
              maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent 75%)",
            }}
          />
        </div>

        <div className={`${CONTAINER} grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10`}>
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              We&apos;re hiring · {OPEN_ROLES.length} open roles
            </p>
            <h1 className="mt-6 text-[2.5rem] leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-[4.25rem]">
              Grow Your Career With{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10">Clever Crow</span>
                <span className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.32em] rounded-sm bg-[#FFC21A]" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              We&apos;re a digital marketing agency helping businesses grow with websites, SEO, ads and automation. Right now
              we&apos;re looking for a Social Media Manager and freelance UGC Content Creators.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <PosterButton href="#open-roles">View Open Roles</PosterButton>
              <a href="#apply" className="inline-flex items-center gap-1.5 text-base font-bold text-slate-900 underline-offset-4 hover:underline">
                Apply directly
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Mini role posters (desktop/tablet) */}
          <div className="relative hidden h-[420px] sm:block lg:col-span-5">
            {OPEN_ROLES.map((r, i) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                className={`absolute w-[min(320px,80%)] rounded-3xl p-6 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)] transition duration-300 hover:z-20 hover:rotate-0 hover:scale-[1.02] ${
                  i === 0
                    ? "left-0 top-0 z-10 -rotate-6 bg-white text-slate-950 sm:left-[8%] lg:left-0"
                    : "bottom-0 right-0 rotate-3 bg-slate-950 text-white sm:right-[8%] lg:right-0"
                }`}
              >
                <p className={`text-[11px] font-bold uppercase tracking-[0.3em] ${i === 0 ? "text-slate-500" : "text-slate-400"}`}>{r.eyebrow}</p>
                <p className="mt-2 text-3xl font-black leading-[1.05] tracking-tight">{r.title}</p>
                <p className="mt-4 inline-flex rounded-full bg-[#FFC21A] px-3 py-1 text-xs font-bold text-slate-950">{r.highlight}</p>
                <p className={`mt-4 flex items-center gap-2 text-sm font-semibold ${i === 0 ? "text-slate-600" : "text-slate-300"}`}>
                  <Briefcase className="h-4 w-4 text-amber-500" aria-hidden="true" />
                  {r.employmentType} · {r.location}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ OPEN ROLES ═══════════ */}
      <section id="open-roles" className="scroll-mt-24 py-16 sm:py-24">
        <div className={CONTAINER}>
          <Reveal className="mb-10 flex flex-col gap-3 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-600">Open roles</p>
              <h2 className="mt-2 text-3xl tracking-tight text-slate-950 sm:text-4xl">Find your place on the team</h2>
            </div>
            <p className="text-sm font-semibold text-slate-500">{OPEN_ROLES.length} positions available</p>
          </Reveal>

          <div className="space-y-8 sm:space-y-10">
            {OPEN_ROLES.map((r) => (
              <RoleCard key={r.id} role={r} onApply={applyFor} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ APPLY ═══════════ */}
      <section id="apply" className="relative isolate scroll-mt-20 overflow-hidden bg-slate-950 py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-[#FFC21A]/15 blur-[130px]" />
          <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[130px]" />
        </div>

        <div className={`${CONTAINER} grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12`}>
          <Reveal className="lg:sticky lg:top-28 lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFC21A]">Apply now</p>
            <h2 className="mt-3 text-3xl tracking-tight text-white sm:text-4xl">{role.applyHint}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Pick a role and tell us a little about yourself. We review every application and get in touch if there&apos;s a fit.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Fill in your contact details",
                role.applyWith === "cv" ? "Attach your CV and add a portfolio link if you have one" : "Share a link to your sample videos (CV optional)",
                "Our team reviews your application and reaches out",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC21A] text-sm font-black text-slate-950">{i + 1}</span>
                  <span className="pt-1 text-[15px] text-slate-200">{step}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="rounded-[1.75rem] bg-white p-5 text-slate-900 shadow-2xl sm:p-8 lg:col-span-7">
            <ApplicationForm roleId={roleId} setRoleId={setRoleId} />
          </div>
        </div>
      </section>

      {/* ═══════════ INTERNSHIP CTA ═══════════ */}
      <section className="py-14 sm:py-20">
        <div className={CONTAINER}>
          <Reveal className="flex flex-col gap-6 rounded-[1.75rem] border border-amber-200 bg-[#FFFCF2] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFC21A] text-slate-950">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-xl tracking-tight text-slate-950 sm:text-2xl">Still studying?</h2>
                <p className="mt-1 text-slate-600">Explore our internship programmes and learn digital marketing by doing.</p>
              </div>
            </div>
            <Link
              href="/internship"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl border border-slate-900 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-950 hover:text-white sm:self-auto"
            >
              View internships
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
