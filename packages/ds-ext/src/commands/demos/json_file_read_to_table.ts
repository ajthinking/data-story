import { DiagramBuilder } from '@data-story/core';
import { nodes as coreNodes } from '@data-story/core';
import { nodes as nodeJsNodes } from '@data-story/nodejs';

export const json_file_read_to_table = new DiagramBuilder()
  .add(nodeJsNodes.JsonFileRead, {
    file_path: 'demos/demo_data/todos.json'
  })
  .add(coreNodes.Table)
  .get();
