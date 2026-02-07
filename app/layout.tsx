import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContextVoca - 문장으로 배우는 스마트 단어장",
  description:
    "단어만 외우지 마세요. 문장으로 이해하세요. AI가 문장에서 핵심 단어를 추출하고, 유사 문장 비교 테스트로 진짜 실력을 만들어 드립니다.",
  keywords: [
    "영어단어장",
    "토익단어",
    "수능영어",
    "영단어암기",
    "문장학습",
    "AI단어장",
    "ContextVoca",
  ],
  openGraph: {
    title: "ContextVoca - 문장으로 배우는 스마트 단어장",
    description:
      "AI가 문장에서 핵심 단어를 추출하고, 유사 문장 비교 테스트로 진짜 실력을 만들어 드립니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
