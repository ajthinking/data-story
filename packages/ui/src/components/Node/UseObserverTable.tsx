import { useStore } from '../DataStory/store/store';
import { StoreSchema } from '../DataStory/types';
import { createDataStoryId, ItemsObserver, NotifyDataUpdate, RequestObserverType } from '@data-story/core';
import { useMount, useUnmount } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { useEffect } from 'react';

export function useObserverTable({ id, setIsDataFetched, setItems }: {
  id: string,
  setIsDataFetched: (value: boolean) => void,
  setItems: (value: any) => void
}): void {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });

  const { toDiagram, client } = useStore(selector, shallow);
  const linkId = toDiagram()?.getLinkIdFromNodeId?.(id, 'input');

  useEffect(() => {
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
  }, [client, id, linkId]);

  console.log('?? useObserverTable', linkId, client?.itemsObserver);
  // 查看 props 是否有变化
  useEffect(() => {
    setTimeout(() => {
      if (!client?.itemsObserver || !linkId) return;

      console.log('setTimeout')
      client?.getDataFromStorage?.({
        type: 'getDataFromStorage',
        linkIds: [linkId],
        limit: 10,
        offset: 5
      }).then((items) => {
        setItems(preItems => [...preItems, items]);
        setIsDataFetched(true);
      })
    }, 1000);
  }, []);
}
