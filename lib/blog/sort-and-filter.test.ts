import { describe, expect, it } from "vitest";
import { filterPublished, sortByDateDesc } from "./sort-and-filter";
import type { BlogPostMeta } from "./types";

function post(overrides: Partial<BlogPostMeta>): BlogPostMeta {
  return {
    title: "t",
    description: "d",
    date: "2026-01-01",
    tags: [],
    locale: "ko",
    slug: "s",
    translationKey: "k",
    draft: false,
    ...overrides,
  };
}

describe("filterPublished", () => {
  it("excludes draft posts", () => {
    const posts = [post({ slug: "a", draft: false }), post({ slug: "b", draft: true })];
    expect(filterPublished(posts).map((p) => p.slug)).toEqual(["a"]);
  });
});

describe("sortByDateDesc", () => {
  it("sorts newest first without mutating the input array", () => {
    const posts = [
      post({ slug: "old", date: "2026-01-01" }),
      post({ slug: "new", date: "2026-09-01" }),
      post({ slug: "mid", date: "2026-05-01" }),
    ];
    const original = [...posts];

    const sorted = sortByDateDesc(posts);

    expect(sorted.map((p) => p.slug)).toEqual(["new", "mid", "old"]);
    expect(posts).toEqual(original);
  });
});
