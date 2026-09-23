/**
 * Deterministic look of a post's OG image: which brand palette it uses and
 * which shape motif it carries. Pure and import-free — see `og-image.ts` for
 * why (loaded from plain-Node build scripts).
 *
 * Nothing here reads the clock or a random source: the same frontmatter must
 * always produce the same picture, because the image is a derived asset that
 * is regenerated on every build and must not churn.
 */

export interface OgPalette {
  readonly id: string;
  /** Background gradient, top-left → bottom-right. */
  readonly from: string;
  readonly to: string;
  /** Motif fill/stroke — the bright foreground color. */
  readonly ink: string;
  /** Secondary motif color, used for accents inside the motif. */
  readonly accent: string;
}

/**
 * Brand palettes, all dark-background + light-motif so the picture reads on
 * both light and dark chat surfaces. Colors are the `tailwind.config.js`
 * primary/accent scales verbatim — the brand's own source of truth.
 */
export const OG_PALETTES: readonly OgPalette[] = [
  { id: "deep", from: "#1a0b2e", to: "#4d12b4", ink: "#f0e6ff", accent: "#a78bfa" },
  { id: "violet", from: "#370d82", to: "#6418e6", ink: "#f0e6ff", accent: "#b888ff" },
  { id: "night", from: "#0d0517", to: "#370d82", ink: "#d4b8ff", accent: "#8b5cf6" },
  { id: "royal", from: "#4d12b4", to: "#8038ff", ink: "#f0e6ff", accent: "#d4b8ff" },
  { id: "orchid", from: "#1a0b2e", to: "#7c3aed", ink: "#f0e6ff", accent: "#9c58ff" },
  { id: "indigo", from: "#370d82", to: "#8b5cf6", ink: "#f0e6ff", accent: "#d4b8ff" },
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
