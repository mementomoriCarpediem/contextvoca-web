import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogListing from "@/components/blog/BlogListing";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo/site";
import { getPostsMetaByLocale, localeHasPublishedPosts } from "@/lib/blog/posts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);

  return {
    title: t.blog.metaTitle,
    description: t.blog.metaDescription,
    alternates: buildAlternates(locale, "/blog"),
  };
}

export default async function BlogListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);
  const posts = getPostsMetaByLocale(locale);
  const showBlog = localeHasPublishedPosts(locale);

  return (
    <>
      <Header locale={locale} showBlog={showBlog} />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900">{t.blog.title}</h1>
            <p className="mt-2 text-gray-500">{t.blog.subtitle}</p>

            <Suspense fallback={null}>
              <BlogListing locale={locale} posts={posts} t={t.blog} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
