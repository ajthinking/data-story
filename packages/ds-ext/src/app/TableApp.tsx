import React from 'react';
import { TableNodeComponent, DataStoryEvents } from '@data-story/ui';
import { str } from '@data-story/core';
import { DataStoryNodeData } from '../../../ui/src/components/Node/ReactFlowNode';

export default function TableApp() {
  // Mock the required props for TableNodeComponent
  const mockProps = {
    id: 'table-1',
    data: {
      id: 'table-1',
      type: 'tableNodeComponent',
      position: { x: 0, y: 0 },
      inputs: [{ id: 'input-1', name: 'input', schema: {} }],
      outputs: [],
      // Required properties for DataStoryNodeData
      params: [
        str({ name: 'only', value: '' }),
        str({ name: 'drop', value: '' }),
        str({ name: 'destructObjects', value: 'false' })
      ],
      computer: 'table',
      label: 'Table'
    } as unknown as DataStoryNodeData,
    selected: false
  };

  // Mock data for the table
  React.useEffect(() => {
    // Create a custom event to simulate data being sent to the table
    // Since DataStoryEvents doesn't have a NODE_DATA event, we'll use a custom event name
    const event = new CustomEvent('data-story-node-data', {
      detail: {
        nodeId: 'table-1',
        data: [
          { id: 1, name: 'John', age: 30, city: 'New York' },
          { id: 2, name: 'Jane', age: 25, city: 'San Francisco' },
          { id: 3, name: 'Bob', age: 40, city: 'Chicago' },
          { id: 4, name: 'Alice', age: 35, city: 'Seattle' },
          { id: 5, name: 'Tom', age: 28, city: 'Boston' }
        ]
      }
    });

    // Also dispatch a RUN_SUCCESS event which the table component listens for
    const runSuccessEvent = new CustomEvent('data-story-event', {
      detail: {
        type: DataStoryEvents.RUN_SUCCESS
      }
    });

    // Dispatch both events after a short delay to simulate data loading
    setTimeout(() => {
      window.dispatchEvent(event);
      window.dispatchEvent(runSuccessEvent);
    }, 500);
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Table Component Preview</h2>
      <div style={{ width: '750px', height: '400px' }}>
        <TableNodeComponent {...mockProps} />
      </div>
    </div>
  );
}
