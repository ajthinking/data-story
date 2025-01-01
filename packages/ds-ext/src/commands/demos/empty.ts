import { core } from '@data-story/core';

export const empty = async () => (await core.boot())
  .getDiagramBuilder()
  .get();