import React from 'react';
import { DataStoryNode } from '../../../../Node/DataStoryNode';
import MarkdownIt from 'markdown-it';

export function Docs({
  node,
  register
}: {
  node: DataStoryNode,
  register: any
}) {

  const defaultDocs = 'No docs found for this node.'
  const htmlContent = new MarkdownIt().render(node.data.docs || defaultDocs);  

  return <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800">    
    <div
      className="flex flex-col"
    >
      <div
        className="w-full prose prose-p:text-gray-400 prose-h3:tracking-wide prose-p:text-xs prose-h3:text-sm prose-h3:uppercase prose-h3:text-gray-400 prose-sm prose-slate font-mono p-4 rounded prose-a:text-blue-500"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />      
    </div>
  </div>;
}
  