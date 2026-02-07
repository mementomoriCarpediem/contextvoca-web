"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

const faqs = [
  {
    category: "시작하기",
    questions: [
      {
        q: "ContextVoca는 어떤 앱인가요?",
        a: "ContextVoca는 문장 속에서 단어를 학습하는 AI 기반 영어 단어장 앱입니다. 텍스트를 입력하면 AI가 핵심 단어를 추출하고, 유사 문장 비교 테스트로 깊이 있는 학습을 제공합니다.",
      },
      {
        q: "어떤 기기에서 사용할 수 있나요?",
        a: "iOS(iPhone, iPad)와 Android 기기에서 사용할 수 있습니다. App Store 또는 Google Play에서 다운로드하세요.",
      },
      {
        q: "회원가입은 어떻게 하나요?",
        a: "Apple, Google, 또는 Kakao 계정으로 간편하게 로그인할 수 있습니다. 별도의 회원가입 절차가 필요하지 않습니다.",
      },
    ],
  },
  {
    category: "기능 사용법",
    questions: [
      {
        q: "단어를 어떻게 등록하나요?",
        a: "두 가지 방법이 있습니다. (1) 영어 문장을 직접 입력하거나 복사 붙여넣기 하면 AI가 핵심 단어를 자동 추출합니다. (2) 교재나 시험지를 카메라로 촬영하면 OCR로 텍스트를 인식합니다.",
      },
      {
        q: "퀴즈는 어떻게 진행되나요?",
        a: "저장된 단어를 기반으로 AI가 유사한 의미의 문장을 생성합니다. 원래 문장과 유사 문장을 비교하며 단어의 정확한 의미를 테스트합니다. 정답률 70-80%를 유지하도록 난이도가 자동 조절됩니다.",
      },
      {
        q: "태그는 어떻게 사용하나요?",
        a: "단어를 등록할 때 태그(예: 토익, 수능, 비즈니스)를 지정할 수 있습니다. 퀴즈나 복습 시 특정 태그만 선택하여 집중 학습할 수 있습니다.",
      },
    ],
  },
  {
    category: "구독 및 결제",
    questions: [
      {
        q: "무료로도 사용할 수 있나요?",
        a: "네, 무료 플랜으로 100단어까지 저장하고 학습할 수 있습니다. 더 많은 단어를 저장하려면 Basic(500단어) 또는 Pro(1,000단어) 플랜을 구독하세요.",
      },
      {
        q: "구독을 해지하면 데이터는 어떻게 되나요?",
        a: "구독 해지 후에도 저장된 데이터는 삭제되지 않습니다. 다만 무료 플랜의 단어 제한(100개)이 적용되어 일부 기능이 제한될 수 있습니다.",
      },
      {
        q: "환불받을 수 있나요?",
        a: "환불은 Apple App Store 또는 Google Play의 정책에 따릅니다. 각 스토어의 구독 관리 페이지에서 환불을 요청할 수 있습니다.",
      },
    ],
  },
  {
    category: "계정 관리",
    questions: [
      {
        q: "계정을 삭제하고 싶어요.",
        a: "앱 설정 > 계정 관리에서 계정 삭제를 요청할 수 있습니다. 계정 삭제 시 모든 학습 데이터가 영구적으로 삭제됩니다. 또는 support@contextvoca.app으로 삭제를 요청해 주세요.",
      },
      {
        q: "다른 기기에서도 사용할 수 있나요?",
        a: "네, 동일한 계정으로 로그인하면 다른 기기에서도 학습 데이터가 동기화됩니다.",
      },
    ],
  },
];

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
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900">
              도움이 필요하신가요?
            </h1>
            <p className="mt-2 text-gray-500">
              자주 묻는 질문을 확인하시거나, 아래 연락처로 문의해 주세요.
            </p>

            {/* Contact Card */}
            <div className="mt-8 rounded-2xl border border-primary-100 bg-primary-50 p-6">
              <h2 className="text-base font-semibold text-gray-900">
                직접 문의하기
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                아래 방법으로 문의해 주시면 빠른 시일 내에 답변 드리겠습니다.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:support@contextvoca.app"
                  className="btn-primary !text-sm"
                >
                  이메일 문의: support@contextvoca.app
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-12 space-y-10">
              {faqs.map((section) => (
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
