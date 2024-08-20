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
import { useLatest, useRequest } from 'ahooks';
import { LoadingMask } from './common/loadingMask';
import { Diagram } from '@data-story/core';
import { Tree } from './clients/Tree';

const path = '/';
const findFirstFileNode = (tree: Tree): Tree | null => {
  if (tree.type === 'file') return tree;
  if (!tree.children || tree?.children?.length === 0) return null;

  for (const child of tree.children) {
    if (child.type === 'file') return child;
    return findFirstFileNode(child);
  }
  return null;
}

export const DataStory = (
  props: DataStoryProps
) => {
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(!!props.hideSidebar);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [sidebarKey, setSidebarKey] = useState('');
  const partialStoreRef = useRef<Partial<StoreSchema>>(null);
  const { client } = props
  const initDiagramRef = useLatest(props.initDiagram);
  const [diagram, setDiagram] = useState<Diagram | undefined>(undefined);
  const [diagramKey, setDiagramKey] = useState<string>(path);

  const { data: tree, loading: treeLoading } = useRequest(async() => {
    return client
      ? await client.workspacesApi.getTree({ path })
      : Promise.resolve(undefined);
  }, {
    refreshDeps: [client],
    manual: !client,
  });

  useEffect(() => {
    if (tree) {
      const firstFileNode = findFirstFileNode(tree);
      setDiagram(firstFileNode?.content);
    }
  }, [tree]);

  // console.log('tree: ', tree, 'diagram: ', diagram);
  const { data: nodeDescriptions, loading: nodeDescriptionsLoading } = useRequest(async() => {
    return client
      ? await client.workspacesApi.getNodeDescriptions({ path })
      : undefined;
  }, {
    refreshDeps: [client], // Will re-fetch if clientv2 changes
    manual: !client, // If clientv2 is not available initially, do not run automatically
  });

  useEffect(() => {
    if (sidebarKey !== 'node') {
      setSelectedNode(undefined);
      // setDiagramKey('/node')
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
        { treeLoading && <LoadingMask/> }
        <Allotment className='h-full border-0.5 relative'>
          <Allotment.Pane visible={!props.hideActivityBar} minSize={44} maxSize={44}>
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
