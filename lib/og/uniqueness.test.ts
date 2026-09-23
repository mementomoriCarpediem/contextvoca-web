import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "@/lib/blog/parse-frontmatter";
import { buildOgSvg } from "./svg";

/**
 * The OG card is a post's visual signature: two different posts must never
 * share one. The motif alone can't carry that — the tag vocabulary is narrow
 * (8 of the 14 posts in `content/blog` are exam posts), so the per-slug axes
 * in `resolveOgLook` are what actually separates them. These tests run against
 * the real content tree so a new post that happens to collide fails the suite
 * rather than shipping an image that looks like an existing post's.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

interface ContentPost {
  readonly key: string;
  readonly slug: string;
  readonly tags: string[];
}

function readAllPosts(): ContentPost[] {
  const posts: ContentPost[] = [];
  for (const locale of fs.readdirSync(CONTENT_DIR).sort()) {
    const localeDir = path.join(CONTENT_DIR, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;
    for (const file of fs.readdirSync(localeDir).sort()) {
      if (!file.endsWith(".mdx")) continue;
      const raw = fs.readFileSync(path.join(localeDir, file), "utf8");
      const { data } = parseFrontmatter(raw);
      posts.push({
        key: `${locale}/${file}`,
        slug: file.replace(/\.mdx$/, ""),
        tags: data.tags as string[],
      });
    }
  }
  return posts;
}

function digest(svg: string): string {
  return crypto.createHash("sha256").update(svg).digest("hex");
}

describe("OG card uniqueness across the real content tree", () => {
  const posts = readAllPosts();

  it("has posts to check (guards against a silently empty sweep)", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("gives every distinct slug a distinct card — drafts included", () => {
    const bySlug = new Map<string, string>();
    const collisions: string[] = [];

    for (const post of posts) {
      const svg = digest(buildOgSvg({ slug: post.slug, tags: post.tags }));
      const owner = bySlug.get(svg);
      if (owner === undefined) {
        bySlug.set(svg, post.slug);
      } else if (owner !== post.slug) {
        collisions.push(`${owner} == ${post.slug}`);
      }
    }

    expect(collisions).toEqual([]);
  });

  it("gives translations of one post the same card — same slug, same picture", () => {
    // Derived from whatever is in the tree: this must not fail because a
    // translation was added or removed, only because translations diverged.
    const bySlug = new Map<string, ContentPost[]>();
    for (const post of posts) {
      bySlug.set(post.slug, [...(bySlug.get(post.slug) ?? []), post]);
    }
    const translated = [...bySlug.values()].filter((group) => group.length > 1);
    if (translated.length === 0) return;

    for (const group of translated) {
      const cards = new Set(
        group.map((post) => digest(buildOgSvg({ slug: post.slug, tags: post.tags })))
      );
      expect(cards.size).toBe(1);
    }
  });
});

describe("OG card uniqueness under load", () => {
  it("keeps 50 same-motif posts distinct", () => {
    const tags = ["토익 단어"];
    const cards = new Set(
      Array.from({ length: 50 }, (_, i) =>
        digest(buildOgSvg({ slug: `exam-vocab-method-${i}`, tags }))
      )
    );
    expect(cards.size).toBe(50);
  });

  it("keeps 500 posts distinct across mixed motifs", () => {
    const tagSets = [["토익 단어"], ["사진 단어장"], ["영어원서"], ["망각 곡선"], ["문맥 학습"], []];
    const cards = new Set(
      Array.from({ length: 500 }, (_, i) =>
        digest(buildOgSvg({ slug: `post-${i}-vocab`, tags: tagSets[i % tagSets.length] }))
      )
    );
    expect(cards.size).toBe(500);
  });
});
