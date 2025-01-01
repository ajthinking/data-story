import { core } from '@data-story/core';

export const signal_to_table_1m_instant_items = async () => (await core.boot())
  .getDiagramBuilder()
  .add('Signal', { period: 0, count: 1_000_000 })
  .add('Table')
  .get();