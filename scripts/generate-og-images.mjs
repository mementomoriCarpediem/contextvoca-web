#!/usr/bin/env node
/**
 * Generates one OG/social share image per published blog post, into
 * `public/og/{locale}/{slug}.png`, so `next build` copies them to `out/og/`.
 *
 * Why generated and not hand-made: the image is a *derived* asset. A hand-made
 * (or frontmatter-referenced) image drifts the moment a post is edited — we
 * have shipped that failure before, with a card image still asserting a
 * corrected number. Deriving the picture from frontmatter on every build makes
 * drift impossible: there is no second source to forget.
 *
 * Deterministic by construction — the palette comes from a hash of the slug,
 * the motif from the tags, and nothing reads the clock or a random source. Two
 * runs produce byte-identical PNGs (verified by sha256 in review).
 *
 * Drafts get no image at all: a draft page must not reference one (see
 * `app/[locale]/blog/[slug]/page.tsx`'s stub branch).
 *
 * Usage: node scripts/generate-og-images.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadTsModule } from "./load-ts-module.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");
const OUTPUT_DIR = path.join(ROOT, "public", "og");

const { parseFrontmatter } = loadTsModule(
  path.join(ROOT, "lib", "blog", "parse-frontmatter.ts")
);
const { buildOgSvg, hasTextGlyphs } = loadTsModule(path.join(ROOT, "lib", "og", "svg.ts"));
const { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, ogImagePathname } = loadTsModule(
  path.join(ROOT, "lib", "og", "og-image.ts")
);

/** Hard ceiling per image. Well above what these flat-fill cards need (~15 KB). */
const MAX_BYTES = 200_000;

/**
 * Published posts, mirroring `filterPublished` (`!draft`). `draft` is required
 * to be a boolean when present — same rule `validateFrontmatter` enforces
 * during the build, so an odd value fails here instead of quietly publishing.
 */
function listPublishedPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const posts = [];

  for (const locale of fs.readdirSync(CONTENT_DIR).sort()) {
    const localeDir = path.join(CONTENT_DIR, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;

    for (const file of fs.readdirSync(localeDir).sort()) {
      if (!file.endsWith(".mdx")) continue;
      const slug = file.replace(/\.mdx$/, "");
      const { data } = parseFrontmatter(fs.readFileSync(path.join(localeDir, file), "utf8"));

      if (data.draft !== undefined && typeof data.draft !== "boolean") {
        throw new Error(`${locale}/${file}: "draft" must be a boolean when present`);
      }
      if (data.draft) continue;

      if (!Array.isArray(data.tags)) {
        throw new Error(`${locale}/${file}: "tags" must be an array`);
      }
      posts.push({ locale, slug, tags: data.tags });
    }
  }

  return posts;
}

async function renderPost(post) {
  const svg = buildOgSvg({ slug: post.slug, tags: post.tags });
  if (hasTextGlyphs(svg)) {
    // Belt and braces with `lib/og/svg.test.ts`: a glyph would need a CJK font
    // on the build machine and would render as tofu boxes where it is missing.
    throw new Error(`${post.locale}/${post.slug}: OG SVG contains a text element`);
  }

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  const { width, height, format } = await sharp(png).metadata();
  if (width !== OG_IMAGE_WIDTH || height !== OG_IMAGE_HEIGHT || format !== "png") {
    throw new Error(
      `${post.locale}/${post.slug}: rendered ${width}x${height} ${format}, expected ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT} png`
    );
  }
  if (png.length >= MAX_BYTES) {
    throw new Error(
      `${post.locale}/${post.slug}: ${png.length} bytes exceeds the ${MAX_BYTES} byte budget`
    );
  }

  const target = path.join(ROOT, "public", ogImagePathname(post.locale, post.slug).slice(1));
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, png);
  return { target, bytes: png.length };
}

async function main() {
  // Wipe first: a post that flips to draft (or is renamed) must not leave a
  // stale PNG behind that the post-build check would then accept.
  fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });

  const posts = listPublishedPosts();
  for (const post of posts) {
    const { target, bytes } = await renderPost(post);
    console.log(
      `og image ${path.relative(ROOT, target)} — ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT}, ${bytes} bytes`
    );
  }
  console.log(`generate-og-images: ${posts.length} image(s) written to public/og/`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
