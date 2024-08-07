import { StoreApi, UseBoundStore } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';

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
} from '@xyflow/react';

import { SocketClient } from '../clients/SocketClient';
import {
  createDataStoryId,
  Diagram,
  LinkGuesser,
  Node,
  NodeDescription,
  Param
} from '@data-story/core';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import { ServerClient } from '../clients/ServerClient';
import { JsClient } from '../clients/JsClient';
import { ServerConfig, WebSocketServerConfig } from '../clients/ServerConfig';
import React, { useState } from 'react';
import { ReactFlowFactory } from '../../../factories/ReactFlowFactory';
import { DiagramFactory } from '../../../factories/DiagramFactory';
import { NodeFactory } from '../../../factories/NodeFactory';
import { Direction, getNodesWithNewSelection } from '../getNodesWithNewSelection';
import { createObservers } from './createObservers';
import { DataStoryObservers, ObserverMap, StoreInitOptions, StoreInitServer } from '../types';

export type StoreSchema = {
  /** The main reactflow instance */
  rfInstance: StoreInitOptions['rfInstance'] | undefined;
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
  selectNode: (nodeId: string) => void;
  traverseNodes: (direction: Direction) => void;

  /** The Edges */
  edges: Edge[];
  onEdgesChange: OnEdgesChange;
  updateEdgeCounts: (edgeCounts: Record<string, number>) => void;
  setEdges: (edges: Edge[]) => void;
  connect: OnConnect;

  /** Global Params */
  params: Param[],
  setParams: (params: Param[]) => void;

  /** The Server and its config */
  serverConfig: ServerConfig;
  server: null | ServerClient;
  initServer: StoreInitServer;

  /** When DataStory component initializes */
  onInit: (options: StoreInitOptions) => void;

  updateDiagram: (diagram: Diagram) => void;

  /** Run the diagram */
  onRun: () => void;

  /** Modals */
  openNodeModalId: string | null;
  setOpenNodeModalId: (id: string | null) => void;

  /** observerMap are used to monitor data changes in the node */
  observerMap: ObserverMap;
  setObservers: (key: string, observers?: DataStoryObservers) => void;
};

export const createStore = () => createWithEqualityFn<StoreSchema>((set, get) => ({
  // DEFAULTS
  serverConfig: { type: 'SOCKET', url: 'ws://localhost:3100' },
  rfInstance: undefined,
  nodes: [],
  edges: [],
  params: [],
  server: null,
  availableNodes: [],
  openNodeModalId: null,
  observerMap: new Map(),

  // METHODS
  toDiagram: () => {
    const reactFlowObject = get().rfInstance!.toObject()
    const viewport = reactFlowObject.viewport

    const { nodes, edges, params } = get()

    return DiagramFactory.fromReactFlowObject({
      viewport,
      nodes,
      edges,
      params,
    })
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as ReactFlowNode[],
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  connect: (connection: Connection) => {
    // Assume we have a full connection
    if (!connection.sourceHandle || !connection.targetHandle) return

    // Operate via the diagram!
    const diagram = get().toDiagram()

    // Add the link to the diagram
    diagram.connect({
      id: createDataStoryId(),
      sourcePortId: connection.sourceHandle,
      targetPortId: connection.targetHandle,
    })

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

    const node: Node = NodeFactory.fromNodeDescription(
      nodeDescription,
      diagram
    )

    const link = new LinkGuesser(diagram).guess(node)
    diagram.add(node)
    if (link) diagram.connect(link)

    get().updateDiagram(diagram)

    get().selectNode(node.id)

    setTimeout(() => {
      get().rfInstance?.fitView();
    }, 1);
  },
  selectNode(nodeId: string) {
    set({
      nodes: get().nodes.map(node => {
        node.selected = node.id === nodeId
        return node
      })
    })
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

  onInit: (options: StoreInitOptions) => {
    set({
      serverConfig: options.server || {
        type: 'SOCKET',
        url: 'ws://localhost:3100'
      }
    })

    set({ rfInstance: options.rfInstance })
    get().initServer(get().serverConfig)

    if (options.initDiagram) get().updateDiagram(options.initDiagram)

    if (options.callback) {
      const run = () => {
        get().server?.run(
          get().toDiagram(),
          // TODO this does not work?!
          createObservers(get().observerMap)
        )
      }

      options.callback({ run })
    }
  },
  updateDiagram: (diagram: Diagram) => {
    const reactFlowObject = ReactFlowFactory.fromDiagram(diagram)

    // Node<any, string|undefined>[]
    get().setNodes(reactFlowObject.nodes as ReactFlowNode[]);
    get().setEdges(reactFlowObject.edges);
    set({
      params: diagram.params
    });
  },
  onRun: () => {
    const observers = createObservers(get().observerMap);

    get().server!.run(
      get().toDiagram(),
      observers,
    )
  },
  initServer: (serverConfig: ServerConfig) => {
    if (serverConfig.type === 'JS') {
      const server = new JsClient({
        setAvailableNodes: get().setAvailableNodes,
        updateEdgeCounts: get().updateEdgeCounts,
        app: serverConfig.app,
      })

      set({ server })
      server.init()
    }

    if (serverConfig.type === 'SOCKET') {
      const server = new SocketClient({
        setAvailableNodes: get().setAvailableNodes,
        updateEdgeCounts: get().updateEdgeCounts,
        serverConfig: serverConfig as WebSocketServerConfig,
      })

      set({ server })
      server.init()
    }
  },
  setAvailableNodes: (availableNodes: NodeDescription[]) => {
    set({ availableNodes })
  },
  setParams: (params: Param[]) => {
    set({ params })
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

  setObservers(observerId: string, observers?: DataStoryObservers) {
    get().observerMap.set(observerId, (observers || {
      inputObservers: [], onDataChange: () => {}
    }) as DataStoryObservers);
  },

}));

export const DataStoryContext = React.createContext<ReturnType<typeof createStore>>({} as ReturnType<typeof createStore>);

// @ts-ignore: UseBoundStore is an overloaded function, so the type of params here cannot be accurately inferred.
export const useStore: UseBoundStore<StoreApi<StoreSchema>> = (...params) => {
  const store = React.useContext(DataStoryContext);
  if (!store) throw new Error('useStore must be used within a DataStoryCanvasProvider');
  // @ts-ignore
  return store(...params);
};

export const DataStoryCanvasProvider = ({ children }: {children: React.ReactNode}) => {
  const [useLocalStore] = useState(() => createStore());

  return <DataStoryContext.Provider value={useLocalStore}>
    {children}
  </DataStoryContext.Provider>;
};
