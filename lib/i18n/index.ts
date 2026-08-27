import { Locale, Translations } from "./types";
import ko from "./ko";
import en from "./en";
import ja from "./ja";
import zh from "./zh";

export const locales: Locale[] = ["ko", "en", "ja", "zh"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  ja: "日本語",
  zh: "中文",
};

export const localeFlags: Record<Locale, string> = {
  ko: "🇰🇷",
  en: "🇺🇸",
  ja: "🇯🇵",
  zh: "🇨🇳",
};

/** `<html lang>` / hreflang attribute value per locale (BCP 47). */
export const htmlLangMap: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  ja: "ja",
  zh: "zh-Hans",
};

/** Open Graph `og:locale` value per locale. */
export const ogLocaleMap: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  ja: "ja_JP",
  zh: "zh_Hans",
};

/** Product brand name per locale, aligned with the app store listing title. */
export const brandNames: Record<Locale, string> = {
  ko: "문맥보카",
  en: "ContextVoca",
  ja: "文脈単語帳",
  zh: "语境词汇",
};

const dictionaries: Record<Locale, Translations> = { ko, en, ja, zh };

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
    if (code.startsWith("zh")) return "zh";
    if (code.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export type { Locale, Translations };
