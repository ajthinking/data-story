import { ReactFlowNode } from '../Node/ReactFlowNode'

export type Direction = 'up' | 'down' | 'left' | 'right'

/**
 * using the direction, find the closest node to the current selected node
 * @param {Direction} direction
 * @param {ReactFlowNode[]} nodes
 * @returns {ReactFlowNode | undefined}
 */
export const getNodesWithNewSelection = (
  direction: Direction,
  nodes: ReactFlowNode[],
): ReactFlowNode | undefined => {
  const selectedNodes = nodes.filter(node => node.selected);
  if (selectedNodes.length !== 1) {
    if (selectedNodes.length === 0 && nodes.length > 0) {
      // If no nodes are selected, select the first node
      nodes[0].selected = true;
    }
    // Return early if no selection change is possible
    return nodes[0];
  }

  // There is only one selected node
  const current = selectedNodes[0];

  type Comparator = (a: ReactFlowNode, b: ReactFlowNode) => boolean;
  const comparators: Record<Direction, Comparator> = {
    up: (a, b) => a.position.y < b.position.y,
    down: (a, b) => a.position.y > b.position.y,
    left: (a, b) => a.position.x < b.position.x,
    right: (a, b) => a.position.x > b.position.x,
  }

  const compare = comparators[direction]

  const closestNode = nodes.reduce((closest, node) => {
    if (node.id === current.id || !compare(node, current)) return closest;
    return !closest || compare(node, closest) ? node : closest;
  }, undefined as ReactFlowNode | undefined);

  if (closestNode) {
    current.selected = false;
    closestNode.selected = true;
  }

  return closestNode || current;
};
