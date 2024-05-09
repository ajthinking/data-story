import { Diagram } from '@data-story/core';
import { ItemsApi } from './ItemsApi';
import { ServerClientObservationConfig } from '../types';

export interface ServerClient {
  init: () => void;
  run: (diagram: Diagram, observers?: ServerClientObservationConfig) => void;
  save: (name: string, diagram: Diagram) => {}
  itemsApi?: () => ItemsApi
}
