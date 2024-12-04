import { useStore } from '../DataStory/store/store';
import { StoreSchema } from '../DataStory/types';
import { createDataStoryId, ItemsObserver, ItemValue, NotifyDataUpdate, RequestObserverType } from '@data-story/core';
import { useLatest, useMount, useUnmount } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { useCallback, useEffect, useRef } from 'react';

const initialScreenCount: number = 15;

export function useObserverTable({ id, setIsDataFetched, setItems, items }: {
  id: string,
  setIsDataFetched: (value: boolean) => void,
  setItems: (value: any) => void
  items: ItemValue[];
}): void {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });
  const { toDiagram, client } = useStore(selector, shallow);

  const linkId = toDiagram()?.getLinkIdFromNodeId?.(id, 'input');
  const pendingRequest = useRef(false);

  const loadMore = useLatest(() => {
    if (pendingRequest.current) return;
    if (!client?.itemsObserver || !linkId) return;

    pendingRequest.current = true;
    return client?.getDataFromStorage?.({
      type: 'getDataFromStorage',
      linkIds: [linkId],
      limit: 10,
      offset: items.length,
    }).then((currentItems) => {
      console.log('getDataFromStorage', currentItems);
      setItems(preItems => [...preItems, currentItems]);
    }).finally(() => {
      pendingRequest.current = false;
    });
  });

  useEffect(() => {
    if (!client?.itemsObserver || !linkId) return;
    const observerId = createDataStoryId();
    const tableObserver: NotifyDataUpdate = {
      observerId,
      linkIds: [linkId],
      type: RequestObserverType.notifyDataUpdate,
      throttleMs: 300,
      onReceive: (batchedItems) => {
        // todo: 15 首屏展示的数量
        if (items.length < initialScreenCount) {
          loadMore.current();
        }
      }
    }
    client?.notifyDataUpdate?.(tableObserver);
    return () => {
      client?.cancelObserver?.({ observerId, type: RequestObserverType.cancelObserver });
    }
  }, [client, id, items.length, linkId, loadMore]);
}
