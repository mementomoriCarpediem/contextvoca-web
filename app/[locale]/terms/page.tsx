import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);

  return {
    title: t.terms.metaTitle,
    description: t.terms.metaDescription,
    alternates: buildAlternates(locale, "/terms"),
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900">
              {t.terms.title}
            </h1>
            <p className="mt-2 text-sm text-gray-500">{t.terms.lastUpdated}</p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
              {t.terms.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section.title}
                  </h2>
                  {section.content && (
                    <p className="mt-3">{section.content}</p>
                  )}
                  {section.items && (
                    <ul className="mt-3 list-inside list-disc space-y-2">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
