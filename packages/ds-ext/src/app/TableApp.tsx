import React from 'react';
import { TableNodeComponent, DataStoryEvents, DataStoryNodeData } from '@data-story/ui';
import { Table } from '@data-story/core';

export default function TableApp(props: { edgeId: string }) {
  const tableId = `Table.${props.edgeId}`;
  const tableProps = {
    id: tableId,
    data: {
      ...Table,
      inputs: [
        {
          ...Table.inputs[0],
          id: `${tableId}.input`,
        },
        ...Table.inputs.slice(1)
      ]
    }  as unknown as DataStoryNodeData,
    selected: false
  };

  // console.log('tableProps', tableProps);
  return (
    <div style={{ width: '100%', height: '100vh', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Table Component Preview</h2>
      <div style={{ width: '250px', height: '100px' }}>
        <p>table place holder (todo: implement the table component)</p>
        {/* <TableNodeComponent {...tableProps} /> */}
      </div>
    </div>
  );
}
