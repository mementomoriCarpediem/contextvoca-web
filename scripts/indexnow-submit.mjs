#!/usr/bin/env node
// IndexNow 제출 스크립트.
// 사용: node scripts/indexnow-submit.mjs [--dry-run] <url1> [url2 ...]
//       node scripts/indexnow-submit.mjs [--dry-run] --since <git-ref>   (예: origin/main)
//
// `--since`는 `git diff --name-only <ref> -- content/blog`로 변경분을 찾는다 —
// 즉 <ref>와 "현재 작업 트리"를 비교한다(HEAD가 아니다). 커밋 전 상태도 잡히므로
// 실제 배포된 내용과 다를 수 있다: main 푸시·빌드 확인 이후에만 실행할 것.
// 그중 draft:true인 글은 제외한다(noindex 스텁을 검색엔진에 통보할 이유가 없다).
// 키는 public/*.txt(파일명 = 키, 내용도 키)를 읽는다 — 새로 발급하지 않는다.
// `--dry-run`은 실제 IndexNow 호출 없이 제출될 URL·페이로드만 출력하고 끝낸다.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://contextvoca.app";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Parses CLI argv into an explicit URL list or a `--since <ref>` git-diff request. `--dry-run` may appear anywhere. */
export function parseArgs(argv) {
  const dryRun = argv.includes("--dry-run");
  const rest = argv.filter((arg) => arg !== "--dry-run");

  if (rest[0] === "--since") {
    const ref = rest[1];
    if (!ref) {
      throw new Error("indexnow-submit: --since requires a git ref argument");
    }
    return { mode: "since", ref, dryRun };
  }
  if (rest.length === 0) {
    throw new Error("indexnow-submit: pass one or more URLs, or --since <git-ref>");
  }
  return { mode: "urls", urls: rest, dryRun };
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
export function isDraft(rawMdx) {
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

  console.log(
    `indexnow-submit: ${args.dryRun ? "[dry-run] would submit" : "submitting"} ${urls.length} URL(s):`
  );
  for (const url of urls) console.log(`  - ${url}`);

  if (args.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

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
