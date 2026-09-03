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
 * 스토어 링크 — 버튼은 자체 도메인의 `/go/...`를 거쳐 스토어로 나간다.
 *
 * 외부 링크 클릭은 어떤 분석 도구로도 잡히지 않는다. 한 번 우리 도메인을 거치게 하면
 * Cloudflare 로그에 요청으로 남아 "웹 방문 → 스토어 이동"을 셀 수 있다(2026-09-03 도입).
 *
 * 실제 목적지(스토어프런트·캠페인 파라미터)의 정본은 `public/_redirects`다.
 * 스토어프런트를 바꿀 때는 그 파일을 고친다 — 여기에는 경로만 있다.
 */
export function appStoreLink(locale: Locale): string {
  return `/go/ios/${locale}`;
}

export function playStoreLink(locale: Locale): string {
  return `/go/android/${locale}`;
}
