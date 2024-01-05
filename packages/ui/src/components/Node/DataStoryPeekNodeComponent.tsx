import React, { memo } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './DataStoryNode';
import MarkdownIt from 'markdown-it';
import CustomHandle from './CustomHandle';
import { PortIcon } from '../DataStory/icons/portIcon';
import { Handle, NodeResizer, Position } from 'reactflow';

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
        className="shadow-xl bg-gray-50 rounded p-4 border border-gray-300 overflow-hidden"
        onClick={() => {
          if(minimized) setMinimized(false);
        }}
        onDoubleClick={() => setMinimized(!minimized)}
      >
        <div className="absolute mx-1 my-4 z-30">
          <Handle
            className="relative"
            type="target"
            position={Position.Left}
            style={{ opacity: 0, backgroundColor: 'red', position: 'relative', height: 12, width: 12, top: 0, right: 0}}
            id={input.id}
            isConnectable={true}
          />
        </div>       
        {!minimized && <div className="bg-gray-50 text-gray-600 font-mono text-xs">
          <pre>
            {peek && JSON.stringify(peek, null, 2)}
            {!peek && '🕒'}
          </pre>
        </div>}

        {minimized && <div className="bg-gray-50 text-gray-600 font-mono text-xs">
          🙈
        </div>}
      </div>
    )
  );
};

export default memo(DataStoryPeekNodeComponent)