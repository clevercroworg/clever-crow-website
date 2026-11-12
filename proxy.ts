import { NextResponse, type NextRequest } from "next/server";
import { readKeyword } from "./app/(funnels)/lp/digital-marketing-service/keywords";

// Dynamic keyword insertion for the template landing pages without rendering on every visit:
// /lp/<page>?keyword=<slug> is served from the pre-built /lp/<page>/k/<slug>. The browser keeps
// the original address (with its UTM tags). Unknown or missing keywords get the default page.
export function proxy(req: NextRequest) {
  const keyword = readKeyword(Object.fromEntries(req.nextUrl.searchParams));
  if (!keyword) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `${url.pathname.replace(/\/$/, "")}/k/${keyword}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/lp/digital-marketing-service", "/lp/lead-generation", "/lp/seo-service", "/lp/social-media-marketing"],
};
