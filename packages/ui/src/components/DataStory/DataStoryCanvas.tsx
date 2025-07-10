import { DataStoryControls } from './controls/DataStoryControls';
import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  EdgeChange,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  useStoreApi,
  useUpdateNodeInternals,
} from '@xyflow/react';
import NodeComponent from '../Node/NodeComponent';
import { useGetStore, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import CommentNodeComponent from '../Node/CommentNodeComponent';
import InputNodeComponent from '../Node/InputNodeComponent';
import TableNodeComponent from '../Node/table/TableNodeComponent';
import { DataStoryCanvasProps, StoreInitOptions, StoreSchema } from './types';
import OutputNodeComponent from '../Node/OutputNodeComponent';
import ConsoleNodeComponent from '../Node/ConsoleNodeComponent';
import { onDropDefault } from './onDropDefault';
import type { NodeTypes } from '@xyflow/react';
import { HotkeyManager, useHotkeys } from './useHotkeys';
import { useEscapeKey } from './hooks/useEscapeKey';
import { keyManager } from './keyManager';
import { Direction, getNodesWithNewSelection } from './getNodesWithNewSelection';
import { createDataStoryId, LinkCount, LinkId, NodeStatus, RequestObserverType } from '@data-story/core';
import { useDragNode } from './useDragNode';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { useCopyPaste } from './useCopyPaste';
import '../../styles/dataStoryCanvasStyle.css';
import LoopBackComponent from '../Node/LoopBackComponent';
import LoopStartComponent from '../Node/LoopStartComponent';

const nodeTypes = {
  commentNodeComponent: CommentNodeComponent,
  nodeComponent: NodeComponent,
  inputNodeComponent: InputNodeComponent,
  loopBackComponent: LoopBackComponent,
  loopStartComponent: LoopStartComponent,
  outputNodeComponent: OutputNodeComponent,
  tableNodeComponent: TableNodeComponent,
  consoleNodeComponent: ConsoleNodeComponent,
};

const DataStoryCanvasComponent = forwardRef((props: DataStoryCanvasProps, ref) => {
  useGetStore(ref);

  return (
    <>
      <ReactFlowProvider>
        <Flow {...props}/>
      </ReactFlowProvider>
    </>
  );
});

export const DataStoryCanvas = React.memo(DataStoryCanvasComponent);

const Flow = ({
  initDiagram,
  controls = [],
  onInitialize,
  setSidebarKey,
  onSave,
  onDrop,
  client,
  onChange,
  onNodeDoubleClick,
  onEdgeDoubleClick,
  nodeDescriptions,
}: DataStoryCanvasProps) => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    connect: state.connect,
    disconnect: state.disconnect,
    onInit: state.onInit,
    addNodeFromDescription: state.addNodeFromDescription,
    toDiagram: state.toDiagram,
    updateEdgeCounts: state.updateEdgeCounts,
    updateEdgeStatus: state.updateEdgeStatus,
    updateDiagram: state.updateDiagram,
    updateNodeInternalsCallback: state.updateNodeInternalsCallback,
    setUpdateNodeInternalsCallback: state.setUpdateNodeInternalsCallback,
  });

  const {
    connect,
    disconnect,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onInit,
    addNodeFromDescription,
    toDiagram,
    updateEdgeCounts,
    updateEdgeStatus,
    updateDiagram,
    setUpdateNodeInternalsCallback,
  } = useStore(selector, shallow);

  const id = useId()
  const reactFlowStore = useStoreApi();
  const { addSelectedNodes, setNodes } = reactFlowStore.getState();

  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    setUpdateNodeInternalsCallback((nodeId: string) => {
      updateNodeInternals(nodeId);
    });
  }, [updateNodeInternals, setUpdateNodeInternalsCallback]);

  const flowRef = useRef<HTMLDivElement>(null);

  const focusOnFlow = useCallback(() => {
    if (flowRef.current) {
      flowRef.current.focus();
    }
  }, [flowRef]);

  useEffect(() => {
    focusOnFlow();
  }, [focusOnFlow]);

  useEffect(() => {
    keyManager.initEventListeners();
    return () => {
      keyManager.removeEventListeners();
    }
  }, []);

  // when edges change, re-subscribe to observelinkCounts
  useEffect(() => {
    const allLinkIds = edges.map(edge => edge.id);
    if (allLinkIds.length === 0 || !client?.observeLinkCounts) return;

    const observerId = createDataStoryId();
    const subscription = client?.observeLinkCounts?.({
      observerId,
      linkIds: allLinkIds,
      type: RequestObserverType.observeLinkCounts,
      onReceive: ({ links }) => {
        if (!links || links.length === 0) return;

        const edgeCounts: Record<LinkId, LinkCount> = links.reduce((acc, link) => {
          acc[link.linkId] = link.count;
          return acc;
        }, {} as Record<LinkId, LinkCount>);

        updateEdgeCounts(edgeCounts)
      },
    })
    return () => {
      subscription?.unsubscribe();
    }
    // listen to edges.length because changes in the count on edges trigger this useEffect, leading to frequent subscriptions and unsubscriptions, which can impact performance.
  }, [client, edges.length, updateEdgeCounts]);

  useEffect(() => {
    const allNodeIds = nodes.map(node => node.id);
    if (allNodeIds.length === 0 || !client?.observeNodeStatus) return;

    const observerId = createDataStoryId();
    const subscription = client?.observeNodeStatus?.({
      observerId,
      nodeIds: allNodeIds,
      type: RequestObserverType.observeNodeStatus,
      onReceive: ({ nodes }) => {
        updateEdgeStatus(nodes as { nodeId: string, status: NodeStatus }[]);
      },
    });
    return () => {
      subscription?.unsubscribe();
    }
  }, [client, nodes.length, updateEdgeStatus]);

  const hotkeyManager = useMemo(() => new HotkeyManager(flowRef), []);
  const setShowRun = useCallback((show: boolean) => setSidebarKey!(show ? 'run' : ''), [setSidebarKey]);
  const setShowAddNode = useCallback((show: boolean) => setSidebarKey!(show ? 'addNode' : ''), [setSidebarKey]);

  const traverseNodes = useCallback((direction: Direction) => {
    const selectedNode = getNodesWithNewSelection(direction, nodes);
    if (selectedNode) addSelectedNodes([selectedNode.id]);
  }, [nodes, addSelectedNodes]);

  useHotkeys({
    nodes,
    setShowRun,
    setSelectedNode: onNodeDoubleClick,
    traverseNodes,
    setShowAddNode,
    hotkeyManager,
    onSave,
    toDiagram,
    nodeDescriptions,
    addNodeFromDescription,
  });

  useEscapeKey(() => setSidebarKey!(''), flowRef);
  const { draggedNode, onNodeDragStop, onNodeDrag } = useDragNode({
    connect,
    disconnect,
    edges,
  });

  const getOnNodesDelete = useCallback((nodesToDelete: ReactFlowNode[]) => {
    nodesToDelete.forEach(node => {
      const store = reactFlowStore.getState();
      const { edges } = store;

      // Find all incoming and outgoing edges for this node
      const incomingEdges = edges.filter(e => e.target === node.id);
      const outgoingEdges = edges.filter(e => e.source === node.id);

      // For each incoming edge, connect it to all outgoing edges
      incomingEdges.forEach(inEdge => {
        outgoingEdges.forEach(outEdge => {
          // Ensure the source and target are not targeted for deletion
          if (nodesToDelete.some(n => n.id === inEdge.source) || nodesToDelete.some(n => n.id === outEdge.target)) return;

          // Create a connection that will be handled by the store's connect method
          connect({
            source: inEdge.source,
            sourceHandle: inEdge.sourceHandle ?? null,
            target: outEdge.target,
            targetHandle: outEdge.targetHandle ?? null,
          });
        });
      });
    });

    // focus on the diagram after node deletion to enhance hotkey usage
    focusOnFlow();
  }, [connect, focusOnFlow, reactFlowStore]);

  useCopyPaste();

  return (
    <>
      <style>
        {`
          ${draggedNode ? `
          .react-flow__edge {
            opacity: 0.5;
          }
          .react-flow__edge[data-testid="rf__edge-${draggedNode.droppedOnEdge?.id}"] {
            opacity: 1;
            filter: drop-shadow(0 0 5px #4f46e5);
          }
          .react-flow__edge[data-testid="rf__edge-${draggedNode.droppedOnEdge?.id}"] path {
            stroke: #4f46e5;
            stroke-width: 3;
          }
          ` : ''}
        `}
      </style>
      <ReactFlow
        tabIndex={0}
        ref={flowRef}
        id={id}
        className='bg-gray-50'
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes as NodeTypes}
        onNodesChange={(changes: NodeChange[]) => {
          onNodesChange(changes);
          if (onChange) onChange(toDiagram())
        }}
        onNodeDoubleClick={(_, node) => {
          onNodeDoubleClick?.(node as ReactFlowNode);
        }}
        onEdgeDoubleClick={(_, edge) => {
          onEdgeDoubleClick?.(edge.id);
        }}
        onEdgesChange={(changes: EdgeChange[]) => {
          onEdgesChange(changes);
          if (onChange) onChange(toDiagram())
        }}
        onNodesDelete={getOnNodesDelete}
        onConnect={connect}
        onInit={(rfInstance: StoreInitOptions['rfInstance']) => {
          onInit({
            rfInstance,
            initDiagram,
            callback: onInitialize,
            focusOnFlow,
            client,
          });
        }}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        minZoom={0.25}
        maxZoom={8}
        fitView={true}
        fitViewOptions={{
          padding: 0.25,
        }}
        onDragOver={useCallback((event: React.DragEvent) => {
          event.preventDefault();
          // Allow dropping on edges
          const target = event.target as HTMLElement;
          const isEdge = target.closest('.react-flow__edge');
          const hasNodeType = event.dataTransfer.types.includes('application/reactflow');

          if (isEdge && hasNodeType) {
            event.dataTransfer.dropEffect = 'copy';
          } else {
            event.dataTransfer.dropEffect = 'move';
          }
        }, [])}
        onDrop={
          useCallback((event: React.DragEvent) => {
            const handler = onDrop || onDropDefault;
            handler(event, addNodeFromDescription)
          }, [addNodeFromDescription, onDrop],
          )}
      >
        <DataStoryControls
          onSave={onSave}
          controls={controls}
          setShowAddNode={setShowAddNode}
        />
        <Background color='#E7E7E7' variant={BackgroundVariant.Lines}/>
      </ReactFlow>
    </>
  )
}
