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
}

const TableNodeComponent = ({
  id,
  data,
  selected,
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

  useObserverTable({
    linkIds,
    client,
    setIsDataFetched,
    setItems,
    items,
    parentRef,
  });

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

  return (
    <div>
      <CustomHandle id={input.id} isConnectable={true} isInput={true} />
      <StandaloneTable
        wrapClassName={`${selected ? 'shadow-xl shadow-blue-100 ring-1 ring-blue-200' : ''} mt-[-12px] max-h-64 max-w-[750px]`}
        isDataFetched={isDataFetched}
        items={items}
        parentRef={parentRef}
        data={data}
      />
    </div>
  );
};

export default memo(TableNodeComponent);
