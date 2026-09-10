import { getAllPostsMeta } from "@/lib/blog/posts";
import { buildLlmsTxt } from "@/lib/blog/llms-txt";

// Required for `output: "export"` — no request-time inputs, so this route
// prerenders to a static /llms.txt file at build time (was previously a
// static file at public/llms.txt; moved here so the "## Blog" section can be
// generated from content/blog instead of hand-maintained).
export const dynamic = "force-static";

const BASE_LLMS_TXT = `# ContextVoca

> AI-powered vocabulary app that turns photos and sentences into a personal English vocabulary list, then reinforces retention with adaptive quizzes.

Platforms: iOS, Android
Plans: Free (up to 100 words), Basic (up to 1,000 words), Pro (unlimited words) — monthly or yearly subscription; Lifetime (unlimited words, one-time purchase). Exact pricing is shown in the app's subscription screen.
Support: support@contextvoca.app

## Localized pages
- Korean: https://contextvoca.app/ko/
- English: https://contextvoca.app/en/
- Japanese: https://contextvoca.app/ja/
- Chinese (Simplified): https://contextvoca.app/zh/
- Chinese (Traditional, Taiwan/Hong Kong): https://contextvoca.app/zh-Hant/
`;

export function GET() {
  const body = buildLlmsTxt(BASE_LLMS_TXT, getAllPostsMeta());
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
