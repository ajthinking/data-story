import { Diagram, Diagrammable } from '@data-story/core';
import { Tree } from './Tree';

const hydrateTreeNode = (tree: Tree<Diagrammable>): Tree<Diagram> => {
  if (tree.content) {
    tree.content = new Diagram({
      nodes: tree.content.nodes,
      links: tree.content.links,
      params: tree.content.params || [],
    });
  }

  if (tree.children && tree.children.length > 0) {
    tree.children = tree.children.map(child => hydrateTreeNode(child));
  }

  return tree as Tree<Diagram>;
};

export function parseDiagramTree(treeable: Tree<Diagrammable> | string) {
  const treeData = typeof treeable === 'string' ? JSON.parse(treeable) : treeable;

  return hydrateTreeNode(treeData);
}