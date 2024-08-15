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
import { Tree } from './clients/Tree';
import { sleep } from '@data-story/core';
import { useRequest } from 'ahooks';

export const DataStory = (
  props: Omit<DataStoryProps,'setSidebarKey'>
) => {
  const path = '/';
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(true);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [sidebarKey, setSidebarKey] = useState('');
  const partialStoreRef = useRef<Partial<StoreSchema>>(null);
  const { clientv2 } = props

  const { data: tree, loading: treeLoading } = useRequest(async () => {
    return clientv2
      ? await clientv2.workspacesApi.getTree({ path })
      : undefined;
  }, {
    refreshDeps: [clientv2],
    manual: !clientv2,
  });

  const { data: nodeDescriptions, loading: nodeDescriptionsLoading } = useRequest(async () => {
    return clientv2
      ? await clientv2.workspacesApi.getNodeDescriptions({ path })
      : undefined;
  }, {
    refreshDeps: [clientv2], // Will re-fetch if clientv2 changes
    manual: !clientv2, // If clientv2 is not available initially, do not run automatically
  });

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
            tree={tree} treeLoading={treeLoading}
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
