import { Param, Port } from '@data-story/core';
import { Node } from 'reactflow';

export type DataStoryNodeData = {
  params: Param[],
  computer: string,
  label: string,
  color?: string,
  inputs: Port[],
  outputs: Port[],
}

export type DataStoryNode = Node<DataStoryNodeData>;