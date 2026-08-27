import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HomeContent from "@/components/pages/HomeContent";
import {
  getDictionary,
  resolveLocale,
  brandNames,
  locales,
  ogLocaleMap,
} from "@/lib/i18n";
import { buildAlternates, SITE_URL } from "@/lib/seo/site";
import {
  buildSoftwareApplicationSchema,
  buildFaqPageSchema,
  buildOrganizationSchema,
} from "@/lib/seo/schema";

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

  return (
    <>
      <JsonLd
        data={[
          buildSoftwareApplicationSchema(locale, t),
          buildFaqPageSchema(t),
          buildOrganizationSchema(locale),
        ]}
      />
      <HomeContent locale={locale} />
    </>
  );
}
