import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HomeContent from "@/components/pages/HomeContent";
import LatestPostsSection from "@/components/blog/LatestPostsSection";
import {
  getDictionary,
  resolveLocale,
  brandNames,
  locales,
  ogLocaleMap,
} from "@/lib/i18n";
import { buildAlternates, SITE_URL } from "@/lib/seo/site";
import { getPostsMetaByLocale, localeHasPublishedPosts } from "@/lib/blog/posts";
import {
  buildSoftwareApplicationSchema,
  buildFaqPageSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schema";

const LATEST_POSTS_LIMIT = 3;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);
  const alternateLocales = locales
    .filter((l) => l !== locale)
    .map((l) => ogLocaleMap[l]);

  return {
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: buildAlternates(locale, ""),
    openGraph: {
      type: "website",
      siteName: brandNames[locale],
      title: t.meta.title,
      description: t.meta.ogDescription,
      url: `${SITE_URL}/${locale}/`,
      locale: ogLocaleMap[locale],
      alternateLocale: alternateLocales,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.ogDescription,
    },
  };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);
  const latestPosts = getPostsMetaByLocale(locale).slice(0, LATEST_POSTS_LIMIT);

  return (
    <>
      <JsonLd
        data={[
          buildSoftwareApplicationSchema(locale, t),
          buildFaqPageSchema(t),
          buildOrganizationSchema(locale),
        ]}
      />
      <HomeContent
        locale={locale}
        showBlog={localeHasPublishedPosts(locale)}
        latestPostsSection={
          <LatestPostsSection locale={locale} posts={latestPosts} t={t.blog} />
        }
      />
    </>
  );
}
