import { useStore } from '../DataStory/store/store';
import { StoreSchema } from '../DataStory/types';
import { createDataStoryId, ItemValue, ObserveLinkUpdate, RequestObserverType } from '@data-story/core';
import { useLatest, useMount, useUnmount, useWhyDidYouUpdate } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { MutableRefObject, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Subscription } from 'rxjs';

const initialScreenCount: number = 15;
let subscription: Subscription | undefined;

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

  const linkIds = useMemo(() => {
    return toDiagram()?.getInputLinkIdsFromNodeIdAndPortName?.(id, 'input');
  }, [toDiagram, id]);
  const pendingRequest = useRef(false);
  const linkOffsets = useRef<Map<string, number>>(new Map());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const loadMore = useLatest(async () => {
    if (pendingRequest.current) return;
    if (!client?.getDataFromStorage || !linkIds) return;

    setIsDataFetched(true);
    pendingRequest.current = true;

    // Clear offsets if re-running the diagram (no items)
    if (items.length === 0) {
      linkOffsets.current.clear();
    }

    try {
      const newItems: ItemValue[] = [];

      // Fetch data for each link
      const promises = linkIds.map(async (linkId) => {
        const currentOffset = linkOffsets.current.get(linkId) ?? 0;
        const result = await client?.getDataFromStorage?.({
          type: 'getDataFromStorage',
          linkId,
          limit: initialScreenCount,
          offset: currentOffset,
        });

        const linkItems = result?.[linkId] ?? [];
        if (linkItems.length > 0) {
          newItems.push(...linkItems);
          // Update offset only if we got items
          linkOffsets.current.set(linkId, currentOffset + linkItems.length);
        }
      });

      await Promise.all(promises);

      if (newItems.length > 0) {
        setItems(prevItems => [...prevItems, ...newItems]);
      }
    } finally {
      pendingRequest.current = false;
    }
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

  useMount(() => {
    if (!client?.observeLinkUpdate || !linkIds) return;
    const observerId = createDataStoryId();
    const tableUpdate: ObserveLinkUpdate = {
      observerId,
      linkIds: linkIds,
      type: RequestObserverType.observeLinkUpdate,
      throttleMs: 300,
      onReceive: () => {
        // if linkOffsets all items.length < initialScreenCount then load more
        if (itemsRef.current.length < initialScreenCount) {
          loadMore.current();
        }
      }
    }
    subscription = client?.observeLinkUpdate?.(tableUpdate);
  });

  useUnmount(() => {
    subscription?.unsubscribe();
  });

  return { loadMore };
}
