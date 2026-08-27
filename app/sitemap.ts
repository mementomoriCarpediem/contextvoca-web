import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL, LocalizedPathSuffix } from "@/lib/seo/site";

// Required for `output: "export"` — this route has no request-time inputs,
// so it can be fully prerendered to a static sitemap.xml at build time.
export const dynamic = "force-static";

const PAGES: Array<{
  suffix: LocalizedPathSuffix;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  { suffix: "", changeFrequency: "weekly", priority: 1.0 },
  { suffix: "/support", changeFrequency: "monthly", priority: 0.7 },
  { suffix: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { suffix: "/terms", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { suffix, changeFrequency, priority } of PAGES) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${suffix}/`,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ko: `${SITE_URL}/ko${suffix}/`,
            en: `${SITE_URL}/en${suffix}/`,
            ja: `${SITE_URL}/ja${suffix}/`,
            "zh-Hans": `${SITE_URL}/zh${suffix}/`,
            "x-default": `${SITE_URL}/en${suffix}/`,
          },
        },
      });
    }
  }

  return entries;
}
