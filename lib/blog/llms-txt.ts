import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { localizedBlogPostUrl } from "@/lib/seo/site";
import { filterPublished, sortByDateDesc } from "./sort-and-filter";
import type { BlogPostMeta } from "./types";

/** Matches the "## Localized pages" labels already used in `public/llms.txt`. */
const LOCALE_LABELS: Record<Locale, string> = {
  ko: "Korean",
  en: "English",
  ja: "Japanese",
  zh: "Chinese (Simplified)",
  "zh-Hant": "Chinese (Traditional, Taiwan/Hong Kong)",
};

/**
 * Appends a "## Blog" section (grouped by locale, newest first, drafts
 * excluded) to `base` — the site's existing static `llms.txt` content,
 * unmodified. Locales with no published posts are omitted entirely.
 */
export function buildLlmsTxt(base: string, posts: readonly BlogPostMeta[]): string {
  const published = filterPublished(posts);
  if (published.length === 0) return base;

  const sections: string[] = [];
  for (const locale of locales) {
    const postsForLocale = sortByDateDesc(
      published.filter((p) => p.locale === locale)
    );
    if (postsForLocale.length === 0) continue;

    const lines = postsForLocale.map(
      (p) => `  - ${p.title}: ${localizedBlogPostUrl(p.locale, p.slug)}`
    );
    sections.push(`- ${LOCALE_LABELS[locale]}:\n${lines.join("\n")}`);
  }

  return `${base}\n## Blog\n${sections.join("\n")}\n`;
}
