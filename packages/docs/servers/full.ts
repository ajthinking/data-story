#!/usr/bin/env node

import { Application, coreNodeProvider } from '@data-story/core';

require('dotenv').config({ path: '.env.local' })

const app = new Application();

app.register([
  coreNodeProvider,
  // nodeJsNodesProvider,
  // openAiProvider
]);

app.boot();

// SocketServer is not exported from @data-story/core
// const server = new SocketServer({
//   app,
//   port: 3100
// })

// server.start()