import 'zx/globals';
import chokidar from 'chokidar';

import './scripts-prelude.mjs';
import { chalk, echo } from 'zx';
import { copyDist, DS_SERVER_MIN_JS_IN, DS_SERVER_MIN_JS_OUT } from './ds-server-utils.mjs';

// Initial copy
try {
  await copyDist();
  echo(chalk.blue('Initial copy completed. Watching for changes...'));
} catch (err) {
  echo(chalk.red(`Initial copy failed: ${err.message}`));
  echo(chalk.yellow('Make sure the source file exists. Running build first might help.'));
}

// Initialize watcher with chokidar
const watcher = chokidar.watch(DS_SERVER_MIN_JS_IN, {
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 300, // Wait 300ms after the last write event
    pollInterval: 100,       // Poll every 100ms
  },
});

// Add event listeners
watcher
  .on('change', async () => {
    echo(chalk.yellow(`Change detected in ${DS_SERVER_MIN_JS_IN}, copying to ${DS_SERVER_MIN_JS_OUT}...`));

    try {
      await copyDist();
    } catch (err) {
      echo(chalk.red(`Error copying file: ${err.message}`));
    }
  })
  .on('error', error => echo(chalk.red(`Watcher error: ${error}`)))
  .on('ready', () => {
    echo(chalk.green(`Watching for changes in ${DS_SERVER_MIN_JS_IN}`));
    echo(chalk.gray('Press Ctrl+C to stop watching.'));
  });

// Handle process termination
process.on('SIGINT', () => {
  watcher.close().then(() => {
    echo(chalk.blue('\nStopped watching for changes.'));
    process.exit(0);
  });
});
