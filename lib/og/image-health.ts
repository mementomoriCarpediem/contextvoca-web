import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_MAX_BYTES,
  OG_IMAGE_MIN_BYTES,
  OG_IMAGE_MIN_PROBE_STDEV,
  OG_IMAGE_WIDTH,
} from "./og-image";

/**
 * What a rendered OG image must satisfy, in one place, so the generator and
 * the post-build checker apply the identical rules to the identical numbers.
 *
 * Measuring is the scripts' job (`scripts/inspect-og-png.mjs`, which owns the
 * sharp calls); judging is here, where it stays pure and testable.
 */
export interface OgImageFacts {
  readonly format: string | undefined;
  readonly width: number | undefined;
  readonly height: number | undefined;
  readonly bytes: number;
  /** Max per-channel stdev inside `OG_IMAGE_PROBE` — 0 for a blank image. */
  readonly probeStdev: number;
}

/** Every rule the image breaks, as human-readable phrases. Empty means healthy. */
export function ogImageProblems(facts: OgImageFacts): string[] {
  const problems: string[] = [];

  if (facts.format !== "png") {
    problems.push(`is ${facts.format ?? "an unreadable image"}, expected png`);
  }
  if (facts.width !== OG_IMAGE_WIDTH || facts.height !== OG_IMAGE_HEIGHT) {
    problems.push(
      `is ${facts.width}x${facts.height}, expected ${OG_IMAGE_WIDTH}x${OG_IMAGE_HEIGHT}`
    );
  }
  if (facts.bytes >= OG_IMAGE_MAX_BYTES) {
    problems.push(`is ${facts.bytes} bytes, over the ${OG_IMAGE_MAX_BYTES} byte budget`);
  }
  if (facts.bytes < OG_IMAGE_MIN_BYTES) {
    problems.push(
      `is only ${facts.bytes} bytes, under the ${OG_IMAGE_MIN_BYTES} byte floor — looks blank`
    );
  }
  if (facts.probeStdev < OG_IMAGE_MIN_PROBE_STDEV) {
    problems.push(
      `has almost no variation where the motif belongs (stdev ${facts.probeStdev.toFixed(1)} < ${OG_IMAGE_MIN_PROBE_STDEV}) — the motif did not render`
    );
  }

  return problems;
}
