import { describe, expect, it } from "vitest";
import { pickRelatedPosts } from "./related";
import type { BlogPostMeta } from "./types";

function post(overrides: Partial<BlogPostMeta>): BlogPostMeta {
  return {
    title: "t",
    description: "d",
    date: "2026-01-01",
    tags: [],
    locale: "ko",
    slug: "s",
    translationKey: "s",
    draft: false,
    ...overrides,
  };
}

describe("pickRelatedPosts", () => {
  it("prefers posts that share more tags with the current post", () => {
    const current = post({ slug: "current", tags: ["a", "b", "c"] });
    const twoShared = post({ slug: "two-shared", tags: ["a", "b"], date: "2026-01-01" });
    const oneShared = post({ slug: "one-shared", tags: ["a"], date: "2026-01-01" });
    const all = [current, oneShared, twoShared];

    const result = pickRelatedPosts(all, current);

    expect(result.map((p) => p.slug)).toEqual(["two-shared", "one-shared"]);
  });

  it("excludes the current post itself even if present in the candidate list", () => {
    const current = post({ slug: "current", tags: ["a"] });
    const other = post({ slug: "other", tags: ["a"] });
    const all = [current, other];

    const result = pickRelatedPosts(all, current);

    expect(result.map((p) => p.slug)).toEqual(["other"]);
  });

  it("excludes draft posts from the candidates", () => {
    const current = post({ slug: "current", tags: ["a"] });
    const draft = post({ slug: "draft-post", tags: ["a"], draft: true });
    const published = post({ slug: "published", tags: ["a"] });
    const all = [current, draft, published];

    const result = pickRelatedPosts(all, current);

    expect(result.map((p) => p.slug)).toEqual(["published"]);
  });

  it("breaks ties in shared-tag count by newest date first", () => {
    const current = post({ slug: "current", tags: ["a"] });
    const older = post({ slug: "older", tags: ["a"], date: "2026-01-01" });
    const newer = post({ slug: "newer", tags: ["a"], date: "2026-06-01" });
    const all = [current, older, newer];

    const result = pickRelatedPosts(all, current);

    expect(result.map((p) => p.slug)).toEqual(["newer", "older"]);
  });

  it("falls back to newest-first when there is no tag overlap at all", () => {
    const current = post({ slug: "current", tags: ["a"] });
    const older = post({ slug: "older", tags: ["z"], date: "2026-01-01" });
    const newer = post({ slug: "newer", tags: ["y"], date: "2026-06-01" });
    const all = [current, older, newer];

    const result = pickRelatedPosts(all, current);

    expect(result.map((p) => p.slug)).toEqual(["newer", "older"]);
  });

  it("respects the limit parameter", () => {
    const current = post({ slug: "current", tags: ["a"] });
    const candidates = ["p1", "p2", "p3", "p4"].map((slug, i) =>
      post({ slug, tags: ["a"], date: `2026-0${i + 1}-01` })
    );
    const all = [current, ...candidates];

    const result = pickRelatedPosts(all, current, 2);

    expect(result).toHaveLength(2);
    expect(result.map((p) => p.slug)).toEqual(["p4", "p3"]);
  });

  it("returns an empty array when there are no candidates", () => {
    const current = post({ slug: "current", tags: ["a"] });
    const result = pickRelatedPosts([current], current);
    expect(result).toEqual([]);
  });

  it("excludes posts from other locales even when they share the slug", () => {
    const current = post({ slug: "photo-vocabulary-guide", locale: "ko", tags: ["a"] });
    const jaSameSlug = post({ slug: "photo-vocabulary-guide", locale: "ja", tags: ["a"] });
    const jaOther = post({ slug: "eiken", locale: "ja", tags: ["a"] });
    const koOther = post({ slug: "toeic", locale: "ko", tags: ["a"] });
    expect(pickRelatedPosts([current, jaSameSlug, jaOther, koOther], current)).toEqual([koOther]);
  });
});
