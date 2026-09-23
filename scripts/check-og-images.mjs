#!/usr/bin/env node
/**
 * Post-build gate for blog OG images. Runs against `out/` — the artifact that
 * actually ships — not against the generator's own bookkeeping, because a
 * generator that agrees with itself proves nothing.
 *
 * The published-post list comes from `out/sitemap.xml`, which Next builds from
 * `lib/blog/posts.ts` (the app's own loader). That makes this an independent
 * oracle: if the generator's frontmatter reading ever disagreed with the app's
 * about which posts are published, the sets stop matching and this fails.
 *
 * Checks, for every post in the sitemap:
 *   1. `out/og/{locale}/{slug}.png` exists and passes `ogImageProblems`
 *      (png, 1200x675, within the byte budget, and actually has a motif drawn)
 *   2. its page's `og:image`, `twitter:image` and JSON-LD `Article.image` all
 *      carry exactly that image's absolute URL
 * plus, across the whole output:
 *   3. no two different posts share a byte-identical image (translations of
 *      one post share a slug, and are expected to share their card)
 *   4. no OG image exists for a post that isn't published (no stale files)
 *   5. no draft/stub blog page references an OG image at all
 *
 * Usage: node scripts/check-og-images.mjs   (after `yarn build`)
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadTsModule } from "./load-ts-module.mjs";
import { inspectOgPng } from "./inspect-og-png.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");

const { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, ogImagePathname, ogImageUrl } = loadTsModule(
  path.join(ROOT, "lib", "og", "og-image.ts")
);
const { ogImageProblems } = loadTsModule(path.join(ROOT, "lib", "og", "image-health.ts"));
const {
  articleImageSets,
  findSharedImageGroups,
  metaContents,
  parseJsonLdBlocks,
  parseSitemapPostUrls,
} = loadTsModule(path.join(ROOT, "lib", "og", "output-probe.ts"));

const errors = [];
function fail(message) {
  errors.push(message);
}

function readSitemapPosts() {
  const sitemapPath = path.join(OUT_DIR, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    fail(`${path.relative(ROOT, sitemapPath)} is missing — run \`yarn build\` first`);
    return [];
  }
  return parseSitemapPostUrls(fs.readFileSync(sitemapPath, "utf8"));
}

function blogPageFiles() {
  const pages = [];
  for (const locale of fs.existsSync(OUT_DIR) ? fs.readdirSync(OUT_DIR).sort() : []) {
    const blogDir = path.join(OUT_DIR, locale, "blog");
    if (!fs.existsSync(blogDir) || !fs.statSync(blogDir).isDirectory()) continue;
    for (const slug of fs.readdirSync(blogDir).sort()) {
      const file = path.join(blogDir, slug, "index.html");
      if (fs.existsSync(file)) pages.push({ locale, slug, file });
    }
  }
  return pages;
}

function listGeneratedImages() {
  const ogDir = path.join(OUT_DIR, "og");
  if (!fs.existsSync(ogDir)) return [];
  const found = [];
  for (const locale of fs.readdirSync(ogDir).sort()) {
    const localeDir = path.join(ogDir, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;
    for (const file of fs.readdirSync(localeDir).sort()) {
      if (!file.endsWith(".png")) continue;
      found.push({
        pathname: `/og/${locale}/${file}`,
        slug: file.replace(/\.png$/, ""),
        file: path.join(localeDir, file),
      });
    }
  }
  return found;
}

async function checkPublishedPost(post) {
  const label = `${post.locale}/${post.slug}`;
  const pathname = ogImagePathname(post.locale, post.slug);
  const expectedUrl = ogImageUrl(post.origin, post.locale, post.slug);
  const imagePath = path.join(OUT_DIR, pathname.slice(1));

  if (!fs.existsSync(imagePath)) {
    fail(`${label}: missing OG image out${pathname}`);
  } else {
    for (const problem of ogImageProblems(await inspectOgPng(imagePath))) {
      fail(`${label}: out${pathname} ${problem}`);
    }
  }

  const htmlPath = path.join(OUT_DIR, post.locale, "blog", post.slug, "index.html");
  if (!fs.existsSync(htmlPath)) {
    fail(`${label}: sitemap lists the post but ${path.relative(ROOT, htmlPath)} is missing`);
    return;
  }
  const html = fs.readFileSync(htmlPath, "utf8");

  for (const key of ["og:image", "twitter:image"]) {
    const contents = metaContents(html, key);
    if (!contents.includes(expectedUrl)) {
      fail(
        `${label}: <meta ${key}> is ${contents.length ? contents.join(", ") : "absent"}, expected ${expectedUrl}`
      );
    }
  }

  const { blocks, invalid } = parseJsonLdBlocks(html);
  if (invalid > 0) fail(`${label}: ${invalid} application/ld+json block(s) are not valid JSON`);

  const articles = articleImageSets(blocks);
  if (articles.length === 0) fail(`${label}: no Article JSON-LD block found`);
  for (const article of articles) {
    if (!article.urls.includes(expectedUrl)) {
      fail(
        `${label}: Article JSON-LD image is ${JSON.stringify(article.image)}, expected ${expectedUrl}`
      );
    }
  }
}

function checkDraftPage(page) {
  const label = `${page.locale}/${page.slug}`;
  const html = fs.readFileSync(page.file, "utf8");

  // Draft/stub pages emit title + noindex only. An OG image here would mean an
  // unpublished post is advertising an asset (and leaking that it exists).
  for (const key of ["og:image", "twitter:image"]) {
    const contents = metaContents(html, key);
    if (contents.length > 0) {
      fail(`${label} is not published but emits <meta ${key}> ${contents.join(", ")}`);
    }
  }
  if (html.includes(ogImagePathname(page.locale, page.slug))) {
    fail(`${label} is not published but references its OG image path`);
  }
}

/**
 * Two posts sharing a card would make them indistinguishable when shared. The
 * visual axes in `resolveOgLook` are what prevent it; this is the check that
 * the prevention still works on the shipped bytes. (Grouping — including the
 * "same slug in several locales is one translated post" exception — lives in
 * `lib/og/output-probe.ts`, where it is unit tested.)
 */
function checkImagesAreDistinct(images) {
  const hashed = images.map((image) => ({
    pathname: image.pathname,
    slug: image.slug,
    digest: crypto.createHash("sha256").update(fs.readFileSync(image.file)).digest("hex"),
  }));

  for (const group of findSharedImageGroups(hashed)) {
    fail(
      `different posts share a byte-identical OG image: ${group
        .map((pathname) => `out${pathname}`)
        .join(", ")}`
    );
  }
}

async function main() {
  const published = readSitemapPosts();
  if (errors.length === 0 && published.length === 0) {
    fail("out/sitemap.xml lists no blog posts — expected at least one published post");
  }

  for (const post of published) {
    await checkPublishedPost(post);
  }

  const publishedKeys = new Set(published.map((post) => `${post.locale}/${post.slug}`));
  const pages = blogPageFiles();
  for (const page of pages) {
    if (!publishedKeys.has(`${page.locale}/${page.slug}`)) checkDraftPage(page);
  }

  const images = listGeneratedImages();
  const expectedImages = new Set(
    published.map((post) => ogImagePathname(post.locale, post.slug))
  );
  for (const image of images) {
    if (!expectedImages.has(image.pathname)) {
      fail(`out${image.pathname} does not belong to any published post (stale image)`);
    }
  }
  checkImagesAreDistinct(images);

  if (errors.length > 0) {
    console.error(`check-og-images: ${errors.length} problem(s)`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exit(1);
  }

  console.log(
    `check-og-images: ${published.length} published post(s) with a distinct ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT} image wired into og:image, twitter:image and JSON-LD; ${pages.length - publishedKeys.size} draft page(s) with none`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
