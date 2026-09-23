import { describe, expect, it } from "vitest";
import { OG_MOTIF_IDS, OG_PALETTES } from "./design";
import { buildOgSvg, hasTextGlyphs } from "./svg";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og-image";

const EVERY_COMBINATION = OG_MOTIF_IDS.flatMap((motif) =>
  OG_PALETTES.map((palette) => ({ motif, palette }))
);

describe("buildOgSvg", () => {
  it("declares the OG image size", () => {
    const svg = buildOgSvg({ slug: "photo-vocabulary-guide", tags: ["사진 단어장"] });
    expect(svg).toContain(`width="${OG_IMAGE_WIDTH}"`);
    expect(svg).toContain(`height="${OG_IMAGE_HEIGHT}"`);
    expect(svg).toContain(`viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}"`);
  });

  it("is byte-identical for the same frontmatter", () => {
    const input = { slug: "suneung-vocab-context", tags: ["수능 영단어", "문맥 학습"] };
    expect(buildOgSvg(input)).toBe(buildOgSvg(input));
  });

  it("differs between posts", () => {
    const a = buildOgSvg({ slug: "suneung-vocab-context", tags: ["수능 영단어"] });
    const b = buildOgSvg({ slug: "toeic-vocab-office-worker", tags: ["토익 단어"] });
    expect(a).not.toBe(b);
  });

  it("never emits a text glyph, for any motif/palette combination", () => {
    for (const { motif, palette } of EVERY_COMBINATION) {
      const svg = buildOgSvg({ slug: "x", tags: [] }, { motif, palette });
      expect(hasTextGlyphs(svg)).toBe(false);
    }
  });

  it("never references an external font, image or stylesheet", () => {
    for (const { motif, palette } of EVERY_COMBINATION) {
      const svg = buildOgSvg({ slug: "x", tags: [] }, { motif, palette });
      expect(svg).not.toMatch(/<image[\s>]/i);
      expect(svg).not.toMatch(/xlink:href/i);
      expect(svg).not.toMatch(/@import|@font-face/i);
      expect(svg).not.toMatch(/href="https?:/i);
      expect(svg).not.toMatch(/font-family/i);
    }
  });
});

describe("hasTextGlyphs", () => {
  it("detects <text> and <tspan> elements", () => {
    expect(hasTextGlyphs('<svg><text x="0">hi</text></svg>')).toBe(true);
    expect(hasTextGlyphs("<svg><tspan>hi</tspan></svg>")).toBe(true);
    expect(hasTextGlyphs('<svg><textPath href="#p">hi</textPath></svg>')).toBe(true);
  });

  it("does not fire on shape elements", () => {
    expect(hasTextGlyphs('<svg><rect width="1"/><circle r="2"/></svg>')).toBe(false);
  });
});
