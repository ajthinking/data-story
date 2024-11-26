import { StoreApi, UseBoundStore } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';
import { applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, NodeChange } from '@xyflow/react';
import {
  createDataStoryId,
  Diagram,
  ExecutionObserver,
  LinkGuesser,
  Node,
  NodeDescription,
  Param, RequestObserverType
} from '@data-story/core';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import React, { Ref, useImperativeHandle, useState } from 'react';
import { ReactFlowFactory } from '../../../factories/ReactFlowFactory';
import { DiagramFactory } from '../../../factories/DiagramFactory';
import { NodeFactory } from '../../../factories/NodeFactory';
import { ClientRunParams, StoreInitOptions, StoreSchema } from '../types';
import { shallow } from 'zustand/shallow';

export const createStore = () => createWithEqualityFn<StoreSchema>((set, get) => ({
  rfInstance: undefined,
  nodes: [],
  edges: [],
  params: [],
  openNodeSidebarId: null,
  observerMap: new Map(),
  focusOnFlow: () => void 0,
  clientRun: (params: ClientRunParams) => {
  },

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
    diagram.add(node);
    if (link) diagram.connect(link)

    get().updateDiagram(diagram)
    get().selectNode(node.id)

    setTimeout(() => {
      get().rfInstance?.fitView({
        maxZoom: 3,
      });
      get().focusOnFlow();
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
    set({ rfInstance: options.rfInstance })
    set({ clientRun: options.clientRun })
    set({ focusOnFlow: options.focusOnFlow })
    set({ client: options.client })

    if (options.initDiagram) get().updateDiagram(options.initDiagram)

    if (options.callback) {
      options.callback({ run: get().onRun })
    }
    if (options.client?.linksCountObserver) {
      get().linkCountsObserver();
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
    // 将 ObserverMap 转换为 ExecutionObserver[]
    const ObserverArray = Array.from(get().observerMap.values());
    get()?.clientRun?.({
      diagram: get().toDiagram(),
      updateEdgeCounts: get().updateEdgeCounts,
      observers: ObserverArray
    })
  },

  setParams: (params: Param[]) => {
    set({ params })
  },
  // todo-stone: 使用 linkCountsObserver 来更新边的数量
  linkCountsObserver: () => {
    const allLinkIds = get().edges.map(edge => edge.id);
    get().client?.linksCountObserver?.({
      linkIds: allLinkIds,
      type: RequestObserverType.linkCountsObserver,
      onReceive: ({ links }) => {
        console.log('linkCountsObserver', links);
        if (!links || links.length === 0) return;
        get().updateEdgeCounts({
          edgeCounts: { [links[0].linkId]: links[0].count },
          state: links[0].state || 'running',
        })
      }
    })
  },
  updateEdgeCounts: ({ edgeCounts, state }) => {
    let updatedEdges: Edge[] = [];
    if (state === 'complete') {
      updatedEdges = get().edges.map(edge => ({
        ...edge,
        ...(edgeCounts[edge.id] !== undefined && {
          label: edgeCounts[edge.id],
          labelBgStyle: { opacity: 0.6 },
          style: {}
        }),
      }));
    } else {
      updatedEdges = get().edges.map(edge => ({
        ...edge,
        ...(edgeCounts[edge.id] !== undefined && {
          label: edgeCounts[edge.id],
          labelBgStyle: { opacity: 0.6 },
          style: { strokeDasharray: '5,5', animation: 'dash 1s linear infinite' }
        }),
      }));
    }

    get().setEdges(updatedEdges);
  },
  setOpenNodeSidebarId: (id: string | null) => {
    set({ openNodeSidebarId: id })
  },
  setObservers(observerId: string, executionObserver?: ExecutionObserver) {
    if (!executionObserver) {
      return;
    }
    get().observerMap.set(observerId, executionObserver);
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

// https://react.dev/reference/react/useImperativeHandle
export const useGetStore = (ref: Ref<unknown>) => {
  const selector = (state: StoreSchema) => ({
    addNodeFromDescription: state.addNodeFromDescription,
    toDiagram: state.toDiagram,
    onRun: state.onRun,
  });
  const { addNodeFromDescription, toDiagram, onRun } = useStore(selector, shallow);

  useImperativeHandle(ref, () => {
    return ({
      addNodeFromDescription,
      toDiagram,
      onRun,
    });
  }, [addNodeFromDescription, toDiagram, onRun]);
}

export const DataStoryCanvasProvider = ({ children }: {children: React.ReactNode}) => {
  const [useLocalStore] = useState(() => createStore());

  return <DataStoryContext.Provider value={useLocalStore}>
    {children}
  </DataStoryContext.Provider>;
};
