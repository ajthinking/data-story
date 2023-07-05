import { Param, PortWithSchema } from '@data-story/core';
import { Node } from 'reactflow';

export type DataStoryNodeData = {
  params: Record<string, Param>,
  computer: string,
  label: string,
  inputs: PortWithSchema[],
  outputs: PortWithSchema[],
}

export type DataStoryNode = Node<DataStoryNodeData>;