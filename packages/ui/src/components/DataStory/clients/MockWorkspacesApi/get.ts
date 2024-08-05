import { Tree } from '../WorkspacesApi';
import { findTree } from './mockTree';

export const get = async ({ path }: { path: string }): Promise<Tree> => {
  const node = findTree(path);
  if (!node) {
    throw new Error(`Node at path "${path}" not found`);
  }
  return node;
};