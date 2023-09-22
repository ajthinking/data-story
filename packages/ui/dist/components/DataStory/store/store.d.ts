import { Edge, OnNodesChange, OnEdgesChange, OnConnect, ReactFlowInstance } from 'reactflow';
import { Diagram, NodeDescription } from "@data-story/core";
import { DataStoryNode } from '../../Node/DataStoryNode';
import { ServerClient } from '../clients/ServerClient';
import { ServerConfig } from '../clients/ServerConfig';
export type StoreSchema = {
    /** The main reactflow instance */
    rfInstance: ReactFlowInstance | undefined;
    toDiagram: () => Diagram;
    /** Addable Nodes */
    availableNodes: NodeDescription[];
    setAvailableNodes: (nodes: NodeDescription[]) => void;
    /** The Nodes */
    nodes: DataStoryNode[];
    updateNode: (node: DataStoryNode) => void;
    refreshNodes: () => void;
    addNode: (node: DataStoryNode) => void;
    onNodesChange: OnNodesChange;
    setNodes: (nodes: DataStoryNode[]) => void;
    traverseNodes: (direction: 'up' | 'down' | 'left' | 'right') => void;
    /** The Edges */
    edges: Edge[];
    onEdgesChange: OnEdgesChange;
    updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
    setEdges: (edges: Edge[]) => void;
    connect: OnConnect;
    calculateInputSchema: (node: DataStoryNode) => void;
    /** The Server and its config */
    serverConfig: ServerConfig;
    setServerConfig: (config: ServerConfig) => void;
    server: null | ServerClient;
    onInitServer: (server: ServerConfig) => void;
    /** When DataStory component initializes */
    onInit: (options: {
        rfInstance: ReactFlowInstance;
        server?: ServerConfig;
        diagram?: Diagram;
        callback?: (server: any) => void;
    }) => void;
    /** Run the diagram */
    onRun: () => void;
    /** Modals */
    openNodeModalId: string | null;
    setOpenNodeModalId: (id: string | null) => void;
    open: (nodes: DataStoryNode[], edges: Edge[]) => void;
    /** Not used/implemented at the moment */
    flowName: string;
    setFlowName: (name: string) => void;
    onOpen: () => void;
    onSave: () => void;
};
export declare const useStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StoreSchema>>;
