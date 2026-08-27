import { Locale, Translations } from "@/lib/i18n/types";
import { brandNames, htmlLangMap } from "@/lib/i18n";
import { SITE_URL } from "./site";

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
