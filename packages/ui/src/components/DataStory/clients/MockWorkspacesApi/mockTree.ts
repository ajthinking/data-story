import { Tree } from '../WorkspacesApi';

let mockData: Tree = {
  path: '/',
  type: 'folder',
  children: [
    {
      path: '/main.diagram.json',
      type: 'file',
      content: '{"nodes":[],"links":[],"params":[],"viewport":{"x":0,"y":0,"zoom":1}}'

    },
    {
      path: '/custom-nodes',
      type: 'folder',
      children: [
        {
          path: '/custom-nodes/custom-node-1.node.json',
          type: 'file',
          content: '{"nodes":[],"links":[],"params":[],"viewport":{"x":0,"y":0,"zoom":1}}'
        }
      ]
    }
  ]
};

// Helper function to find a node by path
export const findTree = (path: string, node: Tree = mockData): Tree | null => {
  if (node.path === path) {
    return node;
  }

  if (node.type === 'folder' && node.children) {
    for (const child of node.children) {
      const result = findTree(path, child);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

// Helper function to find a parent node by path
export const findParentTree = (path: string): Tree | null => {
  const parts = path.split('/').filter(Boolean);
  parts.pop(); // Remove the last part to get the parent path
  const parentPath = '/' + parts.join('/');
  return findTree(parentPath || '/');
};