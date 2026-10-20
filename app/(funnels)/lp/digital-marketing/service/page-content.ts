// Per-page content for landing pages built on the digital-marketing service template.
// Everything else (results, industries, reels, testimonials, FAQ, footer) is shared.

export type LandingContent = {
  heroTitleLead: string;
  heroTitleAccent: string; // shown in gold
  heroAccentOwnLine?: boolean; // start the gold part on a new line
  heroSubtitle: string;
  servicesSection: "plans" | "lead-generation";
  leadSource: string; // label in lead emails
  whatsappMessage: string;
};

export const SERVICE_CONTENT: LandingContent = {
  heroTitleLead: "Turn More Searches & Clicks Into",
  heroTitleAccent: "Business Enquiries.",
  heroSubtitle: "Grow your business with digital marketing that brings more leads and sales.",
  servicesSection: "plans",
  leadSource: "Digital Marketing Service Landing Page",
  whatsappMessage: "Hi Clever Crow, I'm interested in digital marketing services. (Ref: LP/Digital-Marketing/Service)",
};

export const LEAD_GENERATION_CONTENT: LandingContent = {
  heroTitleLead: "More Qualified Enquiries.",
  heroTitleAccent: "More Opportunities to Grow.",
  heroAccentOwnLine: true,
  heroSubtitle:
    "Reach the right customers with targeted campaigns, effective landing pages and timely follow-ups—all built around your business and budget.",
  servicesSection: "lead-generation",
  leadSource: "Lead Generation Landing Page",
  whatsappMessage: "Hi Clever Crow, I'm interested in a lead generation campaign. (Ref: LP/Lead-Generation)",
};
