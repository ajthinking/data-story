import { nodeJsProvider, SocketServer } from './src';
import { Application, coreNodeProvider } from '@data-story/core';
import * as dotenv from 'dotenv';
import { hubspotProvider } from '@data-story/hubspot';
import minimist from 'minimist';

dotenv.config({ path: '.env.local' });
const argv = minimist(process.argv.slice(2), {
  string: [ 'port', 'workingDir' ],
  alias: {
    port: 'p',
    workingDir: 'w',
  },
});

const port = argv.port || 3300;
const workingDir = argv.workingDir || process.cwd();

process.chdir(workingDir);

const startServer = async () => {
  const app = new Application();

  app.register([
    coreNodeProvider,
    nodeJsProvider,
    hubspotProvider,
  ]);

  await app.boot();

  const server = new SocketServer({
    app,
    port: port,
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
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  // application specific logging, throwing an error, or other logic here
});
process.on('exit', (code) => {
  console.log('Exit code', code);
});

startServer()
  .then(() => {
    console.log('Working directory', workingDir);
  }).catch((e) => {
    console.error('Error starting server', e);
  });
