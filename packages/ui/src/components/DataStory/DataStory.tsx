import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { DataStoryProps, StoreSchema } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import { useEffect, useRef, useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { DataStoryCanvasProvider } from './store/store';
import { DataStoryCanvas } from './DataStoryCanvas';

export const DataStory = (
  props: Omit<DataStoryProps,'setSidebarKey'>
) => {
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(true);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [sidebarKey, setSidebarKey] = useState('');
  const partialStoreRef = useRef<Partial<StoreSchema>>(null);

  useEffect(() => {
    const { clientv2 } = props
    if(!clientv2) return;

    console.log('DataStory component was initialized with a clientv2')
    // TODO: Request tree at '/' from the server
  })

  useEffect(() => {
    if (sidebarKey !== 'node') {
      setSelectedNode(undefined);
    }
  }, [sidebarKey]);

  useEffect(() => {
    if (!sidebarKey) {
      setIsSidebarClose(true);
    } else {
      setIsSidebarClose(false);
    }
  }, [sidebarKey]);

  return (
    <DataStoryCanvasProvider>
      <Allotment className='h-full border-0.5'>
        <Allotment.Pane minSize={44} maxSize={44}>
          <ActivityBar
            selectedNode={selectedNode}
            setActiveKey={setSidebarKey}
            activeKey={sidebarKey}
            onClose={setIsSidebarClose}/>
        </Allotment.Pane>
        <Allotment.Pane visible={!isSidebarClose} snap maxSize={500}>
          <Sidebar
            partialStoreRef={partialStoreRef}
            sidebarKey={sidebarKey}
            setSidebarKey={setSidebarKey} node={selectedNode}
            onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
        </Allotment.Pane>
        <Allotment.Pane minSize={300}>
          <DataStoryCanvas {...props}
            ref={partialStoreRef}
            setSidebarKey={setSidebarKey}
            sidebarKey={sidebarKey}
            selectedNode={selectedNode}
            selectedNodeData={updateSelectedNodeData}
            onNodeSelected={setSelectedNode}/>
        </Allotment.Pane>
      </Allotment>
    </DataStoryCanvasProvider>
  )
}
