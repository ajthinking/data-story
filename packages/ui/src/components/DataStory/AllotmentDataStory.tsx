import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { DataStoryProps } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import { DataStory } from './DataStory';
import { useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';

export const AllotmentDataStory = (
  props: DataStoryProps
) => {
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(false);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [activeKey, setActiveKey] = useState('activity');

  return (
    <Allotment>
      <Allotment.Pane minSize={80} maxSize={80}>
        <ActivityBar selectedNode={selectedNode} onActivityChange={setActiveKey} onClose={setIsSidebarClose}/>
      </Allotment.Pane>
      {
        !isSidebarClose && <Allotment.Pane minSize={300} maxSize={600}>
          <Sidebar activeBar={activeKey} node={selectedNode}
            onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
        </Allotment.Pane>
      }
      <Allotment.Pane snap minSize={200}>
        <DataStory {...props} selectedNodeData={updateSelectedNodeData} onNodeSelected={setSelectedNode}
          isSidebarClose={isSidebarClose}/>
      </Allotment.Pane>
    </Allotment>
  )
}
