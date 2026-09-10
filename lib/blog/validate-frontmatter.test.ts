import { describe, expect, it } from "vitest";
import { validateFrontmatter } from "./validate-frontmatter";

const VALID = {
  title: "제목",
  description: "설명",
  date: "2026-09-01",
  tags: ["a", "b"],
  locale: "ko",
  slug: "my-post",
  translationKey: "my-post-key",
};

describe("validateFrontmatter", () => {
  it("returns a normalized BlogPostMeta with draft defaulted to false", () => {
    const meta = validateFrontmatter(VALID, { locale: "ko", slug: "my-post" });
    expect(meta).toEqual({ ...VALID, draft: false });
  });

  it("preserves an explicit draft: true", () => {
    const meta = validateFrontmatter(
      { ...VALID, draft: true },
      { locale: "ko", slug: "my-post" }
    );
    expect(meta.draft).toBe(true);
  });

  it.each(["title", "description", "date", "tags", "locale", "slug", "translationKey"])(
    "throws when required field %s is missing",
    (field) => {
      const broken = { ...VALID } as Record<string, unknown>;
      delete broken[field];
      expect(() =>
        validateFrontmatter(broken, { locale: "ko", slug: "my-post" })
      ).toThrow();
    }
  );

  it("throws when tags is not an array of strings", () => {
    expect(() =>
      validateFrontmatter(
        { ...VALID, tags: "not-an-array" },
        { locale: "ko", slug: "my-post" }
      )
    ).toThrow();
  });

  it("throws when frontmatter locale doesn't match the file's directory locale", () => {
    expect(() =>
      validateFrontmatter({ ...VALID, locale: "ja" }, { locale: "ko", slug: "my-post" })
    ).toThrow(/locale/);
  });

  it("throws when frontmatter slug doesn't match the file name", () => {
    expect(() =>
      validateFrontmatter(VALID, { locale: "ko", slug: "different-slug" })
    ).toThrow(/slug/);
  });

  it.each(["2026/09/01", "09-01-2026", "2026-9-1", "not-a-date", ""])(
    "throws when date is not YYYY-MM-DD (%s)",
    (date) => {
      expect(() =>
        validateFrontmatter({ ...VALID, date }, { locale: "ko", slug: "my-post" })
      ).toThrow(/date/);
    }
  );

  it.each(["2026-13-01", "2026-02-30", "2026-04-31", "2026-00-01", "2026-01-00"])(
    "throws when date has YYYY-MM-DD shape but isn't a real calendar date (%s)",
    (date) => {
      expect(() =>
        validateFrontmatter({ ...VALID, date }, { locale: "ko", slug: "my-post" })
      ).toThrow(/date/);
    }
  );

  it("accepts a real leap-day date", () => {
    const meta = validateFrontmatter({ ...VALID, date: "2028-02-29" }, { locale: "ko", slug: "my-post" });
    expect(meta.date).toBe("2028-02-29");
  });

  it("validates `updated` with the same YYYY-MM-DD rule when present", () => {
    expect(() =>
      validateFrontmatter(
        { ...VALID, updated: "2026-02-30" },
        { locale: "ko", slug: "my-post" }
      )
    ).toThrow(/updated/);

    const meta = validateFrontmatter(
      { ...VALID, updated: "2026-09-05" },
      { locale: "ko", slug: "my-post" }
    );
    expect(meta.updated).toBe("2026-09-05");
  });
});
