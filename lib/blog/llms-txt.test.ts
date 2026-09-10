import { describe, expect, it } from "vitest";
import { buildLlmsTxt } from "./llms-txt";
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

const BASE = "# ContextVoca\n\nSome existing content.\n";

describe("buildLlmsTxt", () => {
  it("preserves the existing base content unchanged", () => {
    const out = buildLlmsTxt(BASE, []);
    expect(out.startsWith(BASE)).toBe(true);
  });

  it("appends a Blog section grouped by locale, newest first, excluding drafts", () => {
    const posts = [
      post({ locale: "ko", slug: "old", date: "2026-01-01", title: "오래된 글" }),
      post({ locale: "ko", slug: "new", date: "2026-06-01", title: "새 글" }),
      post({ locale: "ja", slug: "jp-post", date: "2026-02-01", title: "日本語の記事" }),
      post({ locale: "ko", slug: "draft-post", date: "2026-09-01", title: "초안", draft: true }),
    ];

    const out = buildLlmsTxt(BASE, posts);

    expect(out).toContain("## Blog");
    expect(out).toContain("Korean:");
    expect(out).toContain("Japanese:");
    expect(out).not.toContain("초안");
    const newIndex = out.indexOf("새 글");
    const oldIndex = out.indexOf("오래된 글");
    expect(newIndex).toBeGreaterThan(-1);
    expect(oldIndex).toBeGreaterThan(newIndex);
    expect(out).toContain("https://contextvoca.app/ko/blog/new/");
    expect(out).toContain("https://contextvoca.app/ja/blog/jp-post/");
  });

  it("omits a locale heading entirely when it has no published posts", () => {
    const posts = [post({ locale: "ko", slug: "only-ko" })];
    const out = buildLlmsTxt(BASE, posts);
    expect(out).not.toContain("Japanese:");
    expect(out).not.toContain("Chinese");
  });
});
