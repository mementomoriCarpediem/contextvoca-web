import { describe, expect, it } from "vitest";
import { buildPostAlternates } from "./hreflang";
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

describe("buildPostAlternates", () => {
  it("includes the current post as canonical and every published translation as a language alternate", () => {
    const ko = post({ locale: "ko", slug: "ko-slug", translationKey: "photo" });
    const ja = post({ locale: "ja", slug: "ja-slug", translationKey: "photo" });
    const unrelated = post({ locale: "en", slug: "en-other", translationKey: "other" });

    const result = buildPostAlternates(ko, [ko, ja, unrelated]);

    expect(result.canonical).toBe("https://contextvoca.app/ko/blog/ko-slug/");
    expect(result.languages.ko).toBe("https://contextvoca.app/ko/blog/ko-slug/");
    expect(result.languages.ja).toBe("https://contextvoca.app/ja/blog/ja-slug/");
    expect(result.languages).not.toHaveProperty("en");
  });

  it("excludes draft translations from the alternates map", () => {
    const ko = post({ locale: "ko", slug: "ko-slug", translationKey: "photo", draft: false });
    const jaDraft = post({ locale: "ja", slug: "ja-slug", translationKey: "photo", draft: true });

    const result = buildPostAlternates(ko, [ko, jaDraft]);

    expect(result.languages).not.toHaveProperty("ja");
  });

  it("sets x-default to the English alternate when one is published", () => {
    const ko = post({ locale: "ko", slug: "ko-slug", translationKey: "photo" });
    const en = post({ locale: "en", slug: "en-slug", translationKey: "photo" });

    const result = buildPostAlternates(ko, [ko, en]);

    expect(result.languages["x-default"]).toBe("https://contextvoca.app/en/blog/en-slug/");
  });

  it("falls back x-default to the current post when no English translation is published", () => {
    const ko = post({ locale: "ko", slug: "ko-slug", translationKey: "photo" });

    const result = buildPostAlternates(ko, [ko]);

    expect(result.languages["x-default"]).toBe("https://contextvoca.app/ko/blog/ko-slug/");
  });
});
