import type { Metadata } from "next";

/**
 * The `/{locale}/blog` list page must not be indexable when its locale has
 * zero published posts — an empty-state page with nothing to rank for.
 * `undefined` leaves Next's default (index, follow) in place.
 */
export function buildBlogListRobots(hasPublishedPosts: boolean): Metadata["robots"] | undefined {
  return hasPublishedPosts ? undefined : { index: false, follow: false };
}
