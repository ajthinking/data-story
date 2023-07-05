import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { PortIcon } from '../DataStory/icons/portIcon';

const CustomHandle = ({ id, isConnectable, isInput }: {
  id: string,
  isConnectable: boolean,
  isInput: boolean
}) => {
  if(isInput) return (
    <div className="flex items-left justify-start -ml-3">
      <div className="absolute my-0.5 hover:bg-red-500"><PortIcon /></div>
      <Handle
        className="relative bg-red-500"
        type="target"
        position={Position.Left}
        style={{ opacity: 0, position: "relative", height: 12, width: 12, top: 8, left: 0}}
        id={id}
        isConnectable={isConnectable}
      />                                
    </div>            
  );

  return (
      <div className="flex w-full items-right justify-end -mx-4">
        <div className="absolute my-0.5"><PortIcon /></div>
        <Handle
          className="relative"
          type="source"
          position={Position.Right}
          style={{ opacity: 0, backgroundColor: "", position: "relative", height: 12, width: 12, top: 8, right: 0}}
          id={id}
          isConnectable={isConnectable}
        />                                
      </div>            
  );
};

export default memo(CustomHandle)