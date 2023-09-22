import { Diagram, NodeDescription } from "@data-story/core";
import { ServerClient } from './ServerClient';
import { SerializedReactFlow } from "../../../SerializedReactFlow";
export declare class SocketClient implements ServerClient {
    private setAvailableNodes;
    private updateEdgeCounts;
    private setNodes;
    private setEdges;
    private socket?;
    private maxReconnectTries;
    private reconnectTimeout;
    private reconnectTries;
    constructor(setAvailableNodes: (nodes: NodeDescription[]) => void, updateEdgeCounts: (edgeCounts: Record<string, number>) => void, setNodes: (nodes: any) => void, setEdges: (edges: any) => void);
    init(): void;
    describe(): void;
    run(diagram: Diagram): void;
    open(name: string): Promise<void>;
    save(name: string, reactFlow: SerializedReactFlow): Promise<void>;
}
