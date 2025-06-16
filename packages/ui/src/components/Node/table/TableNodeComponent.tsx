import React, { memo } from 'react';
import { DataStoryNodeData } from '../ReactFlowNode';
import TableNodeWrapper from '../../Table/TableNodeWrapper';
import CustomHandle from '../CustomHandle';

/**
 * TableNodeComponent renders a table node in the DataStory diagram
 * It uses TableNodeWrapper which connects to the DataStory context
 */
const TableNodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  return (
    <div>
      <CustomHandle id={id} isConnectable={true} isInput={true} />
      <TableNodeWrapper
        id={id}
        data={data}
        selected={selected}
        className="text-xs border rounded border-gray-300"
      />
    </div>
  );
};

export default memo(TableNodeComponent);
