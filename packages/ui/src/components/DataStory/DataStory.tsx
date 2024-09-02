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
import { Diagram, Tree } from '@data-story/core';
import { ActivityGroups, findFirstFileNode, path } from './common/method';
import { NodeApi } from 'react-arborist';

function handleRequestError(requestError?: Error): void {
  if (requestError) console.error(`Error fetching : ${requestError?.message}`);
}

export const DataStoryComponent = (
  props: DataStoryProps
) => {
  const { client, initSidebarKey, onSave } = props
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(!!props.hideSidebar);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [sidebarKey, setSidebarKey] = useState(initSidebarKey ?? '');
  const partialStoreRef = useRef<Partial<StoreSchema>>(null);
  const [diagram, setDiagram] = useState<Diagram|null>(null);
  const diagramMapRef = useRef<Map<string, Diagram|null>>(new Map())
  const [diagramKey, setDiagramKey] = useState<string>();
  const [activityGroups, setActivityGroups] = useState<Activity[]>([]);

  const { data: tree, loading: treeLoading, error: getTreeError } = useRequest(async() => {
    return client
      ? await client.getTree({ path })
      : Promise.resolve([]);
  }, {
    refreshDeps: [client],
    manual: !client,
  }, []);
  handleRequestError(getTreeError);

  const {
    data: nodeDescriptions,
    loading: nodeDescriptionsLoading,
    error: getNodeDescriptionsError
  } = useRequest(async() => {
    return client
      ? await client.getNodeDescriptions({ path })
      : undefined;
  }, {
    refreshDeps: [client], // Will re-fetch if client changes
    manual: !client, // If client is not available initially, do not run automatically
  });
  handleRequestError(getNodeDescriptionsError);

  const saveTree = useCallback(async() => {
    console.log('coming saveTree')
    if (diagramKey) {
      diagramMapRef.current.set(diagramKey, partialStoreRef?.current?.toDiagram?.() ?? null)
    }
    const newTree = structuredClone(tree) ?? [];
    const updateTree = (tree: Tree[]) => {
      for(const node of tree) {
        if (node.type === 'file' && diagramMapRef.current.has(node.id)) {
          node.content = diagramMapRef.current.get(node.id) as Diagram;
        }
        ;

        if (node.type === 'folder' && node.children) {
          updateTree(node.children);
        }
      }
    }
    updateTree(newTree);

    console.log('save workspace', newTree);
    client?.updateTree({ path, tree: newTree });
  }, [diagramKey, tree]);

  const handleSaveWorkspace = useCallback(() => {
    saveTree();
    onSave?.();
  }, [saveTree, onSave]);

  const handleClickExplorerNode = useCallback((node: NodeApi<Tree>) => {
    // store the diagram in the Ref before changing the diagramKey
    if (diagramKey) {
      diagramMapRef.current.set(diagramKey, partialStoreRef?.current?.toDiagram?.() ?? null)
    }

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
    if (!tree?.length) {
      setActivityGroups([]);
    } else if (Array.isArray(props.hideActivityBar) && props.hideActivityBar.length) {
      setActivityGroups(ActivityGroups.filter((activity) => !(props.hideActivityBar as AcitvityBarType[])?.includes(activity.id)));
    } else {
      setActivityGroups(ActivityGroups);
    }
  }, [tree]);

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
        {
          (treeLoading && !tree)
            ? <LoadingMask/>
            : <Allotment className='h-full border-0.5 relative'>
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
                  tree={tree}
                  handleClickExplorerNode={handleClickExplorerNode}
                  diagramKey={diagramKey}
                  nodeDescriptions={nodeDescriptions} nodeDescriptionsLoading={nodeDescriptionsLoading}
                  partialStoreRef={partialStoreRef}
                  sidebarKey={sidebarKey}
                  setSidebarKey={setSidebarKey} node={selectedNode}
                  onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
              </Allotment.Pane>
              <Allotment.Pane minSize={300}>
                <DataStoryCanvas
                  {...props}
                  onSave={handleSaveWorkspace}
                  key={diagramKey}
                  initDiagram={diagram}
                  ref={partialStoreRef}
                  setSidebarKey={setSidebarKey}
                  sidebarKey={sidebarKey}
                  selectedNode={selectedNode}
                  selectedNodeData={updateSelectedNodeData}
                  onNodeSelected={setSelectedNode}
                />
              </Allotment.Pane>
            </Allotment>
        }
      </div>
    </DataStoryCanvasProvider>
  )
}

export const DataStory = React.memo(DataStoryComponent);
