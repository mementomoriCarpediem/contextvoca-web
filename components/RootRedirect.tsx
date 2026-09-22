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
    // Preserve attribution and opt-out flags across the language redirect.
    // Do not forward arbitrary query data into the localized landing page.
    const input = new URLSearchParams(window.location.search);
    const query = new URLSearchParams();
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content"])
      if (/^[a-zA-Z0-9_-]{1,64}$/.test(input.get(key) || ""))
        query.set(key, input.get(key)!);
    if (["internal", "external", "off"].includes(input.get("analytics") || ""))
      query.set("analytics", input.get("analytics")!);
    window.location.replace(`${basePath}/${preferred}/${query.size ? `?${query}` : ""}`);
  }, []);

  return null;
}
