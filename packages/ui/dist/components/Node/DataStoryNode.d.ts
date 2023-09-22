import { Param, Port } from '@data-story/core';
import { Node } from 'reactflow';
export type DataStoryNodeData = {
    params: Record<string, Param>;
    computer: string;
    label: string;
    inputs: Port[];
    outputs: Port[];
};
export type DataStoryNode = Node<DataStoryNodeData>;
