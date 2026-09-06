import { Locale, Translations } from "./types";
import ko from "./ko";
import en from "./en";
import ja from "./ja";
import zh from "./zh";
import zhHant from "./zh-Hant";

export const locales: Locale[] = ["ko", "en", "ja", "zh", "zh-Hant"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "简体中文",
  "zh-Hant": "繁體中文",
};

export const localeFlags: Record<Locale, string> = {
  ko: "🇰🇷",
  en: "🇺🇸",
  ja: "🇯🇵",
  zh: "🇨🇳",
  "zh-Hant": "🇹🇼",
};

/** `<html lang>` / hreflang attribute value per locale (BCP 47). */
export const htmlLangMap: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-Hans",
  "zh-Hant": "zh-Hant",
};

/** Open Graph `og:locale` value per locale. */
export const ogLocaleMap: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_Hans",
  "zh-Hant": "zh_TW",
};

/** Product brand name per locale, aligned with the app store listing title. */
export const brandNames: Record<Locale, string> = {
  ko: "문맥보카",
  en: "ContextVoca",
  ja: "文脈単語帳",
  zh: "语境词汇",
  "zh-Hant": "語境詞彙",
};

const dictionaries: Record<Locale, Translations> = { ko, en, ja, zh, "zh-Hant": zhHant };

export function getDictionary(locale: Locale): Translations {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/**
 * Narrows an arbitrary route param string (Next.js types dynamic segment
 * params as `string`, not the literal union) to `Locale`, falling back to
 * `defaultLocale` for anything unrecognized.
 */
export function resolveLocale(value: string): Locale {
  return (locales as string[]).includes(value)
    ? (value as Locale)
    : defaultLocale;
}

/**
 * Picks the best-matching locale from a list of browser-preferred language
 * tags (e.g. the result of `navigator.languages`). Falls back to
 * `defaultLocale` when nothing matches.
 */
export function detectPreferredLocale(
  preferredLanguages: readonly string[]
): Locale {
  for (const lang of preferredLanguages) {
    const code = lang.toLowerCase();
    if (code.startsWith("ko")) return "ko";
    if (code.startsWith("ja")) return "ja";
    // 번체 화자(대만·홍콩·마카오 또는 Hant 스크립트)는 zh-Hant로. 2026-09-07:
    // 스토어 등록정보는 번체인데 웹은 간체로 폴백되던 불일치를 없앤다.
    if (code.startsWith("zh")) {
      return /hant|-tw|-hk|-mo/.test(code) ? "zh-Hant" : "zh";
    }
    if (code.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export type { Locale, Translations };
