import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { AnchorHTMLAttributes, TableHTMLAttributes } from "react";
import type { Locale } from "@/lib/i18n";
import StoreCta from "@/components/blog/StoreCta";

function MdxLink({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href?.startsWith("/")) {
    return <Link href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function MdxTable(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="blog-table-wrap">
      <table {...props} />
    </div>
  );
}

/**
 * Components made available inside blog post MDX bodies. `StoreCta` is the
 * only custom component post authors may use (requirement #1) — it's bound
 * to the post's own locale here so `<StoreCta />` needs no props in MDX.
 */
export function getMdxComponents(locale: Locale): MDXComponents {
  return {
    a: MdxLink,
    table: MdxTable,
    StoreCta: () => <StoreCta locale={locale} />,
  };
}
