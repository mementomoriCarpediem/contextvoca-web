"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { BlogPostMeta } from "@/lib/blog/types";
import type { Locale, Translations } from "@/lib/i18n";

/**
 * Tag filter is link-based (`?tag=...`) — each chip is a real, crawlable
 * `<Link>`. The active tag is read from `window.location` after mount, NOT via
 * `useSearchParams`: with `output: "export"` that hook opts the whole subtree
 * out of static rendering, leaving the built HTML without any post links
 * (verified 2026-09-12 in out/ko/blog/index.html). With this approach the
 * full list is in the static HTML and narrows only after hydration.
 */
export default function BlogListing({
  locale,
  posts,
  t,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  t: Translations["blog"];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  useEffect(() => {
    const read = () =>
      setActiveTag(new URLSearchParams(window.location.search).get("tag"));
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);
  const base = `/${locale}/blog`;

  if (posts.length === 0) {
    return <p className="mt-10 text-gray-500">{t.emptyState}</p>;
  }

  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const filtered = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  const chipClass = (active: boolean) =>
    `rounded-full border px-3 py-1 text-sm transition-colors ${
      active
        ? "border-primary-600 bg-primary-50 text-primary-700"
        : "border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600"
    }`;

  return (
    <div>
      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={base} className={chipClass(!activeTag)}>
            {t.allTagsLabel}
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`${base}?tag=${encodeURIComponent(tag)}`}
              className={chipClass(activeTag === tag)}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <ul className="mt-8 space-y-8">
        {filtered.map((post) => (
          <li
            key={`${post.locale}-${post.slug}`}
            className="border-b border-gray-100 pb-8 last:border-none"
          >
            <Link
              href={`${base}/${post.slug}`}
              className="text-xl font-semibold text-gray-900 hover:text-primary-600"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-sm text-gray-400">{post.date}</p>
            <p className="mt-2 text-gray-600">{post.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
