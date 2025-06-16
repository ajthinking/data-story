import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { DataStoryNodeData } from '../ReactFlowNode';
import StandaloneTable from './StandaloneTable';
import CustomHandle from '../CustomHandle';
import { useObserverTable } from './UseObserverTable';
import { ItemValue } from '@data-story/core';
import { useStore } from '../../DataStory/store/store';
import { StoreSchema } from '../../DataStory/types';
import { shallow } from 'zustand/shallow';
import { DataStoryEvents, DataStoryEventType } from '../../DataStory/events/dataStoryEventType';
import { useDataStoryEvent } from '../../DataStory/events/eventManager';

/**
 * TableNodeComponent renders a table node in the DataStory diagram
 * It uses TableNodeWrapper which connects to the DataStory context
 */
interface TableNodeComponentProps {
  id: string;
  data: DataStoryNodeData;
  selected: boolean;
  style?: React.CSSProperties;
}

const TableNodeComponent = ({
  id,
  data,
  selected,
  style,
}: TableNodeComponentProps) => {
  const [items, setItems] = useState<ItemValue[]>([]);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  // Derive client and linkIds from store / diagram
  const selector = (state: StoreSchema) => ({
    toDiagram: state.toDiagram,
    client: state.client,
  });
  const { toDiagram, client } = useStore(selector, shallow);
  const linkIds = toDiagram()?.getInputLinkIdsFromNodeIdAndPortName?.(id);

  const { loadMore } = useObserverTable({
    linkIds,
    client,
    setIsDataFetched,
    setItems,
    items,
    parentRef,
  });

  const handleLoadMore = useCallback(async () => {
    if (loadMore.current) {
      await loadMore.current();
    }
  }, [loadMore]);

  const dataStoryEvent = useCallback((event: DataStoryEventType) => {
    if (event.type === DataStoryEvents.RUN_START) {
      setItems([]);
      setIsDataFetched(false);
    }
    if (event.type === DataStoryEvents.RUN_SUCCESS) {
      setIsDataFetched(true);
    }
  }, []);
  useDataStoryEvent(dataStoryEvent);
  const input = useMemo(() => data.inputs[0], [data]);
  console.log('table node input', input)
  const tableParams: any = data?.params || {};

  return (
    <div>
      <CustomHandle id={input.id} isConnectable={true} isInput={true} />
      <StandaloneTable
        isDataFetched={isDataFetched}
        setIsDataFetched={setIsDataFetched}
        id={id}
        data={items}
        params={tableParams}
        style={style}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default memo(TableNodeComponent);
