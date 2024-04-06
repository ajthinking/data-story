import { DataStoryControls } from './dataStoryControls';
import { useId, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowInstance,
  ReactFlowProvider,
} from 'reactflow';
import NodeComponent from '../Node/NodeComponent';
import { RunModal } from './modals/runModal';
import { AddNodeModal } from './modals/addNodeModal';
import { StoreSchema, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import { NodeSettingsModal } from './modals/nodeSettingsModal/nodeSettingsModal';
import CommentNodeComponent from '../Node/CommentNodeComponent';
import InputNodeComponent from '../Node/InputNodeComponent';
import { useHotkeys } from './useHotkeys';
import TableNodeComponent from '../Node/TableNodeComponent';
import { DataStoryProps } from './types';
import OutputNodeComponent from '../Node/OutputNodeComponent';

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
  });

  const { connect, nodes, edges, onNodesChange, onEdgesChange, onInit, openNodeModalId, setOpenNodeModalId, traverseNodes } = useStore(selector, shallow);

  const id = useId()
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);

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
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={connect}
          onInit={(rfInstance: ReactFlowInstance<any, any>) => {
            onInit({
              rfInstance,
              server,
              initDiagram,
              callback
            });
          }}
          minZoom={0.25}
          maxZoom={8}
          fitView={true}
          fitViewOptions = {{
            padding: 0.25,
          }}
        >
          <DataStoryControls
            slotComponent={slotComponent}
            hideToolbar={hideToolbar}
            setShowRunModal={setShowRunModal}
            setShowAddNodeModal={setShowAddNodeModal}
          />
          <Background color='#E7E7E7' variant={BackgroundVariant.Lines} />
        </ReactFlow>
        <NodeSettingsModal showModal={Boolean(openNodeModalId)} />
      </ReactFlowProvider>

      {/* Modals */}
      <RunModal showModal={showRunModal} setShowModal={setShowRunModal}/>
      <AddNodeModal showModal={showAddNodeModal} setShowModal={setShowAddNodeModal}/>
    </>
  );
};
