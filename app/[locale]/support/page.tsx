import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import SupportFaqList from "@/components/pages/SupportFaqList";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo/site";
import { buildFaqPageSchema, buildContactPageSchema } from "@/lib/seo/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);

  return {
    title: t.support.metaTitle,
    description: t.support.metaDescription,
    alternates: buildAlternates(locale, "/support"),
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);

  return (
    <>
      <JsonLd
        data={[buildFaqPageSchema(t), buildContactPageSchema(locale, t)]}
      />
      <Header locale={locale} />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900">
              {t.support.title}
            </h1>
            <p className="mt-2 text-gray-500">{t.support.subtitle}</p>

            {/* Contact Card */}
            <div className="mt-8 rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <h2 className="text-base font-semibold text-gray-900">
                {t.support.contactTitle}
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                {t.support.contactDescription}
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:support@contextvoca.app"
                  className="btn-primary !text-sm"
                >
                  {t.support.contactButton}
                </a>
              </div>
            </div>

            <SupportFaqList faqs={t.support.faqs} />
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
