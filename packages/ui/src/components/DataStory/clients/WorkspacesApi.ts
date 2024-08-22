import { NodeDescription } from '@data-story/core';
import { Tree } from './Tree';

export interface WorkspacesApi {
  getTree: ({ path }) => Promise<Tree[]>
  createTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>;
  updateTree: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>
  destroyTree: ({ path }: { path: string }) => Promise<void>
  moveTree: ({ path, newPath }: { path: string, newPath: string}) => Promise<Tree>

  getNodeDescriptions: ({ path }) => Promise<NodeDescription[]>
}
