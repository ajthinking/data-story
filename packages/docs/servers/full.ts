#!/usr/bin/env node

import { Application, coreNodeProvider } from '@data-story/core';

require('dotenv').config({ path: '.env.local' })

const app = new Application();

app.register([
  coreNodeProvider,
  nodeJsNodesProvider,
]);

app.boot();

const server = new SocketServer({
  app,
  port: 3100
})

server.start()