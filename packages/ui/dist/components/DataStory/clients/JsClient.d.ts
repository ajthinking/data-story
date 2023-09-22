import { NodeDescription, Application, Diagram } from "@data-story/core";
import { ServerClient } from './ServerClient';
import { SerializedReactFlow } from "../../../SerializedReactFlow";
export declare class JsClient implements ServerClient {
    private setAvailableNodes;
    private updateEdgeCounts;
    private setNodes;
    private setEdges;
    private app;
    constructor(setAvailableNodes: (nodes: NodeDescription[]) => void, updateEdgeCounts: (edgeCounts: Record<string, number>) => void, setNodes: (nodes: any) => void, setEdges: (edges: any) => void, app: Application);
    init(): void;
    describe(): void;
    run(diagram: Diagram): void;
    open(name: string): Promise<void>;
    save(name: string, reactFlow: SerializedReactFlow): Promise<void>;
}
