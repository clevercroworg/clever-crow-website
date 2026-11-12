import { TEMPLATE_PAGES } from "../digital-marketing-service/page-content";
import { TemplatePage, templateMetadata } from "../digital-marketing-service/template-page";

// Lead-generation LP built on the digital-marketing service template.
// Keyword versions (?keyword=<slug>, see keywords.ts) are served from ./k/[keyword] by proxy.ts.
const page = TEMPLATE_PAGES["lead-generation"];

export const metadata = templateMetadata(page);

export default function LeadGenerationPage() {
  return <TemplatePage page={page} />;
}
