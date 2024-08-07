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
  props: DataStoryProps
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

  return (
    <Allotment className='h-full border-0.5'>
      <Allotment.Pane minSize={44} maxSize={44}>
        <ActivityBar selectedNode={selectedNode} onActivityChange={setActiveKey} onClose={setIsSidebarClose}/>
      </Allotment.Pane>
      <Allotment.Pane visible={!isSidebarClose} snap maxSize={500}>
        <Sidebar
          showAddNodeModal={showAddNodeModal}
          showRunModal={showRunModal}
          activeBar={activeKey} node={selectedNode}
          onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
      </Allotment.Pane>
      <Allotment.Pane minSize={300}>
        <DataStoryCanvasProvider>
          <DataStoryCanvas {...props}
            setShowRunModal={setShowRunModal}
            setShowAddNodeModal={setShowAddNodeModal}
            selectedNode={selectedNode}
            selectedNodeData={updateSelectedNodeData}
            onNodeSelected={setSelectedNode}/>
        </DataStoryCanvasProvider>
      </Allotment.Pane>
    </Allotment>
  )
}
