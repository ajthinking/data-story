import { DataStoryControls } from './dataStoryControls';
import { useCallback, useEffect, useId, useState } from 'react';
import { ReactFlow, Background, BackgroundVariant, ReactFlowInstance, ReactFlowProvider, } from '@xyflow/react';
import NodeComponent from '../Node/NodeComponent';
import { RunModal } from './modals/runModal/runModal';
import { AddNodeModal } from './modals/addNodeModal';
import { StoreSchema, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import { NodeSettingsModal } from './modals/nodeSettingsModal/nodeSettingsModal';
import CommentNodeComponent from '../Node/CommentNodeComponent';
import InputNodeComponent from '../Node/InputNodeComponent';
import { useHotkeys } from './useHotkeys';
import TableNodeComponent from '../Node/TableNodeComponent';
import { DataStoryProps, StoreInitOptions } from './types';
import OutputNodeComponent from '../Node/OutputNodeComponent';
import { onDragOver, onDrop } from './onDrop';
import type { NodeTypes } from '@xyflow/react/dist/esm/types';

const nodeTypes = {
  commentNodeComponent: CommentNodeComponent,
  nodeComponent: NodeComponent,
  inputNodeComponent: InputNodeComponent,
  outputNodeComponent: OutputNodeComponent,
  tableNodeComponent: TableNodeComponent,
};

export const Workbench = ({
  server,
  initDiagram,
  callback,
  hideToolbar = false,
  slotComponent,
  observers,
  onInitialize,
}: DataStoryProps) => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    connect: state.connect,
    onInit: state.onInit,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
    traverseNodes: state.traverseNodes,
    onRun: state.onRun,
    setObservers: state.setObservers,
    addNodeFromDescription: state.addNodeFromDescription,
  });

  const {
    connect,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onInit,
    openNodeModalId,
    setOpenNodeModalId,
    traverseNodes,
    onRun,
    setObservers,
    addNodeFromDescription,
  } = useStore(selector, shallow);

  const id = useId()
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
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

  useHotkeys({
    nodes,
    openNodeModalId,
    setShowRunModal,
    setOpenNodeModalId,
    showConfigModal,
    showRunModal,
    showAddNodeModal,
    traverseNodes,
    setShowAddNodeModal,
  });

  return (
    <>
      <ReactFlowProvider>
        <ReactFlow
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
              callback,
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
            slotComponent={slotComponent}
            hideToolbar={hideToolbar}
            setShowRunModal={setShowRunModal}
            setShowAddNodeModal={setShowAddNodeModal}
          />
          <Background color='#E7E7E7' variant={BackgroundVariant.Lines}/>
        </ReactFlow>
        <NodeSettingsModal showModal={Boolean(openNodeModalId)}/>
      </ReactFlowProvider>

      {/* Modals */}
      <RunModal showModal={showRunModal} setShowModal={setShowRunModal}/>
      <AddNodeModal showModal={showAddNodeModal} setShowModal={setShowAddNodeModal}/>
    </>
  );
};
