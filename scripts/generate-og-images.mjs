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
 * Deterministic by construction — every visual axis comes from a hash of the
 * slug, and nothing reads the clock or a random source. Two runs produce
 * byte-identical PNGs (verified by sha256 in review).
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
import { inspectOgPng } from "./inspect-og-png.mjs";

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
const { ogImageProblems } = loadTsModule(path.join(ROOT, "lib", "og", "image-health.ts"));

/** Every failure names the file it came from — a build log without one is useless. */
function postError(source, message) {
  return new Error(`${source}: ${message}`);
}

/**
 * Published posts, mirroring `filterPublished` (`!draft`). `draft` is required
 * to be a boolean when present and `tags` an array of strings — the same rules
 * `validateFrontmatter` enforces during the build, so an odd value fails here
 * instead of quietly publishing or blowing up deep inside the renderer.
 */
function listPublishedPosts() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const posts = [];

  for (const locale of fs.readdirSync(CONTENT_DIR).sort()) {
    const localeDir = path.join(CONTENT_DIR, locale);
    if (!fs.statSync(localeDir).isDirectory()) continue;

    for (const file of fs.readdirSync(localeDir).sort()) {
      if (!file.endsWith(".mdx")) continue;
      const filePath = path.join(localeDir, file);
      const source = path.relative(ROOT, filePath);
      const slug = file.replace(/\.mdx$/, "");

      let data;
      try {
        ({ data } = parseFrontmatter(fs.readFileSync(filePath, "utf8")));
      } catch (error) {
        throw postError(source, error instanceof Error ? error.message : String(error));
      }

      if (data.draft !== undefined && typeof data.draft !== "boolean") {
        throw postError(source, `"draft" must be a boolean when present`);
      }
      if (data.draft) continue;

      if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string")) {
        throw postError(source, `"tags" must be an array of strings`);
      }
      posts.push({ locale, slug, tags: data.tags, source });
    }
  }

  return posts;
}

async function renderPost(post) {
  const svg = buildOgSvg({ slug: post.slug, tags: post.tags });
  if (hasTextGlyphs(svg)) {
    // Belt and braces with `lib/og/svg.test.ts`: a glyph would need a CJK font
    // on the build machine and would render as tofu boxes where it is missing.
    throw postError(post.source, "OG SVG contains a text element");
  }

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

  // Check what we just produced, not what we intended to produce: a renderer
  // that drops every shape still returns a perfectly sized PNG.
  const problems = ogImageProblems(await inspectOgPng(png));
  if (problems.length > 0) {
    throw postError(post.source, `rendered image ${problems.join("; ")}`);
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
