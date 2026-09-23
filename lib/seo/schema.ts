import { Locale, Translations } from "@/lib/i18n/types";
import { brandNames, htmlLangMap } from "@/lib/i18n";
import type { BlogPostMeta } from "@/lib/blog/types";
import { ogImageUrl } from "@/lib/og/og-image";
import { SITE_URL, localizedBlogPostUrl } from "./site";

const SUPPORT_EMAIL = "support@contextvoca.app";

export function buildSoftwareApplicationSchema(
  locale: Locale,
  t: Translations
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: brandNames[locale],
    applicationCategory: "EducationalApplication",
    operatingSystem: "iOS, Android",
    description: t.meta.description,
    inLanguage: htmlLangMap[locale],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free",
    },
  };
}

export function buildFaqPageSchema(t: Translations): Record<string, unknown> {
  const questions = t.support.faqs.flatMap((section) => section.questions);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };
}

export function buildOrganizationSchema(locale: Locale): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandNames[locale],
    url: `${SITE_URL}/${locale}/`,
    contactPoint: {
      "@type": "ContactPoint",
      email: SUPPORT_EMAIL,
      contactType: "customer support",
    },
  };
}

export function buildArticleSchema(post: BlogPostMeta): Record<string, unknown> {
  const url = localizedBlogPostUrl(post.locale, post.slug);
  const org = { "@type": "Organization", name: brandNames[post.locale] };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: htmlLangMap[post.locale],
    url,
    // Generated at build time by `scripts/generate-og-images.mjs` — the same
    // URL the page's og:image/twitter:image carry (one shared builder, so the
    // three can't drift apart).
    image: ogImageUrl(SITE_URL, post.locale, post.slug),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: org,
    publisher: org,
  };
}

export function buildContactPageSchema(
  locale: Locale,
  t: Translations
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t.support.metaTitle,
    url: `${SITE_URL}/${locale}/support/`,
    inLanguage: htmlLangMap[locale],
  };
}
