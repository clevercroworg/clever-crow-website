// Shared by the college marketing enquiry form (client) and /api/leads/college (server),
// so both sides apply exactly the same rules.

export const ROLE_OPTIONS = [
  "Owner / Trustee",
  "Director",
  "Principal / Dean",
  "Admissions / Marketing",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Under ₹50,000",
  "₹50,000–₹1 lakh",
  "₹1–3 lakh",
  "Above ₹3 lakh",
  "Need guidance",
] as const;

export type CollegeEnquiry = {
  institution: string;
  city: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  website: string;
  courses: string;
  intake: string;
  budget: string;
  consent: boolean;
};

export type CollegeEnquiryErrors = Partial<Record<keyof CollegeEnquiry, string>>;

export const EMPTY_COLLEGE_ENQUIRY: CollegeEnquiry = {
  institution: "",
  city: "",
  name: "",
  role: "",
  phone: "",
  email: "",
  website: "",
  courses: "",
  intake: "",
  budget: "",
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalisePhone(phone: string) {
  return phone.replace(/[\s\-().]/g, "");
}

function isValidWebsite(value: string) {
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

function checkLength(value: string, min: number, max: number) {
  const length = value.trim().length;
  return length >= min && length <= max;
}

export function validateCollegeEnquiry(values: CollegeEnquiry): CollegeEnquiryErrors {
  const errors: CollegeEnquiryErrors = {};

  if (!checkLength(values.institution, 2, 150)) {
    errors.institution = "Enter your college or institution name.";
  }
  if (!checkLength(values.city, 2, 80)) {
    errors.city = "Enter the city where your institution is located.";
  }
  if (!checkLength(values.name, 2, 80)) {
    errors.name = "Enter your name.";
  }
  if (!(ROLE_OPTIONS as readonly string[]).includes(values.role)) {
    errors.role = "Select your role at the institution.";
  }
  if (!/^\+?\d{10,15}$/.test(normalisePhone(values.phone))) {
    errors.phone = "Enter a valid phone or WhatsApp number, e.g. +91 98765 43210.";
  }
  if (values.email.trim() && (!EMAIL_PATTERN.test(values.email.trim()) || values.email.length > 120)) {
    errors.email = "Enter a valid email address, or leave this blank.";
  }
  if (values.website.trim() && (!isValidWebsite(values.website.trim()) || values.website.length > 200)) {
    errors.website = "Enter a valid website address, e.g. yourcollege.edu.in.";
  }
  if (!checkLength(values.courses, 2, 300)) {
    errors.courses = "Tell us which courses you want to promote.";
  }
  if (values.intake.length > 100) {
    errors.intake = "Keep this under 100 characters.";
  }
  if (values.budget && !(BUDGET_OPTIONS as readonly string[]).includes(values.budget)) {
    errors.budget = "Select a budget range.";
  }
  if (values.consent !== true) {
    errors.consent = "Please agree to be contacted so we can respond to your enquiry.";
  }

  return errors;
}
