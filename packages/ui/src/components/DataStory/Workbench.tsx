import 'reactflow/dist/style.css';
import { DataStoryControls } from './dataStoryControls';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, ReactFlowInstance, ReactFlowProvider } from 'reactflow';
import DataStoryNodeComponent from '../Node/DataStoryNodeComponent';
import { RunModal } from './modals/runModal';
import { ConfigModal } from './modals/configModal';
import { AddNodeModal } from './modals/addNodeModal';
import { StoreSchema, useStore } from './store/store';
import { shallow } from 'zustand/shallow';
import { NodeSettingsModal } from './modals/nodeSettingsModal/nodeSettingsModal';
import DataStoryCommentNodeComponent from '../Node/DataStoryCommentNodeComponent';
import DataStoryInputNodeComponent from '../Node/DataStoryInputNodeComponent';
import { ServerConfig } from './clients/ServerConfig';
import { Diagram } from '@data-story/core';
import { useHotkeys } from './useHotkeys';

const nodeTypes = {
  dataStoryNodeComponent: DataStoryNodeComponent,
  dataStoryCommentNodeComponent: DataStoryCommentNodeComponent,
  dataStoryInputNodeComponent: DataStoryInputNodeComponent,
  // dataStoryOutputNodeComponent: DataStoryNodeComponent,
};

let ReactFlowId = 1;
const getReactFlowId = () => {
  return 'data_story_id_' + (ReactFlowId++);
};

export const Workbench = ({ 
  server,
  diagram,
  callback,
  hideToolbar = false,
}: {
  server?: ServerConfig
  diagram?: Diagram
  callback?: (options: any) => void
  hideToolbar?: boolean
}) => {
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

  const [ id ] = useState(getReactFlowId);
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
              diagram,
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
          {!hideToolbar && <DataStoryControls
            setShowRunModal={setShowRunModal}
            setShowAddNodeModal={setShowAddNodeModal}
            setShowConfigModal={setShowConfigModal}
          />}
          <Background color='#E7E7E7' variant={BackgroundVariant.Lines} />
        </ReactFlow>
      </ReactFlowProvider>

      {/* Modals */}
      {showConfigModal && <ConfigModal setShowModal={setShowConfigModal}/>}
      {showRunModal && <RunModal setShowModal={setShowRunModal}/>}
      {showAddNodeModal && <AddNodeModal setShowModal={setShowAddNodeModal}/>}
      {openNodeModalId && <NodeSettingsModal/>}
    </>
  );
};
