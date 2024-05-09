import React, { memo } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import CustomHandle from './CustomHandle';
import { DataStoryNodeData } from './ReactFlowNode';
import { Handle, Position } from 'reactflow';
import { PortIcon } from '../DataStory/icons/portIcon';

const OutputNodeComponent = ({ id, data, selected }: { id: string; data: DataStoryNodeData; selected: boolean }) => {
  const selector = (state: StoreSchema) => ({
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { setOpenNodeModalId } = useStore(selector, shallow);

  const portName = (data?.params?.[0]?.value ?? '') as string
  const inputPort = data.inputs[0]
  const outputPort = data.outputs[0]

  return (
    <div
      className={'text-xs' + (selected ? ' shadow-xl' : '')}
      onDoubleClick={() => {
        setOpenNodeModalId(id);
      }}
    >
      <div className="flex w-full items-left justify-start">
        <div className="flex flex-col items-center justify-center">
          <div className="absolute my-0.5 mr-2"><PortIcon /></div>
          <Handle
            className="relative"
            type="target"
            position={Position.Left}
            style={{ opacity: 0, backgroundColor: '', position: 'relative', height: 12, width: 12, top: 6, left: -6 }}
            id={inputPort.id}
            isConnectable={true}
          />
        </div>
        <div className={'rounded-r rounded-full py-1 text-xs font-bold font-mono tracking-wide border border-gray-400 rounded bg-green-700 text-gray-100 px-2' + (selected ? ' bg-green-800 shadow-xl' : '')}>
          <div className="w-24" />
          <div className="flex w-full whitespace-nowrap">
            Output: { portName }
          </div>
        </div>
        {/* INVISIBLE PORT. ONLY USED WHEN SHOWING AN UNFOLDED DIAGRAM */}
        <Handle
          className="relative"
          type="source"
          position={Position.Right}
          style={{ opacity: 0, backgroundColor: '', position: 'relative', height: 1, width: 1, top: 0, right: 0}}
          id={outputPort.id}
          isConnectable={false}
        />
      </div>
    </div>
  );
};

export default memo(OutputNodeComponent);
