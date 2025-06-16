import React, { useCallback, useMemo, useRef, useState } from 'react';
import { DataStory, StandaloneTable, DataStoryEvents, DataStoryNodeData, useObserverTable } from '@data-story/ui';
import { ItemValue, multiline, Table } from '@data-story/core';
import { useDiagram } from '../hooks/useDiagram';
import { CustomizeJSClient } from '../splash/CustomizeJSClient';

const selectedEdgeId = 'EU77IV0tBd';
export default () => {
  // Create table props
  const tableId = `Table.${selectedEdgeId || 'demo'}`;
  const tableProps = {
    id: tableId,

    data: {
      ...Table,
      inputs: [
        {
          ...Table.inputs[0],
          id: `${tableId}.input`,
          schema: {},
        },
      ],
      outputs: [],
    } as unknown as DataStoryNodeData,
    selected: false,
  };
  const { app, diagram, loading } = useDiagram((builder) =>
    builder
      .add('Signal', {
        period: 100,
        count: 1000,
        expression: '{ x: ${{i}} }',
      })
      .add('Map', {
        mapper: multiline`
      item => ({
        x: \${{x}},
        y: Math.sin(\${{x}} / 4) + Math.cos(\${{x}} / 3) * Math.exp(-\${{x}} / 100) + Math.random() * 0.5
      })
      `,
      })
      .add('Table')
      .connect()
      .place()
      .get(),
  );

  const client = useMemo(() => (diagram ? new CustomizeJSClient({ diagram, app }) : undefined), [diagram, app]);

  const linkIds = [selectedEdgeId]
  const [items, setItems] = useState<ItemValue[]>([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const parentRef = useRef<HTMLDivElement>(null);

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
  // Simulate data for the table when it's shown
  React.useEffect(() => {
    // Create a custom event to simulate data being sent to the table
    const event = new CustomEvent('data-story-node-data', {
      detail: {
        nodeId: tableId,
        data: [
          { id: 1, name: 'John', age: 30, city: 'New York' },
          { id: 2, name: 'Jane', age: 25, city: 'San Francisco' },
          { id: 3, name: 'Bob', age: 40, city: 'Chicago' },
          { id: 4, name: 'Alice', age: 35, city: 'Seattle' },
          { id: 5, name: 'Tom', age: 28, city: 'Boston' },
        ],
      },
    });

    // Also dispatch a RUN_SUCCESS event which the table component listens for
    const runSuccessEvent = new CustomEvent('data-story-event', {
      detail: {
        type: DataStoryEvents.RUN_SUCCESS,
      },
    });

    // Dispatch both events after a short delay to simulate data loading
    setTimeout(() => {
      window.dispatchEvent(event);
      window.dispatchEvent(runSuccessEvent);
    }, 500);
  }, [tableId]);

  return (
    <div className="flex flex-col gap-4">
      <div className="mt-4 p-4 border rounded-md">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">Edge Data: {selectedEdgeId}</h3>
          <button className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Close</button>
        </div>
        <div style={{ width: '750px', height: '400px' }}>
          <StandaloneTable
            isDataFetched={isDataFetched}
            items={items}
            params={{
              only: undefined,
              drop: undefined,
              destructObjects: false,
            }}
            onLoadMore={handleLoadMore}
          />
        </div>
      </div>
    </div>
  );
};
