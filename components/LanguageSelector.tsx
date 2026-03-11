"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/LanguageContext";
import { locales, localeNames, localeFlags, Locale } from "@/lib/i18n";

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-600"
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {locales.map((l: Locale) => (
            <button
              key={l}
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-sm transition-colors ${
                l === locale
                  ? "bg-primary-50 font-medium text-primary-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-base leading-none">{localeFlags[l]}</span>
              <span>{localeNames[l]}</span>
              {l === locale && (
                <svg
                  className="ml-auto h-4 w-4 text-primary-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileLanguageSelector() {
  const { locale, setLocale } = useTranslation();

  return (
    <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
      {locales.map((l: Locale) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
            l === locale
              ? "bg-white font-medium text-primary-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span className="text-base leading-none">{localeFlags[l]}</span>
          <span>{localeNames[l]}</span>
        </button>
      ))}
    </div>
  );
}
