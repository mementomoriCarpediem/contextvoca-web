import { appStoreUrl, playStoreUrl } from "@/lib/seo/site";
"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/pages/HeroSection";
import FeaturesSection from "@/components/pages/FeaturesSection";
import ScienceSection from "@/components/pages/ScienceSection";
import ReferencesFooter from "@/components/pages/ReferencesFooter";
import { getDictionary, Locale } from "@/lib/i18n";

export default function HomeContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [billingYearly, setBillingYearly] = useState(false);

  return (
    <>
      <Header locale={locale} />
      <main>
        <HeroSection t={t} locale={locale} />

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

        <FeaturesSection t={t} locale={locale} />
        <ScienceSection t={t} />

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
                href={appStoreUrl(locale)}
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
                href={playStoreUrl(locale)}
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

        <ReferencesFooter t={t} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
