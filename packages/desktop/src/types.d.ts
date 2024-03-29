import { Diagram } from '@data-story/core';

export interface LocalDiagram {
  type: 'load' | 'save';
  version: string;
  diagram: Diagram;
}

export interface IpcResult {
  data: string;
  isSuccess: boolean;
  isCancelled?: boolean;
}
