import { Tree, WorkspacesApi } from '../WorkspacesApi';
import { findParentTree } from './mockTree';

export const create: WorkspacesApi['create'] = async ({ path, tree }: { path: string, tree: Tree }): Promise<Tree> => {
  const parent = findParentTree(path);
  if (!parent || parent.type !== 'folder') {
    throw new Error(`Parent folder for path "${path}" not found`);
  }

  const { type, content } = tree;

  const newNode: Tree = { path, type, content };

  if (type === 'folder') {
    newNode.children = [];
  }

  parent.children = parent.children || [];
  parent.children.push(newNode);

  return newNode;
};