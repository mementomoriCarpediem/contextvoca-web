import fs from "node:fs";
import path from "node:path";
import { locales } from "@/lib/i18n";
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
