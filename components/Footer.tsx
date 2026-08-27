import Link from "next/link";
import { getDictionary, Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const base = `/${locale}`;

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
            <p className="mt-3 text-sm text-gray-500">{t.footer.tagline}</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {t.footer.service}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={`${base}/#features`}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  {t.footer.featureIntro}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/#pricing`}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  {t.footer.pricing}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/support`}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  {t.footer.faq}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {t.footer.legal}
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href={`${base}/privacy`}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}/terms`}
                  className="text-sm text-gray-500 hover:text-primary-600"
                >
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {t.footer.contact}
            </h3>
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

        <div className="mt-10 border-t border-gray-200 pt-6 space-y-1">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ContextVoca. {t.footer.rights}
          </p>
          <p className="text-center text-xs text-gray-400">
            {t.footer.businessInfo}
          </p>
        </div>
      </div>
    </footer>
  );
}
