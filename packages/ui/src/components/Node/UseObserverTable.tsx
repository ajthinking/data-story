import { useStore } from '../DataStory/store/store';
import { StoreSchema } from '../DataStory/types';
import { createDataStoryId, ItemValue, NotifyDataUpdate, RequestObserverType } from '@data-story/core';
import { useLatest } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { useEffect, useRef } from 'react';

const initialScreenCount: number = 20;

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
    setIsDataFetched(true);
    pendingRequest.current = true;
    return client?.getDataFromStorage?.({
      type: 'getDataFromStorage',
      linkIds: [linkId],
      limit: initialScreenCount,
      offset: items.length,
    }).then((data) => {
      const currentItems = data[linkId] ?? [];
      setItems(preItems => [...preItems, ...currentItems]);
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
      onReceive: (linkIds) => {
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
