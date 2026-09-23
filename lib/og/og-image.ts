/**
 * Where a post's generated OG image lives, in one place.
 *
 * Three consumers must agree on this string or the wiring silently breaks:
 * the build-time generator (`scripts/generate-og-images.mjs`, which writes the
 * file), the page metadata + Article schema (which advertise the URL), and the
 * post-build checker (`scripts/check-og-images.mjs`). The two `.mjs` scripts
 * load this module through `scripts/load-ts-module.mjs`, so it must stay free
 * of runtime imports — only `import type` (erased at transpile) is allowed.
 *
 * `origin` is a parameter rather than an import of `SITE_URL` for the same
 * reason: the checker derives the origin from the built sitemap, so no second
 * copy of the site origin exists anywhere.
 */

/** 16:9. Above Google Discover's "at least 1200 px wide / >300,000 px" floor. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 675;

/** Site-root-relative path of a post's OG image, e.g. `/og/ko/my-post.png`. */
export function ogImagePathname(locale: string, slug: string): string {
  return `/og/${locale}/${slug}.png`;
}

/** Absolute OG image URL — what `og:image`, `twitter:image` and JSON-LD carry. */
export function ogImageUrl(origin: string, locale: string, slug: string): string {
  return `${origin.replace(/\/+$/, "")}${ogImagePathname(locale, slug)}`;
}
