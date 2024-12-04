import { useStore } from '../DataStory/store/store';
import { StoreSchema } from '../DataStory/types';
import { createDataStoryId, ItemsObserver, NotifyDataUpdate, RequestObserverType } from '@data-story/core';
import { useMount, useUnmount } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';

export function useObserverTable({ id, isDataFetched, setIsDataFetched, setItems }: {
  id: string,
  isDataFetched: boolean,
  setIsDataFetched: (value: boolean) => void,
  setItems: (value: any) => void
}): void {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });

  const { toDiagram, client } = useStore(selector, shallow);

  useEffect(() => {
    const linkId = toDiagram()?.getLinkIdFromNodeId?.(id, 'input');
    if (!client?.itemsObserver || !linkId) return;
    const observerId = createDataStoryId();
    const tableObserver: NotifyDataUpdate = {
      observerId,
      linkIds: [linkId],
      type: RequestObserverType.notifyDataUpdate,
      throttleMs: 300,
      onReceive: (batchedItems) => {
        console.log('batchedItems', batchedItems);
      }
    }
    client?.notifyDataUpdate?.(tableObserver);
    return () => {
      client?.cancelObserver?.({ observerId, type: RequestObserverType.cancelObserver });
    }
  }, [client, id, toDiagram]);
  // Add the node to the inputObservers when the node is mounted
  // useMount(() => {
  //   const linkId = toDiagram()?.getLinkIdFromNodeId?.(id, 'input');
  //   if (!client?.itemsObserver || !linkId) return;
  //   const tableObserver: ItemsObserver = {
  //     observerId,
  //     linkIds: [linkId],
  //     type: RequestObserverType.itemsObserver,
  //     throttleMs: 300,
  //     limit: 10,
  //     offset: 5,
  //     onReceive: (batchedItems) => {
  //       if (!isDataFetched) {
  //         setIsDataFetched(true);
  //       }
  //       console.log('batchedItems', batchedItems);
  //       setItems(prevItems => {
  //         return [...prevItems, ...batchedItems];
  //       });
  //     }
  //   }
  //
  //   client?.itemsObserver?.(tableObserver);
  // });
  //
  // useUnmount(() => {
  //   client?.cancelObserver?.({ observerId, type: RequestObserverType.cancelObserver });
  // });
}
