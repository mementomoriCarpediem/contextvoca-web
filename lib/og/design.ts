/**
 * Deterministic look of a post's OG image. Pure and import-free — see
 * `og-image.ts` for why (loaded from plain-Node build scripts).
 *
 * Nothing here reads the clock or a random source, and nothing depends on the
 * *other* posts: the same frontmatter must always produce the same picture,
 * and adding a post must never change an existing post's image. (That rules
 * out "pick a combination nobody used yet" style collision avoidance.)
 *
 * Every visual axis is cut from one 32-bit `hashSlug(slug)` value, and the
 * cuts together consume all 32 bits with per-step-distinct values. Two slugs
 * therefore render the same card only if their hashes collide outright — not
 * merely because they share a motif. That matters: the tag vocabulary is
 * narrow (8 of 14 posts in `content/blog` are exam posts), so before the extra
 * axes existed the whole signature space was the six palettes and different
 * posts genuinely collided.
 */

export interface OgPalette {
  readonly id: string;
  /** Background gradient endpoints. */
  readonly from: string;
  readonly to: string;
  /** Motif body — the bright foreground color. */
  readonly ink: string;
  /**
   * Candidate motif accents for this background, brightest-safe first. Each
   * is a brand scale color light enough to stay legible against this
   * palette's `to` end (the accent also paints shapes that sit directly on
   * the background, e.g. the book's right page).
   */
  readonly accents: readonly string[];
}

/**
 * Brand palettes, all dark-background + light-motif so the picture reads on
 * both light and dark chat surfaces. Colors are the `tailwind.config.js`
 * primary/accent scales verbatim — the brand's own source of truth.
 */
export const OG_PALETTES: readonly OgPalette[] = [
  {
    id: "deep",
    from: "#1a0b2e",
    to: "#4d12b4",
    ink: "#f0e6ff",
    accents: ["#a78bfa", "#b888ff", "#9c58ff", "#d4b8ff"],
  },
  {
    id: "violet",
    from: "#370d82",
    to: "#6418e6",
    ink: "#f0e6ff",
    accents: ["#b888ff", "#a78bfa", "#d4b8ff", "#9c58ff"],
  },
  {
    id: "night",
    from: "#0d0517",
    to: "#370d82",
    ink: "#d4b8ff",
    accents: ["#8b5cf6", "#9c58ff", "#a78bfa", "#b888ff"],
  },
  {
    id: "royal",
    from: "#4d12b4",
    to: "#8038ff",
    ink: "#f0e6ff",
    accents: ["#d4b8ff", "#b888ff", "#a78bfa", "#9c58ff"],
  },
  {
    id: "orchid",
    from: "#1a0b2e",
    to: "#7c3aed",
    ink: "#f0e6ff",
    accents: ["#a78bfa", "#d4b8ff", "#b888ff", "#9c58ff"],
  },
  {
    id: "indigo",
    from: "#370d82",
    to: "#8b5cf6",
    ink: "#f0e6ff",
    accents: ["#d4b8ff", "#b888ff", "#a78bfa", "#9c58ff"],
  },
];

export const OG_MOTIF_IDS = [
  "camera",
  "book",
  "exam",
  "context",
  "memory",
  "neutral",
] as const;

export type OgMotifId = (typeof OG_MOTIF_IDS)[number];

/**
 * Tag keywords per motif, in match priority order. Substring match, so a tag
 * like `사진 단어장` hits `사진`. Covers the ko/ja/zh-Hant tag vocabularies
 * actually used in `content/blog/**` — an unknown tag is not an error, it
 * falls through to `neutral` (see `pickMotif`).
 */
const MOTIF_KEYWORDS: ReadonlyArray<readonly [OgMotifId, readonly string[]]> = [
  ["camera", ["사진", "카메라", "写真", "カメラ", "拍照", "照片", "photo"]],
  ["book", ["원서", "소설", "독서", "原書", "小説", "読書", "小說", "讀書", "novel", "reading"]],
  [
    "exam",
    [
      "토익", "수능", "공무원", "편입", "내신", "중학생", "기출", "시험", "EBS",
      "英検", "試験", "受験",
      "學測", "英檢", "GEPT", "考試", "詞彙題", "學測英文",
      "TOEIC", "TOEFL",
    ],
  ],
  ["context", ["문맥", "예문", "단어장", "文脈", "例文", "単語帳", "句子", "單字本", "context"]],
  [
    "memory",
    ["망각", "곡선", "복습", "간격", "기억", "학습 과학", "忘却", "復習", "間隔", "記憶", "学習科学", "複習"],
  ],
];

/** Motif used when no tag matches — never fail a build over an unknown tag. */
const FALLBACK_MOTIF: OgMotifId = "neutral";

/** FNV-1a (32-bit) over the string's UTF-16 code units. Stable across runtimes. */
export function hashSlug(slug: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < slug.length; i += 1) {
    const code = slug.charCodeAt(i);
    hash = Math.imul(hash ^ (code & 0xff), 0x01000193);
    hash = Math.imul(hash ^ ((code >> 8) & 0xff), 0x01000193);
  }
  return hash >>> 0;
}

/** The palette a slug always gets. */
export function pickPalette(slug: string): OgPalette {
  return OG_PALETTES[hashSlug(slug) % OG_PALETTES.length];
}

/**
 * The motif for a post's tags: the first tag (in frontmatter order) that
 * matches any keyword wins, motifs tried in `MOTIF_KEYWORDS` order.
 */
export function pickMotif(tags: readonly string[]): OgMotifId {
  for (const tag of tags) {
    for (const [motif, keywords] of MOTIF_KEYWORDS) {
      if (keywords.some((keyword) => tag.includes(keyword))) return motif;
    }
  }
  return FALLBACK_MOTIF;
}

/** A soft background circle. Integer coordinates keep distinct steps distinct. */
export interface OgBlob {
  readonly cx: number;
  readonly cy: number;
  readonly r: number;
}

/** Background gradient direction as `[x1, y1, x2, y2]` in unit-square coords. */
export type OgGradient = readonly [number, number, number, number];

export interface OgLook {
  readonly palette: OgPalette;
  readonly accent: string;
  readonly motif: OgMotifId;
  readonly gradient: OgGradient;
  /** Large, very faint `ink` circle in the upper right region. */
  readonly inkBlob: OgBlob;
  /** Softer `accent` circle in the lower left region. */
  readonly accentBlob: OgBlob;
  /** Motif box edge in px (the motif is drawn in a 400-unit space and scaled). */
  readonly motifSize: number;
}

const GRADIENTS: readonly OgGradient[] = [
  [0, 0, 1, 1],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
  [1, 1, 0, 0],
  [0, 0.2, 1, 0.8],
  [0.2, 0, 0.8, 1],
];

/**
 * Bit budget of `hashSlug`. The widths sum to exactly 32 and every axis maps
 * its index to a value no other index of that axis produces, so the whole hash
 * is recoverable from the rendered card — distinct hash, distinct card.
 */
const AXES = {
  accent: { shift: 0, bits: 2 },
  gradient: { shift: 2, bits: 3 },
  motifSize: { shift: 5, bits: 3 },
  inkBlobX: { shift: 8, bits: 5 },
  inkBlobY: { shift: 13, bits: 4 },
  inkBlobR: { shift: 17, bits: 3 },
  accentBlobX: { shift: 20, bits: 5 },
  accentBlobY: { shift: 25, bits: 4 },
  accentBlobR: { shift: 29, bits: 3 },
} as const;

function axisIndex(hash: number, axis: { shift: number; bits: number }): number {
  return (hash >>> axis.shift) & ((1 << axis.bits) - 1);
}

/**
 * Everything the renderer needs, derived from `slug` (look) and `tags`
 * (motif). Same slug → same look, in every locale: a translation is the same
 * post and deliberately shares its card.
 */
export function resolveOgLook(slug: string, tags: readonly string[]): OgLook {
  const hash = hashSlug(slug);
  const palette = pickPalette(slug);

  return {
    palette,
    accent: palette.accents[axisIndex(hash, AXES.accent) % palette.accents.length],
    motif: pickMotif(tags),
    gradient: GRADIENTS[axisIndex(hash, AXES.gradient)],
    // 368–480 px in 16 px steps: visible variation, always inside the frame.
    motifSize: 368 + axisIndex(hash, AXES.motifSize) * 16,
    inkBlob: {
      cx: 820 + axisIndex(hash, AXES.inkBlobX) * 11,
      cy: -40 + axisIndex(hash, AXES.inkBlobY) * 14,
      r: 240 + axisIndex(hash, AXES.inkBlobR) * 14,
    },
    accentBlob: {
      cx: 20 + axisIndex(hash, AXES.accentBlobX) * 10,
      cy: 480 + axisIndex(hash, AXES.accentBlobY) * 14,
      r: 180 + axisIndex(hash, AXES.accentBlobR) * 13,
    },
  };
}
