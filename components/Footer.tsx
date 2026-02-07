import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
                C
              </div>
              <span className="text-lg font-bold text-gray-900">
                ContextVoca
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              문장으로 배우는 스마트 단어장
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">서비스</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/#features"
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  기능 소개
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  요금제
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">법적 고지</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  이용약관
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">문의</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="mailto:support@contextvoca.app"
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  support@contextvoca.app
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ContextVoca. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
