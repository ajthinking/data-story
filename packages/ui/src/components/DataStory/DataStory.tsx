import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { Activity, DataStoryProps, StoreSchema } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import React, { useEffect, useRef, useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { DataStoryCanvasProvider } from './store/store';
import { DataStoryCanvas } from './DataStoryCanvas';
import { useRequest } from 'ahooks';
import { LoadingMask } from './common/loadingMask';
import { Diagram } from '@data-story/core';
import { ActivityGroups, areEqual, findFirstFileNode, findNodeById, isSingleFile, path } from './common/method';

export const DataStoryComponent = (
  props: DataStoryProps
) => {
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(!!props.hideSidebar);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [sidebarKey, setSidebarKey] = useState('');
  const partialStoreRef = useRef<Partial<StoreSchema>>(null);
  const { client } = props
  const [diagram, setDiagram] = useState<Diagram | null>(null);
  const [diagramKey, setDiagramKey] = useState<string>();
  const [activityGroups, setActivityGroups] = useState<Activity[]>([]);

  const { data: tree, loading: treeLoading } = useRequest(async() => {
    return client
      ? await client.workspacesApi.getTree({ path })
      : Promise.resolve(undefined);
  }, {
    refreshDeps: [client],
    manual: !client,
  }, []);

  useEffect(() => {
    if (tree) {
      const firstFileNode = findFirstFileNode(tree);
      setDiagram(firstFileNode?.content ?? null);
      setDiagramKey(firstFileNode?.id);
    }
  }, [tree]);

  useEffect(() => {
    if (!tree?.length || isSingleFile(tree)) {
      setActivityGroups(ActivityGroups.filter((activity) => activity.id !== 'explorer'));
    } else {
      setActivityGroups(ActivityGroups);
    }
  }, [tree]);

  const { data: nodeDescriptions, loading: nodeDescriptionsLoading } = useRequest(async() => {
    return client
      ? await client.workspacesApi.getNodeDescriptions({ path })
      : undefined;
  }, {
    refreshDeps: [client], // Will re-fetch if clientv2 changes
    manual: !client, // If clientv2 is not available initially, do not run automatically
  });

  console.log('nodeDescriptionCollection', nodeDescriptions)
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
      <div className="relative h-full w-full">
        {treeLoading && <LoadingMask/>}
        <Allotment className='h-full border-0.5 relative'>
          <Allotment.Pane visible={!props.hideActivityBar} minSize={44} maxSize={44}>
            <ActivityBar
              activityGroups={activityGroups}
              selectedNode={selectedNode}
              setActiveKey={setSidebarKey}
              activeKey={sidebarKey}
              onClose={setIsSidebarClose}/>
          </Allotment.Pane>
          <Allotment.Pane visible={!isSidebarClose} snap maxSize={500}>
            <Sidebar
              tree={tree} setDiagramKey={setDiagramKey}
              nodeDescriptions={nodeDescriptions}
              setDiagram={setDiagram}
              partialStoreRef={partialStoreRef}
              sidebarKey={sidebarKey}
              setSidebarKey={setSidebarKey} node={selectedNode}
              onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
          </Allotment.Pane>
          <Allotment.Pane minSize={300}>
            {
              !treeLoading &&
              <DataStoryCanvas {...props}
                nodeDescriptions={nodeDescriptions}
                key={diagramKey}
                initDiagram={diagram}
                ref={partialStoreRef}
                setSidebarKey={setSidebarKey}
                sidebarKey={sidebarKey}
                selectedNode={selectedNode}
                selectedNodeData={updateSelectedNodeData}
                onNodeSelected={setSelectedNode}/>
            }
          </Allotment.Pane>
        </Allotment>
      </div>
    </DataStoryCanvasProvider>
  )
}

export const DataStory = React.memo(DataStoryComponent, areEqual);
