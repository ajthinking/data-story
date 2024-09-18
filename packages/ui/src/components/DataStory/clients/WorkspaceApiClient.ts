import { ClientRunParams } from '../types';
import { NodeDescription } from '@data-story/core';

export interface WorkspaceApiClient {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }) => Promise<NodeDescription[]>
}
