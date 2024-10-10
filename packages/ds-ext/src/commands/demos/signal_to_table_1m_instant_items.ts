import { DiagramBuilder } from '@data-story/core';
import { nodes } from '@data-story/core';

export const signal_to_table_1m_instant_items = new DiagramBuilder()
  .add(nodes.Signal, { period: 0, count: 1_000_000 })
  .add(nodes.Table)
  .get();
