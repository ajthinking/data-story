import { DataStoryControls } from './dataStoryControls';
import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  EdgeChange,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  useStoreApi
} from '@xyflow/react';
import NodeComponent from '../Node/NodeComponent';
import { useGetStore, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import CommentNodeComponent from '../Node/CommentNodeComponent';
import InputNodeComponent from '../Node/InputNodeComponent';
import TableNodeComponent from '../Node/TableNodeComponent';
import { DataStoryCanvasProps, StoreInitOptions, StoreSchema } from './types';
import OutputNodeComponent from '../Node/OutputNodeComponent';
import ConsoleNodeComponent from '../Node/ConsoleNodeComponent';
import { onDropDefault } from './onDropDefault';
import type { NodeTypes } from '@xyflow/react/dist/esm/types';
import { HotkeyManager, useHotkeys } from './useHotkeys';
import { useEscapeKey } from './hooks/useEscapeKey';
import { keyManager } from './keyManager';
import { getNodesWithNewSelection } from './getNodesWithNewSelection';
import { createDataStoryId, NodeStatus, RequestObserverType } from '@data-story/core';

const nodeTypes = {
  commentNodeComponent: CommentNodeComponent,
  nodeComponent: NodeComponent,
  inputNodeComponent: InputNodeComponent,
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
  hideControls,
  slotComponents,
  onInitialize,
  setSidebarKey,
  onSave,
  onDrop,
  client,
  onChange,
  onNodeDoubleClick
}: DataStoryCanvasProps) => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    connect: state.connect,
    onInit: state.onInit,
    onRun: state.onRun,
    addNodeFromDescription: state.addNodeFromDescription,
    toDiagram: state.toDiagram,
    updateEdgeCounts: state.updateEdgeCounts,
    updateEdgeStatus: state.updateEdgeStatus
  });

  const {
    connect,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onInit,
    onRun,
    addNodeFromDescription,
    toDiagram,
    updateEdgeCounts,
    updateEdgeStatus
  } = useStore(selector, shallow);

  const id = useId()
  const [isExecutePostRenderEffect, setIsExecutePostRenderEffect] = useState(false);
  const reactFlowStore = useStoreApi();
  const { addSelectedNodes, setNodes } = reactFlowStore.getState();

  useEffect(() => {
    if (onInitialize && onRun && isExecutePostRenderEffect) {
      onInitialize({ run: onRun });
      setIsExecutePostRenderEffect(false);
    }
  }, [isExecutePostRenderEffect, onRun, onInitialize]);

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
    const observerId = createDataStoryId();
    const allLinkIds = edges.map(edge => edge.id);
    client?.observeLinkCounts?.({
      observerId,
      linkIds: allLinkIds,
      type: RequestObserverType.observelinkCounts,
      onReceive: ({ links }) => {
        if (!links || links.length === 0) return;

        const edgeCounts = links.reduce((acc, link) => {
          acc[link.linkId] = link.count;
          return acc;
        }, {});

        updateEdgeCounts(edgeCounts)
      }
    })
    return () => {
      client?.cancelObservation?.({ observerId, type: RequestObserverType.cancelObservation });
    }
    // listen to edges.length because changes in the count on edges trigger this useEffect, leading to frequent subscriptions and unsubscriptions, which can impact performance.
  }, [client, edges.length, updateEdgeCounts]);

  useEffect(() => {
    if (!client) return;
    const observerId = createDataStoryId();
    const allNodeIds = nodes.map(node => node.id);
    client?.observeNodeStatus?.({
      observerId,
      nodeIds: allNodeIds,
      type: RequestObserverType.observeNodeStatus,
      onReceive: ({ nodes }) => {
        updateEdgeStatus(nodes as {nodeId: string, status: NodeStatus}[]);
      }
    });
    return () => {
      client?.cancelObservation?.({ observerId, type: RequestObserverType.cancelObservation });
    }
  }, [client, nodes.length, updateEdgeStatus]);

  const hotkeyManager = useMemo(() => new HotkeyManager(flowRef), []);
  const setShowRun = useCallback((show: boolean) => setSidebarKey!(show ? 'run' : ''), [setSidebarKey]);
  const setShowAddNode = useCallback((show: boolean) => setSidebarKey!(show ? 'addNode' : ''), [setSidebarKey]);

  const traverseNodes = useCallback((direction) => {
    const selectedNode = getNodesWithNewSelection(direction, nodes);
    if (selectedNode) addSelectedNodes([selectedNode.id]);
  }, [nodes]);

  useHotkeys({
    nodes,
    setShowRun,
    setSelectedNode: onNodeDoubleClick,
    traverseNodes,
    setShowAddNode,
    hotkeyManager,
    onSave,
    toDiagram,
  });

  useEscapeKey(() => setSidebarKey!(''), flowRef);

  return (
    <>
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: -10;
            }
          }
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
          onNodeDoubleClick?.(node);
        }}
        onEdgesChange={(changes: EdgeChange[]) => {
          onEdgesChange(changes);
          if (onChange) onChange(toDiagram())
        }}
        onNodesDelete={() => {
          // focus on the diagram after node deletion to enhance hotkey usage
          focusOnFlow();
        }}
        onConnect={connect}
        onInit={(rfInstance: StoreInitOptions['rfInstance']) => {
          onInit({
            rfInstance,
            initDiagram,
            callback: onInitialize,
            focusOnFlow,
            client
          });
          setIsExecutePostRenderEffect(true);
        }}
        minZoom={0.25}
        maxZoom={8}
        fitView={true}
        fitViewOptions={{
          padding: 0.25,
        }}
        onDragOver={useCallback((event) => {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        }, [])}
        onDrop={
          useCallback((event) => {
            const handler = onDrop || onDropDefault;
            handler(event, addNodeFromDescription)
          }, [addNodeFromDescription]
          )}
      >
        <DataStoryControls
          onSave={onSave}
          slotComponents={slotComponents}
          hideControls={hideControls}
          setShowRun={setShowRun}
          setShowAddNode={setShowAddNode}
        />
        <Background color='#E7E7E7' variant={BackgroundVariant.Lines}/>
      </ReactFlow>
    </>
  )
}
