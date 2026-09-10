import type { MetadataRoute } from "next";
import { htmlLangMap } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { pickPreferredLocale } from "@/lib/blog/pick-preferred-locale";
import { localizedUrl } from "./site";

/**
 * Sitemap entries for the `/{locale}/blog` list page — one per locale in
 * `localesWithPosts`, hreflang-linked only to each other (a locale with zero
 * published posts is `noindex` and must not appear here or as an alternate
 * target of a locale that does have posts). Pure so the locale-filtering
 * behavior itself is unit-testable without touching the filesystem.
 */
export function buildBlogListSitemapEntries(
  localesWithPosts: readonly Locale[]
): MetadataRoute.Sitemap {
  if (localesWithPosts.length === 0) return [];

  const languages = Object.fromEntries(
    localesWithPosts.map((locale) => [htmlLangMap[locale], localizedUrl(locale, "/blog")])
  );
  const preferredLocale = pickPreferredLocale(localesWithPosts)!; // non-empty, guaranteed to resolve

  return localesWithPosts.map((locale) => ({
    url: localizedUrl(locale, "/blog"),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    alternates: {
      languages: { ...languages, "x-default": localizedUrl(preferredLocale, "/blog") },
    },
  }));
}
