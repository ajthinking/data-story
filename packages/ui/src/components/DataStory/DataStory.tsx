import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { DataStoryProps, StoreSchema } from './types';
import 'allotment/dist/style.css';
import { Sidebar } from './sidebar/sidebar';
import React, { useEffect, useRef, useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { DataStoryCanvasProvider } from './store/store';
import { DataStoryCanvas } from './DataStoryCanvas';
import { useRequest } from 'ahooks';
import { LoadingMask } from './common/loadingMask';
import { Diagram, } from '@data-story/core';
import { LocalStorageKey } from './common/method';

function handleRequestError(requestError?: Error): void {
  if (requestError) console.error(`Error fetching : ${requestError?.message}`);
}

export const DataStoryComponent = (
  props: DataStoryProps
) => {
  const { client, initSidebarKey, children, initDiagram, onChange } = props;
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(!!props.hideSidebar);
  const [updateSelectedNodeData, setUpdateSelectedNodeData] = useState<ReactFlowNode['data']>();
  const [sidebarKey, setSidebarKey] = useState(initSidebarKey ?? '');
  const partialStoreRef = useRef<Partial<StoreSchema>>(null);
  const [diagram, setDiagram] = useState<Diagram | null>(initDiagram || new Diagram());
  const [diagramKey, setDiagramKey] = useState<string>();

  const {
    data: nodeDescriptions,
    loading: nodeDescriptionsLoading,
    error: getNodeDescriptionsError
  } = useRequest(async() => {
    return client.getNodeDescriptions({ path: LocalStorageKey })
  }, {
    refreshDeps: [client], // Will re-fetch if client changes
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

  useEffect(() => {
    if (selectedNode) {
      setSidebarKey('node');
      setIsSidebarClose(false);
    }
  }, [selectedNode]);

  return (
    <DataStoryCanvasProvider>
      <div className="relative h-full w-full">
        {children}
        {
          (false) // TODO isLoading?
            ? <LoadingMask/>
            : <Allotment className='h-full border-0.5 relative'>
              {/*The Allotment.Pane will recalculate the width and height of the child components.*/}
              {/*The className is used to address the ReactFlow warning.*/}
              <Allotment.Pane minSize={300} className="h-full w-96">
                <DataStoryCanvas
                  {...props}
                  onSave={() => new Promise(r => r)}
                  key={diagramKey}
                  initDiagram={diagram}
                  ref={partialStoreRef}
                  setSidebarKey={setSidebarKey}
                  sidebarKey={sidebarKey}
                  selectedNode={selectedNode}
                  selectedNodeData={updateSelectedNodeData}
                  onNodeSelected={setSelectedNode}
                  onChange={onChange}
                />
              </Allotment.Pane>
              <Allotment.Pane visible={!isSidebarClose} snap maxSize={500} preferredSize={300}>
                <Sidebar
                  nodeDescriptions={nodeDescriptions}
                  nodeDescriptionsLoading={nodeDescriptionsLoading}
                  partialStoreRef={partialStoreRef}
                  sidebarKey={sidebarKey}
                  setSidebarKey={setSidebarKey}
                  node={selectedNode}
                  onUpdateNodeData={setUpdateSelectedNodeData} onClose={setIsSidebarClose}/>
              </Allotment.Pane>
            </Allotment>
        }
      </div>
    </DataStoryCanvasProvider>
  )
}

export const DataStory = React.memo(DataStoryComponent);
