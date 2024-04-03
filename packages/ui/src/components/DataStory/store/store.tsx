import { StoreApi, UseBoundStore } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional'

import {
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
} from 'reactflow';

import { SocketClient } from '../clients/SocketClient';
import { AbstractPort, Diagram, Link, LinkGuesser, Node, NodeDescription, PositionGuesser, createDataStoryId } from '@data-story/core';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { ServerClient } from '../clients/ServerClient';
import { JsClient } from '../clients/JsClient';
import { ServerConfig } from '../clients/ServerConfig';
import React, { useState } from 'react';
import { ReactFlowFactory } from '../../../factories/ReactFlowFactory';
import { DiagramFactory } from '../../../factories/DiagramFactory';
import { NodeFactory } from '../../../factories/NodeFactory';
import { Direction, getNodesWithNewSelection } from '../getNodesWithNewSelection';

export type StoreSchema = {
  /** The main reactflow instance */
  rfInstance: ReactFlowInstance | undefined;
  toDiagram: () => Diagram;

  /** Addable Nodes */
  availableNodes: NodeDescription[],
  setAvailableNodes: (nodes: NodeDescription[]) => void,

  /** The Nodes */
  nodes: ReactFlowNode[];
  updateNode: (node: ReactFlowNode) => void;
  addNode: (node: ReactFlowNode) => void;
  addNodeFromDescription: (nodeDescription: NodeDescription) => void;
  onNodesChange: OnNodesChange;
  setNodes: (nodes: ReactFlowNode[]) => void;
  traverseNodes: (direction: Direction) => void;

  /** The Edges */
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  setEdges: (edges: Edge[]) => void;
  connect: OnConnect;

  /** The Server and its config */
  serverConfig: ServerConfig;
  server: null | ServerClient;
  onInitServer: (server: ServerConfig) => void;

  /** When DataStory component initializes */
  onInit: (options: {
    rfInstance: ReactFlowInstance,
    server?: ServerConfig,
    initDiagram?: Diagram,
    callback?: (server: any) => void,
  }) => void;

  updateDiagram: (diagram: Diagram) => void;

  /** Run the diagram */
  onRun: () => void;

  /** Modals */
  openNodeModalId: string | null;
  setOpenNodeModalId: (id: string | null) => void;
};

export const createStore = () => createWithEqualityFn<StoreSchema>((set, get) => ({
  // DEFAULTS
  serverConfig: { type: 'SOCKET', url: 'ws://localhost:3100' },
  rfInstance: undefined,
  nodes: [],
  edges: [],
  server: null,
  availableNodes: [],
  openNodeModalId: null,

  // METHODS
  toDiagram: () => {
    const reactFlowObject = get().rfInstance!.toObject()
    const viewport = reactFlowObject.viewport

    const { nodes, edges } = get()

    return DiagramFactory.fromReactFlowObject({
      viewport,
      nodes,
      edges,
    })
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  connect: (connection: Connection) => {
    // Assume we have a full connection
    if(!connection.sourceHandle || !connection.targetHandle) return

    // Operate via the diagram!
    const diagram = get().toDiagram()

    // Connection to Link
    const link: Link = {
      id: createDataStoryId(),
      sourcePortId: connection.sourceHandle,
      targetPortId: connection.targetHandle,
    }

    // Add the link to the diagram
    diagram.connect(link)

    // Update the diagram
    get().updateDiagram(diagram)
  },
  addNode: (node: ReactFlowNode) => {
    set({
      nodes: [
        ...get().nodes.map(node => {
          // When adding a node, deselect all other nodes
          node.selected = false
          return node
        }),
        node
      ],
    })

    setTimeout(() => {
      get().rfInstance?.fitView();
    }, 1);
  },
  addNodeFromDescription: (nodeDescription: NodeDescription) => {
    const diagram = get().toDiagram()

    const scopedId = createDataStoryId();
    const id = `${nodeDescription.name}.${scopedId}`;

    const flowNode: ReactFlowNode = {
      id,
      position: new PositionGuesser(diagram).guess(nodeDescription),
      data: {
        computer: nodeDescription.name,
        docs: nodeDescription.docs,
        // Ensure two nodes of same type don't share the same params object
        params: structuredClone(nodeDescription.params),
        label: nodeDescription.label ?? nodeDescription.name,
        inputs: nodeDescription.inputs.map((input: AbstractPort) => {
          return {
            id: `${id}.${input.name}`,
            ...input
          }
        }),
        outputs: nodeDescription.outputs.map((output: AbstractPort) => {
          return {
            id: `${id}.${output.name}`,
            ...output
          }
        }),
      },
      selected: true,
      type: {
        Comment: 'commentNodeComponent',
        Input: 'inputNodeComponent',
        Output: 'outputNodeComponent',
        Table: 'tableNodeComponent',
      }[nodeDescription.name] ?? 'nodeComponent',
    }

    const node: Node = NodeFactory.fromReactFlowNode(flowNode)

    const link = new LinkGuesser(diagram).guess(node)

    const connection = link ? {
      source: diagram.nodeWithOutputPortId(link.sourcePortId)!.id,
      target: id,
      sourceHandle: link.sourcePortId,
      targetHandle: link.targetPortId,
    } : null;

    get().addNode(flowNode);

    if (connection) {
      get().connect(connection);
    }
  },
  updateNode: (node: ReactFlowNode) => {
    set({
      nodes: get().nodes.map(existingNode => {
        if (existingNode.id === node.id) {
          return node
        }

        return existingNode
      }),
    })
  },
  setNodes: (nodes: ReactFlowNode[]) => {
    set({
      nodes: [...nodes],
    })
  },
  setEdges(edges: Edge[]) {
    set({ edges })
  },
  onInit: (options: {
    rfInstance: ReactFlowInstance,
    server?: ServerConfig,
    initDiagram?: Diagram,
    callback?: (options: {run: () => void}) => void
  }) => {
    set({
      serverConfig: options.server || {
        type: 'SOCKET',
        url: 'ws://localhost:3100'
      }
    })

    set({ rfInstance: options.rfInstance })
    get().onInitServer(get().serverConfig)

    if (options.initDiagram) get().updateDiagram(options.initDiagram)

    if (options.callback) {
      const run = () => {
        get().server?.run(
          // TODO it seems this does not await setNodes/setEdges?
          get().toDiagram()
        )
      }

      options.callback({ run })
    }
  },
  updateDiagram: (diagram: Diagram) => {
    const reactFlowObject = ReactFlowFactory.fromDiagram(diagram)

    get().setNodes(reactFlowObject.nodes);
    get().setEdges(reactFlowObject.edges);
  },
  onRun: () => {
    get().server!.run(
      get().toDiagram()
    )
  },
  onInitServer: (serverConfig: ServerConfig) => {
    if (serverConfig.type === 'JS') {
      const server = new JsClient({
        setAvailableNodes: get().setAvailableNodes,
        updateEdgeCounts: get().updateEdgeCounts,
        app: serverConfig.app
      })

      set({ server })
      server.init()
    }

    if (serverConfig.type === 'SOCKET') {
      const server = new SocketClient(
        get().setAvailableNodes,
        get().updateEdgeCounts,
      )

      set({ server })
      server.init()
    }
  },
  setAvailableNodes: (availableNodes: NodeDescription[]) => {
    set({ availableNodes })
  },
  updateEdgeCounts: (edgeCounts: Record<string, number>) => {
    const updatedEdges = get().edges.map(edge => ({
      ...edge,
      ...(edgeCounts[edge.id] !== undefined && {
        label: edgeCounts[edge.id],
        labelBgStyle: { opacity: 0.6 },
      }),
    }));

    get().setEdges(updatedEdges);
  },
  setOpenNodeModalId: (id: string | null) => {
    set({ openNodeModalId: id })
  },
  traverseNodes: (direction: Direction) => {
    // This is an UI only operation
    set({
      nodes: [
        ...getNodesWithNewSelection(
          direction,
          get().nodes,
        )
      ]
    });
  },
}));

export const DataStoryContext = React.createContext<ReturnType<typeof createStore>>({} as ReturnType<typeof createStore>);

// @ts-ignore: UseBoundStore is an overloaded function, so the type of params here cannot be accurately inferred.
export const useStore: UseBoundStore<StoreApi<StoreSchema>> = (...params) => {
  const store = React.useContext(DataStoryContext);
  if (!store) throw new Error('useStore must be used within a DataStoryProvider');
  // @ts-ignore
  return store(...params);
};

export const DataStoryProvider = ({ children }: {children: React.ReactNode}) => {
  const [useLocalStore] = useState(() => createStore());

  return <DataStoryContext.Provider value={useLocalStore}>
    {children}
  </DataStoryContext.Provider>;
};
