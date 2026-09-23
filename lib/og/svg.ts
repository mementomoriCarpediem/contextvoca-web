import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from "./og-image";
import type { OgMotifId, OgPalette } from "./design";
import { pickMotif, pickPalette } from "./design";

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

/** Test seam: lets the suite sweep every motif/palette without inventing slugs. */
export interface OgSvgLook {
  readonly motif?: OgMotifId;
  readonly palette?: OgPalette;
}

/** Motif drawing box, in its own 0–400 coordinate space, centered on the canvas. */
const MOTIF_SIZE = 420;
const MOTIF_SCALE = MOTIF_SIZE / 400;
const MOTIF_X = (OG_IMAGE_WIDTH - MOTIF_SIZE) / 2;
const MOTIF_Y = (OG_IMAGE_HEIGHT - MOTIF_SIZE) / 2;

function camera(p: OgPalette): string {
  return [
    `<rect x="20" y="112" width="360" height="248" rx="38" fill="${p.ink}"/>`,
    `<rect x="140" y="72" width="120" height="50" rx="18" fill="${p.ink}"/>`,
    `<circle cx="200" cy="236" r="92" fill="${p.accent}"/>`,
    `<circle cx="200" cy="236" r="64" fill="${p.ink}" opacity="0.85"/>`,
    `<circle cx="200" cy="236" r="32" fill="${p.accent}"/>`,
    `<circle cx="330" cy="152" r="15" fill="${p.accent}"/>`,
  ].join("");
}

function book(p: OgPalette): string {
  return [
    `<path d="M200 118 C150 84 96 72 40 76 L40 314 C96 310 150 322 200 356 Z" fill="${p.ink}"/>`,
    `<path d="M200 118 C250 84 304 72 360 76 L360 314 C304 310 250 322 200 356 Z" fill="${p.accent}"/>`,
    `<rect x="192" y="118" width="16" height="238" rx="8" fill="${p.ink}" opacity="0.55"/>`,
    `<rect x="74" y="150" width="96" height="14" rx="7" fill="${p.accent}" opacity="0.55"/>`,
    `<rect x="74" y="190" width="72" height="14" rx="7" fill="${p.accent}" opacity="0.4"/>`,
  ].join("");
}

function exam(p: OgPalette): string {
  return [
    `<rect x="62" y="40" width="272" height="330" rx="28" fill="${p.ink}"/>`,
    `<rect x="104" y="96" width="150" height="18" rx="9" fill="${p.accent}"/>`,
    `<rect x="104" y="148" width="192" height="18" rx="9" fill="${p.accent}" opacity="0.5"/>`,
    `<rect x="104" y="200" width="158" height="18" rx="9" fill="${p.accent}" opacity="0.5"/>`,
    `<rect x="104" y="252" width="118" height="18" rx="9" fill="${p.accent}" opacity="0.5"/>`,
    `<circle cx="292" cy="302" r="64" fill="${p.accent}"/>`,
    `<path d="M262 302 L284 326 L328 274" fill="none" stroke="${p.ink}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>`,
  ].join("");
}

function context(p: OgPalette): string {
  return [
    `<rect x="30" y="76" width="340" height="216" rx="32" fill="${p.ink}"/>`,
    `<path d="M112 286 L112 362 L180 286 Z" fill="${p.ink}"/>`,
    `<rect x="70" y="122" width="196" height="20" rx="10" fill="${p.accent}" opacity="0.45"/>`,
    `<rect x="62" y="164" width="150" height="40" rx="14" fill="${p.accent}" opacity="0.35"/>`,
    `<rect x="70" y="174" width="134" height="20" rx="10" fill="${p.accent}"/>`,
    `<rect x="220" y="174" width="110" height="20" rx="10" fill="${p.accent}" opacity="0.45"/>`,
    `<rect x="70" y="226" width="172" height="20" rx="10" fill="${p.accent}" opacity="0.45"/>`,
  ].join("");
}

function memory(p: OgPalette): string {
  return [
    `<path d="M56 64 L56 330 L358 330" fill="none" stroke="${p.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.35"/>`,
    `<path d="M56 96 C120 250 200 300 356 314" fill="none" stroke="${p.ink}" stroke-width="18" stroke-linecap="round"/>`,
    `<circle cx="56" cy="96" r="18" fill="${p.accent}"/>`,
    `<circle cx="127" cy="217" r="15" fill="${p.accent}"/>`,
    `<circle cx="221" cy="285" r="13" fill="${p.accent}"/>`,
    `<circle cx="356" cy="314" r="11" fill="${p.accent}"/>`,
  ].join("");
}

function neutral(p: OgPalette): string {
  return [
    `<rect x="46" y="96" width="252" height="192" rx="28" fill="${p.ink}" opacity="0.4" transform="rotate(-9 172 192)"/>`,
    `<rect x="96" y="112" width="252" height="192" rx="28" fill="${p.ink}" opacity="0.6" transform="rotate(6 222 208)"/>`,
    `<rect x="62" y="152" width="276" height="196" rx="28" fill="${p.ink}"/>`,
    `<circle cx="200" cy="250" r="46" fill="${p.accent}"/>`,
  ].join("");
}

const MOTIF_DRAWINGS: Record<OgMotifId, (palette: OgPalette) => string> = {
  camera,
  book,
  exam,
  context,
  memory,
  neutral,
};

/**
 * Builds the card for a post. `look` overrides what `slug`/`tags` would pick —
 * only the test suite uses it, to sweep every motif × palette combination.
 */
export function buildOgSvg(input: OgSvgInput, look: OgSvgLook = {}): string {
  const palette = look.palette ?? pickPalette(input.slug);
  const motif = look.motif ?? pickMotif(input.tags);

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" viewBox="0 0 ${OG_IMAGE_WIDTH} ${OG_IMAGE_HEIGHT}">`,
    `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">`,
    `<stop offset="0" stop-color="${palette.from}"/><stop offset="1" stop-color="${palette.to}"/>`,
    `</linearGradient></defs>`,
    `<rect width="${OG_IMAGE_WIDTH}" height="${OG_IMAGE_HEIGHT}" fill="url(#bg)"/>`,
    `<circle cx="1010" cy="96" r="300" fill="${palette.ink}" opacity="0.06"/>`,
    `<circle cx="150" cy="606" r="232" fill="${palette.accent}" opacity="0.1"/>`,
    `<rect x="48" y="48" width="${OG_IMAGE_WIDTH - 96}" height="${OG_IMAGE_HEIGHT - 96}" rx="34" fill="none" stroke="${palette.ink}" stroke-width="3" opacity="0.18"/>`,
    `<g transform="translate(${MOTIF_X} ${MOTIF_Y}) scale(${MOTIF_SCALE})">`,
    MOTIF_DRAWINGS[motif](palette),
    `</g>`,
    `<rect x="96" y="580" width="120" height="10" rx="5" fill="${palette.accent}"/>`,
    `<rect x="230" y="580" width="34" height="10" rx="5" fill="${palette.ink}" opacity="0.5"/>`,
    `<rect x="278" y="580" width="14" height="10" rx="5" fill="${palette.ink}" opacity="0.3"/>`,
    `</svg>`,
  ].join("");
}
