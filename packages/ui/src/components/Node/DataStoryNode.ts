import { Param, ParamV3, Port } from '@data-story/core';
import { Node } from 'reactflow';

export type DataStoryNodeData = {
  params: ParamV3[],
  computer: string,
  label: string,
  inputs: Port[],
  outputs: Port[],
}

export type DataStoryNode = Node<DataStoryNodeData>;