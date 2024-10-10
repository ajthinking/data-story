import { DiagramBuilder } from '@data-story/core';
import { nodes as coreNodes } from '@data-story/core';
import { nodes as nodeJsNodes } from '@data-story/nodejs';

export const create_to_json_file_write = new DiagramBuilder()
  .add(coreNodes.Create)
  .add(nodeJsNodes.JsonFileWrite, {
    file_path: 'demos/output/items.json'
  })
  .get();
