import React from 'react';
import { ReactFlowNode } from '../../../../Node/ReactFlowNode';

export function InputSchemas({
  node,
  register
}: {
  node: ReactFlowNode,
  register: any
}) {
  return <div
    className="flex flex-col"
  >
    <label className="mt-2 mb-1 text-xs text-gray-400">Input Schema</label>
    <textarea
      placeholder={'{ "someProperty": "string"}'}
      className="w-full bg-white h-48 text-xs text-gray-400 px-2 py-1 border rounded border-blue-200"
      defaultValue={JSON.stringify(node.data.inputs, null, 2)}
    ></textarea>
  </div>;
}
