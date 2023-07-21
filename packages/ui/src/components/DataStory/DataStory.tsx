import 'reactflow/dist/style.css';
import { DataStoryControls } from './dataStoryControls';
import { useEffect, useState } from 'react';
import ReactFlow, { Background, BackgroundVariant, ReactFlowInstance } from 'reactflow';
import DataStoryNodeComponent from '../Node/DataStoryNodeComponent';
import { RunModal } from './modals/runModal';
import { ConfigModal } from './modals/configModal';
import { AddNodeModal } from './modals/addNodeModal';
import { StoreSchema, useStore } from './store';
import { shallow } from 'zustand/shallow'
import { NodeSettingsModal } from './modals/nodeSettingsModal/nodeSettingsModal';
import DataStoryCommentNodeComponent from '../Node/DataStoryCommentNodeComponent';
import DataStoryInputNodeComponent from '../Node/DataStoryInputNodeComponent';
import { ServerConfig } from './clients/ServerConfig';
import { SerializedReactFlow } from '@data-story/core';

const nodeTypes = {
  dataStoryNodeComponent: DataStoryNodeComponent,
  dataStoryCommentNodeComponent: DataStoryCommentNodeComponent,
  dataStoryInputNodeComponent: DataStoryInputNodeComponent,
  // dataStoryOutputNodeComponent: DataStoryNodeComponent,
};

export const DataStory = ({
  server,
  diagram
}: {
  server?: ServerConfig
  diagram?: SerializedReactFlow
}) => {
  const selector = (state: StoreSchema) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    onInit: state.onInit,
    openNodeModalId: state.openNodeModalId,
    setOpenNodeModalId: state.setOpenNodeModalId,
    traverseNodes: state.traverseNodes,
  });

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onInit, openNodeModalId, setOpenNodeModalId, traverseNodes } = useStore(selector, shallow);  

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showRunModal, setShowRunModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);
  
  // MOVE OUT
  useEffect(() => {
    // restore enterkey event listener
    // (it is disabled when the addNodeModal is open)
    if(!showAddNodeModal) {
      window.addEventListener("keydown", handleEnterPress);
    }

    function handleKeyPress(event: KeyboardEvent) {
      // Swedish Mac keyboard 🤷‍♂️
      const shiftR = event.shiftKey && event.code === "KeyR";
      const shiftPlus = event.shiftKey && event.code === "Minus"
  
      const arrowUp = event.code === "ArrowUp";
      const arrowDown = event.code === "ArrowDown";
      const arrowLeft = event.code === "ArrowLeft";
      const arrowRight = event.code === "ArrowRight";
  
      const enter = event.code === "Enter";
      
      // Ensure no modal is already open
      if ([
        openNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
      ].find(Boolean)) return;
  
      // Open modal!
      if (shiftR) setShowRunModal(true);
      if (shiftPlus) {
        // When opening the add node modal, we want to disable the enter key      
        window.removeEventListener("keydown", handleEnterPress);
        setShowAddNodeModal(true);
      }
  
      // Open node settings modal
      const openable = (() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const one = selectedNodes.length === 1;
        if(!one) return null;
  
        return selectedNodes.at(0);
      })()
  
      // Select nodes
      if (arrowUp) traverseNodes("up");
      if (arrowDown) traverseNodes("down");
      if (arrowLeft) traverseNodes("left");
      if (arrowRight) traverseNodes("right");
    }
  
    function handleEnterPress(event: KeyboardEvent) {
      // Swedish Mac keyboard 🤷‍♂️
  
      const enter = event.code === "Enter";
      
      // Ensure no modal is already open
      if ([
        openNodeModalId,
        showConfigModal,
        showRunModal,
        showAddNodeModal,
      ].find(Boolean)) return;
  
      // Open node settings modal
      const openable = (() => {
        const selectedNodes = nodes.filter((node) => node.selected);
        const one = selectedNodes.length === 1;
        if(!one) return null;
  
        return selectedNodes.at(0);
      })()
      
      if (enter && openable && !showAddNodeModal) setOpenNodeModalId(openable.id);
    }

    // Add the event listener when the component mounts
    window.addEventListener("keyup", handleKeyPress);
    window.addEventListener("keydown", handleEnterPress);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
      window.removeEventListener("keydown", handleEnterPress);
    };
  }, [
    nodes,
    openNodeModalId,
    setOpenNodeModalId,
    showConfigModal,
    showRunModal,
    showAddNodeModal,
    traverseNodes,
  ]);
  
  return (
    <>
      <ReactFlow
        className="bg-gray-50"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(rfInstance: ReactFlowInstance<any, any>) => {
          onInit({
            rfInstance,
            server,
            diagram,
          })
        }}
        minZoom={0.25}
        maxZoom={8}
      >     
        <DataStoryControls
          setShowRunModal={setShowRunModal}
          setShowAddNodeModal={setShowAddNodeModal}
          setShowConfigModal={setShowConfigModal}
        />
        <Background color="#E7E7E7" variant={BackgroundVariant.Lines} />
      </ReactFlow>

      {/* Modals */}
      {showConfigModal && <ConfigModal setShowModal={setShowConfigModal}/>}
      {showRunModal && <RunModal setShowModal={setShowRunModal}/>}
      {showAddNodeModal && <AddNodeModal setShowModal={setShowAddNodeModal}/>}    
      {openNodeModalId && <NodeSettingsModal/>}
    </>
  );
}