import React, { memo } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './DataStoryNode';
import MarkdownIt from 'markdown-it';
import CustomHandle from './CustomHandle';
import { PortIcon } from '../DataStory/icons/portIcon';
import { Handle, Position } from 'reactflow';

const markdown = new MarkdownIt();

const DataStoryPeekNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData
}) => {
  const selector = (state: StoreSchema) => ({
    setOpenNodeModalId: state.setOpenNodeModalId,
    peeks: state.peeks,
  });

  const { setOpenNodeModalId, peeks } = useStore(selector, shallow);

  const mock = {
  }

  const input = data.inputs[0]

  const peek = peeks[id]

  const peekContent = peek ? peek : mock

  const htmlContent = markdown.render('```\n' + JSON.stringify(peekContent, null, 2) + '\n```');

  return (
    (       
      <div
        className="shadow-xl bg-gray-50 rounded p-4 border border-gray-300"
        onDoubleClick={() => setOpenNodeModalId(id)}
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
        {/* <div
          className="prose prose-slate prose-2xl font-mono bg-gray-50 shadow-xl prose-a:text-blue-500"
          dangerouslySetInnerHTML={{ __html: htmlContent }}>
        </div> */}
        <div className="bg-gray-50 text-gray-600 font-mono text-xs">
          <pre>
            {JSON.stringify(peekContent, null, 2)}
          </pre>
        </div>      
      </div>

    )
  );
};

export default memo(DataStoryPeekNodeComponent)