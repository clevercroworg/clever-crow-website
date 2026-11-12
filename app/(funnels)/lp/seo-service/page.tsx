import { TEMPLATE_PAGES } from "../digital-marketing-service/page-content";
import { TemplatePage, templateMetadata } from "../digital-marketing-service/template-page";

// SEO, AEO & GEO LP built on the digital-marketing service template (the older /lp/seo page is untouched).
// Keyword versions (?keyword=<slug>, see keywords.ts) are served from ./k/[keyword] by proxy.ts.
const page = TEMPLATE_PAGES["seo-service"];

export const metadata = templateMetadata(page);

export default function SeoServicePage() {
  return <TemplatePage page={page} />;
}
