import { defaultLocale, locales } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/types";

/**
 * Deterministically picks one locale out of `available`: `defaultLocale`
 * (English) if present, otherwise the first locale in `locales` order that
 * appears in `available`. `undefined` if `available` is empty.
 *
 * Used to choose an `x-default` hreflang target — picking it from the
 * available-locale *set* (not from whichever locale's own page happens to be
 * rendering metadata) keeps the same translation cluster from advertising a
 * different x-default depending on which locale's page built it.
 */
export function pickPreferredLocale(available: readonly Locale[]): Locale | undefined {
  if (available.includes(defaultLocale)) return defaultLocale;
  for (const locale of locales) {
    if (available.includes(locale)) return locale;
  }
  return undefined;
}
