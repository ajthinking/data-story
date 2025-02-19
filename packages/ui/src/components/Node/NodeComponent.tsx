import React, { memo } from 'react';
import { useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import CustomHandle from './CustomHandle';
import { DataStoryNodeData } from './ReactFlowNode';
import { StoreSchema } from '../DataStory/types';

const NodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData
  selected: boolean
}) => {
  const selector = (state: StoreSchema) => ({
    setOpenNodeSidebarId: state.setOpenNodeSidebarId,
  });

  const { setOpenNodeSidebarId } = useStore(selector, shallow);

  return (
    (
      <div
        className={`text-xs ${selected ? 'shadow-xl shadow-blue-100 ring-1 ring-blue-200' : ''}`}
        data-cy="data-story-node-component"
        onDoubleClick={() => {
          setOpenNodeSidebarId(id)
        }}
      >
        <div className="w-32" />
        <div className={'flex py-1 text-xs font-bold font-mono tracking-wide border border-gray-400 rounded bg-blue-600 text-gray-100 px-2' + (selected ? ' bg-blue-700 shadow-xl' : '')}>
          { data.label }
        </div>
        <div className="flex flex-col mx-2">
          {data.inputs.map((input: any) => (<div
            className="flex border border-gray-300 rounded px-2 py-1 bg-gray-50"
            key={input.id}
          >
            <CustomHandle id={input.id} isConnectable={true} isInput={true} />
            <div className="ml-2 w-full text-gray-500">{input.name}</div>
          </div>))}

          {data.outputs.map((output: any) => (<div
            className="flex pl-3 border border-gray-300 rounded px-2 py-1 bg-gray-50"
            key={output.id}
          >
            {data.inputs.length > 0 && <div className="w-2"></div>}
            <div className="w-full text-gray-500">{output.name}</div>
            <CustomHandle id={output.id} isConnectable={true} isInput={false} />
          </div>))}
        </div>
      </div>
    )
  );
};

export default memo(NodeComponent)
