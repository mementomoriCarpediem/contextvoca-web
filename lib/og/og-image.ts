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

/**
 * Per-image byte budget. The upper bound keeps share cards cheap to fetch; the
 * lower bound is a blankness tripwire — a 1200x675 *solid* PNG is ~3.4 KB, so
 * an image that renders nothing would sail through a size-and-dimensions-only
 * check (measured: solid 3,401 B, real cards 26,442–73,388 B).
 */
export const OG_IMAGE_MAX_BYTES = 200_000;
export const OG_IMAGE_MIN_BYTES = 12_000;

/**
 * Center crop the motif always covers, even at the smallest motif size
 * (368 px, i.e. x 416–784, y 153–521). Sampling here rather than the whole
 * canvas is what separates "motif drawn" from "background gradient only":
 * bytes cannot, because a vertical gradient compresses to ~26 KB while a
 * diagonal gradient with no motif at all is ~31 KB.
 */
export const OG_IMAGE_PROBE = { left: 420, top: 158, width: 360, height: 360 } as const;

/**
 * Minimum per-channel standard deviation inside `OG_IMAGE_PROBE`. Measured
 * across all 14 posts plus every palette/motif probe: real cards score
 * 40.0–97.4, a gradient-only canvas scores 11.9 and a solid fill scores 0.
 * 20 sits at half the observed floor and well clear of both blank cases.
 */
export const OG_IMAGE_MIN_PROBE_STDEV = 20;

/** Site-root-relative path of a post's OG image, e.g. `/og/ko/my-post.png`. */
export function ogImagePathname(locale: string, slug: string): string {
  return `/og/${locale}/${slug}.png`;
}

/** Absolute OG image URL — what `og:image`, `twitter:image` and JSON-LD carry. */
export function ogImageUrl(origin: string, locale: string, slug: string): string {
  return `${origin.replace(/\/+$/, "")}${ogImagePathname(locale, slug)}`;
}
