import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "./parse-frontmatter";

describe("parseFrontmatter", () => {
  it("splits a leading YAML-ish frontmatter block from the MDX body", () => {
    const raw = `---
title: 사진으로 영어 단어장 만드는 법
description: 사진 한 장으로 단어장을 만드는 방법을 단계별로 설명한다.
date: 2026-09-01
tags: [사진단어장, 영어공부]
locale: ko
slug: photo-vocabulary
translationKey: photo-vocabulary-howto
draft: true
---

## 제목

본문 내용.
`;

    const { data, content } = parseFrontmatter(raw);

    expect(data.title).toBe("사진으로 영어 단어장 만드는 법");
    expect(data.tags).toEqual(["사진단어장", "영어공부"]);
    expect(data.draft).toBe(true);
    expect(data.locale).toBe("ko");
    expect(content.trim()).toBe("## 제목\n\n본문 내용.");
  });

  it("parses quoted string values and strips surrounding quotes", () => {
    const raw = `---
title: "따옴표: 제목"
description: '작은따옴표 제목'
---
본문
`;
    const { data } = parseFrontmatter(raw);

    expect(data.title).toBe("따옴표: 제목");
    expect(data.description).toBe("작은따옴표 제목");
  });

  it("defaults draft to false when the key is absent", () => {
    const raw = `---
title: t
---
본문
`;
    const { data } = parseFrontmatter(raw);
    expect(data.draft).toBeUndefined();
  });

  it("throws when the input has no frontmatter block", () => {
    expect(() => parseFrontmatter("# 그냥 본문")).toThrow();
  });
});
