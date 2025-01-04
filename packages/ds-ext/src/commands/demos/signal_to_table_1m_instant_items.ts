import { getDemoApp } from '../getDemoApp';

export const signal_to_table_1m_instant_items = async () => (await getDemoApp())
  .getDiagramBuilder()
  .add('Signal', { period: 0, count: 1_000_000 })
  .add('Table')
  .connect()
  .place()
  .get();