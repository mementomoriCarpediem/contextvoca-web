import { describe, expect, it } from "vitest";
import { ogImageProblems } from "./image-health";
import type { OgImageFacts } from "./image-health";

const healthy: OgImageFacts = {
  format: "png",
  width: 1200,
  height: 675,
  bytes: 54_041,
  probeStdev: 57.3,
};

describe("ogImageProblems", () => {
  it("passes a real card (measured values from ko/photo-vocabulary-guide)", () => {
    expect(ogImageProblems(healthy)).toEqual([]);
  });

  it("rejects the wrong format or size", () => {
    expect(ogImageProblems({ ...healthy, format: "jpeg" })).toHaveLength(1);
    expect(ogImageProblems({ ...healthy, width: 600, height: 338 })).toHaveLength(1);
    expect(ogImageProblems({ ...healthy, format: undefined, width: undefined })).toHaveLength(2);
  });

  it("rejects an image over the byte budget", () => {
    expect(ogImageProblems({ ...healthy, bytes: 200_000 })[0]).toContain("over the");
  });

  it("rejects a blank-looking image even though its size is right", () => {
    // A 1200x675 solid PNG: correct dimensions, ~3.4 KB, zero variation.
    const solid: OgImageFacts = { ...healthy, bytes: 3_401, probeStdev: 0 };
    expect(ogImageProblems(solid)).toHaveLength(2);
  });

  it("rejects a background-only render that is big enough to look plausible", () => {
    // Measured gradient-only canvas: 30,955 bytes, probe stdev 11.9.
    const gradientOnly: OgImageFacts = { ...healthy, bytes: 30_955, probeStdev: 11.9 };
    const problems = ogImageProblems(gradientOnly);
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain("motif did not render");
  });

  it("accepts the thinnest real motif measured (memory curve, stdev 40.0)", () => {
    expect(ogImageProblems({ ...healthy, bytes: 26_442, probeStdev: 40.0 })).toEqual([]);
  });
});
