import React, { memo } from 'react';
import { DataStoryNodeData } from './ReactFlowNode';
import NodeComponent from './NodeComponent';
import { useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { Subscription } from 'rxjs';
import { useMount, useUnmount } from 'ahooks';
import { createDataStoryId, ObserveLinkItems, RequestObserverType } from '@data-story/core';
import { StoreSchema } from '../DataStory/types';

const ConsoleNodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData
  selected: boolean
}) => {
  useObserverConsole({ id });
  return <NodeComponent id={id} data={data} selected={selected}/>
}

const observerId = createDataStoryId();
let observeLinkItemsSubscription: Subscription;
const useObserverConsole = ({ id }: {id: string}) => {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });
  const { toDiagram, client } = useStore(selector, shallow);
  // Add the node to the inputObservers when the node is mounted
  useMount(() => {
    const linkIds = toDiagram()?.getInputLinkIdsFromNodeIdAndPortName?.(id, 'input');
    if (!client?.observeLinkItems || !linkIds) return;
    const consoleObserver: ObserveLinkItems = {
      linkIds: linkIds,
      type: RequestObserverType.observeLinkItems,
      observerId,
      onReceive: (batchedItems) => {
        console.log(...(batchedItems ?? []));
      }
    }

    observeLinkItemsSubscription = client?.observeLinkItems?.(consoleObserver);
  });

  useUnmount(() => {
    observeLinkItemsSubscription && observeLinkItemsSubscription.unsubscribe();
  });
}
export default memo(ConsoleNodeComponent);