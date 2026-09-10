import { htmlLangMap } from "@/lib/i18n";
import { localizedBlogPostUrl } from "@/lib/seo/site";
import { filterPublished } from "./sort-and-filter";
import { pickPreferredLocale } from "./pick-preferred-locale";
import type { BlogPostMeta } from "./types";

export interface PostAlternates {
  canonical: string;
  languages: Partial<Record<string, string>>;
}

/**
 * Builds `alternates` metadata for a single blog post: canonical URL plus a
 * hreflang map of every *published* post that shares the same
 * `translationKey` (including the post itself). `x-default` is chosen by
 * `pickPreferredLocale` from that cluster's available locales — English if
 * published, else deterministically the first available locale in `locales`
 * order — independent of which post's page is currently rendering metadata
 * (see `pick-preferred-locale.ts` for why that matters).
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

  // `post` is always published when this function is called (draft pages
  // never reach it), so it's always present in `translations` — the cluster
  // is never empty and `pickPreferredLocale` always resolves.
  const preferredLocale = pickPreferredLocale(translations.map((t) => t.locale))!;
  const xDefaultTarget = translations.find((t) => t.locale === preferredLocale)!;
  languages["x-default"] = localizedBlogPostUrl(xDefaultTarget.locale, xDefaultTarget.slug);

  return {
    canonical: localizedBlogPostUrl(post.locale, post.slug),
    languages,
  };
}
