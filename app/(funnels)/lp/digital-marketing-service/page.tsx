import { TEMPLATE_PAGES } from "./page-content";
import { TemplatePage, templateMetadata } from "./template-page";

// Copy of /lp/digital-marketing that is being redesigned separately; the original page is untouched.
// Keyword versions (?keyword=<slug>, see keywords.ts) are served from ./k/[keyword] by proxy.ts.
const page = TEMPLATE_PAGES["digital-marketing-service"];

export const metadata = templateMetadata(page);

export default function DigitalMarketingServicePage() {
  return <TemplatePage page={page} />;
}
