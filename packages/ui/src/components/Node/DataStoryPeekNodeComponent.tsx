import React, { memo, useEffect } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './ReactFlowNode';
import { Handle, Position } from 'reactflow';

const DataStoryPeekNodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [peekIndex, setPeekIndex] = React.useState(0);

  const selector = (state: StoreSchema) => ({
    peeks: state.peeks,
  });

  const { peeks } = useStore(selector, shallow);

  const input = data.inputs[0]

  const peek = peeks[id] && peeks[id][peekIndex];

  const forward = () => {
    setPeekIndex(Math.min(peekIndex + 1, peeks[id].length - 1));
  }

  const backward = () => {
    setPeekIndex(Math.max(peekIndex - 1, 0));
  }

  // Ensure that the peek index is not out of bounds
  useEffect(() => {
    if (peeks[id] && peekIndex >= peeks[id].length) {
      setPeekIndex(peeks[id].length - 1); // Set to last valid index
    } else if (!peeks[id] || peeks[id].length === 0) {
      setPeekIndex(0); // Reset to 0 if no peeks are available
    }
  }, [peeks, id, peekIndex]);

  return (
    (
      <div
        className="shadow-xl bg-gray-50 rounded border border-gray-300 overflow-hidden"
      >
        <div className="absolute z-30">
          <div className="absolute">

          </div>
          <div className="">
            <Handle
              className="relative"
              type="target"
              position={Position.Left}
              style={{ opacity: 0, backgroundColor: 'red', position: 'relative', height: 1, width: 1, top: 0, right: 0}}
              id={input.id}
              isConnectable={true}
            />
          </div>
        </div>
        {<div className="bg-gray-50 text-gray-600 font-mono text-xxxs">
          <div
            className="flex justify-end w-full py-0.5 border-b space-x-1 px-2"
          >
            <div
              className="hover:bg-gray-100 cursor-pointer"
              onClick={backward}
            >‹</div>
            <div>
              {peek && `#${peekIndex + 1}`}
              {!peek && 'PEEK'}
            </div>
            <div
              className="hover:bg-gray-100 cursor-pointer"
              onClick={forward}
            >›</div>
          </div>
          <div className="w-full px-1 py-1">
            <pre className="" style={{ paddingLeft: '0', paddingRight: '0' }}>
              {peek && JSON.stringify(peek, null, 2)}
            </pre>
          </div>
        </div>}
      </div>
    )
  );
};

export default memo(DataStoryPeekNodeComponent)