import { StoreSchema, useStore } from '../DataStory/store/store';
import { DataStoryObservers } from '../DataStory/types';
import { createDataStoryId } from '@data-story/core';
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
  });

  const { observerMap, setObservers } = useStore(selector, shallow);

  const observerId = useRef(createDataStoryId());
  // Add the node to the inputObservers when the node is mounted
  useMount(() => {
    if (observerMap?.get(observerId.current)) {
      console.error('observers already exist');
      return;
    }

    const tableObserver: DataStoryObservers = {
      inputObservers: [{ nodeId: id, portId: 'input' }],
      onDataChange: (batchedItems, inputObserver) => {
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

    setObservers(observerId.current, tableObserver);
  });

  useUnmount(() => {
    if (observerMap && !observerMap?.get(observerId.current)) {
      observerMap.delete(observerId.current);
    }
  });
}
