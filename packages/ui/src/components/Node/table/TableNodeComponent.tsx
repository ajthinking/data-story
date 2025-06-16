import React, { memo, useCallback, useRef, useState } from 'react';
import { DataStoryNodeData } from '../ReactFlowNode';
import StandaloneTable from './StandaloneTable';
import CustomHandle from '../CustomHandle';
import { useObserverTable } from './UseObserverTable';
import { ItemValue } from '@data-story/core';
import { useStore } from '../../DataStory/store/store';
import { StoreSchema } from '../../DataStory/types';
import { shallow } from 'zustand/shallow';

/**
 * TableNodeComponent renders a table node in the DataStory diagram
 * It uses TableNodeWrapper which connects to the DataStory context
 */
interface TableNodeComponentProps {
  id: string;
  data: DataStoryNodeData;
  selected: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TableNodeComponent = ({
  id,
  data,
  selected,
  className = 'text-xs border rounded border-gray-300',
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

  // Extract table parameters from the node data
  const tableParams: any = data?.params || {};

  return (
    <div>
      <CustomHandle id={id} isConnectable={true} isInput={true} />
      <StandaloneTable
        id={id}
        data={items}
        params={tableParams}
        className={className}
        style={style}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default memo(TableNodeComponent);
