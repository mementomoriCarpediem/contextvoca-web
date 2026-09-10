import { getDictionary, Locale } from "@/lib/i18n";
import { appStoreLink, playStoreLink } from "@/lib/seo/site";

/**
 * The one custom MDX component blog posts may use — a pair of store buttons
 * routed through `/go/...` (see `lib/seo/site.ts`) so clicks show up in
 * Cloudflare logs. `locale` is injected by `getMdxComponents(locale)`
 * (see `lib/blog/mdx-components.tsx`); post authors just write `<StoreCta />`.
 */
export default function StoreCta({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <p className="not-prose my-8 flex flex-col gap-3 sm:flex-row">
      <a
        href={appStoreLink(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary !text-sm"
      >
        {t.cta.appStore}
      </a>
      <a
        href={playStoreLink(locale)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary !text-sm"
      >
        {t.cta.googlePlay}
      </a>
    </p>
  );
}
