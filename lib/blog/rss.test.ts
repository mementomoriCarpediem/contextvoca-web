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
