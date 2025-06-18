import { Readable } from 'stream';
import * as tar from 'tar';
import { $, fetch, fs, path } from 'zx';
import './scripts-prelude.mjs';

const DUCKDB_BINDINGS_VERSION = '1.2.2-alpha.19';

const bindingsToInstall = [
  { name: 'darwin-arm64', os: 'darwin', cpu: 'arm64' },
  { name: 'linux-arm64', os: 'linux', cpu: 'arm64' },
  { name: 'darwin-x64', os: 'darwin', cpu: 'x64' },
  { name: 'linux-x64', os: 'linux', cpu: 'x64' },
  { name: 'win32-x64', os: 'win32', cpu: 'x64' },
];

const nodeModulesPath = path.resolve(__dirname, '../install-scripts/node_modules');
const duckDBBaseDir = path.join(nodeModulesPath, '@duckdb');

console.log('Installing all DuckDB Node.js bindings for universal package...');

// Ensure @duckdb directory exists
if (!fs.existsSync(duckDBBaseDir)) {
  fs.mkdirSync(duckDBBaseDir, { recursive: true });
}

async function downloadAndExtract(packageName, version, targetDir) {
  // 1. Get tarball URL using zx
  $.verbose = true; // Suppress command output
  const packageWithVersion = `${packageName}@${version}`;
  const { stdout } = await $`npm view ${packageWithVersion} dist.tarball`;
  const tarballUrl = stdout.trim();

  if (!tarballUrl) {
    throw new Error(`Could not get tarball URL for ${packageName}@${version}`);
  }
  console.log(`  Downloading ${tarballUrl} for ${packageName}...`);

  // 2. Download tarball using fetch
  const response = await fetch(tarballUrl);

  if (!response.ok) {
    throw new Error(`Failed to download ${tarballUrl}. Status: ${response.status}`);
  }

  // Ensure target directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  // 3. Extract tarball to target directory
  const buffer = await response.arrayBuffer();
  const readable = Readable.from(Buffer.from(buffer));

  return new Promise((resolve, reject) => {
    readable.pipe(
      tar.x({
        strip: 1, // npm package tarballs usually contain a 'package/' root directory, strip: 1 removes it
        C: targetDir, // Specify extraction directory (cwd)
      }),
    )
      .on('finish', () => {
        console.log(`  Successfully downloaded and extracted ${packageName} to ${targetDir}`);
        resolve();
      })
      .on('error', (err) => {
        reject(new Error(`Error extracting tarball for ${packageName}: ${err.message}`));
      });
  });
}

async function main() {
    try {
        await Promise.all(bindingsToInstall.map(async (binding) => {
            const platformSpecificPackageName = `@duckdb/node-bindings-${binding.name}`;
            // Target path should be node_modules/@duckdb/node-bindings-platform-arch/
            const targetPackageDir = path.join(duckDBBaseDir, `node-bindings-${binding.name}`);
            // Check if directory already exists and contains content (simple check, can be improved if needed)
            if (fs.existsSync(targetPackageDir) && fs.readdirSync(targetPackageDir).length > 0) {
                console.log(`  Skipping ${platformSpecificPackageName}: directory already exists and is not empty.`);
                return;
            }
            console.log(`  Processing ${platformSpecificPackageName}...`);
            await downloadAndExtract(platformSpecificPackageName, DUCKDB_BINDINGS_VERSION, targetPackageDir);
        }));
        console.log('All DuckDB Node.js bindings installation attempt completed.');
    } catch (error) {
        console.error('Failed to install one or more bindings. Error:', error);
        throw error;
    }
}

await main().catch(err => {
  console.error('Installation script failed:', err);
  process.exit(1);
});
