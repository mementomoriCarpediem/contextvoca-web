import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
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

interface MdastNode {
  type: string;
  children?: MdastNode[];
}

const MDX_DROPPED = new Set(["mdxjsEsm", "mdxFlowExpression", "mdxTextExpression"]);
const MDX_JSX = new Set(["mdxJsxFlowElement", "mdxJsxTextElement"]);

/**
 * MDX 전용 노드 정리 — 페이지(compileMDX)가 화면에 내지 않는 것은 피드에도 내지 않는다(리뷰 C1).
 * import/export·표현식·주석({/* … *\/})은 지우고, JSX 요소는 태그만 벗겨 안의 내용을 남긴다
 * (<StoreCta />처럼 내용이 없으면 통째로 사라진다).
 */
function stripMdx() {
  return (tree: MdastNode) => {
    const clean = (node: MdastNode) => {
      if (!node.children) return;
      node.children = node.children.flatMap((child) => {
        if (MDX_DROPPED.has(child.type)) return [];
        clean(child);
        return MDX_JSX.has(child.type) ? (child.children ?? []) : [child];
      });
    };
    clean(tree);
  };
}

/** 사이트 내부 주소(/ko/…)를 절대 주소로 — 피드 리더에는 기준 주소가 없다. `//host`는 그대로 둔다. */
function absolutizeUrls() {
  const fix = (value: unknown) =>
    typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? `${SITE_URL}${value}` : value;
  return (tree: HastNode) => {
    const visit = (node: HastNode) => {
      if (node.type === "element" && node.properties) {
        if (node.tagName === "a") node.properties = { ...node.properties, href: fix(node.properties.href) };
        if (node.tagName === "img") node.properties = { ...node.properties, src: fix(node.properties.src) };
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

/**
 * 글 본문(MDX)을 피드용 HTML로. 페이지와 같은 MDX 문법으로 읽은 뒤 MDX 전용 노드를 정리한다(stripMdx).
 */
export function markdownToRssHtml(markdown: string): string {
  return String(
    unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkGfm)
      .use(stripMdx)
      .use(remarkRehype)
      .use(absolutizeUrls)
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
