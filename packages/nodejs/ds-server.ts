/**
 * Entry point for the DataStory Node.js server.
 *
 * This script:
 * 1. Loads environment variables from .env.local
 * 2. Parses command-line arguments for port and working directory
 * 3. Changes working directory to the specified or default
 * 4. Initializes and starts the DataStory socket server with specified port and working directory
 *
 * @param port - The port number to use for the server (default: 3300)
 * @param workingDir - The working directory for the server (default: current directory)
 */
import { Application, coreNodeProvider, remoteNodeProvider } from '@data-story/core';
import * as dotenv from 'dotenv';
import { hubspotProvider } from '@data-story/hubspot';
import minimist from 'minimist';
import { nodeJsProvider } from './src';
import { SocketServer } from './src/server/SocketServer';

const startServer = async ({
  port,
  workingDir,
  abortSignal,
}: {
  port: number;
  workingDir: string;
  abortSignal?: AbortSignal;
}) => {
  process.chdir(workingDir);
  dotenv.config({ path: '.env.local' });
  console.log('Working directory', workingDir);
  const app = new Application();

  app.register([
    coreNodeProvider,
    nodeJsProvider,
    hubspotProvider,
    remoteNodeProvider,
  ]);

  await app.boot();

  const server = new SocketServer({
    app,
    port,
  });

  abortSignal?.addEventListener('abort', async () => {
    await server.stop();
  });
  await server.start();
};

process.on('uncaughtException', (error: Error, origin: NodeJS.UncaughtExceptionOrigin) => {
  console.error('----- Uncaught Exception -----');
  console.error('Error:', error);
  console.error('Origin:', origin); // 'uncaughtException' or 'unhandledRejection' (though less common here)
  console.error('Stack Trace:', error.stack); // Log the stack trace!
  console.error('----- Exiting Process -----');
});

process.stdin.on('data', data => {
  if (data.toString('utf-8').includes('<exit>')) {
    process.exit(0);
  }
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  // application specific logging, throwing an error, or other logic here
});
process.on('exit', (code) => {
  console.log('Exit code', code);
});

// Check if this file is being run directly (not imported as a module)
if (require.main === module) {
  const argv = minimist(process.argv.slice(2), {
    string: [ 'port', 'workingDir' ],
    alias: {
      port: 'p',
      workingDir: 'w',
    },
  });

  const port = argv.port || 3300;
  const workingDir = argv.workingDir || process.cwd();
  startServer({
    port,
    workingDir,
  })
    .then(() => {
      console.log('Working directory', workingDir);
    }).catch((e) => {
      console.error('Error starting server', e);
    });
}

// Export functions for when this file is imported as a module
export { startServer };
