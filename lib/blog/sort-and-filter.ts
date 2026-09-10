import type { BlogPostMeta } from "./types";

/** Returns only non-draft posts. */
export function filterPublished(posts: readonly BlogPostMeta[]): BlogPostMeta[] {
  return posts.filter((post) => !post.draft);
}

/** Returns a new array of `posts` sorted by `date` descending (newest first). */
export function sortByDateDesc(posts: readonly BlogPostMeta[]): BlogPostMeta[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
