import { StoreApi, UseBoundStore } from 'zustand';
import { createWithEqualityFn } from 'zustand/traditional';
import { applyEdgeChanges, applyNodeChanges, Connection, Edge, EdgeChange, NodeChange } from '@xyflow/react';
import {
  createDataStoryId,
  Diagram,
  LinkGuesser,
  Node,
  NodeDescription, NodeStatus,
  Param,
} from '@data-story/core';
import { ReactFlowNode } from '../../Node/ReactFlowNode';
import React, { Ref, useImperativeHandle, useState } from 'react';
import { ReactFlowFactory } from '../../../factories/ReactFlowFactory';
import { DiagramFactory } from '../../../factories/DiagramFactory';
import { NodeFactory } from '../../../factories/NodeFactory';
import { StoreInitOptions, StoreSchema } from '../types';
import { shallow } from 'zustand/shallow';

export const createStore = () => createWithEqualityFn<StoreSchema>((set, get) => ({
  rfInstance: undefined,
  nodes: [],
  edges: [],
  params: [],
  openNodeSidebarId: null,
  focusOnFlow: () => void 0,

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
    const { source, target, targetHandle, sourceHandle } = connection;
    if (!sourceHandle || !targetHandle || target === source) return

    // Operate via the diagram!
    const diagram = get().toDiagram()

    // Add the link to the diagram
    diagram.connect({
      id: createDataStoryId(),
      sourcePortId: sourceHandle,
      targetPortId: targetHandle,
    })

    // Update the diagram
    get().updateDiagram(diagram)
  },
  disconnect: (linkId: string) => {
    const diagram = get().toDiagram()

    diagram.disconnect(linkId)

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
        node,
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
      diagram,
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
      }),
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
    set({ focusOnFlow: options.focusOnFlow })
    set({ client: options.client })

    if (options.initDiagram) get().updateDiagram(options.initDiagram)

    if (options.callback) {
      options.callback({ run: get().onRun })
    }
  },
  updateDiagram: (diagram: Diagram) => {
    const reactFlowObject = ReactFlowFactory.fromDiagram(diagram)
    // Node<any, string|undefined>[]
    get().setNodes(reactFlowObject.nodes as ReactFlowNode[]);
    get().setEdges(reactFlowObject.edges);
    set({
      params: diagram.params,
    });
  },
  onRun: () => {
    get()?.client?.run({
      diagram: get().toDiagram(),
    });
  },

  setParams: (params: Param[]) => {
    set({ params })
  },

  updateEdgeCounts: (edgeCounts) => {
    let updatedEdges: Edge[] = [];
    updatedEdges = get().edges.map(edge => ({
      ...edge,
      ...(edgeCounts[edge.id] !== undefined && {
        label: edgeCounts[edge.id],
      }),
    }));

    get().setEdges(updatedEdges);
  },

  updateEdgeStatus: (edgeStatus = []) => {
    const edgesObject = edgeStatus.reduce((acc, { nodeId, status }) => {
      get().toDiagram().getOutputLinkIdsFromNodeId(nodeId).forEach(linkId => {
        acc[linkId] = status;
      });
      return acc;
    }, {} as Record<string, NodeStatus>);

    const updatedEdges: Edge[] = get().edges.map(edge => {
      const currentEdgeStatus = edgesObject[edge.id];
      const isBusy = currentEdgeStatus === 'BUSY';
      return {
        ...edge,
        ...(currentEdgeStatus !== undefined && {
          labelBgStyle: { opacity: 0.6 },
          style: isBusy ? { strokeDasharray: '5,5', animation: 'dash 1s linear infinite' } : {},
        }),
      };
    });

    get().setEdges(updatedEdges);
  },

  setOpenNodeSidebarId: (id: string | null) => {
    set({ openNodeSidebarId: id })
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

export const DataStoryCanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [useLocalStore] = useState(() => createStore());

  return <DataStoryContext.Provider value={useLocalStore}>
    {children}
  </DataStoryContext.Provider>;
};
