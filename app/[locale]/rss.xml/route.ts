import { brandNames, locales, getDictionary, resolveLocale } from "@/lib/i18n";
import { getPost, getPostsMetaByLocale, localeHasPublishedPosts } from "@/lib/blog/posts";
import { buildRssXml, markdownToRssHtml, rssPubDate, rssUrl } from "@/lib/blog/rss";
import { localizedBlogPostUrl, localizedUrl } from "@/lib/seo/site";

// `output: "export"`용 — 요청 시 입력이 없어 빌드 때 /{locale}/rss.xml 정적 파일로 만들어진다.
// 발행 글이 있는 언어만 만든다(네이버는 item이 0개인 피드를 받지 않는다).
export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.filter((locale) => localeHasPublishedPosts(locale)).map((locale) => ({ locale }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);
  const items = getPostsMetaByLocale(locale).map((meta) => ({
    title: meta.title,
    link: localizedBlogPostUrl(locale, meta.slug),
    pubDate: rssPubDate(meta.date),
    html: markdownToRssHtml(getPost(locale, meta.slug).content),
  }));
  const body = buildRssXml(
    {
      title: `${t.blog.metaTitle} | ${brandNames[locale]}`,
      link: localizedUrl(locale, "/blog"),
      description: t.blog.metaDescription,
      language: locale,
      selfUrl: rssUrl(locale),
    },
    items
  );
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
