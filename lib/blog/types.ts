import type { Locale } from "@/lib/i18n/types";

/**
 * Frontmatter fields required on every `content/blog/{locale}/{slug}.mdx`
 * file. `translationKey` links posts that are translations of each other
 * across locales for hreflang alternates.
 */
export interface BlogFrontmatter {
  title: string;
  description: string;
  /** ISO date string (YYYY-MM-DD). */
  date: string;
  /** ISO date string (YYYY-MM-DD). Present only when the post was revised. */
  updated?: string;
  tags: string[];
  locale: Locale;
  slug: string;
  translationKey: string;
  draft?: boolean;
}

/** `BlogFrontmatter` after validation, with `draft` normalized to a boolean. */
export interface BlogPostMeta extends Omit<BlogFrontmatter, "draft"> {
  draft: boolean;
}

/** A validated post's frontmatter plus its raw MDX body (frontmatter stripped). */
export interface BlogPost {
  meta: BlogPostMeta;
  content: string;
}
