import React from 'react';
import { DataStoryNode } from '../../../../Node/DataStoryNode';

export function OutputSchemas({
  node,
  register
}: {
  node: DataStoryNode,
  register: any
}) {

  return <div className="max-h-128 overflow-y-scroll relative pb-6 pt-4 px-6 flex-auto space-y-1 text-sm font-mono text-gray-800">
    <div
    className="flex flex-col"
    >
      <label className="mt-2 mb-1 text-xs text-gray-400">Output Schema</label>
      <textarea
        placeholder={`{ "someProperty": "string"}`}
        className="w-full h-48 text-xs px-2 py-1 border rounded border-blue-200"
        defaultValue={JSON.stringify(node.data.outputs, null, 2)}
      ></textarea>
    </div>
  </div>;
}
  