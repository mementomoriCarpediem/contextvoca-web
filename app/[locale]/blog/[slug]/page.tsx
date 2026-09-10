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
  getStaticParamsForBuild,
  localeHasPublishedPosts,
  PLACEHOLDER_SLUG,
} from "@/lib/blog/posts";
import { buildPostAlternates } from "@/lib/blog/hreflang";
import { getMdxComponents } from "@/lib/blog/mdx-components";
import { buildArticleSchema } from "@/lib/seo/schema";
import { buildStubViewModel } from "@/lib/blog/stub";
import type { BlogPost } from "@/lib/blog/types";

// 정적 export이므로 목록에 없는 slug는 애초에 빌드되지 않는다(요청 시점 생성 없음).
export const dynamicParams = false;

// 근거는 lib/blog/posts.ts의 getStaticParamsForBuild 주석 참고 — 부모 로케일별로
// 필터링하지 않고 draft 포함 전체 목록(비어있으면 placeholder 1개)을 그대로 반환한다.
export async function generateStaticParams() {
  return getStaticParamsForBuild();
}

function safeGetPost(locale: string, slug: string): BlogPost | null {
  if (slug === PLACEHOLDER_SLUG) return null;
  return getPost(resolveLocale(locale), slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = resolveLocale(localeParam);
  const post = safeGetPost(localeParam, slug);

  // draft(또는 placeholder) — title 외 어떤 필드도 metadata에 올리지 않는다.
  // description/openGraph/alternates를 생략해 <head>로 초안 내용이 새는 경로를
  // 원천 차단한다(noindex,nofollow만 추가).
  if (!post || post.meta.draft) {
    const view = buildStubViewModel(post);
    return {
      title: view.title ?? undefined,
      robots: { index: false, follow: false },
    };
  }

  const { meta } = post;
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
  const showBlog = localeHasPublishedPosts(locale);
  const post = safeGetPost(localeParam, slug);

  // draft(또는 placeholder) 스텁 — 본문(post.content)은 절대 읽지도, compileMDX에
  // 넘기지도 않는다. canonical/og/JSON-LD/hreflang/StoreCta 전부 생략.
  if (!post || post.meta.draft) {
    const view = buildStubViewModel(post);
    return (
      <>
        <Header locale={locale} showBlog={showBlog} />
        <main className="pt-24 pb-20">
          <div className="section-container">
            <div className="mx-auto max-w-[65ch]">
              {view.title && (
                <h1 className="text-3xl font-bold text-gray-900">{view.title}</h1>
              )}
              <p className="mt-4 text-gray-500">{t.blog.emptyState}</p>
            </div>
          </div>
        </main>
        <Footer locale={locale} />
      </>
    );
  }

  const { content } = await compileMDX({
    source: post.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
    components: getMdxComponents(locale),
  });

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
