/**
 * Loads a project TypeScript module into a plain-Node build script.
 *
 * `scripts/generate-og-images.mjs` and `scripts/check-og-images.mjs` must use
 * the *same* pure functions as the Next app (paths, palettes, motifs, SVG) —
 * a second copy would be exactly the kind of derived-asset drift this feature
 * exists to prevent. Plain `node` cannot import `.ts` (this repo's Node is
 * built without TypeScript support, so `--experimental-strip-types` is not an
 * option either), so we transpile in memory with the `typescript`
 * devDependency, the same technique `scripts/check-i18n-keys.mjs` already uses.
 *
 * Supported module shape (all of `lib/og/*` sticks to it):
 * - relative imports of other `.ts` files (resolved and transpiled recursively)
 * - `import type` of anything (erased by the transpiler, never resolved)
 * - no bare-specifier runtime imports, no `@/` alias at runtime
 */
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const cache = new Map();

function resolveTsPath(specifier, fromDir) {
  const base = path.resolve(fromDir, specifier);
  for (const candidate of [base, `${base}.ts`, path.join(base, "index.ts")]) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  throw new Error(
    `load-ts-module: cannot resolve "${specifier}" from ${fromDir} — build scripts may only import relative .ts files`
  );
}

/**
 * @param {string} filePath absolute path of a `.ts` file
 * @returns {Record<string, unknown>} the module's exports
 */
export function loadTsModule(filePath) {
  const absolute = path.resolve(filePath);
  const cached = cache.get(absolute);
  if (cached) return cached;

  const source = fs.readFileSync(absolute, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: absolute,
  });

  const moduleShim = { exports: {} };
  cache.set(absolute, moduleShim.exports);

  const dir = path.dirname(absolute);
  const shimRequire = (specifier) => {
    if (!specifier.startsWith(".")) {
      throw new Error(
        `load-ts-module: ${absolute} imports "${specifier}" at runtime — build-script modules must be dependency-free`
      );
    }
    return loadTsModule(resolveTsPath(specifier, dir));
  };

  const fn = new Function("module", "exports", "require", outputText);
  fn(moduleShim, moduleShim.exports, shimRequire);

  cache.set(absolute, moduleShim.exports);
  return moduleShim.exports;
}
