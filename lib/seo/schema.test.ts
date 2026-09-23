import { describe, expect, it } from "vitest";
import { buildArticleSchema } from "./schema";
import { SITE_URL } from "./site";
import { ogImageUrl } from "@/lib/og/og-image";
import type { BlogPostMeta } from "@/lib/blog/types";

const post: BlogPostMeta = {
  title: "제목",
  description: "설명",
  date: "2026-01-01",
  tags: ["영어 단어 암기"],
  locale: "ko",
  slug: "some-post",
  translationKey: "some-post",
  draft: false,
};

describe("buildArticleSchema", () => {
  it("carries the post's generated OG image so Article.image is never empty", () => {
    const schema = buildArticleSchema(post);

    expect(schema.image).toBe(ogImageUrl(SITE_URL, "ko", "some-post"));
    expect(schema.image).toBe("https://contextvoca.app/og/ko/some-post.png");
  });
});
