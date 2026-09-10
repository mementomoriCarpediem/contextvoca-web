import fs from "node:fs";
import path from "node:path";
import { defaultLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";
import { parseFrontmatter } from "./parse-frontmatter";
import { validateFrontmatter } from "./validate-frontmatter";
import { filterPublished, sortByDateDesc } from "./sort-and-filter";
import type { BlogPost, BlogPostMeta } from "./types";

/**
 * Filesystem access for `content/blog/{locale}/{slug}.mdx`. Thin glue over
 * the pure parsing/validation/sorting functions in this directory — kept
 * untested directly (no branching logic of its own) and exercised through
 * `yarn build` against the real `content/blog` tree instead.
 */
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function listSlugsForLocale(locale: Locale): string[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function readPost(locale: Locale, slug: string): BlogPost {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(raw);
  const meta = validateFrontmatter(data, { locale, slug });
  return { meta, content };
}

export function getPost(locale: Locale, slug: string): BlogPost {
  return readPost(locale, slug);
}

export function getPostsMetaByLocale(
  locale: Locale,
  { includeDrafts = false }: { includeDrafts?: boolean } = {}
): BlogPostMeta[] {
  const metas = listSlugsForLocale(locale).map(
    (slug) => readPost(locale, slug).meta
  );
  return sortByDateDesc(includeDrafts ? metas : filterPublished(metas));
}

export function getAllPostsMeta(
  { includeDrafts = false }: { includeDrafts?: boolean } = {}
): BlogPostMeta[] {
  const all = locales.flatMap((locale) =>
    getPostsMetaByLocale(locale, { includeDrafts: true })
  );
  return sortByDateDesc(includeDrafts ? all : filterPublished(all));
}

export function localeHasPublishedPosts(locale: Locale): boolean {
  return getPostsMetaByLocale(locale, { includeDrafts: false }).length > 0;
}

/**
 * `slug` used for the synthetic build-only placeholder route (see
 * `getStaticParamsForBuild`). Never backed by a real content file, so
 * `getPost` must never be called with it — the `[slug]` page special-cases
 * this slug before touching the filesystem.
 */
export const PLACEHOLDER_SLUG = "__placeholder__";
export const PLACEHOLDER_LOCALE: Locale = defaultLocale;

/**
 * Params for `app/[locale]/blog/[slug]/page.tsx`'s `generateStaticParams`.
 *
 * Returns every post (draft included — drafts are rendered as noindex stubs
 * rather than skipped, see the page component) as a flat, locale-independent
 * list. Two `output: "export"` constraints drive this shape (both confirmed
 * against Next.js 15.5.12's build source, `static-paths/app.js`):
 *
 * 1. This function is called once per locale produced by the ancestor
 *    `[locale]` layout's own `generateStaticParams`. If it filtered by the
 *    locale it's called with and returned `[]` for even one locale, Next's
 *    parent/child params merge leaves that locale's entry without a `slug`
 *    key, which fails the whole route's "every param has every key" check
 *    and breaks static generation for *every* locale, not just the empty
 *    one. Returning the same full cross-locale list on every call sidesteps
 *    this — Next dedupes by final pathname.
 * 2. `output: "export"` requires at least one static path per dynamic
 *    segment; a route that would generate zero pages fails the build
 *    outright. If there are truly zero posts (not even drafts — e.g. a
 *    brand new checkout with `content/blog` empty), we return one synthetic
 *    placeholder param instead of `[]` so the build still succeeds. It maps
 *    to no real content file; the page renders it as an empty, noindex stub.
 */
export function getStaticParamsForBuild(): Array<{ locale: Locale; slug: string }> {
  const all = getAllPostsMeta({ includeDrafts: true }).map((post) => ({
    locale: post.locale,
    slug: post.slug,
  }));
  return all.length > 0 ? all : [{ locale: PLACEHOLDER_LOCALE, slug: PLACEHOLDER_SLUG }];
}
