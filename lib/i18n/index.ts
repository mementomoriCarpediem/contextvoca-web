import { Locale, Translations } from "./types";
import ko from "./ko";
import zh from "./zh";
import ja from "./ja";

export const locales: Locale[] = ["ko", "zh", "ja"];

export const localeNames: Record<Locale, string> = {
  ko: "한국어",
  zh: "中文",
  ja: "日本語",
};

export const localeFlags: Record<Locale, string> = {
  ko: "🇰🇷",
  zh: "🇨🇳",
  ja: "🇯🇵",
};

const dictionaries: Record<Locale, Translations> = { ko, zh, ja };

export function getDictionary(locale: Locale): Translations {
  return dictionaries[locale] ?? dictionaries.ko;
}

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return "ko";

  const stored = localStorage.getItem("locale") as Locale | null;
  if (stored && locales.includes(stored)) return stored;

  const browserLangs = navigator.languages ?? [navigator.language];
  for (const lang of browserLangs) {
    const code = lang.toLowerCase();
    if (code.startsWith("ko")) return "ko";
    if (code.startsWith("zh")) return "zh";
    if (code.startsWith("ja")) return "ja";
  }

  return "ko";
}

export type { Locale, Translations };
