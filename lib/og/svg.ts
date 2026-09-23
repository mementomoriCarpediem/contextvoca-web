import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og-image";
import type { OgLook, OgMotifId, OgPalette } from "./design";
import { resolveOgLook } from "./design";

/**
 * The SVG a post's OG image is rasterized from. Pure, import-free beyond this
 * directory (see `og-image.ts`), and deliberately **glyph-free**:
 *
 * 1. Google Discover's image guidance tells us to avoid "text-heavy images"
 *    for `og:image`/schema images, which a title card is.
 * 2. A glyph would need a CJK font present wherever the build runs. On
 *    GitHub Actions' `ubuntu-latest` a missing Korean/Japanese/Chinese font
 *    does not fail the build — it renders tofu boxes, silently. No glyphs,
 *    no font dependency, no silent failure mode.
 *
 * The post title is carried by `og:title` next to the image, so nothing is
 * lost by leaving it out of the picture.
 */

/** Matches any SVG element that renders a glyph. Enforced by test and generator. */
const TEXT_ELEMENT = /<\s*(textPath|tspan|text)\b/i;

export function hasTextGlyphs(svg: string): boolean {
  return TEXT_ELEMENT.test(svg);
}

export interface OgSvgInput {
  readonly slug: string;
  readonly tags: readonly string[];
}

/** Motif drawing space. Each motif is drawn in 0–400 units, then scaled. */
const MOTIF_UNITS = 400;

interface MotifColors {
  readonly ink: string;
  readonly accent: string;
}

function camera(c: MotifColors): string {
  return [
    `<rect x="20" y="112" width="360" height="248" rx="38" fill="${c.ink}"/>`,
    `<rect x="140" y="72" width="120" height="50" rx="18" fill="${c.ink}"/>`,
    `<circle cx="200" cy="236" r="92" fill="${c.accent}"/>`,
    `<circle cx="200" cy="236" r="64" fill="${c.ink}" opacity="0.85"/>`,
    `<circle cx="200" cy="236" r="32" fill="${c.accent}"/>`,
    `<circle cx="330" cy="152" r="15" fill="${c.accent}"/>`,
  ].join("");
}

function book(c: MotifColors): string {
  return [
    `<path d="M200 118 C150 84 96 72 40 76 L40 314 C96 310 150 322 200 356 Z" fill="${c.ink}"/>`,
    `<path d="M200 118 C250 84 304 72 360 76 L360 314 C304 310 250 322 200 356 Z" fill="${c.accent}"/>`,
    `<rect x="192" y="118" width="16" height="238" rx="8" fill="${c.ink}" opacity="0.55"/>`,
    `<rect x="74" y="150" width="96" height="14" rx="7" fill="${c.accent}" opacity="0.55"/>`,
    `<rect x="74" y="190" width="72" height="14" rx="7" fill="${c.accent}" opacity="0.4"/>`,
  ].join("");
}

function exam(c: MotifColors): string {
  return [
    `<rect x="62" y="40" width="272" height="330" rx="28" fill="${c.ink}"/>`,
    `<rect x="104" y="96" width="150" height="18" rx="9" fill="${c.accent}"/>`,
    `<rect x="104" y="148" width="192" height="18" rx="9" fill="${c.accent}" opacity="0.5"/>`,
    `<rect x="104" y="200" width="158" height="18" rx="9" fill="${c.accent}" opacity="0.5"/>`,
    `<rect x="104" y="252" width="118" height="18" rx="9" fill="${c.accent}" opacity="0.5"/>`,
    `<circle cx="292" cy="302" r="64" fill="${c.accent}"/>`,
    `<path d="M262 302 L284 326 L328 274" fill="none" stroke="${c.ink}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
  ].join("");
}

function context(c: MotifColors): string {
  return [
    `<rect x="30" y="76" width="340" height="216" rx="32" fill="${c.ink}"/>`,
    `<path d="M112 286 L112 362 L180 286 Z" fill="${c.ink}"/>`,
    `<rect x="70" y="122" width="196" height="20" rx="10" fill="${c.accent}" opacity="0.45"/>`,
    `<rect x="62" y="164" width="150" height="40" rx="14" fill="${c.accent}" opacity="0.35"/>`,
    `<rect x="70" y="174" width="134" height="20" rx="10" fill="${c.accent}"/>`,
    `<rect x="220" y="174" width="110" height="20" rx="10" fill="${c.accent}" opacity="0.45"/>`,
    `<rect x="70" y="226" width="172" height="20" rx="10" fill="${c.accent}" opacity="0.45"/>`,
  ].join("");
}

function memory(c: MotifColors): string {
  return [
    `<path d="M56 64 L56 330 L358 330" fill="none" stroke="${c.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>`,
    `<path d="M56 96 C120 250 200 300 356 314" fill="none" stroke="${c.ink}" stroke-width="18" stroke-linecap="round"/>`,
    `<circle cx="56" cy="96" r="18" fill="${c.accent}"/>`,
    `<circle cx="127" cy="217" r="15" fill="${c.accent}"/>`,
    `<circle cx="221" cy="285" r="13" fill="${c.accent}"/>`,
    `<circle cx="356" cy="314" r="11" fill="${c.accent}"/>`,
  ].join("");
}

function neutral(c: MotifColors): string {
  return [
    `<rect x="46" y="96" width="252" height="192" rx="28" fill="${c.ink}" opacity="0.4" transform="rotate(-9 172 192)"/>`,
    `<rect x="96" y="112" width="252" height="192" rx="28" fill="${c.ink}" opacity="0.6" transform="rotate(6 222 208)"/>`,
    `<rect x="62" y="152" width="276" height="196" rx="28" fill="${c.ink}"/>`,
    `<circle cx="200" cy="250" r="46" fill="${c.accent}"/>`,
  ].join("");
}

const MOTIF_DRAWINGS: Record<OgMotifId, (colors: MotifColors) => string> = {
  camera,
  book,
  exam,
  context,
  memory,
  neutral,
};

/** Renders an already-resolved look. Split out so tests can sweep looks directly. */
export function renderOgSvg(look: OgLook): string {
  const palette: OgPalette = look.palette;
  const colors: MotifColors = { ink: palette.ink, accent: look.accent };
  const [x1, y1, x2, y2] = look.gradient;
  const offset = (OG_IMAGE_WIDTH - look.motifSize) / 2;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}">`,
    `<defs><linearGradient id="bg" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">`,
    `<stop offset="0" stop-color="${palette.from}"/><stop offset="1" stop-color="${palette.to}"/>`,
    `</linearGradient></defs>`,
    `<rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#bg)"/>`,
    `<circle cx="${look.inkBlob.cx}" cy="${look.inkBlob.cy}" r="${look.inkBlob.r}" fill="${palette.ink}" opacity="0.06"/>`,
    `<circle cx="${look.accentBlob.cx}" cy="${look.accentBlob.cy}" r="${look.accentBlob.r}" fill="${look.accent}" opacity="0.1"/>`,
    `<rect x="48" y="48" width="${OG_IMAGE_WIDTH - 96}" height="${OG_IMAGE_HEIGHT - 96}" rx="34" fill="none" stroke="${palette.ink}" stroke-width="3" opacity="0.18"/>`,
    `<g transform="translate(${offset} ${(OG_IMAGE_HEIGHT - look.motifSize) / 2}) scale(${look.motifSize / MOTIF_UNITS})">`,
    MOTIF_DRAWINGS[look.motif](colors),
    `</g>`,
    `<rect x="96" y="580" width="120" height="10" rx="5" fill="${look.accent}"/>`,
    `<rect x="230" y="580" width="34" height="10" rx="5" fill="${palette.ink}" opacity="0.5"/>`,
    `<rect x="278" y="580" width="14" height="10" rx="5" fill="${palette.ink}" opacity="0.3"/>`,
    `</svg>`,
  ].join("");
}

/** The card for a post, resolved from its own frontmatter and nothing else. */
export function buildOgSvg(input: OgSvgInput): string {
  return renderOgSvg(resolveOgLook(input.slug, input.tags));
}
