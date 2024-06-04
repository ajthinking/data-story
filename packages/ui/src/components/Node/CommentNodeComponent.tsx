import React, { memo } from 'react';
import { StoreSchema, useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './ReactFlowNode';
import MarkdownIt from 'markdown-it';
import { StringableParam } from '@data-story/core';

const markdown = new MarkdownIt();

const CommentNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData
}) => {
  const selector = (state: StoreSchema) => ({
    setOpenNodeModalId: state.setOpenNodeModalId,
  });

  const { setOpenNodeModalId } = useStore(selector, shallow);

  const contentParam = data.params.find((param) => param.name === 'content')! as StringableParam

  const htmlContent = markdown.render(contentParam.value.value ?? '');

  return (
    (
      <div
        className="max-w-xl prose prose-slate font-mono bg-gray-50 p-4 rounded shadow-xl prose-a:text-blue-500"
        onDoubleClick={() => setOpenNodeModalId(id)}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    )
  );
};

export default memo(CommentNodeComponent)
