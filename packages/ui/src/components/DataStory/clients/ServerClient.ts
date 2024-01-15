import { Diagram } from '@data-story/core';

export interface ServerClient {
  init: () => void;
  run: (diagram: Diagram) => void;
  save: (name: string, diagram: Diagram) => {}
}
