/**
 * This file is the entry point for the DataStory server.
 */
import { Application, coreNodeProvider } from '@data-story/core';
import { nodeJsProvider, SocketServer } from '@data-story/nodejs';
import { hubspotProvider } from '@data-story/hubspot';

export const initDataStoryServer = () => {
  const dataStory = new Application();

  dataStory.register([
    coreNodeProvider,
    nodeJsProvider,
    hubspotProvider,
  ]);

  dataStory.boot();

  const ServerPort = Number(process.env.PORT) || 3100;
  const server = new SocketServer({
    app: dataStory,
    port: ServerPort
  })

  server.start();
}
