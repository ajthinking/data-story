import { Application, coreNodeProvider } from '@data-story/core';
import { nodeJsProvider } from '@data-story/nodejs';

export const dataStoryApp = new Application()
  .register([
    coreNodeProvider,
    nodeJsProvider,
  ])
  .boot();