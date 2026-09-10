import type { Metadata } from "next";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import {
  getAllPostsMeta,
  getPost,
  localeHasPublishedPosts,
} from "@/lib/blog/posts";
import { buildPostAlternates } from "@/lib/blog/hreflang";
import { getMdxComponents } from "@/lib/blog/mdx-components";
import { buildArticleSchema } from "@/lib/seo/schema";

// 정적 export이므로 목록에 없는 slug는 애초에 빌드되지 않는다(요청 시점 생성 없음).
export const dynamicParams = false;

/**
 * 로케일별로 필터링하지 않고 발행된 글 전체의 {locale, slug} 쌍을 그대로 반환한다.
 *
 * 이유(실측, Next.js 15.5.12): 이 함수는 부모 세그먼트([locale] 레이아웃의
 * generateStaticParams가 만든) 5개 로케일 값마다 한 번씩 호출된다. 그중 한
 * 로케일이라도 빈 배열을 반환하면, Next는 그 로케일의 params를 "locale만 있고
 * slug 없음" 상태로 내부 목록에 남긴다. `output: "export"`는 라우트의 모든 params
 * 항목이 두 동적 세그먼트를 전부 채워야만 정적 생성을 진행하는데, 로케일 하나라도
 * 이 조건을 못 채우면 라우트 전체(다른 로케일의 정상 글까지)가
 * "missing generateStaticParams()" 빌드 오류로 실패한다. 전체 목록을 매번
 * 그대로 반환하면 모든 호출이 항상 비어있지 않아 이 경로를 피하고, Next가
 * pathname 기준으로 중복을 제거한다.
 */
export async function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({ locale: post.locale, slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const { meta } = getPost(locale, slug);
  const alternates = buildPostAlternates(meta, getAllPostsMeta());

  return {
    title: meta.title,
    description: meta.description,
    alternates,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: alternates.canonical,
      publishedTime: meta.date,
      modifiedTime: meta.updated ?? meta.date,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const t = getDictionary(locale);
  const post = getPost(locale, slug);

  const { content } = await compileMDX({
    source: post.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    components: getMdxComponents(locale),
  });

  const showBlog = localeHasPublishedPosts(locale);

  return (
    <>
      <JsonLd data={buildArticleSchema(post.meta)} />
      <Header locale={locale} showBlog={showBlog} />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <article>
            <div className="mx-auto max-w-[65ch]">
              <h1 className="text-3xl font-bold text-gray-900">
                {post.meta.title}
              </h1>
              <p className="mt-2 text-sm text-gray-400">
                {post.meta.date}
                {post.meta.updated
                  ? ` · ${t.blog.updatedLabel} ${post.meta.updated}`
                  : ""}
              </p>
            </div>
            <div className="blog-prose mt-8">{content}</div>
          </article>

          <div className="mx-auto mt-12 max-w-[65ch]">
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              &larr; {t.blog.backToList}
            </Link>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
