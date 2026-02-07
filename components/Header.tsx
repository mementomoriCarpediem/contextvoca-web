"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <nav className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            C
          </div>
          <span className="text-lg font-bold text-gray-900">ContextVoca</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/#features"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
          >
            기능
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
          >
            요금제
          </Link>
          <Link
            href="/support"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-primary-600"
          >
            지원
          </Link>
          <a href="#download" className="btn-primary !py-2 !text-sm">
            다운로드
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            <Link
              href="/#features"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              기능
            </Link>
            <Link
              href="/#pricing"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              요금제
            </Link>
            <Link
              href="/support"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              지원
            </Link>
            <a
              href="#download"
              className="btn-primary !text-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              다운로드
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
