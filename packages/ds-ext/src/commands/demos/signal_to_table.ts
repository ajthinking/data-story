import { core } from '@data-story/core';

export const signal_to_table = async () => (await core.boot())
  .getDiagramBuilder()
  .add('Signal')
  .add('Table')
  .get();
