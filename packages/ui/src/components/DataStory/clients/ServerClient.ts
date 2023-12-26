import { Diagram } from '@data-story/core';
import { SerializedReactFlow } from '../../../SerializedReactFlow';

export interface ServerClient {
  init: () => void;
  run: (diagram: Diagram) => void;
  save: (name: string, reactFlow: SerializedReactFlow) => {}
}