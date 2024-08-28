#!/usr/bin/env node

import { Application, coreNodeProvider } from '@data-story/core';
import { DirectoryTreeManager, SocketServer, nodeJsProvider } from '@data-story/nodejs';
import { hubspotProvider } from '@data-story/hubspot';
import { openAiProvider } from '@data-story/openai';

import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = new Application(
  new DirectoryTreeManager('/')
);

app.register([
  coreNodeProvider,
  nodeJsProvider,
  hubspotProvider,
  openAiProvider,
]);

app.boot();

const server = new SocketServer({
  app,
  port: 3300,
})

server.start()
