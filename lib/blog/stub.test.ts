import { describe, expect, it } from "vitest";
import { buildStubViewModel } from "./stub";
import type { BlogPost } from "./types";

const DRAFT_POST: BlogPost = {
  meta: {
    title: "사진으로 영어 단어장 만드는 법",
    description: "이 설명은 절대 노출되면 안 된다",
    date: "2026-09-10",
    tags: ["절대노출금지태그"],
    locale: "ko",
    slug: "photo-vocabulary",
    translationKey: "photo-vocabulary-howto",
    draft: true,
  },
  content: "손으로 입력하지 않아도 되는 이유는 다음과 같다.",
};

describe("buildStubViewModel", () => {
  it("keeps only the title from a real draft post", () => {
    const view = buildStubViewModel(DRAFT_POST);
    expect(view).toEqual({ title: DRAFT_POST.meta.title });
  });

  it("never leaks description, tags, or body content", () => {
    const view = buildStubViewModel(DRAFT_POST);
    const serialized = JSON.stringify(view);
    expect(serialized).not.toContain(DRAFT_POST.meta.description);
    expect(serialized).not.toContain(DRAFT_POST.meta.tags[0]);
    expect(serialized).not.toContain(DRAFT_POST.content);
  });

  it("returns no title when there is no backing post (synthetic placeholder route)", () => {
    const view = buildStubViewModel(null);
    expect(view).toEqual({ title: null });
  });
});
