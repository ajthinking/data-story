import { destroy } from '.';
import { Tree } from '../WorkspacesApi';
import { findParentTree, findTree } from './mockTree';

export const move = async ({ path, newPath }: { path: string, newPath: string }): Promise<Tree> => {
  const node = findTree(path);
  if (!node) {
    throw new Error(`Node at path "${path}" not found`);
  }

  await destroy({ path });
  node.path = newPath;
  const parent = findParentTree(newPath);
  if (!parent || parent.type !== 'folder') {
    throw new Error(`Parent folder for new path "${newPath}" not found`);
  }

  parent.children = parent.children || [];
  parent.children.push(node);

  return node;
};