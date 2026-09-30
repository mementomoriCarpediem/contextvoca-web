import { describe, expect, it } from "vitest";
import { locales, getDictionary } from "./index";

// Ruling 13: `lastUpdated`에 남긴 배포일 자리표시(`[배포일]` 등 대괄호)가 그대로
// 배포되면 방문자에게 "[deploy day]" 같은 문자열이 노출된다. 이 테스트는 배포
// 전 반드시 실제 날짜로 치환하라는 게이트다 — 자리표시가 남아 있는 동안은
// 의도적으로 실패한다(2026-09-30 리뷰 C1).
describe("privacy/terms lastUpdated has no leftover placeholder", () => {
  for (const locale of locales) {
    it(`${locale}: privacy.lastUpdated has no [..] placeholder`, () => {
      const dict = getDictionary(locale);
      expect(dict.privacy.lastUpdated).not.toMatch(/\[.*\]/);
    });

    it(`${locale}: terms.lastUpdated has no [..] placeholder`, () => {
      const dict = getDictionary(locale);
      expect(dict.terms.lastUpdated).not.toMatch(/\[.*\]/);
    });
  }
});
