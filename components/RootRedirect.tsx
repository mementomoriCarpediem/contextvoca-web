"use client";

import { useEffect } from "react";
import { detectPreferredLocale } from "@/lib/i18n";

/**
 * Client-only redirect for the language-selection root page (`/`). Runs
 * after the static fallback content (language links) has already rendered,
 * so it never relies on a `<meta http-equiv="refresh">` and degrades
 * gracefully for crawlers or JS-disabled visitors.
 */
export default function RootRedirect() {
  useEffect(() => {
    const preferred = detectPreferredLocale(
      navigator.languages ?? [navigator.language]
    );
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.replace(`${basePath}/${preferred}/`);
  }, []);

  return null;
}
