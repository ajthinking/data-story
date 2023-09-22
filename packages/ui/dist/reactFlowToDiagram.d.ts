import { Diagram } from '@data-story/core';
import { SerializedReactFlow, SerializedReactFlowNode } from './SerializedReactFlow';
export declare const reactFlowNodeToDiagramNode: (flowNode: SerializedReactFlowNode) => {
    id: string;
    type: string;
    inputs: {
        id: string;
        name: string;
        schema: any;
    }[];
    outputs: {
        id: string;
        name: string;
        schema: any;
    }[];
    params: Record<string, import("@data-story/core").Param>;
    position: {
        x: number;
        y: number;
    };
};
export declare const reactFlowToDiagram: (flow: SerializedReactFlow) => Diagram;
