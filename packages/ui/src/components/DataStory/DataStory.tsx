import './../../styles/globals.css';
import { Allotment } from 'allotment';
import { DataStoryProps, StoreSchema } from './types';
import 'allotment/dist/style.css';
import { Sidebar } from './sidebar/sidebar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReactFlowNode } from '../Node/ReactFlowNode';
import { DataStoryCanvasProvider } from './store/store';
import { DataStoryCanvas } from './DataStoryCanvas';
import { useRequest } from 'ahooks';
import { LoadingMask } from './common/loadingMask';
import { Diagram } from '@data-story/core';

function handleRequestError(requestError?: Error): void {
  if (requestError) console.error(`Error fetching : ${requestError?.message}`);
}

export const DataStoryComponent = (
  props: DataStoryProps,
) => {
  const { client, initSidebarKey, children, onChange, diagramId } = props;
  const [selectedNode, setSelectedNode] = useState<ReactFlowNode>();
  const [isSidebarClose, setIsSidebarClose] = useState(!!props.hideSidebar);
  const partialStoreRef = useRef<Partial<StoreSchema>>(null);
  const [sidebarKey, setSidebarKey] = useState(() => {
    return initSidebarKey ?? '';
  });

  const {
    data: nodeDescriptions,
    loading: nodeDescriptionsLoading,
    error: getNodeDescriptionsError,
  } = useRequest(async() => {
    return client.getNodeDescriptions({})
  }, {
    refreshDeps: [client], // Will re-fetch if client changes
  });
  handleRequestError(getNodeDescriptionsError);

  const {
    data: diagramData,
    loading: diagramDataLoading,
    error: diagramDataError,
  } = useRequest(async() => {
    return client.getDiagram?.({ diagramId });
  }, {
    refreshDeps: [client, diagramId], // Will re-fetch if client changes
  });
  handleRequestError(diagramDataError);

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

  const handleNodeClick = useCallback((node: ReactFlowNode) => {
    setSidebarKey('node');
    setSelectedNode(node);
    setIsSidebarClose(false);
  }, [setSidebarKey, setSelectedNode, setIsSidebarClose]);

  const handleSave = useCallback(async(diagram: Diagram) => {
    client?.updateDiagram?.(diagram, diagramId);
  }, [client, diagramId]);

  return (
    <DataStoryCanvasProvider>
      <div className="relative h-full w-full" data-cy="data-story">
        {children}
        {
          (diagramDataLoading || nodeDescriptionsLoading) // TODO isLoading?
            ? <LoadingMask/>
            : <Allotment className='h-full border-0.5 relative'>
              {/*The Allotment.Pane will recalculate the width and height of the child components.*/}
              {/*The className is used to address the ReactFlow warning.*/}
              <Allotment.Pane minSize={30} className="h-full w-96">
                <DataStoryCanvas
                  {...props}
                  onSave={handleSave}
                  key={'data-story-canvas'}
                  initDiagram={diagramData}
                  ref={partialStoreRef}
                  setSidebarKey={setSidebarKey}
                  sidebarKey={sidebarKey}
                  onChange={onChange}
                  onNodeDoubleClick={handleNodeClick}
                  nodeDescriptions={nodeDescriptions}
                />
              </Allotment.Pane>
              <Allotment.Pane visible={!isSidebarClose} snap maxSize={800} minSize={300} preferredSize={400}>
                <Sidebar
                  nodeDescriptions={nodeDescriptions}
                  nodeDescriptionsLoading={nodeDescriptionsLoading}
                  sidebarKey={sidebarKey}
                  setSidebarKey={setSidebarKey}
                  node={selectedNode}
                  onSave={handleSave}
                  onClose={setIsSidebarClose}/>
              </Allotment.Pane>
            </Allotment>
        }
      </div>
    </DataStoryCanvasProvider>
  )
}

export const DataStory = React.memo(DataStoryComponent);
