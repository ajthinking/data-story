import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { DataStoryProps } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import { DataStory } from './DataStory';
import { Workbench } from './Workbench';
import { DataStoryProvider } from './store/store';
import { ReactFlowProvider } from '@xyflow/react';
import { useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';

export const AllotmentDataStory = (
  props: DataStoryProps
) => {
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isCloseSidebar, setIsCloseSidebar] = useState(false);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();

  return (
    <Allotment>
      <Allotment.Pane minSize={80} maxSize={80}>
        <ActivityBar/>
      </Allotment.Pane>
      <Allotment.Pane minSize={0} maxSize={400}>
        <Sidebar node={selectedNode} onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsCloseSidebar}/>
      </Allotment.Pane>
      <Allotment.Pane snap minSize={400}>
        <DataStory {...props} selectedNodeData={updateSelectedNodeData} onSelectedNode={setSelectedNode} closeNodeSetting={isCloseSidebar} />
      </Allotment.Pane>
    </Allotment>
  )
}
