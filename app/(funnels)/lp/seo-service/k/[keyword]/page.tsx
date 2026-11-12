import { TEMPLATE_PAGES } from "../../../digital-marketing-service/page-content";
import { TemplatePage, keywordParams, templateMetadata } from "../../../digital-marketing-service/template-page";

// Pre-built keyword version of /lp/seo-service. Visitors reach it through proxy.ts with
// /lp/seo-service?keyword=<slug>; the address in the browser stays the same.
const page = TEMPLATE_PAGES["seo-service"];

export const dynamicParams = false;
export const generateStaticParams = keywordParams;

type Props = { params: Promise<{ keyword: string }> };

export async function generateMetadata({ params }: Props) {
  return templateMetadata(page, (await params).keyword);
}

export default async function SeoServicePageKeyword({ params }: Props) {
  return <TemplatePage page={page} keyword={(await params).keyword} />;
}
