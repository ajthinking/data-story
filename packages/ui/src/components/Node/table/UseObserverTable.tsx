import { useStore } from '../../DataStory/store/store';
import { StoreSchema } from '../../DataStory/types';
import { createDataStoryId, ItemValue, ObserveLinkUpdate, RequestObserverType } from '@data-story/core';
import { useLatest } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { useHandleConnections } from '@xyflow/react';

const initialScreenCount: number = 15;
const tableThrottleMs: number = 300;

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

  const pendingRequest = useRef(false);
  const linkOffsets = useRef<Map<string, number>>(new Map());
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const tableInputId = `${id}.input`;
  const connections = useHandleConnections({ type: 'target', id: tableInputId });

  const loadMore = useLatest(async () => {
    if (pendingRequest.current) return;

    const linkIds = toDiagram()?.getInputLinkIdsFromNodeIdAndPortName?.(id);
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
    const linkIds = toDiagram()?.getInputLinkIdsFromNodeIdAndPortName?.(id);
    if (!client?.observeLinkUpdate || !linkIds) return;

    const tableUpdate: ObserveLinkUpdate = {
      observerId: createDataStoryId(),
      linkIds: linkIds,
      type: RequestObserverType.observeLinkUpdate,
      throttleMs: tableThrottleMs,
      onReceive: (linkIds) => {
        // if linkOffsets all items.length < initialScreenCount then load more
        if (itemsRef.current.length < initialScreenCount) {
          loadMore.current();
        }
      }
    }
    const subscription = client?.observeLinkUpdate?.(tableUpdate);
    return () => {
      subscription?.unsubscribe();
    };
    // connections.length is 0 means the node is not connected
  }, [client, connections.length, id, loadMore, toDiagram]);

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
