import { Application, coreNodeProvider } from '@data-story/core';
import { nodeJsProvider } from '@data-story/nodejs';
// import { jsonNodeProvider } from './jsonNodeProvider';

export const dataStoryApp = new Application()
  .register([
    coreNodeProvider,
    nodeJsProvider,
    // jsonNodeProvider,
  ])
  .boot();