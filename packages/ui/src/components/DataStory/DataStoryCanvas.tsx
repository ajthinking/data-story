import { DataStoryControls } from './dataStoryControls';
import React, { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Background, BackgroundVariant, EdgeChange, NodeChange, ReactFlow, ReactFlowProvider, } from '@xyflow/react';
import NodeComponent from '../Node/NodeComponent';
import { useGetStore, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import CommentNodeComponent from '../Node/CommentNodeComponent';
import InputNodeComponent from '../Node/InputNodeComponent';
import TableNodeComponent from '../Node/TableNodeComponent';
import { DataStoryCanvasProps, StoreInitOptions, StoreSchema } from './types';
import OutputNodeComponent from '../Node/OutputNodeComponent';
import { onDropDefault } from './onDropDefault';
import type { NodeTypes } from '@xyflow/react/dist/esm/types';
import { HotkeyManager, useHotkeys } from './useHotkeys';
import { useEscapeKey } from './hooks/useEscapeKey';
import { Placeholder } from './common/placeholder';

const nodeTypes = {
  commentNodeComponent: CommentNodeComponent,
  nodeComponent: NodeComponent,
  inputNodeComponent: InputNodeComponent,
  outputNodeComponent: OutputNodeComponent,
  tableNodeComponent: TableNodeComponent,
};

const DataStoryCanvasComponent = forwardRef((props: DataStoryCanvasProps, ref) => {
  useGetStore(ref);
  const showPlaceholder = !props.initDiagram;

  return (
    <>
      <ReactFlowProvider>
        {showPlaceholder ? <Placeholder content={'No diagram found'}/> : <Flow {...props}/>}
      </ReactFlowProvider>
    </>
  );
});

export const DataStoryCanvas = React.memo(DataStoryCanvasComponent);

const Flow = ({
  initDiagram,
  hideControls,
  slotComponents,
  observers,
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
    setObservers: state.setObservers,
    addNodeFromDescription: state.addNodeFromDescription,
    traverseNodes: state.traverseNodes,
    toDiagram: state.toDiagram,
  });

  const {
    connect,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onInit,
    onRun,
    setObservers,
    addNodeFromDescription,
    traverseNodes,
    toDiagram,
  } = useStore(selector, shallow);

  const id = useId()
  const [isExecutePostRenderEffect, setIsExecutePostRenderEffect] = useState(false);

  useEffect(() => {
    setObservers('workbench', observers);
  }, [observers, setObservers]);

  useEffect(() => {
    if (onInitialize && onRun && isExecutePostRenderEffect) {
      onInitialize({ run: onRun });
      setIsExecutePostRenderEffect(false);
    }
  }, [isExecutePostRenderEffect, onRun, onInitialize]);

  const flowRef = useRef<HTMLDivElement>(null);

  const hotkeyManager = useMemo(() => new HotkeyManager(flowRef), []);
  const setShowRun = useCallback((show: boolean) => setSidebarKey!(show ? 'run' : ''), [setSidebarKey]);
  const setShowAddNode = useCallback((show: boolean) => setSidebarKey!(show ? 'addNode' : ''), [setSidebarKey]);

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
          if(onChange) onChange(toDiagram())
        }}
        onNodeDoubleClick={(_, node) => {
          onNodeDoubleClick?.(node);
        }}
        onEdgesChange={(changes: EdgeChange[]) => {
          onEdgesChange(changes);
          if(onChange) onChange(toDiagram())
        }}
        onConnect={connect}
        onInit={(rfInstance: StoreInitOptions['rfInstance']) => {
          onInit({
            rfInstance,
            initDiagram,
            callback: onInitialize,
            clientRun: client?.run,
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
