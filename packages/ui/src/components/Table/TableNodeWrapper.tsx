import React, { useCallback, useRef, useState } from 'react';
import { useObserverTable } from '../Node/table/UseObserverTable';
import StandaloneTable from './StandaloneTable';
import { DataStoryNodeData } from '../Node/ReactFlowNode';
import { ItemValue } from '@data-story/core';

interface TableNodeWrapperProps {
  id: string;
  data?: DataStoryNodeData;
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Wrapper component that connects the standalone table to the DataStory context
 * This allows the table to be used in both standalone mode and within the DataStory ecosystem
 */
const TableNodeWrapper = ({
  id,
  data,
  selected,
  className,
  style,
}: TableNodeWrapperProps) => {
  const [items, setItems] = useState<ItemValue[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { loadMore } = useObserverTable({
    id,
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
  const tableParams = data?.params || {};

  return (
    <StandaloneTable
      id={id}
      data={items}
      params={tableParams}
      className={className}
      style={style}
      onLoadMore={handleLoadMore}
    />
  );
};

export default TableNodeWrapper;
