import { Diagram } from '@data-story/core';
import { ItemsApi } from './ItemsApi';
import { DataStoryObservers } from '../types';

export interface ServerClient {
  init: () => void;
  run: (diagram: Diagram, observers?: DataStoryObservers) => void;
  save: (name: string, diagram: Diagram) => {}
  itemsApi?: () => ItemsApi
}
