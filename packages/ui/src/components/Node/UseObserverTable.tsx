import { useStore } from '../DataStory/store/store';
import { StoreSchema } from '../DataStory/types';
import { createDataStoryId, ItemsObserver, RequestObserverType } from '@data-story/core';
import { useMount, useUnmount } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { Subscription } from 'rxjs';

let tableSubscription: Subscription;
const observerId = createDataStoryId();
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

  // Add the node to the inputObservers when the node is mounted
  useMount(() => {
    const linkId = toDiagram()?.getLinkIdFromNodeId?.(id, 'input');
    if (!client?.itemsObserver || !linkId) return;
    const tableObserver: ItemsObserver = {
      observerId,
      linkIds: [linkId],
      type: RequestObserverType.itemsObserver,
      onReceive: (batchedItems) => {
        if (!isDataFetched) {
          setIsDataFetched(true);
        }
        console.log('batchedItems', batchedItems);

        setItems(prevItems => [...prevItems, ...batchedItems.flat()]);
      }
    }

    tableSubscription = client?.itemsObserver?.(tableObserver);
  });

  useUnmount(() => {
    tableSubscription?.unsubscribe();
    client?.cancelObserver?.({ observerId, type: RequestObserverType.cancelObserver });
  });
}
