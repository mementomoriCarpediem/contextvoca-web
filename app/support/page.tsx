"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import PageHead from "@/components/PageHead";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { useState } from "react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-900">{question}</span>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const { t } = useTranslation();

  const allQuestions = t.support.faqs.flatMap((s) => s.questions);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <>
      <PageHead
        title={`${t.support.title} | ContextVoca`}
        description={t.support.subtitle}
      />
      <JsonLd data={faqJsonLd} />
      <Header />
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
                  href="mailto:resonance.zorba@gmail.com"
                  className="btn-primary !text-sm"
                >
                  {t.support.contactButton}
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12 space-y-10">
              {t.support.faqs.map((section) => (
                <div key={section.category}>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section.category}
                  </h2>
                  <div className="mt-4">
                    {section.questions.map((faq) => (
                      <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
