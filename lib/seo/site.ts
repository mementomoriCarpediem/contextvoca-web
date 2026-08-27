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
