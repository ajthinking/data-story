#!/usr/bin/env node
/*
 * Esbuild JS API script for building the DataStory Node.js server.
 * Replaces CLI:
 *  - build: esbuild --bundle --minify --platform=node ./ds-server.ts --external:@duckdb/node-bindings-* --outfile=dist/ds-server.min.js
 *  - watch: esbuild --bundle --platform=node ./ds-server.ts --external:@duckdb/node-bindings-* --outfile=dist/ds-server.min.js --watch
 */
const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');

const isWatch = process.argv.includes('--watch');

const rootDir = process.cwd();
const entry = path.resolve(rootDir, 'ds-server.ts');
const outFile = path.resolve(rootDir, 'dist', 'ds-server.min.js');

// Ensure dist exists
fs.mkdirSync(path.dirname(outFile), { recursive: true });

/** @type {import('esbuild').BuildOptions} */
const baseOptions = {
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  outfile: outFile,
  external: ['@duckdb/node-bindings-*'],
  minify: !isWatch,
  logLevel: 'info',
};

(async () => {
  if (isWatch) {
    const ctx = await esbuild.context(baseOptions);
    await ctx.watch();
    console.log('[esbuild] watching for changes...');
  } else {
    await esbuild.build(baseOptions);
    console.log('[esbuild] build complete');
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
