import { htmlLangMap } from "@/lib/i18n";
import { localizedBlogPostUrl } from "@/lib/seo/site";
import { filterPublished } from "./sort-and-filter";
import type { BlogPostMeta } from "./types";

export interface PostAlternates {
  canonical: string;
  languages: Partial<Record<string, string>>;
}

/**
 * Builds `alternates` metadata for a single blog post: canonical URL plus a
 * hreflang map of every *published* post that shares the same
 * `translationKey` (including the post itself). `x-default` points at the
 * English translation when one is published, otherwise falls back to the
 * post being rendered.
 */
export function buildPostAlternates(
  post: BlogPostMeta,
  allPosts: readonly BlogPostMeta[]
): PostAlternates {
  const translations = filterPublished(allPosts).filter(
    (p) => p.translationKey === post.translationKey
  );

  const languages: Partial<Record<string, string>> = {};
  for (const translation of translations) {
    languages[htmlLangMap[translation.locale]] = localizedBlogPostUrl(
      translation.locale,
      translation.slug
    );
  }

  const english = translations.find((p) => p.locale === "en");
  languages["x-default"] = english
    ? localizedBlogPostUrl(english.locale, english.slug)
    : localizedBlogPostUrl(post.locale, post.slug);

  return {
    canonical: localizedBlogPostUrl(post.locale, post.slug),
    languages,
  };
}
