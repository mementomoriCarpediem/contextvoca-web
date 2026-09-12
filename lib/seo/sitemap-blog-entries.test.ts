import { describe, expect, it } from "vitest";
import { buildBlogListSitemapEntries } from "./sitemap-blog-entries";

describe("buildBlogListSitemapEntries", () => {
  it("returns no entries when no locale has published posts", () => {
    expect(buildBlogListSitemapEntries([])).toEqual([]);
  });

  it("emits one entry per locale with posts, hreflang limited to that same set", () => {
    const entries = buildBlogListSitemapEntries(["ko", "ja"]);

    expect(entries).toHaveLength(2);
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://contextvoca.app/ko/blog/");
    expect(urls).toContain("https://contextvoca.app/ja/blog/");

    for (const entry of entries) {
      expect(entry.alternates?.languages).toEqual({
        ko: "https://contextvoca.app/ko/blog/",
        ja: "https://contextvoca.app/ja/blog/",
        "x-default": "https://contextvoca.app/ko/blog/", // no en published -> first in locales order (ko precedes ja)
      });
    }
  });

  it("uses en for x-default when en has published posts", () => {
    const entries = buildBlogListSitemapEntries(["ko", "en"]);
    for (const entry of entries) {
      expect(entry.alternates?.languages?.["x-default"]).toBe("https://contextvoca.app/en/blog/");
    }
  });
});
