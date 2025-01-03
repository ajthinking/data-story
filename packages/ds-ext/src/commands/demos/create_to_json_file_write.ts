import { getDemoApp } from '../getDemoApp';

export const create_to_json_file_write = async () => (await getDemoApp())
  .getDiagramBuilder()
  .add('Create')
  .add('JsonFile.write', {
    file_path: '.datastory/demos/output/items.json'
  })
  .connect()
  .place()
  .get();
