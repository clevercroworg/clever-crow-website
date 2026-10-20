// Dynamic Keyword Insertion (DKI) for the template landing pages.
//
// An ad's final URL carries the keyword, e.g.
//   https://www.clevercrow.in/lp/lead-generation?keyword=digital-marketing-agency
// or, in Google Ads, a tracking template / final URL suffix such as:  keyword={keyword}
// The page then shows a matching headline and browser title.
//
// Only keywords listed here change the page. Unknown or missing keywords show the page's default copy,
// so nobody can put arbitrary text on the site through the URL. To add a keyword: add an entry below
// (lowercase, words joined with hyphens). Accepted URL parameters: keyword, kw, utm_term.

import type { LandingContent } from "./page-content";

export type KeywordVariant = {
  heroTitleLead: string;
  heroTitleAccent: string; // gold part of the headline
  heroSubtitle?: string;
  metaTitle: string;
};

const DM_SUB =
  "Google Ads, Meta Ads, SEO and websites, planned around your business, location and budget, with every enquiry tracked.";
const LEADS_SUB =
  "Targeted campaigns, landing pages and timely follow-ups that turn interest into enquiries for your business.";
const SEO_SUB =
  "Get found on Google and AI search with technical fixes, helpful content and clear monthly reporting.";
const SOCIAL_SUB =
  "Engaging posts, reels and consistent management that build trust and encourage enquiries.";

export const KEYWORD_VARIANTS: Record<string, KeywordVariant> = {
  // Digital marketing
  "digital-marketing-agency": {
    heroTitleLead: "The Digital Marketing Agency That Brings You",
    heroTitleAccent: "More Enquiries.",
    heroSubtitle: DM_SUB,
    metaTitle: "Digital Marketing Agency | Clever Crow",
  },
  "digital-marketing-company": {
    heroTitleLead: "A Digital Marketing Company Focused on",
    heroTitleAccent: "Real Business Results.",
    heroSubtitle: DM_SUB,
    metaTitle: "Digital Marketing Company | Clever Crow",
  },
  "digital-marketing-services": {
    heroTitleLead: "Digital Marketing Services That Turn Clicks Into",
    heroTitleAccent: "Business Enquiries.",
    heroSubtitle: DM_SUB,
    metaTitle: "Digital Marketing Services | Clever Crow",
  },
  "online-marketing-agency": {
    heroTitleLead: "Online Marketing That Brings You",
    heroTitleAccent: "Qualified Enquiries.",
    heroSubtitle: DM_SUB,
    metaTitle: "Online Marketing Agency | Clever Crow",
  },
  "performance-marketing-agency": {
    heroTitleLead: "Performance Marketing Built Around",
    heroTitleAccent: "Cost per Lead.",
    heroSubtitle: DM_SUB,
    metaTitle: "Performance Marketing Agency | Clever Crow",
  },

  // Lead generation & ads
  "lead-generation": {
    heroTitleLead: "Lead Generation That Brings You",
    heroTitleAccent: "Qualified Enquiries.",
    heroSubtitle: LEADS_SUB,
    metaTitle: "Lead Generation Services | Clever Crow",
  },
  "lead-generation-agency": {
    heroTitleLead: "A Lead Generation Agency Focused on",
    heroTitleAccent: "Quality Enquiries.",
    heroSubtitle: LEADS_SUB,
    metaTitle: "Lead Generation Agency | Clever Crow",
  },
  "google-ads-agency": {
    heroTitleLead: "Google Ads Campaigns That Bring",
    heroTitleAccent: "Ready-to-Buy Customers.",
    heroSubtitle: LEADS_SUB,
    metaTitle: "Google Ads Agency | Clever Crow",
  },
  "google-ads-management": {
    heroTitleLead: "Google Ads Management That Lowers Your",
    heroTitleAccent: "Cost per Lead.",
    heroSubtitle: LEADS_SUB,
    metaTitle: "Google Ads Management | Clever Crow",
  },
  "meta-ads-agency": {
    heroTitleLead: "Facebook & Instagram Ads That Bring",
    heroTitleAccent: "Real Enquiries.",
    heroSubtitle: LEADS_SUB,
    metaTitle: "Meta Ads Agency | Clever Crow",
  },
  "facebook-ads-agency": {
    heroTitleLead: "Facebook & Instagram Ads That Bring",
    heroTitleAccent: "Real Enquiries.",
    heroSubtitle: LEADS_SUB,
    metaTitle: "Facebook Ads Agency | Clever Crow",
  },

  // SEO
  "seo-agency": {
    heroTitleLead: "An SEO Agency That Helps Customers",
    heroTitleAccent: "Find Your Business.",
    heroSubtitle: SEO_SUB,
    metaTitle: "SEO Agency | Clever Crow",
  },
  "seo-services": {
    heroTitleLead: "SEO Services That Put Your Business in",
    heroTitleAccent: "Front of Customers.",
    heroSubtitle: SEO_SUB,
    metaTitle: "SEO Services | Clever Crow",
  },
  "seo-company": {
    heroTitleLead: "An SEO Company Focused on",
    heroTitleAccent: "Enquiries, Not Just Rankings.",
    heroSubtitle: SEO_SUB,
    metaTitle: "SEO Company | Clever Crow",
  },
  "local-seo": {
    heroTitleLead: "Be the Business Customers Find",
    heroTitleAccent: "Near Them.",
    heroSubtitle: SEO_SUB,
    metaTitle: "Local SEO Services | Clever Crow",
  },

  // Social media
  "social-media-marketing": {
    heroTitleLead: "Social Media Marketing That Builds",
    heroTitleAccent: "Trust & Enquiries.",
    heroSubtitle: SOCIAL_SUB,
    metaTitle: "Social Media Marketing | Clever Crow",
  },
  "social-media-agency": {
    heroTitleLead: "A Social Media Agency That Keeps Your Brand",
    heroTitleAccent: "Active & Trusted.",
    heroSubtitle: SOCIAL_SUB,
    metaTitle: "Social Media Agency | Clever Crow",
  },
  "social-media-management": {
    heroTitleLead: "Social Media Management, Done",
    heroTitleAccent: "Consistently.",
    heroSubtitle: SOCIAL_SUB,
    metaTitle: "Social Media Management | Clever Crow",
  },
};

type SearchParams = Record<string, string | string[] | undefined>;

/** "Digital Marketing Agency", "digital+marketing+agency", "[digital marketing agency]" -> "digital-marketing-agency" */
export function normaliseKeyword(raw: string) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function readKeyword(searchParams: SearchParams | undefined) {
  if (!searchParams) return undefined;
  for (const key of ["keyword", "kw", "utm_term"]) {
    const value = searchParams[key];
    const raw = Array.isArray(value) ? value[0] : value;
    if (raw) {
      const slug = normaliseKeyword(raw);
      if (KEYWORD_VARIANTS[slug]) return slug;
    }
  }
  return undefined;
}

/** Page content with the keyword's headline applied, plus the browser title to use. */
export function applyKeyword(content: LandingContent, searchParams: SearchParams | undefined) {
  const slug = readKeyword(searchParams);
  const variant = slug ? KEYWORD_VARIANTS[slug] : undefined;
  if (!variant) return { content, metaTitle: undefined, keyword: undefined };
  return {
    content: {
      ...content,
      heroTitleLead: variant.heroTitleLead,
      heroTitleAccent: variant.heroTitleAccent,
      heroAccentOwnLine: false,
      heroSubtitle: variant.heroSubtitle ?? content.heroSubtitle,
      leadSource: `${content.leadSource} [kw: ${slug}]`,
    },
    metaTitle: variant.metaTitle,
    keyword: slug,
  };
}
