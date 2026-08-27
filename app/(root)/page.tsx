import type { Metadata } from "next";
import Link from "next/link";
import RootRedirect from "@/components/RootRedirect";
import { locales, localeNames, localeFlags, brandNames } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ContextVoca",
  description:
    "Select your language to start learning English vocabulary in context with ContextVoca.",
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      ko: `${SITE_URL}/ko/`,
      en: `${SITE_URL}/en/`,
      ja: `${SITE_URL}/ja/`,
      "zh-Hans": `${SITE_URL}/zh/`,
      "x-default": `${SITE_URL}/en/`,
    },
  },
  // Thin language-gate page: the localized pages under /{locale}/ carry the
  // indexable content, so this one opts out of indexing to avoid a
  // duplicate/thin-content signal while still being fully crawlable.
  robots: { index: false, follow: true },
};

export default function RootSelectorPage() {
  return (
    <>
      <RootRedirect />
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">ContextVoca</h1>
        <p className="text-gray-500">
          Choose your language / 언어를 선택하세요
        </p>
        <nav
          aria-label="Language selection"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}/`}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary-400 hover:text-primary-600"
            >
              <span className="text-base leading-none">
                {localeFlags[locale]}
              </span>
              <span>
                {localeNames[locale]} ({brandNames[locale]})
              </span>
            </Link>
          ))}
        </nav>
      </main>
    </>
  );
}
