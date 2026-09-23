import { describe, expect, it } from "vitest";
import {
  articleImageSets,
  findSharedImageGroups,
  metaContents,
  parseJsonLdBlocks,
  parseSitemapPostUrls,
} from "./output-probe";

const HTML = `<!DOCTYPE html><html><head>
<meta charset="utf-8"/>
<title>제목</title>
<meta property="og:image" content="https://contextvoca.app/og/ko/a.png"/>
<meta property="og:image:width" content="1200"/>
<meta name="twitter:image" content="https://contextvoca.app/og/ko/a.png"/>
<meta name="robots" content="noindex, nofollow"/>
<script type="application/ld+json">{"@type":"Article","image":"https://contextvoca.app/og/ko/a.png"}</script>
</head><body></body></html>`;

describe("parseSitemapPostUrls", () => {
  const xml = `<urlset>
    <url><loc>https://contextvoca.app/ko/</loc></url>
    <url><loc>https://contextvoca.app/ko/blog/</loc></url>
    <url><loc>https://contextvoca.app/ko/blog/my-post/</loc></url>
    <url><loc>https://contextvoca.app/zh-Hant/blog/other-post/</loc></url>
    <url><loc>https://contextvoca.app/ko/support/</loc></url>
  </urlset>`;

  it("keeps only post URLs, splitting origin, locale and slug", () => {
    expect(parseSitemapPostUrls(xml)).toEqual([
      { origin: "https://contextvoca.app", locale: "ko", slug: "my-post" },
      { origin: "https://contextvoca.app", locale: "zh-Hant", slug: "other-post" },
    ]);
  });

  it("does not mistake the blog list page for a post", () => {
    expect(parseSitemapPostUrls("<urlset><url><loc>https://x.dev/ko/blog/</loc></url></urlset>")).toEqual([]);
  });

  it("returns nothing for an empty sitemap", () => {
    expect(parseSitemapPostUrls("<urlset></urlset>")).toEqual([]);
  });
});

describe("metaContents", () => {
  it("reads both property- and name-keyed meta tags", () => {
    expect(metaContents(HTML, "og:image")).toEqual(["https://contextvoca.app/og/ko/a.png"]);
    expect(metaContents(HTML, "twitter:image")).toEqual(["https://contextvoca.app/og/ko/a.png"]);
    expect(metaContents(HTML, "robots")).toEqual(["noindex, nofollow"]);
  });

  it("does not match a longer key that merely starts the same", () => {
    expect(metaContents(HTML, "og:image")).not.toContain("1200");
  });

  it("returns an empty list when the tag is absent", () => {
    expect(metaContents(HTML, "og:video")).toEqual([]);
  });
});

describe("parseJsonLdBlocks", () => {
  it("parses every ld+json script", () => {
    const { blocks, invalid } = parseJsonLdBlocks(HTML);
    expect(invalid).toBe(0);
    expect(blocks).toHaveLength(1);
    expect(blocks[0]["@type"]).toBe("Article");
  });

  it("counts unparsable blocks instead of throwing", () => {
    const broken = '<script type="application/ld+json">{oops}</script>';
    expect(parseJsonLdBlocks(broken)).toEqual({ blocks: [], invalid: 1 });
  });
});

describe("articleImageSets", () => {
  it("returns one entry per Article block, with its image URLs", () => {
    expect(articleImageSets(parseJsonLdBlocks(HTML).blocks)).toEqual([
      { image: "https://contextvoca.app/og/ko/a.png", urls: ["https://contextvoca.app/og/ko/a.png"] },
    ]);
  });

  it("handles an array-valued image", () => {
    expect(articleImageSets([{ "@type": "Article", image: ["a.png", "b.png"] }])).toEqual([
      { image: ["a.png", "b.png"], urls: ["a.png", "b.png"] },
    ]);
  });

  it("reports a missing image as an empty URL list rather than dropping the article", () => {
    expect(articleImageSets([{ "@type": "Article" }])).toEqual([{ image: undefined, urls: [] }]);
  });

  it("ignores non-Article structured data", () => {
    expect(articleImageSets([{ "@type": "Organization", image: "logo.png" }])).toEqual([]);
  });
});

describe("findSharedImageGroups", () => {
  const image = (pathname: string, slug: string, digest: string) => ({ pathname, slug, digest });

  it("reports two different posts that ended up with identical bytes", () => {
    expect(
      findSharedImageGroups([
        image("/og/ko/a.png", "a", "deadbeef"),
        image("/og/ko/b.png", "b", "deadbeef"),
        image("/og/ko/c.png", "c", "c0ffee"),
      ])
    ).toEqual([["/og/ko/a.png", "/og/ko/b.png"]]);
  });

  it("allows translations of one post to share a card — same slug, same picture", () => {
    expect(
      findSharedImageGroups([
        image("/og/ko/same.png", "same", "deadbeef"),
        image("/og/ja/same.png", "same", "deadbeef"),
        image("/og/zh-Hant/same.png", "same", "deadbeef"),
      ])
    ).toEqual([]);
  });

  it("still reports a collision when a shared-slug group also contains a foreign slug", () => {
    expect(
      findSharedImageGroups([
        image("/og/ko/same.png", "same", "deadbeef"),
        image("/og/ja/same.png", "same", "deadbeef"),
        image("/og/ko/other.png", "other", "deadbeef"),
      ])
    ).toEqual([["/og/ko/same.png", "/og/ja/same.png", "/og/ko/other.png"]]);
  });

  it("is quiet when every image is distinct", () => {
    expect(
      findSharedImageGroups([image("/og/ko/a.png", "a", "1"), image("/og/ko/b.png", "b", "2")])
    ).toEqual([]);
  });
});
