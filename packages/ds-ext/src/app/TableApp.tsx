import React, { useRef, useState, useEffect } from 'react';
import { DataStoryNodeData, StandaloneTable, useObserverTable, WorkspaceApiClientImplement } from '@data-story/ui';
import { ItemValue, Table } from '@data-story/core';

interface TableAppProps {
  edgeId: string;
  client: WorkspaceApiClientImplement;
}

const initialScreenCount = 20;
export const TableApp = ({ edgeId, client }: TableAppProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<ItemValue[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(true);
  const data = {
    id: edgeId,
    ...Table,
    inputs: [
      {
        ...Table.inputs[0],
        id: `${edgeId}.input`,
        schema: {},
      },
    ],
    outputs: [],
  } as unknown as DataStoryNodeData;

  const { loadMore } = useObserverTable({
    linkIds: [edgeId],
    client,
    setIsDataFetched,
    setItems,
    items,
    parentRef,
  });

  useEffect(() => {
    async function fetchData() {
      await loadMore.current(initialScreenCount);
    }
    fetchData();
  }, [loadMore.current]);

  return (
    <div>
      <StandaloneTable
        isDataFetched={isDataFetched}
        items={items}
        data={data}
        parentRef={parentRef}
        rowCount={initialScreenCount}
      />
    </div>
  );
};

export default React.memo(TableApp);
