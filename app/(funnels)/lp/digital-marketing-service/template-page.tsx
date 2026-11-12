import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import DigitalMarketingServiceClient from "./DigitalMarketingServiceClient";
import { KEYWORD_VARIANTS, applyKeywordSlug } from "./keywords";
import type { TemplatePageConfig } from "./page-content";

// Shared by the template landing pages (page-content.ts → TEMPLATE_PAGES) and their keyword versions
// (/lp/<page>/k/<keyword>). Everything here is static, so each version is pre-built and cached.

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-svc",
  display: "swap",
});

export function templateMetadata(page: TemplatePageConfig, keyword?: string): Metadata {
  const { metaTitle } = applyKeywordSlug(page.content, keyword);
  return {
    title: metaTitle ?? page.title,
    description: page.description,
    robots: { index: false, follow: false },
  };
}

/** One pre-built version per keyword in keywords.ts. */
export function keywordParams() {
  return Object.keys(KEYWORD_VARIANTS).map((keyword) => ({ keyword }));
}

export function TemplatePage({ page, keyword }: { page: TemplatePageConfig; keyword?: string }) {
  const { content } = applyKeywordSlug(page.content, keyword);
  return (
    <div className={jakarta.variable}>
      <DigitalMarketingServiceClient content={content} />
    </div>
  );
}
