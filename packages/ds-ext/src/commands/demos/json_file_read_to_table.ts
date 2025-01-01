import { core } from '@data-story/core';

export const json_file_read_to_table = async () => (await core.boot())
  .getDiagramBuilder()
  .add('JsonFileRead', {
    file_path: 'demos/demo_data/todos.json'
  })
  .add('Table')
  .get();
