import { describe, expect, it } from "vitest";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  ogImagePathname,
  ogImageUrl,
} from "./og-image";

describe("OG image dimensions", () => {
  it("is 1200x675 — 16:9 and above Google Discover's 1200px / 300,000px floor", () => {
    expect(OG_IMAGE_WIDTH).toBe(1200);
    expect(OG_IMAGE_HEIGHT).toBe(675);
    expect(OG_IMAGE_WIDTH * OG_IMAGE_HEIGHT).toBeGreaterThan(300_000);
  });
});

describe("ogImagePathname", () => {
  it("maps a post to /og/{locale}/{slug}.png", () => {
    expect(ogImagePathname("ko", "suneung-vocab-context")).toBe(
      "/og/ko/suneung-vocab-context.png"
    );
  });

  it("keeps the locale spelling used by the content directories", () => {
    expect(ogImagePathname("zh-Hant", "gsat-vocab-method")).toBe(
      "/og/zh-Hant/gsat-vocab-method.png"
    );
  });
});

describe("ogImageUrl", () => {
  it("prefixes the pathname with the given origin", () => {
    expect(ogImageUrl("https://contextvoca.app", "ko", "toeic-vocab-office-worker")).toBe(
      "https://contextvoca.app/og/ko/toeic-vocab-office-worker.png"
    );
  });

  it("does not double the separator when the origin ends with a slash", () => {
    expect(ogImageUrl("https://contextvoca.app/", "ko", "x")).toBe(
      "https://contextvoca.app/og/ko/x.png"
    );
  });
});
