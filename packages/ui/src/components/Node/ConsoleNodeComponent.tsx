import React, { memo, useEffect } from 'react';
import { DataStoryNodeData } from './ReactFlowNode';
import NodeComponent from './NodeComponent';
import { useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { createDataStoryId, ObserveLinkItems, RequestObserverType } from '@data-story/core';
import { StoreSchema } from '../DataStory/types';
import { useHandleConnections } from '@xyflow/react';

const ConsoleNodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData
  selected: boolean
}) => {
  useObserverConsole({ id });
  return <NodeComponent id={id} data={data} selected={selected}/>
}

const useObserverConsole = ({ id }: { id: string }) => {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });
  const { toDiagram, client } = useStore(selector, shallow);

  const connections = useHandleConnections({ type: 'target', id: `${id}.input` });

  // Add the node to the inputObservers when the node is mounted
  useEffect(() => {
    const linkIds = toDiagram()?.getInputLinkIdsFromNodeIdAndPortName?.(id, 'input');
    if (!client?.observeLinkItems || !linkIds) return;

    const consoleObserver: ObserveLinkItems = {
      linkIds: linkIds,
      type: RequestObserverType.observeLinkItems,
      observerId: createDataStoryId(),
      onReceive: (batchedItems) => {
        console.log(...(batchedItems ?? []));
      },
    }

    const observeLinkItemsSubscription = client?.observeLinkItems?.(consoleObserver);
    return () => {
      observeLinkItemsSubscription.unsubscribe();
    }
    // connections.length is 0 means the node is not connected
  }, [client, connections.length, id, toDiagram]);
}
export default memo(ConsoleNodeComponent);