import { WebAnalytics } from "@/components/WebAnalytics";
import type { Metadata } from "next";
import {
  getDictionary,
  resolveLocale,
  brandNames,
  htmlLangMap,
  locales,
} from "@/lib/i18n";
import { siteViewport, SITE_URL } from "@/lib/seo/site";
import "../globals.css";

export const viewport = siteViewport;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    verification: { other: { "naver-site-verification": "b6384bb3a29150ffcba9926cf900188d578a0f9f" } },
    title: {
      default: t.meta.title,
      template: `%s | ${brandNames[locale]}`,
    },
    authors: [{ name: "Gongmyeong" }],
    creator: "Gongmyeong",
    publisher: "Gongmyeong",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "education",
  };
}

/**
 * Standalone root layout for every `/{locale}/...` route. Paired with
 * `app/(root)/layout.tsx` as the second of this app's two independent root
 * layouts (Next.js "multiple root layouts" pattern), so each can set its own
 * `<html lang>` without a shared `app/layout.tsx`.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);

  return (
    <html lang={htmlLangMap[locale]} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <WebAnalytics />
      </body>
    </html>
  );
}
