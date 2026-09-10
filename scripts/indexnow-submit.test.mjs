import { describe, expect, it } from "vitest";
import { parseArgs, changedFilesToPostRefs, isDraft } from "./indexnow-submit.mjs";

describe("parseArgs", () => {
  it("treats bare positional arguments as an explicit URL list", () => {
    expect(parseArgs(["https://contextvoca.app/ko/blog/a/", "https://contextvoca.app/ja/blog/b/"])).toEqual({
      mode: "urls",
      urls: ["https://contextvoca.app/ko/blog/a/", "https://contextvoca.app/ja/blog/b/"],
      dryRun: false,
    });
  });

  it("parses --since <ref> into a git-diff mode", () => {
    expect(parseArgs(["--since", "origin/main"])).toEqual({
      mode: "since",
      ref: "origin/main",
      dryRun: false,
    });
  });

  it("throws when --since is missing its ref argument", () => {
    expect(() => parseArgs(["--since"])).toThrow();
  });

  it("throws when given no arguments at all", () => {
    expect(() => parseArgs([])).toThrow();
  });

  it("recognizes --dry-run alongside an explicit URL list, in either position", () => {
    expect(parseArgs(["--dry-run", "https://contextvoca.app/ko/blog/a/"])).toEqual({
      mode: "urls",
      urls: ["https://contextvoca.app/ko/blog/a/"],
      dryRun: true,
    });
    expect(parseArgs(["https://contextvoca.app/ko/blog/a/", "--dry-run"])).toEqual({
      mode: "urls",
      urls: ["https://contextvoca.app/ko/blog/a/"],
      dryRun: true,
    });
  });

  it("recognizes --dry-run alongside --since", () => {
    expect(parseArgs(["--since", "origin/main", "--dry-run"])).toEqual({
      mode: "since",
      ref: "origin/main",
      dryRun: true,
    });
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

describe("isDraft", () => {
  it("returns true when the frontmatter block sets draft: true", () => {
    expect(isDraft("---\ntitle: t\ndraft: true\n---\nbody")).toBe(true);
  });

  it("returns false when draft is absent", () => {
    expect(isDraft("---\ntitle: t\n---\nbody")).toBe(false);
  });

  it("returns false when draft: false", () => {
    expect(isDraft("---\ntitle: t\ndraft: false\n---\nbody")).toBe(false);
  });

  it("returns false when there is no frontmatter block at all", () => {
    expect(isDraft("just plain text, no frontmatter")).toBe(false);
  });

  it("ignores a 'draft: true'-looking line outside the frontmatter block", () => {
    expect(isDraft("---\ntitle: t\n---\nSee also: draft: true (not real frontmatter)")).toBe(false);
  });
});
