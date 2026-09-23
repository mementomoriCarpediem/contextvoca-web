import { describe, expect, it } from "vitest";
import type { OgLook } from "./design";
import { OG_MOTIF_IDS, OG_PALETTES, resolveOgLook } from "./design";
import { buildOgSvg, hasTextGlyphs, renderOgSvg } from "./svg";
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og-image";

/** Every motif on every palette, with every accent that palette can hand out. */
const EVERY_LOOK: OgLook[] = OG_MOTIF_IDS.flatMap((motif) =>
  OG_PALETTES.flatMap((palette) =>
    palette.accents.map((accent) => ({
      palette,
      accent,
      motif,
      gradient: [0, 0, 1, 1] as const,
      inkBlob: { cx: 1010, cy: 96, r: 300 },
      accentBlob: { cx: 150, cy: 606, r: 232 },
      motifSize: 420,
    }))
  )
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

  it("differs between posts that share a motif", () => {
    const a = buildOgSvg({ slug: "suneung-vocab-context", tags: ["수능 영단어"] });
    const b = buildOgSvg({ slug: "toeic-vocab-office-worker", tags: ["토익 단어"] });
    expect(a).not.toBe(b);
  });

  it("renders the look its own slug resolves to", () => {
    const input = { slug: "civil-service-exam-vocab", tags: ["공무원 영어"] };
    expect(buildOgSvg(input)).toBe(renderOgSvg(resolveOgLook(input.slug, input.tags)));
  });
});

describe("renderOgSvg", () => {
  it("covers a non-trivial number of looks in this sweep", () => {
    expect(EVERY_LOOK.length).toBe(OG_MOTIF_IDS.length * OG_PALETTES.length * 4);
  });

  it("never emits a text glyph, for any motif/palette/accent combination", () => {
    for (const look of EVERY_LOOK) {
      expect(hasTextGlyphs(renderOgSvg(look))).toBe(false);
    }
  });

  it("never references an external font, image or stylesheet", () => {
    for (const look of EVERY_LOOK) {
      const svg = renderOgSvg(look);
      expect(svg).not.toMatch(/<image[\s>]/i);
      expect(svg).not.toMatch(/xlink:href/i);
      expect(svg).not.toMatch(/@import|@font-face/i);
      expect(svg).not.toMatch(/href="https?:/i);
      expect(svg).not.toMatch(/font-family/i);
    }
  });

  it("keeps the motif inside the frame at every size", () => {
    for (const motifSize of [368, 480]) {
      const look = { ...EVERY_LOOK[0], motifSize };
      const [, offsetX, offsetY] = renderOgSvg(look).match(
        /translate\((-?[\d.]+) (-?[\d.]+)\)/
      )!;
      expect(Number(offsetX)).toBeGreaterThanOrEqual(48);
      expect(Number(offsetY)).toBeGreaterThanOrEqual(48);
      expect(Number(offsetX) + motifSize).toBeLessThanOrEqual(OG_IMAGE_WIDTH - 48);
      expect(Number(offsetY) + motifSize).toBeLessThanOrEqual(OG_IMAGE_HEIGHT - 48);
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
