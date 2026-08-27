"use client";

import { useState } from "react";
import type { Translations } from "@/lib/i18n/types";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        className="flex w-full items-center justify-between py-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-gray-900">{question}</span>
        <svg
          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
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
      {isOpen && (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function SupportFaqList({
  faqs,
}: {
  faqs: Translations["support"]["faqs"];
}) {
  return (
    <div className="mt-12 space-y-10">
      {faqs.map((section) => (
        <div key={section.category}>
          <h2 className="text-lg font-semibold text-gray-900">
            {section.category}
          </h2>
          <div className="mt-4">
            {section.questions.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
