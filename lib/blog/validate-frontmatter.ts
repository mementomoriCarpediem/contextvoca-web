import { locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import type { BlogPostMeta } from "./types";

export interface FrontmatterContext {
  /** Locale derived from the containing directory, e.g. `content/blog/ko`. */
  locale: Locale;
  /** Slug derived from the file name (without extension). */
  slug: string;
}

const LOCALE_SET = new Set<string>(locales);
function isLocale(value: string): value is Locale {
  return LOCALE_SET.has(value);
}

const DATE_SHAPE = /^\d{4}-\d{2}-\d{2}$/;

/** True for a `YYYY-MM-DD` string that is also a real calendar date (rejects e.g. `2026-02-30`). */
function isValidDateString(value: string): boolean {
  if (!DATE_SHAPE.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

function fail(context: FrontmatterContext, message: string): never {
  throw new Error(`validateFrontmatter(${context.locale}/${context.slug}): ${message}`);
}

function requireString(
  data: Record<string, unknown>,
  field: string,
  context: FrontmatterContext
): string {
  const value = data[field];
  if (typeof value !== "string" || value === "") {
    fail(context, `missing or invalid required field "${field}"`);
  }
  return value;
}

function requireDateString(
  data: Record<string, unknown>,
  field: string,
  context: FrontmatterContext
): string {
  const value = requireString(data, field, context);
  if (!isValidDateString(value)) {
    fail(context, `"${field}" must be a valid YYYY-MM-DD calendar date, got "${value}"`);
  }
  return value;
}

function optionalDateString(
  data: Record<string, unknown>,
  field: string,
  context: FrontmatterContext
): string | undefined {
  const value = data[field];
  if (value === undefined) return undefined;
  if (typeof value !== "string") {
    fail(context, `"${field}" must be a string when present`);
  }
  if (!isValidDateString(value)) {
    fail(context, `"${field}" must be a valid YYYY-MM-DD calendar date when present, got "${value}"`);
  }
  return value;
}

function requireStringArray(
  data: Record<string, unknown>,
  field: string,
  context: FrontmatterContext
): string[] {
  const value = data[field];
  if (!Array.isArray(value) || !value.every((item): item is string => typeof item === "string")) {
    fail(context, `"${field}" must be an array of strings`);
  }
  return value;
}

function requireLocale(data: Record<string, unknown>, context: FrontmatterContext): Locale {
  const value = requireString(data, "locale", context);
  if (!isLocale(value)) {
    fail(context, `unknown locale "${value}"`);
  }
  if (value !== context.locale) {
    fail(
      context,
      `frontmatter locale "${value}" doesn't match directory locale "${context.locale}"`
    );
  }
  return value;
}

function optionalBoolean(
  data: Record<string, unknown>,
  field: string,
  context: FrontmatterContext
): boolean | undefined {
  const value = data[field];
  if (value === undefined) return undefined;
  if (typeof value !== "boolean") {
    fail(context, `"${field}" must be a boolean when present`);
  }
  return value;
}

/**
 * Validates a raw frontmatter data object (as produced by
 * `parseFrontmatter`) against the `BlogPostMeta` shape, and cross-checks it
 * against the file's own location (`context`) so a copy-pasted frontmatter
 * block that forgets to update `locale`/`slug` fails the build loudly
 * instead of silently mapping to the wrong URL.
 *
 * Every field is pulled through a `typeof`/shape-narrowing helper above
 * rather than parsed with a blind `as` cast, so the return value's types are
 * actually backed by a runtime check.
 */
export function validateFrontmatter(
  data: Record<string, unknown>,
  context: FrontmatterContext
): BlogPostMeta {
  const title = requireString(data, "title", context);
  const description = requireString(data, "description", context);
  const date = requireDateString(data, "date", context);
  const updated = optionalDateString(data, "updated", context);
  const tags = requireStringArray(data, "tags", context);
  const locale = requireLocale(data, context);
  const slug = requireString(data, "slug", context);
  const translationKey = requireString(data, "translationKey", context);
  const draft = optionalBoolean(data, "draft", context);

  if (slug !== context.slug) {
    fail(context, `frontmatter slug "${slug}" doesn't match file name slug "${context.slug}"`);
  }

  return {
    title,
    description,
    date,
    ...(updated !== undefined ? { updated } : {}),
    tags,
    locale,
    slug,
    translationKey,
    draft: draft ?? false,
  };
}
