import { Tree } from '../WorkspacesApi';
import { findTree } from './mockTree';

export const update = async ({ path, tree }: { path: string, tree: Tree }): Promise<Tree> => {
  const node = findTree(path);
  if (!node) {
    throw new Error(`Node at path "${path}" not found`);
  }

  node.content = tree.content;
  node.children = tree.children;

  return node;
};