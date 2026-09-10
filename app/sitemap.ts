import type { MetadataRoute } from "next";
import { htmlLangMap, locales } from "@/lib/i18n";
import { SITE_URL, LocalizedPathSuffix, localizedUrl } from "@/lib/seo/site";
import { getAllPostsMeta } from "@/lib/blog/posts";
import { buildPostAlternates } from "@/lib/blog/hreflang";

// Required for `output: "export"` — this route has no request-time inputs,
// so it can be fully prerendered to a static sitemap.xml at build time.
export const dynamic = "force-static";

const PAGES: Array<{
  suffix: LocalizedPathSuffix;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { suffix: "", changeFrequency: "weekly", priority: 1.0 },
  { suffix: "/support", changeFrequency: "monthly", priority: 0.7 },
  { suffix: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { suffix: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { suffix, changeFrequency, priority } of PAGES) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${suffix}/`,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ko: `${SITE_URL}/ko${suffix}/`,
            en: `${SITE_URL}/en${suffix}/`,
            ja: `${SITE_URL}/ja${suffix}/`,
            "zh-Hans": `${SITE_URL}/zh${suffix}/`,
            "x-default": `${SITE_URL}/en${suffix}/`,
          },
        },
      });
    }
  }

  // Blog list page — one per locale, correct 5-language hreflang map
  // (unlike PAGES above, kept separate rather than reusing its ko/en/ja/zh-only
  // block so the new pages don't inherit that existing gap).
  const blogListLanguages = Object.fromEntries(
    locales.map((locale) => [htmlLangMap[locale], localizedUrl(locale, "/blog")])
  );
  for (const locale of locales) {
    entries.push({
      url: localizedUrl(locale, "/blog"),
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: {
        languages: { ...blogListLanguages, "x-default": localizedUrl("en", "/blog") },
      },
    });
  }

  // Blog posts — published only (getAllPostsMeta defaults to excluding drafts).
  const posts = getAllPostsMeta();
  for (const post of posts) {
    const alternates = buildPostAlternates(post, posts);
    entries.push({
      url: alternates.canonical,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: alternates.languages },
    });
  }

  return entries;
}
