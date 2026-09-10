import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import type { BlogPostMeta } from "./types";

const REQUIRED_STRING_FIELDS = [
  "title",
  "description",
  "date",
  "locale",
  "slug",
  "translationKey",
] as const;

export interface FrontmatterContext {
  /** Locale derived from the containing directory, e.g. `content/blog/ko`. */
  locale: Locale;
  /** Slug derived from the file name (without extension). */
  slug: string;
}

/**
 * Validates a raw frontmatter data object (as produced by
 * `parseFrontmatter`) against the `BlogPostMeta` shape, and cross-checks it
 * against the file's own location (`context`) so a copy-pasted frontmatter
 * block that forgets to update `locale`/`slug` fails the build loudly
 * instead of silently mapping to the wrong URL.
 */
export function validateFrontmatter(
  data: Record<string, unknown>,
  context: FrontmatterContext
): BlogPostMeta {
  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof data[field] !== "string" || data[field] === "") {
      throw new Error(
        `validateFrontmatter(${context.locale}/${context.slug}): missing or invalid required field "${field}"`
      );
    }
  }

  if (!Array.isArray(data.tags) || !data.tags.every((t) => typeof t === "string")) {
    throw new Error(
      `validateFrontmatter(${context.locale}/${context.slug}): "tags" must be an array of strings`
    );
  }

  if (!(locales as string[]).includes(data.locale as string)) {
    throw new Error(
      `validateFrontmatter(${context.locale}/${context.slug}): unknown locale "${String(data.locale)}"`
    );
  }
  if (data.locale !== context.locale) {
    throw new Error(
      `validateFrontmatter(${context.locale}/${context.slug}): frontmatter locale "${String(data.locale)}" doesn't match directory locale "${context.locale}"`
    );
  }
  if (data.slug !== context.slug) {
    throw new Error(
      `validateFrontmatter(${context.locale}/${context.slug}): frontmatter slug "${String(data.slug)}" doesn't match file name slug "${context.slug}"`
    );
  }

  if (data.updated !== undefined && typeof data.updated !== "string") {
    throw new Error(
      `validateFrontmatter(${context.locale}/${context.slug}): "updated" must be a string when present`
    );
  }
  if (data.draft !== undefined && typeof data.draft !== "boolean") {
    throw new Error(
      `validateFrontmatter(${context.locale}/${context.slug}): "draft" must be a boolean when present`
    );
  }

  return {
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    ...(data.updated !== undefined ? { updated: data.updated as string } : {}),
    tags: data.tags as string[],
    locale: data.locale as Locale,
    slug: data.slug as string,
    translationKey: data.translationKey as string,
    draft: (data.draft as boolean | undefined) ?? false,
  };
}
