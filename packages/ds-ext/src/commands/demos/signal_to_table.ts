import { getDemoApp } from '../getDemoApp';

export const signal_to_table = async () => (await getDemoApp())
  .getDiagramBuilder()
  .add('Signal')
  .add('Table')
  .connect()
  .place()
  .get();
