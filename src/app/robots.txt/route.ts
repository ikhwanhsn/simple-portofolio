import { SITE_URL } from "@/data/profile";

export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *
Allow: /

# Machine-readable profile for LLMs and agents
# https://llmstxt.org/
Llms-Txt: ${SITE_URL}/llms.txt

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
