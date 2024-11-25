import { useStore } from '../DataStory/store/store';
import { ItemsObserver, StoreSchema } from '../DataStory/types';
import { RequestObserverType } from '@data-story/core';
import { useMount, useUnmount } from 'ahooks';
import { shallow } from 'zustand/shallow';
import { Subscription } from 'rxjs';

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

  let tableSubscription: Subscription;
  // Add the node to the inputObservers when the node is mounted
  useMount(() => {
    if (!client?.itemsObserver) {
      return;
    }

    const linkId = toDiagram()?.getLinkIdFromNodeId(id, 'input');

    const tableObserver: ItemsObserver = {
      linkIds: [linkId],
      type: RequestObserverType.ItemsObserver,
      onReceive: (batchedItems) => {
        if (!isDataFetched) {
          setIsDataFetched(true);
        }

        setItems(prevItems => [...prevItems, ...batchedItems.flat()]);
      }
    }

    tableSubscription = client?.itemsObserver?.(tableObserver);
  });

  useUnmount(() => {
    tableSubscription?.unsubscribe();
  });
}
