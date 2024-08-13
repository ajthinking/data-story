import { Tree } from './Tree';

export interface WorkspacesApi {
  get: ({ path }) => Promise<Tree>
  create: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>;
  update: ({ path, tree }: { path: string, tree: Tree }) => Promise<Tree>
  destroy: ({ path }: { path: string }) => Promise<void>
  move: ({ path, newPath }: { path: string, newPath: string}) => Promise<Tree>
}