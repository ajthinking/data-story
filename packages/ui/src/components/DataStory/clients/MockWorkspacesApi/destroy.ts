import { findParentTree } from './mockTree';

export const destroy = async ({ path }: { path: string }): Promise<void> => {
  const parent = findParentTree(path);
  if (!parent || parent.type !== 'folder') {
    throw new Error(`Parent folder for path "${path}" not found`);
  }

  parent.children = parent.children?.filter(child => child.path !== path) || [];
};