import { Translations } from "@/lib/i18n";
import ForgettingCurve from "@/components/science/ForgettingCurve";
import SpacedReviewTimeline from "@/components/science/SpacedReviewTimeline";
import FootnoteText from "@/components/science/FootnoteText";

/**
 * MIT OpenCourseWare 9.00SC "Lecture 10: Memory I" (John Gabrieli).
 * License: CC BY-NC-SA. Verified 2026-08-26 (HEAD via archive.org redirect
 * resolves to 200, content-type video/mp4).
 */
const MIT_LECTURE_PAGE_URL =
  "https://ocw.mit.edu/courses/9-00sc-introduction-to-psychology-fall-2011/resources/lecture-10-memory-i/";
const MIT_VIDEO_SRC =
  "https://archive.org/download/MIT9.00SCF11/MIT9_00SCF11_lec10_300k.mp4";

function BookIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

function RecallIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

function ChoicesIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default function ScienceSection({ t }: { t: Translations }) {
  const [contextCard, curveCard, recallCard, spacedCard, choicesCard] =
    t.science.cards;

  return (
    <section id="science" className="bg-gray-50 py-20">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t.science.title}
          </h2>
          <p className="mt-4 text-lg text-gray-500">{t.science.subtitle}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 1. Context learning */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <BookIcon />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {contextCard.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              <FootnoteText text={contextCard.body} />
            </p>
            <p className="mt-4 text-sm font-medium text-primary-600">
              {contextCard.productLine}
            </p>
          </div>

          {/* 2. Forgetting curve — generated SVG chart */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              {curveCard.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              <FootnoteText text={curveCard.body} />
            </p>
            <div className="mt-4">
              <ForgettingCurve
                xAxisLabel={t.science.forgettingCurve.xAxisLabel}
                yAxisLabel={t.science.forgettingCurve.yAxisLabel}
                legend={t.science.forgettingCurve.legend}
              />
            </div>
            <p className="mt-4 text-sm font-medium text-primary-600">
              {curveCard.productLine}
            </p>
          </div>

          {/* 3. Retrieval practice */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <RecallIcon />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {recallCard.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              <FootnoteText text={recallCard.body} />
            </p>
            <p className="mt-4 text-sm font-medium text-primary-600">
              {recallCard.productLine}
            </p>
          </div>

          {/* 4. Spaced / personalized review — timeline SVG */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">
              {spacedCard.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              <FootnoteText text={spacedCard.body} />
            </p>
            <div className="mt-4">
              <SpacedReviewTimeline
                crammingLabel={t.science.spacedReview.crammingLabel}
                spacedLabel={t.science.spacedReview.spacedLabel}
              />
            </div>
            <p className="mt-4 text-sm font-medium text-primary-600">
              {spacedCard.productLine}
            </p>
          </div>

          {/* 5. Plausible wrong answers — with small mascot accent */}
          <div className="relative rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:col-span-2">
            {/* mascot.svg bakes in its own square gradient background, so it's
                clipped to a circular badge here rather than shown as a raw square. */}
            <div className="absolute right-6 top-6 h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-50">
              <img
                src="/images/brand/mascot.svg"
                alt={t.science.mascotAlt}
                width={40}
                height={40}
                loading="lazy"
                className="h-full w-full scale-125 object-cover"
              />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <ChoicesIcon />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {choicesCard.title}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
              <FootnoteText text={choicesCard.body} />
            </p>
            <p className="mt-4 text-sm font-medium text-primary-600">
              {choicesCard.productLine}
            </p>
          </div>
        </div>

        {/* Audiovisual resources */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h3 className="text-sm font-semibold text-gray-900">
            {t.science.mediaTitle}
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.science.media.map((item) =>
              item.url.includes("ocw.mit.edu") ? (
                <div
                  key={item.url}
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:col-span-2"
                >
                  <video
                    controls
                    preload="none"
                    poster="/images/brand/video-poster.svg"
                    className="w-full rounded-lg bg-primary-800"
                  >
                    <source src={MIT_VIDEO_SRC} type="video/mp4" />
                  </video>
                  <p className="mt-3 font-medium text-gray-900">{item.title}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    MIT OpenCourseWare · CC BY-NC-SA · John Gabrieli ·{" "}
                    <a
                      href={MIT_LECTURE_PAGE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline-offset-2 hover:underline"
                    >
                      ocw.mit.edu
                    </a>
                  </p>
                </div>
              ) : (
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
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
