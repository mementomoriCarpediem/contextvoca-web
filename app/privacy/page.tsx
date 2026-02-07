import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 - ContextVoca",
  description: "ContextVoca의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900">
              개인정보처리방침
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              최종 업데이트: 2026년 2월 7일
            </p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-gray-700">
              <section>
                <h2 className="text-lg font-semibold text-gray-900">1. 개요</h2>
                <p className="mt-3">
                  ContextVoca(이하 &quot;서비스&quot;)는 사용자의 개인정보를
                  소중히 여기며, 관련 법률에 따라 개인정보를 보호하고 있습니다.
                  본 개인정보처리방침은 서비스가 수집하는 정보와 그 이용 목적에
                  대해 안내합니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  2. 수집하는 개인정보
                </h2>
                <p className="mt-3">
                  서비스는 다음과 같은 개인정보를 수집할 수 있습니다:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>
                    <strong>계정 정보</strong>: 이메일 주소, 이름 (소셜 로그인
                    제공자로부터 수집)
                  </li>
                  <li>
                    <strong>학습 데이터</strong>: 저장한 문장, 단어, 태그, 퀴즈
                    결과, 학습 통계
                  </li>
                  <li>
                    <strong>구매 내역</strong>: 인앱 구독 정보 (결제는 Apple App
                    Store 또는 Google Play를 통해 처리되며, 서비스는 결제 카드
                    정보를 직접 수집하지 않습니다)
                  </li>
                  <li>
                    <strong>기기 정보</strong>: 기기 유형, 운영체제 버전, 앱
                    버전 (오류 진단 목적)
                  </li>
                  <li>
                    <strong>오류 데이터</strong>: 크래시 로그, 에러 스택
                    트레이스 (Sentry를 통한 수집)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  3. 개인정보의 이용 목적
                </h2>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>서비스 계정 생성 및 관리</li>
                  <li>단어장, 퀴즈, 학습 기능 제공</li>
                  <li>구독 상태 확인 및 관리</li>
                  <li>앱 성능 개선 및 오류 해결</li>
                  <li>사용자 문의 응대</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  4. 개인정보의 제3자 제공
                </h2>
                <p className="mt-3">
                  서비스는 사용자의 개인정보를 제3자에게 판매하거나 공유하지
                  않습니다. 다만 다음의 서비스 제공자를 통해 운영됩니다:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>
                    <strong>Supabase</strong>: 인증 및 데이터베이스 (미국)
                  </li>
                  <li>
                    <strong>Sentry</strong>: 오류 모니터링 (미국)
                  </li>
                  <li>
                    <strong>RevenueCat</strong>: 구독 관리 (미국)
                  </li>
                  <li>
                    <strong>Google Cloud</strong>: OCR 텍스트 인식 (미국)
                  </li>
                  <li>
                    <strong>Apple / Google</strong>: 소셜 로그인 및 인앱결제
                    처리
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  5. 개인정보의 보관 및 파기
                </h2>
                <p className="mt-3">
                  사용자가 계정을 삭제하면 관련 개인정보는 즉시 삭제됩니다. 다만
                  법률에 의해 보관이 의무화된 정보는 해당 기간 동안 보관됩니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  6. 사용자의 권리
                </h2>
                <p className="mt-3">
                  사용자는 언제든지 다음의 권리를 행사할 수 있습니다:
                </p>
                <ul className="mt-3 list-inside list-disc space-y-2">
                  <li>개인정보 열람 요청</li>
                  <li>개인정보 수정 요청</li>
                  <li>계정 삭제 및 개인정보 파기 요청</li>
                  <li>데이터 이동 요청</li>
                </ul>
                <p className="mt-3">
                  위 요청은{" "}
                  <a
                    href="mailto:support@contextvoca.app"
                    className="text-primary-600 underline"
                  >
                    support@contextvoca.app
                  </a>
                  으로 연락해 주세요.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  7. 아동의 개인정보
                </h2>
                <p className="mt-3">
                  서비스는 만 14세 미만의 아동으로부터 의도적으로 개인정보를
                  수집하지 않습니다. 만 14세 미만의 사용자가 개인정보를 제공한
                  사실을 알게 되면 즉시 해당 정보를 삭제합니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  8. 개인정보처리방침 변경
                </h2>
                <p className="mt-3">
                  본 개인정보처리방침은 법령이나 서비스 변경에 따라 수정될 수
                  있습니다. 중요한 변경이 있을 경우 앱 내 공지 또는 이메일로
                  안내합니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">9. 문의</h2>
                <p className="mt-3">
                  개인정보 관련 문의는{" "}
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
