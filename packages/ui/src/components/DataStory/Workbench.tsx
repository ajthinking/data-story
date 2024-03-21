import { DataStoryControls } from './dataStoryControls';
import { useId, useState } from 'react';
import ReactFlow, {
  Background,
  BackgroundVariant,
  ReactFlowInstance,
  ReactFlowProvider,
} from 'reactflow';
import DataStoryNodeComponent from '../Node/DataStoryNodeComponent';
import { RunModal } from './modals/runModal';
import { AddNodeModal } from './modals/addNodeModal';
import { StoreSchema, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import { NodeSettingsModal } from './modals/nodeSettingsModal/nodeSettingsModal';
import DataStoryCommentNodeComponent from '../Node/DataStoryCommentNodeComponent';
import DataStoryInputNodeComponent from '../Node/DataStoryInputNodeComponent';
import { useHotkeys } from './useHotkeys';
import DataStoryPeekNodeComponent from '../Node/DataStoryPeekNodeComponent';
import { WorkbenchProps } from './types';
import DataStoryOutputNodeComponent from '../Node/DataStoryOutputNodeComponent';

const nodeTypes = {
  dataStoryNodeComponent: DataStoryNodeComponent,
  dataStoryCommentNodeComponent: DataStoryCommentNodeComponent,
  dataStoryInputNodeComponent: DataStoryInputNodeComponent,
  dataStoryPeekNodeComponent: DataStoryPeekNodeComponent,
  dataStoryOutputNodeComponent: DataStoryOutputNodeComponent,
};

export const Workbench = ({
  server,
  initDiagram,
  callback,
  hideToolbar = false,
  slotComponent,
}: WorkbenchProps) => {
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
            // minZoom: 0.3,
            // maxZoom: 2,
            // duration: 5,
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
