/**
 * Minimal frontmatter parser for `content/blog/{locale}/{slug}.mdx` files.
 *
 * Not a general YAML parser — it only supports the flat key/value shape our
 * frontmatter actually uses (plain strings, quoted strings, `true`/`false`,
 * and single-line `[a, b, c]` arrays). Kept dependency-free and pure so it
 * can double as the single source of truth for both full post rendering and
 * lightweight listing/sitemap/llms.txt metadata.
 */
const FRONTMATTER_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

function parseScalar(raw: string): string | boolean {
  const trimmed = raw.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseValue(raw: string): unknown {
  const trimmed = raw.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (inner === "") return [];
    return inner.split(",").map((item) => parseScalar(item));
  }
  return parseScalar(trimmed);
}

export interface ParsedFrontmatter {
  data: Record<string, unknown>;
  content: string;
}

/**
 * Splits `raw` into its frontmatter data object and the remaining MDX body.
 * Throws if `raw` doesn't start with a `---`-delimited frontmatter block —
 * every blog post is required to have one.
 */
export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = raw.match(FRONTMATTER_BLOCK);
  if (!match) {
    throw new Error(
      "parseFrontmatter: no leading '---' frontmatter block found"
    );
  }
  const [, block, content] = match;
  const data: Record<string, unknown> = {};

  for (const line of block.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      throw new Error(`parseFrontmatter: malformed line "${line}"`);
    }
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    data[key] = parseValue(value);
  }

  return { data, content };
}
