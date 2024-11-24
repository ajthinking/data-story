import { useStore } from '../DataStory/store/store';
import { DataStoryObservers, ExecutionObserver, ItemsObserver, StoreSchema } from '../DataStory/types';
import { createDataStoryId, RequestObserverType } from '@data-story/core';
import { useMount, useUnmount } from 'ahooks';
import { useRef } from 'react';
import { shallow } from 'zustand/shallow';

export function useObserverTable({ id, isDataFetched, setIsDataFetched, setItems }: {
  id: string,
  isDataFetched: boolean,
  setIsDataFetched: (value: boolean) => void,
  setItems: (value: any) => void
}): void {
  const selector = (state: StoreSchema) => ({
    observerMap: state.observerMap,
    setObservers: state.setObservers,
    toDiagram: state.toDiagram,
    client: state.client,
  });

  const { observerMap, setObservers, toDiagram, client } = useStore(selector, shallow);

  const observerId = useRef(createDataStoryId());
  // Add the node to the inputObservers when the node is mounted
  useMount(() => {
    if (observerMap?.get(observerId.current)) {
      console.error('observers already exist');
      return;
    }

    const linkId = toDiagram()?.getLinkIdFromNodeId(id, 'input');

    const tableObserver: ItemsObserver = {
      linkIds: [linkId],
      type: RequestObserverType.ItemsObserver,
      onReceive: (batchedItems) => {
        if (!observerMap?.get(observerId.current)) {
          console.error('observer unmounted');
          return;
        }
        if (!isDataFetched) {
          setIsDataFetched(true);
        }

        setItems(prevItems => [...prevItems, ...batchedItems.flat()]);
      }
    }
    client?.itemsObserver?.(tableObserver);
    // todo: observer Items request : client.
    // 重新设计 observerMap 的数据结构， 需要包含 ItemObserver, LinkObserver, NodeObserver
    setObservers(observerId.current, tableObserver);
  });

  useUnmount(() => {
    if (observerMap && !observerMap?.get(observerId.current)) {
      observerMap.delete(observerId.current);
    }
  });
}
