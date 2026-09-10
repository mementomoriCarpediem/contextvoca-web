import { describe, expect, it } from "vitest";
import {
  parseArgs,
  changedFilesToPostRefs,
  buildIndexNowPayload,
} from "./indexnow-submit.mjs";

describe("parseArgs", () => {
  it("treats bare positional arguments as an explicit URL list", () => {
    expect(parseArgs(["https://contextvoca.app/ko/blog/a/", "https://contextvoca.app/ja/blog/b/"])).toEqual({
      mode: "urls",
      urls: ["https://contextvoca.app/ko/blog/a/", "https://contextvoca.app/ja/blog/b/"],
    });
  });

  it("parses --since <ref> into a git-diff mode", () => {
    expect(parseArgs(["--since", "origin/main"])).toEqual({
      mode: "since",
      ref: "origin/main",
    });
  });

  it("throws when --since is missing its ref argument", () => {
    expect(() => parseArgs(["--since"])).toThrow();
  });

  it("throws when given no arguments at all", () => {
    expect(() => parseArgs([])).toThrow();
  });
});

describe("changedFilesToPostRefs", () => {
  it("extracts {locale, slug} from content/blog/{locale}/{slug}.mdx paths", () => {
    const refs = changedFilesToPostRefs([
      "content/blog/ko/photo-vocabulary.mdx",
      "content/blog/ja/photo-vocabulary.mdx",
    ]);
    expect(refs).toEqual([
      { locale: "ko", slug: "photo-vocabulary" },
      { locale: "ja", slug: "photo-vocabulary" },
    ]);
  });

  it("ignores paths outside content/blog or without the .mdx extension", () => {
    const refs = changedFilesToPostRefs([
      "docs/science-claims.md",
      "content/blog/ko/photo-vocabulary.mdx",
      "content/blog/ko/README.txt",
    ]);
    expect(refs).toEqual([{ locale: "ko", slug: "photo-vocabulary" }]);
  });
});

describe("buildIndexNowPayload", () => {
  it("builds the IndexNow request body from host/key/keyLocation/urlList", () => {
    const payload = buildIndexNowPayload({
      host: "contextvoca.app",
      key: "abc123",
      keyLocation: "https://contextvoca.app/abc123.txt",
      urls: ["https://contextvoca.app/ko/blog/photo-vocabulary/"],
    });
    expect(payload).toEqual({
      host: "contextvoca.app",
      key: "abc123",
      keyLocation: "https://contextvoca.app/abc123.txt",
      urlList: ["https://contextvoca.app/ko/blog/photo-vocabulary/"],
    });
  });
});
