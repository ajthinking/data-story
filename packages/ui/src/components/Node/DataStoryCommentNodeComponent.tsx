import React, { memo } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
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

  const contentParam = data.params.find((param) => param.name === 'content')!

  return (
    (
      <div
        className="max-w-xl prose prose-slate font-mono bg-gray-50 p-4 rounded shadow-xl"
        onDoubleClick={() => setOpenNodeModalId(id)}
      >
        {contentParam.inputMode.value as string}
      </div>
    )
  );
};

export default memo(DataStoryCommentNodeComponent)