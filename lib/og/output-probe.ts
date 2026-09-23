/**
 * Readers for the built site (`out/`), used by `scripts/check-og-images.mjs`.
 *
 * They live here rather than inside the script so the parsing — the part that
 * can quietly stop matching and turn the checker into a rubber stamp — is unit
 * tested. The script keeps the filesystem walking and the assembling.
 * (`scripts/indexnow-submit.mjs` + `.test.mjs` set the precedent.)
 *
 * Pure and import-free, like the rest of `lib/og` (see `og-image.ts`).
 */

export interface SitemapPost {
  readonly origin: string;
  readonly locale: string;
  readonly slug: string;
}

/** `https://host/{locale}/blog/{slug}/` — the list page `/{locale}/blog/` doesn't match. */
const POST_URL = /^(https?:\/\/[^/]+)\/([^/]+)\/blog\/([^/]+)\/$/;

/**
 * Blog post URLs in a sitemap, split into parts. The sitemap is built by the
 * app's own post loader, which makes it an independent answer to "what is
 * published" — deliberately not re-derived from `content/blog`.
 */
export function parseSitemapPostUrls(xml: string): SitemapPost[] {
  const posts: SitemapPost[] = [];
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const match = loc.match(POST_URL);
    if (match) posts.push({ origin: match[1], locale: match[2], slug: match[3] });
  }
  return posts;
}

/** All `<meta>` tags in `html`, as attribute maps. */
function metaTags(html: string): Array<Record<string, string>> {
  return [...html.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => {
    const attrs: Record<string, string> = {};
    for (const [, name, value] of tag.matchAll(/([a-zA-Z:_-]+)="([^"]*)"/g)) {
      attrs[name] = value;
    }
    return attrs;
  });
}

/**
 * `content` values of every `<meta>` whose `property` or `name` is exactly
 * `key`. Exact, not substring: `og:image` must not be satisfied by the
 * presence of `og:image:width`.
 */
export function metaContents(html: string, key: string): string[] {
  return metaTags(html)
    .filter((attrs) => attrs.property === key || attrs.name === key)
    .map((attrs) => attrs.content)
    .filter((content): content is string => content !== undefined);
}

export interface JsonLdBlocks {
  readonly blocks: Array<Record<string, unknown>>;
  /** Scripts that failed to parse — a defect in itself, reported by the caller. */
  readonly invalid: number;
}

export function parseJsonLdBlocks(html: string): JsonLdBlocks {
  const blocks: Array<Record<string, unknown>> = [];
  let invalid = 0;

  for (const [, raw] of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )) {
    try {
      blocks.push(JSON.parse(raw) as Record<string, unknown>);
    } catch {
      invalid += 1;
    }
  }

  return { blocks, invalid };
}

export interface ArticleImage {
  /** The raw `image` value, for error messages. */
  readonly image: unknown;
  /** The same value as a list of strings — `[]` when absent or non-string. */
  readonly urls: string[];
}

/** One entry per `Article` block, so a missing image is visible rather than skipped. */
export function articleImageSets(blocks: readonly unknown[]): ArticleImage[] {
  return blocks
    .filter(
      (block): block is Record<string, unknown> =>
        typeof block === "object" && block !== null && (block as Record<string, unknown>)["@type"] === "Article"
    )
    .map((block) => {
      const image = block.image;
      const candidates = Array.isArray(image) ? image : [image];
      return {
        image,
        urls: candidates.filter((value): value is string => typeof value === "string"),
      };
    });
}

export interface GeneratedImage {
  /** Site-root-relative path, e.g. `/og/ko/my-post.png`. */
  readonly pathname: string;
  readonly slug: string;
  /** Content hash of the file as shipped. */
  readonly digest: string;
}

/**
 * Groups of images that are byte-identical but belong to *different* posts —
 * each group is a bug: two posts would be indistinguishable when shared.
 *
 * A post translated into several locales keeps one slug and is expected to
 * carry one card, so single-slug groups are not reported.
 */
export function findSharedImageGroups(images: readonly GeneratedImage[]): string[][] {
  const byDigest = new Map<string, GeneratedImage[]>();
  for (const image of images) {
    const group = byDigest.get(image.digest);
    if (group) group.push(image);
    else byDigest.set(image.digest, [image]);
  }

  return [...byDigest.values()]
    .filter((group) => new Set(group.map((image) => image.slug)).size > 1)
    .map((group) => group.map((image) => image.pathname));
}
