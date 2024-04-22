#!/usr/bin/env node

import { Application, coreNodeProvider } from '@data-story/core';
import { SocketServer, nodeJsProvider } from '@data-story/nodejs';
import { hubspotProvider } from '@data-story/hubspot';
import { openAiProvider } from '@data-story/openai';

import dotenv from 'dotenv';
import { ServerPort } from '../const';

dotenv.config({ path: '.env.local' });

const app = new Application();

app.register([
  coreNodeProvider,
  nodeJsProvider,
  hubspotProvider,
  openAiProvider,

]);

app.boot();

const server = new SocketServer({
  app,
  port: ServerPort
})

server.start()
