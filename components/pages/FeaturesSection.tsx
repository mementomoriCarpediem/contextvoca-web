import type { ReactElement } from "react";
import { Translations } from "@/lib/i18n";

/** Indices into `t.features.items` for the four cards shown with a matching
 * screenshot in the zigzag layout, paired with the screenshot file and the
 * matching entry in `t.features.screenshotAlts` (same order). */
const ZIGZAG_FEATURES = [
  { itemIndex: 0, altIndex: 0, src: "/images/screens/02-add-vocab.webp" },
  { itemIndex: 2, altIndex: 1, src: "/images/screens/04-quiz.webp" },
  { itemIndex: 3, altIndex: 2, src: "/images/screens/05-quiz-setup.webp" },
  { itemIndex: 5, altIndex: 3, src: "/images/screens/03-vocabulary.webp" },
] as const;

/** Remaining feature items, shown as a compact icon strip below the zigzag. */
const COMPACT_FEATURES = [1, 4] as const;

const compactIcons: Record<number, ReactElement> = {
  1: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),
  4: (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

export default function FeaturesSection({ t }: { t: Translations }) {
  return (
    <section id="features" className="bg-gray-50 py-20">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t.features.title}
          </h2>
          <p className="mt-4 text-lg text-gray-500">{t.features.subtitle}</p>
        </div>

        {/* Zigzag: feature copy paired with a matching screenshot */}
        <div className="mt-16 space-y-16 md:space-y-24">
          {ZIGZAG_FEATURES.map(({ itemIndex, altIndex, src }, idx) => {
            const feature = t.features.items[itemIndex];
            const reversed = idx % 2 === 1;

            const imagePanel = (
              <div className="mx-auto w-full max-w-[220px] sm:max-w-[260px]">
                <div className="overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
                  <img
                    src={src}
                    alt={t.features.screenshotAlts[altIndex]}
                    width={720}
                    height={1557}
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            );
            const textPanel = (
              <div className="text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            );

            return (
              <div
                key={itemIndex}
                className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                {reversed ? (
                  <>
                    {textPanel}
                    {imagePanel}
                  </>
                ) : (
                  <>
                    {imagePanel}
                    {textPanel}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Compact strip for the remaining features */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {COMPACT_FEATURES.map((itemIndex) => {
            const feature = t.features.items[itemIndex];
            return (
              <div
                key={itemIndex}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  {compactIcons[itemIndex]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
