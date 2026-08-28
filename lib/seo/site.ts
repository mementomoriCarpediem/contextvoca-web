import type { Viewport } from "next";
import { Locale } from "@/lib/i18n/types";

export const SITE_URL = "https://contextvoca.app";

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#4F46E5",
};

export type LocalizedPathSuffix = "" | "/privacy" | "/terms" | "/support";

export function localizedUrl(locale: Locale, pathSuffix: LocalizedPathSuffix): string {
  return `${SITE_URL}/${locale}${pathSuffix}/`;
}

/**
 * Builds the `alternates` metadata (canonical + per-locale hreflang map,
 * including `x-default`) for a localized page at the given path.
 */
export function buildAlternates(locale: Locale, pathSuffix: LocalizedPathSuffix) {
  return {
    canonical: localizedUrl(locale, pathSuffix),
    languages: {
      ko: localizedUrl("ko", pathSuffix),
      en: localizedUrl("en", pathSuffix),
      ja: localizedUrl("ja", pathSuffix),
      "zh-Hans": localizedUrl("zh", pathSuffix),
      "x-default": localizedUrl("en", pathSuffix),
    },
  };
}

/**
 * 스토어 링크 — 로케일별 스토어프런트.
 * Apple: 국가 없는 URL은 웹에서 /us/로 301되어 영문 제목 페이지가 열린다(2026-08-28 실측).
 * 기기의 App Store 앱은 자기 스토어프런트를 쓰므로 국가 지정이 해롭지 않다.
 * Play: 계정 국가로 자동 분기, hl로 표시 언어만 지정.
 * 캠페인 파라미터(설치 귀속)는 여기 한 곳에서만 관리한다.
 */
const APPLE_STOREFRONT: Record<Locale, string> = { ko: "kr", en: "us", ja: "jp", zh: "cn" };
const PLAY_HL: Record<Locale, string> = { ko: "ko", en: "en", ja: "ja", zh: "zh-CN" };
const APPLE_APP_ID = "6758887227";
const PLAY_PACKAGE = "com.contextvoca.app";
/** App Store Connect 캠페인 링크 값(pt=제공자, ct=캠페인). 발급 전에는 빈 값 → 파라미터 생략. */
const APPLE_CAMPAIGN = { pt: "125659097", ct: "website" };

export function appStoreUrl(locale: Locale): string {
  const base = `https://apps.apple.com/${APPLE_STOREFRONT[locale]}/app/id${APPLE_APP_ID}`;
  return APPLE_CAMPAIGN.pt ? `${base}?pt=${APPLE_CAMPAIGN.pt}&ct=${APPLE_CAMPAIGN.ct}&mt=8` : base;
}

export function playStoreUrl(locale: Locale): string {
  const params = new URLSearchParams({
    id: PLAY_PACKAGE,
    hl: PLAY_HL[locale],
    utm_source: "contextvoca.app",
    utm_medium: "website",
    utm_campaign: locale,
  });
  return `https://play.google.com/store/apps/details?${params.toString()}`;
}
