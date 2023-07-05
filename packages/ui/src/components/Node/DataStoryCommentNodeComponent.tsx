import React, { memo } from 'react';
import { StoreSchema, useStore } from '../DataStory/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './DataStoryNode';

const DataStoryCommentNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData
}) => {
  const selector = (state: StoreSchema) => ({
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { setOpenNodeModalId } = useStore(selector, shallow);

  return (
    (
      <div
        className="max-w-xl text-xs font-mono bg-gray-50 text-blue-600 p-4 rounded shadow-xl"
        onDoubleClick={() => setOpenNodeModalId(id)}
      >
        {data.params.content.value}
      </div>
    )
  );
};

export default memo(DataStoryCommentNodeComponent)