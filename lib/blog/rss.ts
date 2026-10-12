import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import type { Locale } from "@/lib/i18n/types";
import { SITE_URL } from "@/lib/seo/site";

/**
 * RSS 2.0 피드(2026-10-12). 네이버 서치어드바이저는 제출된 RSS를 "콘텐츠 피드"로 보고 주기적으로
 * 재방문하며, 각 item에 본문 전체를 담을 것을 권한다(웹마스터 가이드 «RSS 및 사이트맵 제출»).
 */

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/** 사이트 내부 링크(/ko/...)를 절대 주소로 — 피드 리더에는 기준 주소가 없다. */
function absolutizeLinks() {
  return (tree: HastNode) => {
    const visit = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href === "string" && href.startsWith("/")) {
          node.properties = { ...node.properties, href: `${SITE_URL}${href}` };
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

/**
 * 글 본문(MDX)을 피드용 HTML로. 일반 마크다운으로 읽으므로 `<StoreCta />` 같은 MDX 컴포넌트는
 * raw HTML로 취급돼 버려진다(allowDangerousHtml 없음) — 피드에 날 태그가 새지 않는다.
 */
export function markdownToRssHtml(markdown: string): string {
  return String(
    unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(absolutizeLinks)
      .use(rehypeStringify)
      .processSync(markdown)
  );
}

/** 글 날짜(YYYY-MM-DD, 한국 기준)를 RFC 822 날짜로 — 한국 자정. */
export function rssPubDate(date: string): string {
  return new Date(`${date}T00:00:00+09:00`).toUTCString();
}

export function rssUrl(locale: Locale): string {
  return `${SITE_URL}/${locale}/rss.xml`;
}

export interface RssChannel {
  title: string;
  link: string;
  description: string;
  language: string;
  selfUrl: string;
}

export interface RssItem {
  title: string;
  link: string;
  pubDate: string;
  html: string;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cdata(text: string): string {
  return `<![CDATA[${text.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export function buildRssXml(channel: RssChannel, items: readonly RssItem[]): string {
  const itemXml = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <pubDate>${escapeXml(item.pubDate)}</pubDate>
      <description>${cdata(item.html)}</description>
    </item>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${escapeXml(channel.link)}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>${escapeXml(channel.language)}</language>
    <atom:link href="${escapeXml(channel.selfUrl)}" rel="self" type="application/rss+xml"/>
${itemXml}
  </channel>
</rss>
`;
}
