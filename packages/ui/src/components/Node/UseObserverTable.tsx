import { useStore } from '../DataStory/store/store';
import { StoreSchema } from '../DataStory/types';
import { createDataStoryId, ItemValue, LinkUpdateObserver, RequestObserverType } from '@data-story/core';
import { useLatest } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

const initialScreenCount: number = 20;

export function useObserverTable({ id, setIsDataFetched, setItems, items, parentRef }: {
  id: string,
  setIsDataFetched: (value: boolean) => void,
  setItems: (value: any) => void
  items: ItemValue[];
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
}): {
    loadMore: MutableRefObject<() => Promise<void> | undefined>
  } {
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });
  const { toDiagram, client } = useStore(selector, shallow);

  const linkIds = toDiagram()?.getInputLinkIdsFromNodeIdAndPortName?.(id, 'input');
  const pendingRequest = useRef(false);

  const loadMore = useLatest(() => {
    if (pendingRequest.current) return;
    if (!client?.getDataFromStorage || !linkIds) return;

    setIsDataFetched(true);
    pendingRequest.current = true;

    // todo: get data from different links
    return client?.getDataFromStorage?.({
      type: 'getDataFromStorage',
      linkIds: linkIds,
      limit: initialScreenCount,
      offset: items.length,
    }).then((data) => {
      const currentItems = linkIds.reduce((acc, linkId) => {
        return acc.concat(data[linkId]);
      }, [] as ItemValue[])
      // console.log('currentIt?ems', currentItems, 'data', data);
      setItems(preItems => {
        // console.log('preItems', preItems);
        // console.log('currentItems', currentItems);
        // console.log('preItems.concat(currentItems)', preItems.concat(currentItems));
        return preItems.concat(currentItems);
      });
    }).finally(() => {
      pendingRequest.current = false;
    });
  });

  useLayoutEffect(() => {
    const currentRef = parentRef.current;
    if (!currentRef) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = currentRef;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadMore.current();
      }
    };

    currentRef?.addEventListener('scroll', handleScroll);
    return () => {
      currentRef?.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore, parentRef.current]);

  useEffect(() => {
    if (!client?.linkUpdateObserver || !linkIds) return;
    const observerId = createDataStoryId();
    const tableUpdate: LinkUpdateObserver = {
      observerId,
      linkIds: linkIds,
      type: RequestObserverType.linkUpdateObserver,
      throttleMs: 300,
      onReceive: (linkIds) => {
        if (items.length < initialScreenCount) {
          loadMore.current();
        }
      }
    }
    client?.linkUpdateObserver?.(tableUpdate);

    return () => {
      client?.cancelObserver?.({ observerId, type: RequestObserverType.cancelObserver });
    }
  }, [client, id, items.length, linkIds, loadMore]);

  return { loadMore };
}
