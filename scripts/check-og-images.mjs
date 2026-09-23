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
 *   1. `out/og/{locale}/{slug}.png` exists, is a real 1200x675 PNG, < 200 KB
 *   2. its page's `og:image`, `twitter:image` and JSON-LD `Article.image` all
 *      carry exactly that image's absolute URL
 * plus, across the whole output:
 *   3. no OG image exists for a post that isn't published (no stale files)
 *   4. no draft/stub blog page references an OG image at all
 *
 * Usage: node scripts/check-og-images.mjs   (after `yarn build`)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadTsModule } from "./load-ts-module.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");

const { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, ogImagePathname, ogImageUrl } = loadTsModule(
  path.join(ROOT, "lib", "og", "og-image.ts")
);

const MAX_BYTES = 200_000;
/** `https://host/{locale}/blog/{slug}/` — the list page `/{locale}/blog/` doesn't match. */
const POST_URL = /^(https?:\/\/[^/]+)\/([^/]+)\/blog\/([^/]+)\/$/;

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
  const xml = fs.readFileSync(sitemapPath, "utf8");
  const posts = [];
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const match = loc.match(POST_URL);
    if (match) posts.push({ origin: match[1], locale: match[2], slug: match[3] });
  }
  return posts;
}

/** All `<meta>` tags in `html`, as attribute objects. */
function metaTags(html) {
  return [...html.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => {
    const attrs = {};
    for (const [, name, value] of tag.matchAll(/([a-zA-Z:_-]+)="([^"]*)"/g)) {
      attrs[name] = value;
    }
    return attrs;
  });
}

function metaContents(html, key) {
  return metaTags(html)
    .filter((attrs) => attrs.property === key || attrs.name === key)
    .map((attrs) => attrs.content);
}

/** Every parsed `application/ld+json` payload in `html`. */
function jsonLdBlocks(html, label) {
  const blocks = [];
  for (const [, raw] of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )) {
    try {
      blocks.push(JSON.parse(raw));
    } catch {
      fail(`${label}: an application/ld+json block is not valid JSON`);
    }
  }
  return blocks;
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
      if (file.endsWith(".png")) found.push(`/og/${locale}/${file}`);
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
    const bytes = fs.statSync(imagePath).size;
    const { width, height, format } = await sharp(imagePath).metadata();
    if (format !== "png" || width !== OG_IMAGE_WIDTH || height !== OG_IMAGE_HEIGHT) {
      fail(
        `${label}: out${pathname} is ${width}x${height} ${format}, expected ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT} png`
      );
    }
    if (bytes >= MAX_BYTES) {
      fail(`${label}: out${pathname} is ${bytes} bytes, over the ${MAX_BYTES} byte budget`);
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

  const articles = jsonLdBlocks(html, label).filter((block) => block["@type"] === "Article");
  if (articles.length === 0) {
    fail(`${label}: no Article JSON-LD block found`);
  }
  for (const article of articles) {
    const images = Array.isArray(article.image) ? article.image : [article.image];
    if (!images.includes(expectedUrl)) {
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

async function main() {
  const published = readSitemapPosts();
  if (errors.length === 0 && published.length === 0) {
    fail("out/sitemap.xml lists no blog posts — expected at least one published post");
  }

  for (const post of published) {
    await checkPublishedPost(post);
  }

  const publishedKeys = new Set(published.map((post) => `${post.locale}/${post.slug}`));
  for (const page of blogPageFiles()) {
    if (!publishedKeys.has(`${page.locale}/${page.slug}`)) checkDraftPage(page);
  }

  const expectedImages = new Set(
    published.map((post) => ogImagePathname(post.locale, post.slug))
  );
  for (const pathname of listGeneratedImages()) {
    if (!expectedImages.has(pathname)) {
      fail(`out${pathname} does not belong to any published post (stale image)`);
    }
  }

  if (errors.length > 0) {
    console.error(`check-og-images: ${errors.length} problem(s)`);
    for (const message of errors) console.error(`  - ${message}`);
    process.exit(1);
  }

  const draftCount = blogPageFiles().length - publishedKeys.size;
  console.log(
    `check-og-images: ${published.length} published post(s) with a ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT} image wired into og:image, twitter:image and JSON-LD; ${draftCount} draft page(s) with none`
  );
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
