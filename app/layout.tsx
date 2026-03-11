import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const SITE_URL = "https://mementomoriCarpediem.github.io/contextvoca-web";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "ContextVoca - 문장으로 배우는 스마트 단어장 | 通过句子学习的智能词汇本 | 文章で学ぶスマート単語帳",
    template: "%s | ContextVoca",
  },
  description:
    "AI가 문장에서 핵심 단어를 추출하고, 유사 문장 비교 테스트로 진짜 실력을 만들어 드립니다. AI从句子中提取核心词汇，通过相似句子对比测试帮您打造真正的实力。AIが文章から重要な単語を抽出し、類似文章比較テストで本当の実力を身につけます。",
  keywords: [
    "ContextVoca",
    "영어단어장",
    "AI단어장",
    "문장학습",
    "토익단어",
    "수능영어",
    "영단어암기",
    "英语词汇",
    "AI词汇本",
    "句子学习",
    "背单词",
    "英単語帳",
    "AI単語帳",
    "文章学習",
    "TOEIC単語",
    "vocabulary app",
    "AI vocabulary",
    "sentence learning",
  ],
  authors: [{ name: "공명 (Gongmyeong)" }],
  creator: "공명",
  publisher: "공명",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "ContextVoca",
    title:
      "ContextVoca - 문장으로 배우는 스마트 단어장 | 通过句子学习 | 文章で学ぶ",
    description:
      "AI가 문장에서 핵심 단어를 추출하고, 유사 문장 비교 테스트로 진짜 실력을 만들어 드립니다.",
    url: SITE_URL,
    locale: "ko_KR",
    alternateLocale: ["zh_CN", "ja_JP"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ContextVoca - 문장으로 배우는 스마트 단어장",
    description:
      "AI가 문장에서 핵심 단어를 추출하고, 유사 문장 비교 테스트로 진짜 실력을 만들어 드립니다.",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
