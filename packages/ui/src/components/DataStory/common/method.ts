import { Tree } from '../clients/Tree';
import { Activity } from '../types';
import { NodeIcon } from '../icons/nodeIcon';
import { DiagramIcon } from '../icons/diagramIcon';
import { ConfigIcon } from '../icons/configIcon';

export const path = '/';

export const findFirstFileNode = (tree: Tree): Tree | null => {
  if (tree.type === 'file') return tree;
  if (!tree.children || tree?.children?.length === 0) return null;

  for(const child of tree.children) {
    if (child.type === 'file') return child;
    return findFirstFileNode(child);
  }
  return null;
}

export const findNodeById = (tree: Tree, id: string): Tree | null => {
  if (tree.id === id) {
    return tree;
  }

  if (tree.type === 'folder' && tree.children) {
    for (const child of tree.children) {
      const result = findNodeById(child, id);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

export const isSingleFile = (tree: Tree): boolean => {
  if (tree.type === 'file' && (!tree.children || tree?.children?.length === 0)) return true;
  return false;
}

export const ActivityGroups: Activity[] = [
  { id: 'node', name: 'Node Config', icon: NodeIcon, position: 'top' },
  { id: 'diagram', name: 'Diagram Config', icon: DiagramIcon, position: 'top' },
  { id: 'settings', name: 'Settings', icon: ConfigIcon, position: 'top' },
  { id: 'explorer', name: 'Explorer', icon: ConfigIcon, position: 'top' },
];

// for debugging.
export const areEqual = (prevProps, nextProps) => {
  Object.entries(nextProps).forEach(([key, val]) => {
    if (prevProps[key] !== val) {
      console.log(`Prop '${key}' changed DataStory`);
    }
  });

  // Returning false means the component will always re-render, primarily for debugging purposes.
  return false;
}
