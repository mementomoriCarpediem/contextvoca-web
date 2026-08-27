#!/usr/bin/env node
/**
 * Verifies that lib/i18n/{ko,en,ja,zh}.ts all expose the exact same set of
 * translation keys (structural parity with the shared `Translations` type).
 *
 * Each dictionary is transpiled in-memory with the TypeScript compiler
 * (already a project devDependency) and evaluated to a plain object, then
 * every leaf path (e.g. `pricing.plans[].wordLimit`) is collected into a set.
 * The four sets must be identical.
 *
 * Usage: node scripts/check-i18n-keys.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import ts from "typescript";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const i18nDir = path.join(__dirname, "..", "lib", "i18n");
const LOCALES = ["ko", "en", "ja", "zh"];

const require = createRequire(import.meta.url);

function loadDictionary(locale) {
  const filePath = path.join(i18nDir, `${locale}.ts`);
  const source = fs.readFileSync(filePath, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: filePath,
  });

  const moduleShim = { exports: {} };
  const shimRequire = (specifier) => {
    // Local relative imports in these dictionary files are type-only
    // (`./types`), so an empty object is a safe stand-in at runtime.
    if (specifier.startsWith(".")) return {};
    return require(specifier);
  };
  const fn = new Function("module", "exports", "require", outputText);
  fn(moduleShim, moduleShim.exports, shimRequire);

  const dict = moduleShim.exports.default ?? moduleShim.exports;
  if (!dict || typeof dict !== "object") {
    throw new Error(`Failed to load default export from ${filePath}`);
  }
  return dict;
}

/** Collects every leaf key path in `value`, treating arrays as a single
 * representative element (all items in a given array are expected to share
 * the same shape, which TypeScript's Translations type already enforces). */
function collectPaths(value, prefix, out) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      out.add(`${prefix}[]`);
    } else {
      collectPaths(value[0], `${prefix}[]`, out);
    }
    return;
  }
  if (value !== null && typeof value === "object") {
    for (const key of Object.keys(value).sort()) {
      collectPaths(value[key], prefix ? `${prefix}.${key}` : key, out);
    }
    return;
  }
  out.add(prefix);
}

function diffSets(a, b) {
  const onlyInA = [...a].filter((k) => !b.has(k));
  const onlyInB = [...b].filter((k) => !a.has(k));
  return { onlyInA, onlyInB };
}

let hasError = false;
const pathSets = {};

for (const locale of LOCALES) {
  const dict = loadDictionary(locale);
  const paths = new Set();
  collectPaths(dict, "", paths);
  paths.delete("");
  pathSets[locale] = paths;
  console.log(`[check-i18n-keys] ${locale}.ts: ${paths.size} leaf keys`);
}

const [reference, ...rest] = LOCALES;
for (const locale of rest) {
  const { onlyInA, onlyInB } = diffSets(pathSets[reference], pathSets[locale]);
  if (onlyInA.length || onlyInB.length) {
    hasError = true;
    console.error(`\n[check-i18n-keys] Mismatch between ${reference}.ts and ${locale}.ts`);
    if (onlyInA.length) {
      console.error(`  Present in ${reference}.ts but missing in ${locale}.ts:`);
      for (const k of onlyInA) console.error(`    - ${k}`);
    }
    if (onlyInB.length) {
      console.error(`  Present in ${locale}.ts but missing in ${reference}.ts:`);
      for (const k of onlyInB) console.error(`    - ${k}`);
    }
  }
}

if (hasError) {
  console.error("\n[check-i18n-keys] FAILED: dictionaries are not key-for-key identical.");
  process.exit(1);
}

console.log("\n[check-i18n-keys] OK: ko/en/ja/zh dictionaries share identical key sets.");
