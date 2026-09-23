/**
 * The one place that *measures* a rendered OG image. Both the generator (on
 * the buffer it just produced) and the post-build checker (on the file that
 * shipped) inspect through here, so neither can drift into a weaker check.
 *
 * Judging the numbers is `lib/og/image-health.ts`'s job; this module only
 * reads them off the pixels.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { loadTsModule } from "./load-ts-module.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { OG_IMAGE_PROBE } = loadTsModule(
  path.join(__dirname, "..", "lib", "og", "og-image.ts")
);

/**
 * @param {Buffer|string} source PNG buffer, or path to a PNG file
 * @returns {Promise<import("../lib/og/image-health").OgImageFacts>}
 */
export async function inspectOgPng(source) {
  const bytes = Buffer.isBuffer(source) ? source.length : fs.statSync(source).size;
  const { format, width, height } = await sharp(source).metadata();

  // A solid or gradient-only canvas has (almost) no variation where the motif
  // belongs. Cropping first and re-reading the crop is required: sharp's
  // `stats()` reports on the *input* image and ignores pipeline operations.
  const cropFits =
    typeof width === "number" &&
    typeof height === "number" &&
    width >= OG_IMAGE_PROBE.left + OG_IMAGE_PROBE.width &&
    height >= OG_IMAGE_PROBE.top + OG_IMAGE_PROBE.height;

  let probeStdev = 0;
  if (cropFits) {
    const crop = await sharp(source)
      .extract({
        left: OG_IMAGE_PROBE.left,
        top: OG_IMAGE_PROBE.top,
        width: OG_IMAGE_PROBE.width,
        height: OG_IMAGE_PROBE.height,
      })
      .png()
      .toBuffer();
    const stats = await sharp(crop).stats();
    probeStdev = Math.max(...stats.channels.slice(0, 3).map((channel) => channel.stdev));
  }

  return { format, width, height, bytes, probeStdev };
}
