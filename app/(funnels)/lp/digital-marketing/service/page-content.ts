// Per-page content for landing pages built on the digital-marketing service template.
// Everything else (results, industries, reels, testimonials, FAQ, footer) is shared.
import { LEAD_GEN_INCLUDED, SEO_INCLUDED, SOCIAL_INCLUDED, type IncludedContent } from "./IncludedSection";

export type LandingContent = {
  heroEyebrow?: string;
  heroTitleLead: string;
  heroTitleAccent: string; // shown in gold
  heroAccentOwnLine?: boolean; // start the gold part on a new line
  heroSubtitle: string;
  // "plans": the service plan cards; otherwise a "What's Included" deliverables section.
  servicesSection: "plans" | IncludedContent;
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
  servicesSection: LEAD_GEN_INCLUDED,
  leadSource: "Lead Generation Landing Page",
  whatsappMessage: "Hi Clever Crow, I'm interested in a lead generation campaign. (Ref: LP/Lead-Generation)",
};

export const SEO_SERVICE_CONTENT: LandingContent = {
  heroEyebrow: "SEO, AEO & GEO Services",
  heroTitleLead: "Help Customers Find Your Business on",
  heroTitleAccent: "Google & AI Search.",
  heroSubtitle:
    "Grow your visibility across search engines and AI platforms with content and website improvements that help customers discover your business.",
  servicesSection: SEO_INCLUDED,
  leadSource: "SEO Service Landing Page",
  whatsappMessage: "Hi Clever Crow, I'm interested in SEO, AEO & GEO services. (Ref: LP/SEO-Service)",
};

export const SOCIAL_MEDIA_SERVICE_CONTENT: LandingContent = {
  heroEyebrow: "Social Media Management Services",
  heroTitleLead: "Build a Brand Your Customers",
  heroTitleAccent: "Recognise & Remember.",
  heroSubtitle:
    "Keep your business active on social media with engaging posts, reels and consistent management that builds trust and encourages enquiries.",
  servicesSection: SOCIAL_INCLUDED,
  leadSource: "Social Media Service Landing Page",
  whatsappMessage: "Hi Clever Crow, I'm interested in social media management. (Ref: LP/Social-Media-Marketing)",
};
