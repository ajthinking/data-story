import { core } from '@data-story/core';

export const create_to_json_file_write = async () => (await core.boot())
  .getDiagramBuilder()
  .add('Create')
  .add('JsonFileWrite', {
    file_path: 'demos/output/items.json'
  })
  .get();
