import { Diagram, Diagrammable, Tree } from '@data-story/core';
import { LocalTree } from '../types';

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

export function parseDiagramTreeInfo(treeable: LocalTree | string) {
  const treeData = typeof treeable === 'string' ? JSON.parse(treeable) : treeable;

  return treeData.trees;
}
