import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 - ContextVoca",
  description: "ContextVoca 서비스 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900">이용약관</h1>
            <p className="mt-2 text-sm text-gray-500">
              최종 업데이트: 2026년 2월 7일
            </p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제1조 (목적)
                </h2>
                <p className="mt-3">
                  본 약관은 ContextVoca(이하 &quot;서비스&quot;)의 이용에 관한
                  기본적인 사항을 규정함을 목적으로 합니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제2조 (서비스의 내용)
                </h2>
                <p className="mt-3">서비스는 다음의 기능을 제공합니다:</p>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>텍스트 기반 핵심 단어 추출 (AI)</li>
                  <li>문장 맥락 기반 단어장 관리</li>
                  <li>유사 문장 비교 퀴즈 테스트</li>
                  <li>OCR 기반 텍스트 인식</li>
                  <li>학습 통계 및 적응형 난이도 제공</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제3조 (회원가입 및 계정)
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>
                    서비스 이용을 위해 Apple, Google, 또는 Kakao 계정을 통한
                    회원가입이 필요합니다.
                  </li>
                  <li>
                    사용자는 본인의 계정 정보를 관리할 책임이 있으며, 타인에게
                    계정을 양도하거나 공유할 수 없습니다.
                  </li>
                  <li>
                    부정 이용이 확인되면 서비스 이용을 제한할 수 있습니다.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제4조 (유료 서비스)
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>
                    서비스는 무료 플랜과 유료 구독 플랜(Basic, Pro)을
                    제공합니다.
                  </li>
                  <li>
                    유료 구독은 Apple App Store 또는 Google Play를 통해
                    결제됩니다.
                  </li>
                  <li>
                    구독은 해지하지 않는 한 자동으로 갱신됩니다. 갱신일 최소
                    24시간 전에 해지해야 다음 결제가 청구되지 않습니다.
                  </li>
                  <li>환불은 Apple 또는 Google의 환불 정책에 따릅니다.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제5조 (금지 행위)
                </h2>
                <p className="mt-3">사용자는 다음 행위를 해서는 안 됩니다:</p>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>불법적이거나 부적절한 콘텐츠 입력</li>
                  <li>서비스의 정상적인 운영을 방해하는 행위</li>
                  <li>타인의 개인정보를 침해하는 행위</li>
                  <li>서비스를 역분석, 디컴파일하는 행위</li>
                  <li>자동화된 도구를 이용한 대량 요청</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제6조 (지식재산권)
                </h2>
                <p className="mt-3">
                  서비스의 디자인, 로고, 소프트웨어, 콘텐츠에 대한 지식재산권은
                  서비스 운영자에게 있습니다. 사용자가 입력한 학습 콘텐츠(문장,
                  단어)에 대한 권리는 사용자에게 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제7조 (면책)
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>
                    서비스는 AI 기반으로 콘텐츠를 생성하므로, 생성된 결과의
                    정확성을 완전히 보장하지 않습니다.
                  </li>
                  <li>
                    서비스 점검, 장애, 불가항력으로 인한 서비스 중단에 대해
                    책임을 지지 않습니다.
                  </li>
                  <li>
                    사용자 간 또는 사용자와 제3자 간의 분쟁에 대해 서비스는
                    관여하지 않습니다.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제8조 (서비스 변경 및 종료)
                </h2>
                <p className="mt-3">
                  서비스는 운영상 필요에 의해 서비스 내용을 변경하거나 종료할 수
                  있습니다. 중요한 변경 시 사전에 공지합니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제9조 (약관 변경)
                </h2>
                <p className="mt-3">
                  본 약관은 필요에 따라 변경될 수 있으며, 변경 시 앱 내 공지
                  또는 이메일로 안내합니다. 변경된 약관에 동의하지 않는 경우
                  서비스 이용을 중단하고 계정을 삭제할 수 있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  제10조 (준거법 및 관할)
                </h2>
                <p className="mt-3">
                  본 약관의 해석 및 적용에 관해서는 대한민국 법률을 적용합니다.
                  서비스 이용과 관련하여 발생한 분쟁에 대해서는
                  서울중앙지방법원을 관할 법원으로 합니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">문의</h2>
                <p className="mt-3">
                  이용약관 관련 문의는{" "}
                  <a
                    href="mailto:support@contextvoca.app"
                    className="text-primary-600 underline"
                  >
                    support@contextvoca.app
                  </a>
                  으로 연락해 주세요.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
