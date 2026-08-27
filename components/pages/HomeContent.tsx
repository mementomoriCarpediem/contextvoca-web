"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getDictionary, Locale } from "@/lib/i18n";

const featureIcons = [
  // AI 핵심 단어 추출
  <svg
    key="ai"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>,
  // 문장 맥락 학습
  <svg
    key="context"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>,
  // 유사 문장 비교 테스트
  <svg
    key="test"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  </svg>,
  // 적응형 난이도
  <svg
    key="adaptive"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>,
  // OCR 사진 인식
  <svg
    key="ocr"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>,
  // 태그 기반 관리
  <svg
    key="tag"
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
    />
  </svg>,
];

export default function HomeContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [billingYearly, setBillingYearly] = useState(false);

  return (
    <>
      <Header locale={locale} />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 pt-32 pb-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="section-container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.hero.titleLine1}
                <br />
                <span className="text-accent-400">{t.hero.titleLine2}</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-primary-100 sm:text-xl">
                {t.hero.description.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i === 0 && <br className="hidden sm:block" />}
                  </span>
                ))}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://apps.apple.com/app/id6758887227"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.44C5.57 7.91 7.13 6.93 8.82 6.91C10.1 6.89 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  {t.hero.appStore}
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.contextvoca.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                  </svg>
                  {t.hero.googlePlay}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-20">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {t.howItWorks.title}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {t.howItWorks.subtitle}
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
              {t.howItWorks.steps.map((step) => (
                <div key={step.number} className="relative text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                    {step.number}
                  </div>
                  {Number(step.number) < 4 && (
                    <div className="absolute left-[calc(50%+24px)] top-6 hidden h-0.5 w-[calc(100%-48px)] bg-primary-200 md:block" />
                  )}
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-gray-50 py-20">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {t.features.title}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {t.features.subtitle}
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.features.items.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    {featureIcons[idx]}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Science */}
        <section id="science" className="bg-gray-50 py-20">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {t.science.title}
              </h2>
              <p className="mt-4 text-lg text-gray-500">{t.science.subtitle}</p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.science.cards.map((card, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {card.body}
                  </p>
                  <p className="mt-4 text-sm font-medium text-primary-600">
                    {card.productLine}
                  </p>
                </div>
              ))}
            </div>

            {/* References */}
            <div className="mx-auto mt-16 max-w-3xl">
              <h3 className="text-sm font-semibold text-gray-900">
                {t.science.referencesTitle}
              </h3>
              <ol className="mt-4 space-y-2">
                {t.science.references.map((reference) => (
                  <li key={reference} className="text-xs leading-relaxed text-gray-500">
                    {reference.split(/(https?:\/\/\S+)/g).map((part, i) =>
                      /^https?:\/\//.test(part) ? (
                        <a
                          key={i}
                          href={part}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 underline-offset-2 hover:underline"
                        >
                          {part}
                        </a>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Audiovisual resources */}
            <div className="mx-auto mt-12 max-w-3xl">
              <h3 className="text-sm font-semibold text-gray-900">
                {t.science.mediaTitle}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {t.science.media.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-gray-100 bg-white p-4 text-sm shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="mt-1 text-xs text-gray-500">{item.creator}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-white py-20">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {t.pricing.title}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {t.pricing.subtitle}
              </p>

              {/* Billing toggle */}
              <div className="mt-8 inline-flex items-center rounded-full bg-gray-100 p-1">
                <button
                  onClick={() => setBillingYearly(false)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    !billingYearly
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.pricing.monthly}
                </button>
                <button
                  onClick={() => setBillingYearly(true)}
                  className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    billingYearly
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t.pricing.yearly}
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    {t.pricing.yearlyDiscount}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.pricing.plans.map((plan) => {
                const highlighted = plan.name === "Pro";

                return (
                  <div
                    key={plan.name}
                    className={`relative rounded-2xl border p-6 ${
                      highlighted
                        ? "border-primary-600 bg-primary-50 shadow-lg ring-1 ring-primary-600"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                        {t.pricing.popular}
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {plan.description}
                    </p>
                    <div className="mt-6">
                      <span className="text-4xl font-extrabold text-gray-900">
                        {plan.priceOnce ??
                          (billingYearly ? plan.priceYearly : plan.priceMonthly) ??
                          plan.wordLimit}
                      </span>
                      {(plan.priceMonthly || plan.priceYearly) && !plan.priceOnce && (
                        <span className="ml-1 text-sm text-gray-500">
                          {billingYearly ? t.pricing.perYear : t.pricing.perMonth}
                        </span>
                      )}
                    </div>
                    {(plan.priceMonthly || plan.priceOnce) && (
                      <p className="mt-1 text-sm text-gray-600">{plan.wordLimit}</p>
                    )}
                    {plan.isLifetime && (
                      <p className="mt-1 text-xs text-gray-400">
                        {t.pricing.oneTime}
                      </p>
                    )}
                    {plan.yearlySavings && (
                      <p className="mt-1 text-xs font-semibold text-green-600">
                        {t.pricing.yearlySavingsNote.replace("{percent}", plan.yearlySavings)}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-medium text-primary-600">
                      {plan.priceNote}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <svg
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#download"
                      className={`mt-8 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                        highlighted
                          ? "bg-primary-600 text-white hover:bg-primary-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {t.pricing.startButton}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="download" className="bg-primary-800 py-20">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mt-4 text-lg text-primary-200">{t.cta.subtitle}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/app/id6758887227"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.44C5.57 7.91 7.13 6.93 8.82 6.91C10.1 6.89 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                {t.cta.appStore}
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.contextvoca.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                </svg>
                {t.cta.googlePlay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
