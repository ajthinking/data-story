import { Param, Port } from '@data-story/core';
import { Node } from 'reactflow';

export type DataStoryNodeData = {
  params: Param[],
  computer: string,
  label: string,
  docs?: string,
  inputs: Port[],
  outputs: Port[],
}

export type ReactFlowNode = Node<DataStoryNodeData>;