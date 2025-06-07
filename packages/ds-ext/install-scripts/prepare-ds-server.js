// try resolve '@duckdb/node-api' with esm import
// if fails, execute 'npm install @duckdb/node-api@^1.2.2-alpha.18 --save'

function hasDryRunFlag() {
  return process.argv.includes('--dry-run');
}

async function ensureDuckDBNodeApi() {
  const dryRun = hasDryRunFlag();
  try {
    await import('@duckdb/node-api');
  } catch (e) {
    console.log('"@duckdb/node-api" not found.');
    if (dryRun) {
      console.log('[dry-run] Would execute: npm install @duckdb/node-api@^1.2.2-alpha.18 --save');
      return;
    }
    const { spawnSync } = await import('node:child_process');
    const result = spawnSync('npm', ['install', '@duckdb/node-api@^1.2.2-alpha.18', '--save'], {
      stdio: 'inherit',
      cwd: process.cwd(),
      shell: true,
    });
    if (result.error) {
      console.error('Failed to install @duckdb/node-api:', result.error);
      process.exit(1);
    }
  }
}

ensureDuckDBNodeApi();
