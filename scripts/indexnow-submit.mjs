#!/usr/bin/env node
// IndexNow 제출 스크립트.
// 사용: node scripts/indexnow-submit.mjs <url1> [url2 ...]
//       node scripts/indexnow-submit.mjs --since <git-ref>   (예: origin/main)
//
// `--since`는 그 ref 이후 content/blog/에서 변경된 .mdx 파일을 찾아 URL로 매핑하고,
// 그중 draft:true인 글은 제외한다(noindex 스텁을 검색엔진에 통보할 이유가 없다).
// 키는 public/*.txt(파일명 = 키, 내용도 키)를 읽는다 — 새로 발급하지 않는다.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://contextvoca.app";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Parses CLI argv into an explicit URL list or a `--since <ref>` git-diff request. */
export function parseArgs(argv) {
  if (argv[0] === "--since") {
    const ref = argv[1];
    if (!ref) {
      throw new Error("indexnow-submit: --since requires a git ref argument");
    }
    return { mode: "since", ref };
  }
  if (argv.length === 0) {
    throw new Error("indexnow-submit: pass one or more URLs, or --since <git-ref>");
  }
  return { mode: "urls", urls: argv };
}

/** Extracts `{locale, slug}` from `content/blog/{locale}/{slug}.mdx` paths (e.g. from `git diff --name-only`). */
export function changedFilesToPostRefs(paths) {
  const refs = [];
  for (const filePath of paths) {
    const match = filePath.match(/^content\/blog\/([^/]+)\/([^/]+)\.mdx$/);
    if (match) refs.push({ locale: match[1], slug: match[2] });
  }
  return refs;
}

/** Shapes the IndexNow API request body (https://www.indexnow.org/documentation). */
export function buildIndexNowPayload({ host, key, keyLocation, urls }) {
  return { host, key, keyLocation, urlList: urls };
}

/**
 * True if the frontmatter block sets `draft: true`. A small standalone regex
 * check rather than a full frontmatter parse — this script only needs a
 * yes/no gate, and staying import-free from `lib/blog` (TypeScript) lets it
 * keep running under plain `node`, matching this repo's other `scripts/*.mjs`.
 */
function isDraft(rawMdx) {
  const block = rawMdx.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!block) return false;
  return /^draft:\s*true\s*$/m.test(block[1]);
}

/** Resolves a changed-file ref to its live URL, or `null` if it's a draft or no longer exists. */
function resolvePostUrl({ locale, slug }) {
  const filePath = path.join(ROOT, "content", "blog", locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null; // deleted/renamed since the diff ref
  const raw = fs.readFileSync(filePath, "utf8");
  if (isDraft(raw)) return null; // never submit noindex draft stubs
  return `${SITE_URL}/${locale}/blog/${slug}/`;
}

function findKeyFile() {
  const publicDir = path.join(ROOT, "public");
  const files = fs.readdirSync(publicDir).filter((f) => /^[a-f0-9]{16,}\.txt$/i.test(f));
  if (files.length !== 1) {
    throw new Error(
      `indexnow-submit: expected exactly one IndexNow key file in public/ (*.txt), found ${files.length}`
    );
  }
  const file = files[0];
  const key = fs.readFileSync(path.join(publicDir, file), "utf8").trim();
  return { key, keyLocation: `${SITE_URL}/${file}` };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  let urls;
  if (args.mode === "urls") {
    urls = args.urls;
  } else {
    const diffOutput = execFileSync(
      "git",
      ["diff", "--name-only", args.ref, "--", "content/blog"],
      { cwd: ROOT, encoding: "utf8" }
    );
    const changedPaths = diffOutput.split("\n").filter(Boolean);
    urls = changedFilesToPostRefs(changedPaths)
      .map(resolvePostUrl)
      .filter((url) => url !== null);
  }

  if (urls.length === 0) {
    console.log("indexnow-submit: no published URLs to submit — nothing to do.");
    return;
  }

  const { key, keyLocation } = findKeyFile();
  const payload = buildIndexNowPayload({ host: "contextvoca.app", key, keyLocation, urls });

  console.log(`indexnow-submit: submitting ${urls.length} URL(s):`);
  for (const url of urls) console.log(`  - ${url}`);

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  console.log(`indexnow-submit: IndexNow responded ${res.status} ${res.statusText}`);
  if (!res.ok) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  });
}
