const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');
const tar = require('tar'); // for extraction

const DUCKDB_BINDINGS_VERSION = '1.2.2-alpha.19';

const bindingsToInstall = [
  { name: 'darwin-arm64', os: 'darwin', cpu: 'arm64' },
  { name: 'linux-arm64', os: 'linux', cpu: 'arm64' },
  { name: 'darwin-x64', os: 'darwin', cpu: 'x64' },
  { name: 'linux-x64', os: 'linux', cpu: 'x64' },
  { name: 'win32-x64', os: 'win32', cpu: 'x64' }
];

const nodeModulesPath = path.resolve(__dirname, './install-scripts/node_modules');
const duckDBBaseDir = path.join(nodeModulesPath, '@duckdb');

console.log('Installing all DuckDB Node.js bindings for universal package...');

// Ensure @duckdb directory exists
if (!fs.existsSync(duckDBBaseDir)) {
  fs.mkdirSync(duckDBBaseDir, { recursive: true });
}

async function downloadAndExtract(packageName, version, targetDir) {
  return new Promise((resolve, reject) => {
    try {
      // 1. Get tarball URL
      const tarballUrl = execSync(`npm view ${packageName}@${version} dist.tarball`, { encoding: 'utf8' }).trim();
      if (!tarballUrl) {
        reject(new Error(`Could not get tarball URL for ${packageName}@${version}`));
        return;
      }
      console.log(`  Downloading ${tarballUrl} for ${packageName}...`);

      // 2. Download tarball
      https.get(tarballUrl, (response) => {
        if (response.statusCode !== 200) {
          response.resume(); // Consume data to free memory
          reject(new Error(`Failed to download ${tarballUrl}. Status: ${response.statusCode}`));
          return;
        }

        fs.mkdirSync(targetDir, { recursive: true });

        // 3. Extract tarball to target directory
        response.pipe(
          tar.x({
            strip: 1, // npm package tarballs usually contain a 'package/' root directory, strip: 1 removes it
            C: targetDir // Specify extraction directory (cwd)
          })
        )
          .on('finish', () => {
            console.log(`  Successfully downloaded and extracted ${packageName} to ${targetDir}`);
            resolve();
          })
          .on('error', (err) => {
            reject(new Error(`Error extracting tarball for ${packageName}: ${err.message}`));
          });
      }).on('error', (err) => {
        reject(new Error(`Error downloading tarball for ${packageName}: ${err.message}`));
      });
    } catch (error) {
      // Handle execSync failures etc.
      reject(new Error(`Error in downloadAndExtract for ${packageName}: ${error.message}\n${error.stderr ? error.stderr.toString() : ''}`));
    }
  });
}

async function main() {
  for (const binding of bindingsToInstall) {
    const platformSpecificPackageName = `@duckdb/node-bindings-${binding.name}`;
    // Target path should be node_modules/@duckdb/node-bindings-platform-arch/
    const targetPackageDir = path.join(duckDBBaseDir, `node-bindings-${binding.name}`);

    // Check if directory already exists and contains content (simple check, can be improved if needed)
    if (fs.existsSync(targetPackageDir) && fs.readdirSync(targetPackageDir).length > 0) {
      console.log(`  Skipping ${platformSpecificPackageName}: directory already exists and is not empty.`);
      continue;
    }

    console.log(`  Processing ${platformSpecificPackageName}...`);
    try {
      await downloadAndExtract(platformSpecificPackageName, DUCKDB_BINDINGS_VERSION, targetPackageDir);
    } catch (error) {
      console.error(`  Failed to install ${platformSpecificPackageName}. Error: ${error.message}`);
      throw error;
    }
  }
  console.log('All DuckDB Node.js bindings installation attempt completed.');
}

main().catch(err => {
  console.error('Installation script failed:', err);
  process.exit(1);
});