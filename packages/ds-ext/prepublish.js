const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const https = require('https');
const tar = require('tar'); // 用于解压

const DUCKDB_BINDINGS_VERSION = '1.2.2-alpha.19'; // 确保版本正确

const bindingsToInstall = [
  { name: 'darwin-arm64', os: 'darwin', cpu: 'arm64' },
  { name: 'linux-arm64', os: 'linux', cpu: 'arm64' },
  { name: 'darwin-x64', os: 'darwin', cpu: 'x64' },
  { name: 'linux-x64', os: 'linux', cpu: 'x64' },
  { name: 'win32-x64', os: 'win32', cpu: 'x64' } // 你当前的平台
];

const nodeModulesPath = path.resolve(__dirname, './install-scripts/node_modules');
const duckDBBaseDir = path.join(nodeModulesPath, '@duckdb');

console.log('Installing all DuckDB Node.js bindings for universal package...');

// 确保 @duckdb 目录存在
if (!fs.existsSync(duckDBBaseDir)) {
  fs.mkdirSync(duckDBBaseDir, { recursive: true });
}

async function downloadAndExtract(packageName, version, targetDir) {
  return new Promise((resolve, reject) => {
    try {
      // 1. 获取 tarball URL
      const tarballUrl = execSync(`npm view ${packageName}@${version} dist.tarball`, { encoding: 'utf8' }).trim();
      if (!tarballUrl) {
        reject(new Error(`Could not get tarball URL for ${packageName}@${version}`));
        return;
      }
      console.log(`  Downloading ${tarballUrl} for ${packageName}...`);

      // 2. 下载 tarball
      https.get(tarballUrl, (response) => {
        if (response.statusCode !== 200) {
          response.resume(); // 消费数据以释放内存
          reject(new Error(`Failed to download ${tarballUrl}. Status: ${response.statusCode}`));
          return;
        }

        // 确保目标目录存在
        if (fs.existsSync(targetDir)) {
          // 如果目录已存在且非空，可能表示之前已成功安装或部分安装
          // 为避免重复工作或潜在冲突，可以选择清空或跳过
          // 这里简单地先确保它是空的，或者你可以添加更复杂的逻辑
          // fs.rmSync(targetDir, { recursive: true, force: true });
        }
        fs.mkdirSync(targetDir, { recursive: true });

        // 3. 解压 tarball 到目标目录
        response.pipe(
          tar.x({
            strip: 1, // npm 包的 tarball 通常包含一个 'package/' 根目录，strip: 1 可以移除它
            C: targetDir // 指定解压到的目录 (cwd)
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
      // execSync 失败等
      reject(new Error(`Error in downloadAndExtract for ${packageName}: ${error.message}\n${error.stderr ? error.stderr.toString() : ''}`));
    }
  });
}

async function main() {
  for (const binding of bindingsToInstall) {
    const platformSpecificPackageName = `@duckdb/node-bindings-${binding.name}`;
    // 目标路径应为 node_modules/@duckdb/node-bindings-platform-arch/
    const targetPackageDir = path.join(duckDBBaseDir, `node-bindings-${binding.name}`);

    // 检查是否已存在且包含内容 (简单检查，可以根据需要改进)
    if (fs.existsSync(targetPackageDir) && fs.readdirSync(targetPackageDir).length > 0) {
      console.log(`  Skipping ${platformSpecificPackageName}: directory already exists and is not empty.`);
      continue;
    }

    console.log(`  Processing ${platformSpecificPackageName}...`);
    try {
      await downloadAndExtract(platformSpecificPackageName, DUCKDB_BINDINGS_VERSION, targetPackageDir);
    } catch (error) {
      console.error(`  Failed to install ${platformSpecificPackageName}. Error: ${error.message}`);
      // 你可以决定如果一个绑定失败是否要停止整个过程
      // throw error; // 如果需要，取消注释以在失败时停止
    }
  }
  console.log('All DuckDB Node.js bindings installation attempt completed.');
}

main().catch(err => {
  console.error('Installation script failed:', err);
  process.exit(1);
});