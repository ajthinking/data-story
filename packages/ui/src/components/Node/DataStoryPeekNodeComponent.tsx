import React, { memo } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './DataStoryNode';
import MarkdownIt from 'markdown-it';
import { Handle, Position } from 'reactflow';

const markdown = new MarkdownIt();

const DataStoryPeekNodeComponent = ({ id, data, selected }: {
  id: string,
  data: DataStoryNodeData,
  selected: boolean
}) => {
  const [minimized, setMinimized] = React.useState(false);

  const selector = (state: StoreSchema) => ({
    peeks: state.peeks,
  });

  const { peeks } = useStore(selector, shallow);

  const input = data.inputs[0]

  const peek = peeks[id]

  return (
    (
      <div
        className="shadow-xl bg-gray-50 rounded border border-gray-300 overflow-hidden"
        onClick={() => {
          if(minimized) setMinimized(false);
        }}
        onDoubleClick={() => setMinimized(!minimized)}
      >
        <div className="absolute z-30">
          <div className="absolute">
            
          </div>
          <div className="">
            <Handle
              className="relative"
              type="target"
              position={Position.Left}
              style={{ opacity: 0, backgroundColor: 'red', position: 'relative', height: 12, width: 12, top: 0, right: 0}}
              id={input.id}
              isConnectable={true}
            />
          </div>
        </div>       
        {!minimized && <div className="p-2 bg-gray-50 text-gray-600 font-mono text-xxxs">
          <pre>
            {peek && JSON.stringify(peek, null, 2)}
            {!peek && '🕒'}
          </pre>
        </div>}

        {minimized && <div className="p-2 bg-gray-50 text-gray-600 font-mono text-xxxs">
          <pre>
          🙈
          </pre>
        </div>}
      </div>
    )
  );
};

export default memo(DataStoryPeekNodeComponent)