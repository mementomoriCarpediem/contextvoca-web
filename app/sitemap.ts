import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL, LocalizedPathSuffix, localizedUrl } from "@/lib/seo/site";
import { getAllPostsMeta, localeHasPublishedPosts } from "@/lib/blog/posts";
import { buildPostAlternates } from "@/lib/blog/hreflang";
import { buildBlogListSitemapEntries } from "@/lib/seo/sitemap-blog-entries";

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
            "zh-Hant": `${SITE_URL}/zh-Hant${suffix}/`,
            "x-default": `${SITE_URL}/en${suffix}/`,
          },
        },
      });
    }
  }

  // Blog list page — only locales with >=1 published post: a locale with
  // zero posts is `noindex` (see app/[locale]/blog/page.tsx) and must not be
  // submitted to search engines or advertised as a hreflang alternate.
  const localesWithPosts = locales.filter((locale) => localeHasPublishedPosts(locale));
  entries.push(...buildBlogListSitemapEntries(localesWithPosts));

  // Blog posts — published only (getAllPostsMeta defaults to excluding drafts).
  const posts = getAllPostsMeta();
  for (const post of posts) {
    const alternates = buildPostAlternates(post, posts);
    entries.push({
      url: alternates.canonical,
      lastModified: post.updated ?? post.date,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: alternates.languages },
    });
  }

  return entries;
}
