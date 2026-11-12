import { TEMPLATE_PAGES } from "../digital-marketing-service/page-content";
import { TemplatePage, templateMetadata } from "../digital-marketing-service/template-page";

// Social media management LP built on the digital-marketing service template (the older /lp/smm page is untouched).
// Keyword versions (?keyword=<slug>, see keywords.ts) are served from ./k/[keyword] by proxy.ts.
const page = TEMPLATE_PAGES["social-media-marketing"];

export const metadata = templateMetadata(page);

export default function SocialMediaServicePage() {
  return <TemplatePage page={page} />;
}
