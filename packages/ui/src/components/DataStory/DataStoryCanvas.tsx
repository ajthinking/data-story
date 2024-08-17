import { DataStoryControls } from './dataStoryControls';
import { forwardRef, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Background, BackgroundVariant, ReactFlow, ReactFlowProvider, } from '@xyflow/react';
import NodeComponent from '../Node/NodeComponent';
import { useGetStore, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import CommentNodeComponent from '../Node/CommentNodeComponent';
import InputNodeComponent from '../Node/InputNodeComponent';
import TableNodeComponent from '../Node/TableNodeComponent';
import { DataStoryCanvasProps, StoreInitOptions, StoreSchema } from './types';
import OutputNodeComponent from '../Node/OutputNodeComponent';
import { onDragOver, onDrop } from './onDrop';
import type { NodeTypes } from '@xyflow/react/dist/esm/types';
import { useSelectedNodeSettings } from './Form/useSelectedNodeSettings';
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

export const DataStoryCanvas = forwardRef((props: DataStoryCanvasProps, ref) => {
  useGetStore(ref);
  const showPlaceholder = !props.initDiagram && !props.treeLoading && props.mode === 'Workspace';

  return (
    <>
      <ReactFlowProvider>
        { showPlaceholder && <Placeholder content={'No diagram found'}/> }
        <Flow {...props}/>
      </ReactFlowProvider>
    </>
  );
});

const Flow = ({
  server,
  initDiagram,
  hideControls = false,
  slotComponents,
  observers,
  onInitialize,
  setSidebarKey,
  onNodeSelected,
  selectedNodeData,
  selectedNode,
  onSave
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
    setOpenNodeSidebarId: state.setOpenNodeSidebarId,
    traverseNodes: state.traverseNodes,
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
    setOpenNodeSidebarId,
    traverseNodes
  } = useStore(selector, shallow);

  useSelectedNodeSettings({
    onSelectedNode: onNodeSelected,
    selectedNodeData: selectedNodeData,
    selectedNode: selectedNode,
  });

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

  const hotkeyManager =  useMemo(() => new HotkeyManager(flowRef), []);
  const setShowRun = useCallback((show: boolean) => setSidebarKey!(show ? 'run' : ''), [setSidebarKey]);
  const setShowAddNode = useCallback((show: boolean) => setSidebarKey!(show ? 'addNode' : ''), [setSidebarKey]);

  useHotkeys({
    nodes,
    setShowRun,
    setOpenNodeSidebarId,
    traverseNodes,
    setShowAddNode,
    hotkeyManager,
    onSave,
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={connect}
        onInit={(rfInstance: StoreInitOptions['rfInstance']) => {
          onInit({
            rfInstance,
            server,
            initDiagram,
            callback: onInitialize,
          });
          setIsExecutePostRenderEffect(true);
        }}
        minZoom={0.25}
        maxZoom={8}
        fitView={true}
        fitViewOptions={{
          padding: 0.25,
        }}
        onDragOver={useCallback(onDragOver, [])}
        onDrop={useCallback(
          (e) => onDrop(e, addNodeFromDescription),
          [addNodeFromDescription]
        )}
      >
        <DataStoryControls
          slotComponents={slotComponents}
          hideControls={hideControls}
          setShowRun={setShowRun}
          setShowAddNode={setShowAddNode}
        />
        <Background color='#E7E7E7' variant={BackgroundVariant.Lines}/>
      </ReactFlow>
      {/*<NodeSettingsModal showModal={Boolean(openNodeSidebarId)} onClose={close} node={node!} />*/}
    </>
  )
}
