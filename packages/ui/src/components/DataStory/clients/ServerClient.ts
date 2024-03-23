import { Diagram } from '@data-story/core';
import { ItemsApi } from './ItemsApi';

export interface ServerClient {
  init: () => void;
  run: (diagram: Diagram) => void;
  save: (name: string, diagram: Diagram) => {}
  itemsApi?: () => ItemsApi
}
