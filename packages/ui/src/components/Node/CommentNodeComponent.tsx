import React, { memo } from 'react';
import { useStore } from '../DataStory/store/store';
import { shallow } from 'zustand/shallow';
import { DataStoryNodeData } from './ReactFlowNode';
import MarkdownIt from 'markdown-it';
import { StringableParam } from '@data-story/core';
import { StoreSchema } from '../DataStory/types';

const markdown = new MarkdownIt();

const CommentNodeComponent = ({ id, data }: {
  id: string,
  data: DataStoryNodeData
}) => {
  const selector = (state: StoreSchema) => ({
    setOpenNodeSidebarId: state.setOpenNodeSidebarId,
  });

  const { setOpenNodeSidebarId } = useStore(selector, shallow);

  const contentParam = data.params.find((param) => param.name === 'content')! as StringableParam

  const htmlContent = markdown.render(contentParam.input.rawValue ?? '');

  return (
    (
      <div
        className="max-w-xl prose prose-slate font-mono bg-gray-50 p-4 rounded shadow-xl prose-a:text-blue-500"
        onDoubleClick={() => setOpenNodeSidebarId(id)}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    )
  );
};

export default memo(CommentNodeComponent)
