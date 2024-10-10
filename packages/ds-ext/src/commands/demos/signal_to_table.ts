import { DiagramBuilder } from '@data-story/core';
import { nodes } from '@data-story/core';

export const signal_to_table = new DiagramBuilder()
  .add(nodes.Signal)
  .add(nodes.Table)
  .get();
