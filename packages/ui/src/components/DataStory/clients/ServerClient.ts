import { Diagram, Tree } from '@data-story/core';
import { ItemsApi } from './ItemsApi';
import { ServerClientObservationConfig } from '../types';
import { UpdateTreeParam } from './WorkspaceApiClient';

export interface ServerClient {
  init: () => void;
  run: (diagram: Diagram, observers?: ServerClientObservationConfig) => void;
  save: (name: string, diagram: Diagram) => {}
  itemsApi?: () => ItemsApi
  getTree: ({ path }) => Promise<Tree[]>
  createTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree[]>;
  updateTree: ({ path, tree }: UpdateTreeParam) => Promise<Tree[]>
  destroyTree: ({ path }: { path: string }) => Promise<void>
  moveTree: ({ path, newPath }: { path: string, newPath: string}) => Promise<Tree[]>
}
