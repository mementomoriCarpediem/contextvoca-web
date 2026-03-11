"use client";

import { useEffect } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

const LOCALE_MAP: Record<string, string> = {
  ko: "ko_KR",
  zh: "zh_CN",
  ja: "ja_JP",
};

interface PageHeadProps {
  title: string;
  description: string;
  keywords?: string[];
}

function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function PageHead({ title, description, keywords }: PageHeadProps) {
  const { locale, t } = useTranslation();

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = locale;

    setMeta("name", "description", description);
    if (keywords?.length) {
      setMeta("name", "keywords", keywords.join(","));
    }

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:locale", LOCALE_MAP[locale] || "ko_KR");

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description, keywords, locale, t]);

  return null;
}
