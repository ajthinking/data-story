import { createDataStoryId, ItemValue, ObserveLinkUpdate, RequestObserverType } from '@data-story/core';
import { useLatest } from 'ahooks';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { WorkspaceApiClientImplement } from '../../DataStory/clients/WorkspaceApiClientImplement';

const initialScreenCount = 15;
const tableThrottleMs = 100;

export function useObserverTable({ linkIds = [], client, setIsDataFetched, setItems, items, parentRef }: {
  linkIds?: string[];
  setIsDataFetched: (value: boolean) => void;
  setItems: (value: any) => void
  items: ItemValue[];
  parentRef: React.MutableRefObject<HTMLDivElement | null>;
  client?: WorkspaceApiClientImplement;
}): {
    loadMore: MutableRefObject<() => Promise<void> | undefined>
  }{
  const pendingRequest = useRef(false);
  const linkOffsets = useRef<Map<string, number>>(new Map());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const linkIdsString = JSON.stringify(linkIds);

  const loadMore = useLatest(async () => {
    if (pendingRequest.current) return;

    if (!client?.getDataFromStorage || !linkIds) return;

    // Clear offsets if re-running the diagram (no items)
    if (items.length === 0) {
      linkOffsets.current.clear();
    }
    setIsDataFetched(true);
    pendingRequest.current = true;

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

  useEffect(() => {
    if (!client?.observeLinkUpdate || !linkIds) return;

    const tableUpdate: ObserveLinkUpdate = {
      observerId: createDataStoryId(),
      linkIds: linkIds,
      type: RequestObserverType.observeLinkUpdate,
      throttleMs: tableThrottleMs,
      limit: initialScreenCount,
      onReceive: (linkIds) => {
        // If we have enough initial items, attempt unsubscribe
        if (itemsRef.current.length >= initialScreenCount) {
          return;
        }

        // Load more items
        loadMore.current();
      },
    }
    const subscription = client?.observeLinkUpdate?.(tableUpdate);
    return () => {
      subscription?.unsubscribe();
    };
    // use linkIdsString replace linkIds to prevent infinite loop
  }, [client, linkIdsString, loadMore]);

  useLayoutEffect(() => {
    const currentRef = parentRef.current;
    if (!currentRef) return;

    const handleScroll = () => {
      const { scrollHeight, scrollTop, clientHeight } = currentRef;
      // Using Math.ceil prevents errors in floating-point calculations.
      const isBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      if (isBottom) {
        loadMore.current();
      }
    };

    currentRef?.addEventListener('scroll', handleScroll);
    return () => {
      currentRef?.removeEventListener('scroll', handleScroll);
    };
  }, [loadMore, parentRef.current]);

  return { loadMore };
}
