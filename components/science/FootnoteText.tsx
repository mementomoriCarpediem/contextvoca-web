/**
 * Renders body copy that contains inline footnote markers like "...text.[4]"
 * (as already written in the i18n dictionaries) and turns each marker into an
 * anchor link to the matching reference entry (`#ref-4`) at the bottom of the
 * page. Only the rendering is transformed — the source copy string is never
 * altered.
 */
export default function FootnoteText({ text }: { text: string }) {
  const parts = text.split(/(\[\d+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = /^\[(\d+)\]$/.exec(part);
        if (!match) return <span key={i}>{part}</span>;
        const n = match[1];
        return (
          <a
            key={i}
            href={`#ref-${n}`}
            className="text-primary-600 no-underline hover:underline"
          >
            {part}
          </a>
        );
      })}
    </>
  );
}
