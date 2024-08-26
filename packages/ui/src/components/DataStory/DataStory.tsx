import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { AcitvityBarType, Activity, DataStoryProps, StoreSchema } from './types';
import 'allotment/dist/style.css';
import { ActivityBar } from './sidebar/activityBar';
import { Sidebar } from './sidebar/sidebar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { DataStoryCanvasProvider } from './store/store';
import { DataStoryCanvas } from './DataStoryCanvas';
import { useRequest } from 'ahooks';
import { LoadingMask } from './common/loadingMask';
import { Diagram } from '@data-story/core';
import { ActivityGroups, areEqual, findFirstFileNode, path } from './common/method';
import { NodeApi } from 'react-arborist';
import { Tree } from './clients/Tree';

function handleRequestError(requestError?: Error): void {
  if (requestError) console.error(`Error fetching : ${requestError?.message}` );
}

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
  const diagramMapRef = useRef<Map<string, Diagram | null>>(new Map())
  const [diagramKey, setDiagramKey] = useState<string>();
  const [activityGroups, setActivityGroups] = useState<Activity[]>([]);

  const { data: tree, loading: treeLoading, error: getTreeError } = useRequest(async() => {
    return client
      ? await client.workspacesApi.getTree({ path })
      : Promise.resolve(undefined);
  }, {
    refreshDeps: [client],
    manual: !client,
  }, []);
  handleRequestError(getTreeError);

  const handleClickExplorerNode = useCallback((node:  NodeApi<Tree>) => {
    // store the diagram in the Ref before changing the diagramKey
    if (diagramKey) {
      diagramMapRef.current.set(diagramKey, partialStoreRef?.current?.toDiagram?.() ?? null)
    };

    if (node.isLeaf) {
      setDiagramKey(node.id);
      const newDiagram = diagramMapRef.current.get(node.id) ?? node?.data.content ?? null;
      setDiagram(newDiagram);
    }
  }, [diagramKey]);

  useEffect(() => {
    if (tree) {
      const firstFileNode = findFirstFileNode(tree);
      setDiagram(firstFileNode?.content ?? null);
      setDiagramKey(firstFileNode?.id);
    }
  }, [tree]);

  useEffect(() => {
    if(!tree?.length) {
      setActivityGroups([]);
    } else if (Array.isArray(props.hideActivityBar) && props.hideActivityBar.length) {
      setActivityGroups(ActivityGroups.filter((activity) => !(props.hideActivityBar as AcitvityBarType[])?.includes(activity.id)));
    } else {
      setActivityGroups(ActivityGroups);
    }
  }, [tree]);

  const { data: nodeDescriptions, loading: nodeDescriptionsLoading, error: getNodeDescriptionsError } = useRequest(async() => {
    return client
      ? await client.workspacesApi.getNodeDescriptions({ path })
      : undefined;
  }, {
    refreshDeps: [client], // Will re-fetch if client changes
    manual: !client, // If client is not available initially, do not run automatically
  });
  handleRequestError(getNodeDescriptionsError);

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
          <Allotment.Pane visible={!(props.hideActivityBar === true)} minSize={44} maxSize={44}>
            <ActivityBar
              activityGroups={activityGroups}
              selectedNode={selectedNode}
              setActiveKey={setSidebarKey}
              activeKey={sidebarKey}
              onClose={setIsSidebarClose}/>
          </Allotment.Pane>
          <Allotment.Pane visible={!isSidebarClose} snap maxSize={500}>
            <Sidebar
              tree={tree} setDiagram={setDiagram}
              handleClickExplorerNode={handleClickExplorerNode}
              diagramKey={diagramKey} setDiagramKey={setDiagramKey}
              nodeDescriptions={nodeDescriptions} nodeDescriptionsLoading={nodeDescriptionsLoading}
              partialStoreRef={partialStoreRef}
              sidebarKey={sidebarKey}
              setSidebarKey={setSidebarKey} node={selectedNode}
              onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
          </Allotment.Pane>
          <Allotment.Pane minSize={300}>
            {
              !treeLoading &&
              <DataStoryCanvas {...props}
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

export const DataStory = React.memo(DataStoryComponent);
