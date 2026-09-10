import { describe, expect, it } from "vitest";
import { buildBlogListRobots } from "./list-robots";

describe("buildBlogListRobots", () => {
  it("returns undefined (default robots policy) when the locale has published posts", () => {
    expect(buildBlogListRobots(true)).toBeUndefined();
  });

  it("returns noindex,nofollow when the locale has zero published posts", () => {
    expect(buildBlogListRobots(false)).toEqual({ index: false, follow: false });
  });
});
