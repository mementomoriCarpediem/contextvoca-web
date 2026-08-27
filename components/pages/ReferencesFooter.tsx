import { Translations } from "@/lib/i18n";

/** Collapsed reference list shown just above the site footer. Each entry
 * carries an `id="ref-N"` anchor that footnote markers in the science
 * section (`[N]`) link to. */
export default function ReferencesFooter({ t }: { t: Translations }) {
  return (
    <div className="bg-white py-8">
      <div className="section-container">
        <details className="mx-auto max-w-3xl">
          <summary className="cursor-pointer text-xs font-medium text-gray-400 hover:text-gray-600">
            {t.science.referencesToggle}
          </summary>
          <ol className="mt-4 space-y-2">
            {t.science.references.map((reference, idx) => (
              <li
                key={reference}
                id={`ref-${idx + 1}`}
                className="scroll-mt-24 text-[11px] leading-relaxed text-gray-400"
              >
                {reference.split(/(https?:\/\/\S+)/g).map((part, i) =>
                  /^https?:\/\//.test(part) ? (
                    <a
                      key={i}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 underline-offset-2 hover:underline"
                    >
                      {part}
                    </a>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </li>
            ))}
          </ol>
        </details>
      </div>
    </div>
  );
}
