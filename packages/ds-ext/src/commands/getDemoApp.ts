import { Application, coreNodeProvider } from '@data-story/core';
import { nodeJsProvider } from '@data-story/nodejs';

export const getDemoApp = async () => {
  const app = new Application();

  app.register([
    coreNodeProvider,
    nodeJsProvider,
  ]);

  await app.boot();

  return app;
};