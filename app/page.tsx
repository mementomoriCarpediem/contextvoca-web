import Footer from "@/components/Footer";
import Header from "@/components/Header";

const features = [
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: "AI 핵심 단어 추출",
    description:
      "문장을 입력하면 AI가 학습에 필요한 핵심 단어를 자동으로 추출합니다. 수동으로 단어를 찾을 필요가 없습니다.",
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: "문장 맥락 학습",
    description:
      "단어의 뜻만 외우지 않고, 실제 문장 속에서 어떻게 사용되는지 함께 학습합니다. 진짜 이해가 됩니다.",
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: "유사 문장 비교 테스트",
    description:
      "AI가 유사한 의미의 문장을 생성하여 비교 테스트를 제공합니다. implement와 execute의 차이, 이제 헷갈리지 않습니다.",
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: "적응형 난이도",
    description:
      "70-80% 정답률을 유지하도록 난이도가 자동 조절됩니다. 너무 쉽지도, 어렵지도 않은 최적의 학습 경험.",
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: "OCR 사진 인식",
    description:
      "교재나 시험지를 사진으로 찍으면 텍스트를 자동 인식합니다. 타이핑 없이 바로 학습을 시작하세요.",
  },
  {
    icon: (
      <svg
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
      </svg>
    ),
    title: "태그 기반 관리",
    description:
      "토익, 수능, 비즈니스 등 태그로 단어를 분류하세요. 원하는 카테고리만 골라서 집중 학습할 수 있습니다.",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "무료",
    wordLimit: "100단어",
    description: "무료로 시작하기",
    features: [
      "100단어 저장",
      "AI 키워드 추출",
      "기본 퀴즈 테스트",
      "태그 관리",
    ],
    highlighted: false,
  },
  {
    name: "Basic",
    price: "₩4,900",
    period: "/월",
    wordLimit: "500단어",
    description: "본격적인 학습을 위한 플랜",
    features: [
      "500단어 저장",
      "AI 키워드 추출",
      "유사 문장 비교 테스트",
      "적응형 난이도",
      "학습 통계",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₩9,900",
    period: "/월",
    wordLimit: "1,000단어",
    description: "제한 없는 학습 경험",
    features: [
      "1,000단어 저장",
      "모든 Basic 기능",
      "OCR 사진 인식",
      "고급 학습 분석",
      "우선 지원",
    ],
    highlighted: true,
  },
];

const steps = [
  {
    number: "1",
    title: "문장 입력",
    description:
      "공부하다 모르는 문장을 복사해서 붙여넣기하거나, 사진으로 촬영하세요.",
  },
  {
    number: "2",
    title: "AI가 핵심 단어 추출",
    description: "AI가 문장에서 학습에 필요한 핵심 단어를 자동으로 찾아줍니다.",
  },
  {
    number: "3",
    title: "유사 문장 비교 테스트",
    description:
      "비슷한 의미의 문장과 비교하며 단어의 정확한 뜻을 테스트합니다.",
  },
  {
    number: "4",
    title: "실력 완성",
    description:
      "70-80% 정답률 유지로 동기부여를 유지하며 실력을 키워나갑니다.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-600 pt-32 pb-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJoLTYweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="section-container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                단어만 외우지 마세요.
                <br />
                <span className="text-accent-400">문장으로 이해하세요.</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-primary-100 sm:text-xl">
                AI가 문장에서 핵심 단어를 추출하고, 유사 문장 비교 테스트로
                <br className="hidden sm:block" />
                진짜 실력을 만들어 드립니다.
              </p>
              <div
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                id="download"
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.44C5.57 7.91 7.13 6.93 8.82 6.91C10.1 6.89 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  App Store
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                  </svg>
                  Google Play
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
                이렇게 학습하세요
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                4단계로 완성하는 문맥 기반 단어 학습
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="relative text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                    {step.number}
                  </div>
                  {/* Connector line (hidden on mobile and last item) */}
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
                강력한 기능
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                기존 단어장과는 다릅니다. AI 기반 문맥 학습의 모든 것.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    {feature.icon}
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

        {/* Pricing */}
        <section id="pricing" className="bg-white py-20">
          <div className="section-container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                합리적인 요금제
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                무료로 시작하고, 필요할 때 업그레이드하세요.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-2xl border p-8 ${
                    plan.highlighted
                      ? "border-primary-600 bg-primary-50 shadow-lg ring-1 ring-primary-600"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-4 py-1 text-xs font-semibold text-white">
                      인기
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
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-base text-gray-500">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-primary-600">
                    {plan.wordLimit}까지
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
                      plan.highlighted
                        ? "bg-primary-600 text-white hover:bg-primary-700"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    시작하기
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary-800 py-20">
          <div className="section-container text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="mt-4 text-lg text-primary-200">
              같은 시간, 2배 효과. 문장 맥락 단어 학습.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-base font-semibold text-primary-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.44C5.57 7.91 7.13 6.93 8.82 6.91C10.1 6.89 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                App Store에서 다운로드
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/20"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
                </svg>
                Google Play에서 다운로드
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
