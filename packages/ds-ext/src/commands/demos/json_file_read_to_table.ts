import { getDemoApp } from '../getDemoApp';

export const json_file_read_to_table = async () => (await getDemoApp())
  .getDiagramBuilder()
  .add('JsonFile.read', {
    file_path: '.datastory/demos/demo_data/todos.json'
  })
  .add('Table')
  .connect()
  .place()
  .get();
