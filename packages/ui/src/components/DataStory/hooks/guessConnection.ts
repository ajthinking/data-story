import { Connection } from 'reactflow';
import { DataStoryNode } from '../../Node/DataStoryNode';

export const guessConnection = (
  existingNodes: DataStoryNode[],
  node: DataStoryNode
): Connection | null => {
  const previousNode = existingNodes.at(-1)
  if(!previousNode) return null;

  const firstOutput = previousNode.data.outputs.at(0)
  if(!firstOutput) return null;

  const firstInput = node.data.inputs.at(0)
  if(!firstInput) return null;

  return {
    // id: `${previousNode.id}.${firstOutput.name}--->${node.id}.${firstInput.name}`,
    sourceHandle: firstOutput.id ?? null,
    targetHandle: firstInput.id ?? null,
    source: previousNode.id,
    target: node.id,
  }
}