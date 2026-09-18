import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog/types";
import type { Locale, Translations } from "@/lib/i18n";

/**
 * Home page's "latest posts" section. Deliberately NOT a client component
 * (no `"use client"`) — it renders `posts` (already resolved server-side by
 * the caller) straight into the static export's HTML, unlike `BlogListing`'s
 * tag filter which reads `window.location` after mount. See that
 * component's comment for why `useSearchParams` broke this for
 * `output: "export"` on 2026-09-12.
 *
 * Renders nothing when `posts` is empty — callers must not show this
 * section for locales with zero published posts.
 */
export default function LatestPostsSection({
  locale,
  posts,
  t,
}: {
  locale: Locale;
  posts: BlogPostMeta[];
  t: Translations["blog"];
}) {
  if (posts.length === 0) return null;

  const base = `/${locale}/blog`;

  return (
    <section className="bg-gray-50 py-20">
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t.latestPosts.title}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <li
              key={`${post.locale}-${post.slug}`}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <Link
                href={`${base}/${post.slug}`}
                className="text-lg font-semibold text-gray-900 hover:text-primary-600"
              >
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-gray-400">{post.date}</p>
              <p className="mt-2 text-sm text-gray-600">{post.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href={base}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            {t.latestPosts.viewAll} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
