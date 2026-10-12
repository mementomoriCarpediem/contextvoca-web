import { describe, expect, it } from "vitest";
import { buildRssXml, markdownToRssHtml, rssPubDate, rssUrl } from "./rss";

describe("markdownToRssHtml", () => {
  it("renders headings, paragraphs, lists and GFM tables", () => {
    const html = markdownToRssHtml(
      "## 단계\n\n첫 문단입니다.\n\n- 하나\n- 둘\n\n| a | b |\n| - | - |\n| 1 | 2 |\n"
    );
    expect(html).toContain("<h2>단계</h2>");
    expect(html).toContain("<p>첫 문단입니다.</p>");
    expect(html).toContain("<li>하나</li>");
    expect(html).toContain("<table>");
    expect(html).toContain("<td>2</td>");
  });

  it("drops MDX components such as <StoreCta /> instead of leaking raw tags", () => {
    const html = markdownToRssHtml("본문\n\n<StoreCta />\n\n끝");
    expect(html).not.toMatch(/StoreCta/);
    expect(html).toContain("<p>끝</p>");
  });

  // 리뷰 C1(2026-10-12): 페이지(compileMDX)는 MDX 주석·표현식·import/export를 지우는데, 일반 마크다운으로
  // 읽으면 글자 그대로 피드에 실렸다 — 작성자의 제작 메모가 외부로 나가는 경로.
  it.each([
    ["{/* 내부 메모: 경쟁사 대비 전략 */}\n\n본문", "내부 메모"],
    ["값은 {1 + 1} 입니다", "{1 + 1}"],
    ["import Foo from '../x'\nexport const meta = { a: 1 }\n\n본문", "import Foo"],
    ["import Foo from '../x'\nexport const meta = { a: 1 }\n\n본문", "export const"],
  ])("drops MDX-only syntax (%j) that the page also hides", (md, leaked) => {
    const html = markdownToRssHtml(md);
    expect(html).not.toContain(leaked);
  });

  it("keeps the text inside JSX wrappers while dropping the tags", () => {
    const html = markdownToRssHtml("<Callout>\n\n중요한 내용\n\n</Callout>");
    expect(html).toContain("중요한 내용");
    expect(html).not.toContain("Callout");
  });

  it("makes image paths absolute and leaves protocol-relative URLs alone", () => {
    const html = markdownToRssHtml("![그림](/images/a.png)\n\n[x](//other.example/y)");
    expect(html).toContain('src="https://contextvoca.app/images/a.png"');
    expect(html).toContain('href="//other.example/y"');
  });

  it("makes site-relative links absolute (feed readers have no base URL)", () => {
    const html = markdownToRssHtml("[다른 글](/ko/blog/other/) 과 [외부](https://example.com/x)");
    expect(html).toContain('href="https://contextvoca.app/ko/blog/other/"');
    expect(html).toContain('href="https://example.com/x"');
  });
});

describe("rssPubDate", () => {
  it("formats a YYYY-MM-DD post date as an RFC 822 date at KST midnight", () => {
    expect(rssPubDate("2026-10-12")).toBe("Sun, 11 Oct 2026 15:00:00 GMT");
  });
});

describe("rssUrl", () => {
  it("is the per-locale feed path", () => {
    expect(rssUrl("ko")).toBe("https://contextvoca.app/ko/rss.xml");
  });
});

describe("buildRssXml", () => {
  const channel = {
    title: "문맥보카 블로그",
    link: "https://contextvoca.app/ko/blog/",
    description: "설명 & 소개",
    language: "ko",
    selfUrl: "https://contextvoca.app/ko/rss.xml",
  };

  it("escapes channel text and lists items with full HTML bodies in CDATA", () => {
    const xml = buildRssXml(channel, [
      {
        title: "제목 <1> & 2",
        link: "https://contextvoca.app/ko/blog/a/",
        pubDate: "Sun, 11 Oct 2026 15:00:00 GMT",
        html: "<p>본문</p>",
      },
    ]);
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(xml).toContain("<description>설명 &amp; 소개</description>");
    expect(xml).toContain("<title>제목 &lt;1&gt; &amp; 2</title>");
    expect(xml).toContain("<guid isPermaLink=\"true\">https://contextvoca.app/ko/blog/a/</guid>");
    expect(xml).toContain("<description><![CDATA[<p>본문</p>]]></description>");
    expect(xml).toContain('<atom:link href="https://contextvoca.app/ko/rss.xml" rel="self" type="application/rss+xml"/>');
  });

  it("keeps CDATA well-formed when the body itself contains ]]>", () => {
    const xml = buildRssXml(channel, [
      { title: "t", link: "https://contextvoca.app/ko/blog/b/", pubDate: "x", html: "<p>a]]>b</p>" },
    ]);
    expect(xml).toContain("<![CDATA[<p>a]]]]><![CDATA[>b</p>]]>");
  });
});
