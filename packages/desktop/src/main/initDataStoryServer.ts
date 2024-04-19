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

  const server = new SocketServer({
    app: dataStory,
    port: 3100
  })

  server.start();
}
