import { getDemoApp } from '../getDemoApp';

export const empty = async () => (await getDemoApp())
  .getDiagramBuilder()
  .get();