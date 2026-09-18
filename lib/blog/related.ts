import type { BlogPostMeta } from "./types";

/**
 * Picks up to `limit` posts related to `current`, restricted to `all` (the
 * caller is responsible for pre-filtering to `current.locale` — this
 * function is locale-agnostic and only compares tags/dates).
 *
 * Selection order: shared-tag count descending, then date descending
 * (newest first) as the tiebreaker — both when tag counts tie and when
 * there is no tag overlap at all (shared count 0 for every candidate).
 * `current` itself and any draft posts are excluded from the candidates.
 */
export function pickRelatedPosts(
  all: readonly BlogPostMeta[],
  current: BlogPostMeta,
  limit = 3
): BlogPostMeta[] {
  const currentTags = new Set(current.tags);

  const candidates = all.filter(
    (post) => post.slug !== current.slug && !post.draft
  );

  const sharedTagCount = (post: BlogPostMeta) =>
    post.tags.filter((tag) => currentTags.has(tag)).length;

  const sorted = [...candidates].sort((a, b) => {
    const tagDiff = sharedTagCount(b) - sharedTagCount(a);
    if (tagDiff !== 0) return tagDiff;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sorted.slice(0, limit);
}
