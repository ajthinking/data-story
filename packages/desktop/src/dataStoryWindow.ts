/**
 * DataStoryWindow Class:
 * Handles the logic between browserWindow and workspace.
 */
import { Application, coreNodeProvider } from '@data-story/core';
import { nodeJsProvider, SocketServer } from '@data-story/nodejs';
import { hubspotProvider } from '@data-story/hubspot';

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

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
