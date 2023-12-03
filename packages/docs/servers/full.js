#!/usr/bin/env node

import { Application, coreNodeProvider } from '@data-story/core';
import { SocketServer, nodeJsProvider } from '@data-story/nodejs';
import { openAiProvider } from '@data-story/openai';

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const app = new Application();

app.register([
  coreNodeProvider,
  nodeJsProvider,
  openAiProvider
]);

app.boot();

const server = new SocketServer({
  app,
  port: 3100
})

server.start()