import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { DataStoryProps } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import { useEffect, useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { DataStoryCanvasProvider } from './store/store';
import { DataStoryCanvas } from './DataStoryCanvas';

export const DataStory = (
  props: Omit<DataStoryProps, 'setShowAddNodeModal' | 'setShowRunModal'>
) => {
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(true);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [activeKey, setActiveKey] = useState('activity');
  const [showRunModal, setShowRunModal] = useState(false);
  const [showAddNodeModal, setShowAddNodeModal] = useState(false);

  useEffect(() => {
    if (activeKey !== 'node') {
      setSelectedNode(undefined);
    }
  }, [activeKey]);

  useEffect(() => {
    if (showRunModal || showAddNodeModal) {
      setActiveKey('');
      setIsSidebarClose(false);
    }
  }, [showRunModal, showAddNodeModal]);

  useEffect(() => {
    if (!!activeKey) {
      setShowRunModal(false);
      setShowAddNodeModal(false);
    }
  }, [activeKey]);
  console.log('DataStory is sidebar close', isSidebarClose);

  return (
    <DataStoryCanvasProvider>
      <Allotment className='h-full border-0.5'>
      <Allotment.Pane minSize={44} maxSize={44}>
          <ActivityBar selectedNode={selectedNode} onActivityChange={setActiveKey} onClose={setIsSidebarClose}/>
        </Allotment.Pane>
        <Allotment.Pane visible={!isSidebarClose} snap maxSize={500}>
          <Sidebar
            showAddNodeModal={showAddNodeModal}
            showRunModal={showRunModal}
            setShowAddNodeModal={setShowAddNodeModal}
            setShowRunModal={setShowRunModal}
            activeBar={activeKey} node={selectedNode}
            onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <DataStoryCanvas {...props}
            setShowRunModal={setShowRunModal}
            setShowAddNodeModal={setShowAddNodeModal}
            selectedNode={selectedNode}
            selectedNodeData={updateSelectedNodeData}
            onNodeSelected={setSelectedNode}/>
        </Allotment.Pane>
      </Allotment>
    </DataStoryCanvasProvider>
  )
}
