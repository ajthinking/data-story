import { ClientRunParams } from '../types';
import { Diagram, NodeDescription } from '@data-story/core';

export interface WorkspaceApiClient {
  run(params: ClientRunParams): void;
  getNodeDescriptions: ({ path }: { path: string}) => Promise<NodeDescription[]>
  updateTree?: (diagram: Diagram) => Promise<void>;
}
