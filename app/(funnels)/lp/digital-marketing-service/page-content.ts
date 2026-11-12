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
  // Optional, per page (pages that leave these out are unchanged):
  pricingPackages?: PricingPackage[]; // monthly packages section above the services
  partnerBadges?: boolean; // "Partner of Google / Meta" strip instead of the platforms list
  ctaTitle?: string; // heading of the dark call-to-action panel
};

export type PricingPackage = {
  name: string;
  price: string; // e.g. "₹19,999"
  includes: string[];
  bestFor: string;
  highlight?: string; // small label on the card, e.g. "Recommended"
};

export const SERVICE_CONTENT: LandingContent = {
  heroTitleLead: "Grow Your Business With",
  heroTitleAccent: "Digital Marketing",
  heroAccentOwnLine: true,
  heroSubtitle: "Get More Website Visitors, Enquiries and Sales With Digital Marketing Strategies.",
  servicesSection: "plans",
  pricingPackages: [
    {
      name: "Focused Growth",
      price: "₹19,999",
      includes: ["Google Ads or Meta Ads (one channel)", "Landing page optimisation guidance", "Conversion tracking"],
      bestFor: "Businesses starting with one advertising channel",
    },
    {
      name: "Paid Growth",
      price: "₹29,999",
      includes: ["Google Ads and Meta Ads", "Remarketing where eligible", "Conversion tracking", "Combined reporting"],
      bestFor: "Businesses ready to advertise across both platforms",
      highlight: "Recommended",
    },
    {
      name: "Integrated Growth",
      price: "₹44,999",
      includes: ["Google Ads and Meta Ads", "A defined SEO / content scope"],
      bestFor: "Businesses investing in enquiries and organic visibility together",
    },
  ],
  partnerBadges: true,
  ctaTitle: "Ready to Get More Enquiries?",
  leadSource: "Digital Marketing Service Landing Page",
  whatsappMessage: "Hi Clever Crow, I'm interested in digital marketing services. (Ref: LP/Digital-Marketing-Service)",
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
