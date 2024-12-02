import React, { memo } from 'react';
import { DataStoryNodeData } from './ReactFlowNode';
import NodeComponent from './NodeComponent';
import { useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { Subscription } from 'rxjs';
import { useMount, useUnmount } from 'ahooks';
import { createDataStoryId, ItemsObserver, RequestObserverType } from '@data-story/core';
import { StoreSchema } from '../DataStory/types';

const ConsoleNodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData
  selected: boolean
}) => {
  useObserverConsole({ id });
  return <NodeComponent id={id} data={data} selected={selected}/>
}

let consoleSubscription: Subscription;
const observerId = createDataStoryId();

const useObserverConsole = ({ id }: {id: string}) => {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });
  const { toDiagram, client } = useStore(selector, shallow);
  // Add the node to the inputObservers when the node is mounted
  useMount(() => {
    const linkId = toDiagram()?.getLinkIdFromNodeId?.(id, 'input');
    if (!client?.itemsObserver || !linkId) return;
    const consoleObserver: ItemsObserver = {
      linkIds: [linkId],
      type: RequestObserverType.itemsObserver,
      observerId,
      onReceive: (batchedItems) => {
        console.log(...batchedItems ?? []);
      }
    }

    consoleSubscription = client?.itemsObserver?.(consoleObserver);
  });

  useUnmount(() => {
    // todo: unsubscribe also moves to workspace
    consoleSubscription?.unsubscribe();
    client?.cancelObserver?.({ observerId, type: RequestObserverType.cancelObserver });
  });
}
export default memo(ConsoleNodeComponent);