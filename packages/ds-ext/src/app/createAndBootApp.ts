import { Application, coreNodeProvider, remoteNodeProvider } from '@data-story/core';
import { nodeJsProvider } from '../../../nodejs/dist';

export const createAndBootApp = async () => {
  const app = new Application();
  app.register([
    coreNodeProvider,
    nodeJsProvider,
    remoteNodeProvider,
  ]);

  await app.boot();

  return app;
};