import type { BlogPost } from "./types";

export interface StubViewModel {
  /** `null` for the synthetic placeholder route (no backing content file). */
  title: string | null;
}

/**
 * The *only* data a draft/stub blog page is allowed to touch. Deliberately
 * strips everything except the title — `description`, `tags`, and `content`
 * never reach this shape, so a stub page built on top of it structurally
 * cannot leak unapproved draft copy into the rendered HTML or `<head>`
 * metadata (enforced by `stub.test.ts`).
 */
export function buildStubViewModel(post: BlogPost | null): StubViewModel {
  if (!post) return { title: null };
  return { title: post.meta.title };
}
