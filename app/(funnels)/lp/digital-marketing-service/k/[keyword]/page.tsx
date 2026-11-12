import { TEMPLATE_PAGES } from "../../page-content";
import { TemplatePage, keywordParams, templateMetadata } from "../../template-page";

// Pre-built keyword version of /lp/digital-marketing-service. Visitors reach it through proxy.ts with
// /lp/digital-marketing-service?keyword=<slug>; the address in the browser stays the same.
const page = TEMPLATE_PAGES["digital-marketing-service"];

export const dynamicParams = false;
export const generateStaticParams = keywordParams;

type Props = { params: Promise<{ keyword: string }> };

export async function generateMetadata({ params }: Props) {
  return templateMetadata(page, (await params).keyword);
}

export default async function DigitalMarketingServicePageKeyword({ params }: Props) {
  return <TemplatePage page={page} keyword={(await params).keyword} />;
}
