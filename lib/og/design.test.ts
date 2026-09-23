import { describe, expect, it } from "vitest";
import {
  OG_MOTIF_IDS,
  OG_PALETTES,
  hashSlug,
  pickMotif,
  pickPalette,
} from "./design";

describe("hashSlug", () => {
  it("returns the same number for the same slug", () => {
    expect(hashSlug("photo-vocabulary-guide")).toBe(hashSlug("photo-vocabulary-guide"));
  });

  it("returns different numbers for different slugs", () => {
    expect(hashSlug("photo-vocabulary-guide")).not.toBe(hashSlug("suneung-vocab-context"));
  });

  it("stays a non-negative 32-bit integer", () => {
    for (const slug of ["", "a", "수능-단어", "x".repeat(200)]) {
      const hash = hashSlug(slug);
      expect(Number.isInteger(hash)).toBe(true);
      expect(hash).toBeGreaterThanOrEqual(0);
      expect(hash).toBeLessThan(2 ** 32);
    }
  });
});

describe("pickPalette", () => {
  it("picks one of the declared palettes", () => {
    expect(OG_PALETTES).toContain(pickPalette("any-slug"));
  });

  it("is deterministic for a given slug", () => {
    expect(pickPalette("civil-service-exam-vocab").id).toBe(
      pickPalette("civil-service-exam-vocab").id
    );
  });

  it("pins the palette of every published post so a hash change is caught", () => {
    // Golden values — a change here means every already-shared OG image
    // silently changed color. Update only on purpose.
    expect(pickPalette("forgetting-curve-2015-replication").id).toBe("deep");
    expect(pickPalette("novel-reading-photo-vocabulary").id).toBe("deep");
    expect(pickPalette("photo-vocabulary-guide").id).toBe("violet");
    expect(pickPalette("suneung-vocab-context").id).toBe("orchid");
    expect(pickPalette("toeic-vocab-office-worker").id).toBe("violet");
  });

  it("gives every published post a distinct palette+motif pair", () => {
    const published = [
      { slug: "forgetting-curve-2015-replication", tags: ["망각 곡선", "학습 과학", "간격 반복"] },
      { slug: "novel-reading-photo-vocabulary", tags: ["영어원서", "영어 단어 암기", "문맥 학습"] },
      { slug: "photo-vocabulary-guide", tags: ["사진 단어장", "영어 단어 암기", "단어장 만들기"] },
      { slug: "suneung-vocab-context", tags: ["수능 영단어", "문맥 학습", "EBS 지문"] },
      { slug: "toeic-vocab-office-worker", tags: ["토익 단어", "영어 단어 암기", "직장인 영어"] },
    ];
    const looks = published.map((p) => `${pickPalette(p.slug).id}/${pickMotif(p.tags)}`);
    expect(new Set(looks).size).toBe(published.length);
  });

  it("uses every declared palette across a realistic slug set", () => {
    const slugs = Array.from({ length: 200 }, (_, i) => `post-number-${i}`);
    const used = new Set(slugs.map((slug) => pickPalette(slug).id));
    expect(used.size).toBe(OG_PALETTES.length);
  });
});

describe("pickMotif", () => {
  it("picks the motif of the first tag that matches, in tag order", () => {
    expect(pickMotif(["사진 단어장", "영어 단어 암기", "단어장 만들기"])).toBe("camera");
    expect(pickMotif(["영어원서", "영어 단어 암기", "문맥 학습"])).toBe("book");
    expect(pickMotif(["수능 영단어", "문맥 학습", "EBS 지문"])).toBe("exam");
    expect(pickMotif(["토익 단어", "영어 단어 암기", "직장인 영어"])).toBe("exam");
    expect(pickMotif(["망각 곡선", "학습 과학", "간격 반복"])).toBe("memory");
  });

  it("matches Japanese and Traditional Chinese tags too", () => {
    expect(pickMotif(["写真 単語帳", "英単語 覚え方"])).toBe("camera");
    expect(pickMotif(["英検2級", "英単語 覚え方"])).toBe("exam");
    expect(pickMotif(["忘却曲線", "学習科学"])).toBe("memory");
    expect(pickMotif(["拍照背單字", "英文單字本"])).toBe("camera");
    expect(pickMotif(["學測英文", "詞彙題"])).toBe("exam");
    expect(pickMotif(["全民英檢", "GEPT中級"])).toBe("exam");
  });

  it("falls back to the neutral motif instead of failing", () => {
    expect(pickMotif([])).toBe("neutral");
    expect(pickMotif(["완전히 새로운 주제", "unmatched tag"])).toBe("neutral");
  });

  it("only ever returns a declared motif id", () => {
    const tagSets = [[], ["사진"], ["nope"], ["문맥 학습"], ["간격 반복"]];
    for (const tags of tagSets) {
      expect(OG_MOTIF_IDS).toContain(pickMotif(tags));
    }
  });
});
